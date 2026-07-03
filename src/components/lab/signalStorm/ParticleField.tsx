/* eslint-disable react-hooks/immutability, react-hooks/purity --
 * This component drives a Three.js Points system. Two intentional violations of
 * React 19's purity rules:
 *   (1) The initial particle distribution is randomized via Math.random() inside
 *       useMemo — a one-shot side-effect, not a render concern.
 *   (2) Typed-array buffer attributes are mutated in place inside useFrame; GPU
 *       upload happens via `needsUpdate = true`. This is the standard r3f
 *       pattern and pure-render rules don't apply to per-frame GPU state.
 */
import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { signalStormFragment, signalStormVertex } from "./signalStorm.glsl";
import type { SignalStormControls } from "./useSignalStormControls";

interface ParticleFieldProps {
  controls: SignalStormControls;
  isMobile: boolean;
}

interface Shockwave {
  pos: THREE.Vector3;
  strength: number;
  age: number;
}

export const ParticleField = ({ controls, isMobile }: ParticleFieldProps) => {
  const { camera, gl } = useThree();

  const MAX = isMobile ? 15000 : 30000;

  const { geometry, material, velocities, maxRef } = useMemo(() => {
    const positions = new Float32Array(MAX * 3);
    const speeds = new Float32Array(MAX);
    const sizes = new Float32Array(MAX);
    const vel = new Float32Array(MAX * 3);

    for (let i = 0; i < MAX; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      sizes[i] = Math.random() * 0.6 + 0.4;
    }

    const geom = new THREE.BufferGeometry();
    const posAttr = new THREE.BufferAttribute(positions, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    geom.setAttribute("position", posAttr);

    const speedAttr = new THREE.BufferAttribute(speeds, 1);
    speedAttr.setUsage(THREE.DynamicDrawUsage);
    geom.setAttribute("aSpeed", speedAttr);

    geom.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      vertexShader: signalStormVertex,
      fragmentShader: signalStormFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uMaxSpeed: { value: 2.0 },
        uColorLow: { value: new THREE.Color("#818cf8") },
        uColorHigh: { value: new THREE.Color("#22d3ee") },
      },
    });

    return {
      geometry: geom,
      material: mat,
      velocities: vel,
      maxRef: { value: 2 },
    };
  }, [MAX]);

  const pointer3D = useRef(new THREE.Vector3(0, 0, 0));
  const pointerActive = useRef(false);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const shockwaves = useRef<Shockwave[]>([]);

  useEffect(() => {
    const el = gl.domElement;
    const intersect = new THREE.Vector3();
    const ndc = new THREE.Vector2();

    const updatePointer = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      ndc.set(
        ((clientX - rect.left) / rect.width) * 2 - 1,
        -((clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(ndc, camera);
      if (raycaster.ray.intersectPlane(plane, intersect)) {
        pointer3D.current.copy(intersect);
        pointerActive.current = true;
      }
    };

    const onPointerMove = (e: PointerEvent) => updatePointer(e.clientX, e.clientY);
    const onPointerLeave = () => {
      pointerActive.current = false;
    };
    const onClick = (e: MouseEvent) => {
      if (isMobile) return;
      const rect = el.getBoundingClientRect();
      ndc.set(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(ndc, camera);
      const hit = new THREE.Vector3();
      if (raycaster.ray.intersectPlane(plane, hit)) {
        shockwaves.current.push({ pos: hit.clone(), strength: 3.5, age: 0 });
      }
    };

    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerleave", onPointerLeave);
    el.addEventListener("click", onClick);
    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerleave", onPointerLeave);
      el.removeEventListener("click", onClick);
    };
  }, [camera, gl, raycaster, plane, isMobile]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.033);
    const t = state.clock.elapsedTime;
    const count = Math.min(controls.particleCount, MAX);
    const mode = controls.mode;
    const forceStrength = controls.forceStrength;

    const noiseStrength = mode === "calm" ? 0.25 : mode === "storm" ? 1.0 : 0.4;
    const vortexStrength = mode === "vortex" ? 1.4 : 0;
    const damp = mode === "storm" ? 0.92 : 0.94;

    const sw = shockwaves.current;
    for (let i = sw.length - 1; i >= 0; i--) {
      sw[i].age += dt;
      sw[i].strength *= 0.9;
      if (sw[i].age > 0.6) sw.splice(i, 1);
    }

    const px = pointer3D.current.x;
    const py = pointer3D.current.y;
    const pz = pointer3D.current.z;
    const pointerOn = pointerActive.current;

    const posAttr = geometry.attributes.position as THREE.BufferAttribute;
    const speedAttr = geometry.attributes.aSpeed as THREE.BufferAttribute;
    const posArr = posAttr.array as Float32Array;
    const speedArr = speedAttr.array as Float32Array;

    let maxSpeedFrame = 1;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      let x = posArr[i3];
      let y = posArr[i3 + 1];
      let z = posArr[i3 + 2];

      let vx = velocities[i3];
      let vy = velocities[i3 + 1];
      let vz = velocities[i3 + 2];

      // Cheap curl-flow (sin/cos field)
      const nx = Math.sin(y * 0.4 + t * 0.3) + Math.cos(z * 0.3 + t * 0.1);
      const ny = Math.sin(z * 0.4 + t * 0.22) - Math.cos(x * 0.3 + t * 0.13);
      const nz = Math.cos(x * 0.4 + t * 0.28) + Math.sin(y * 0.3 - t * 0.18);
      vx += nx * noiseStrength * dt;
      vy += ny * noiseStrength * dt;
      vz += nz * noiseStrength * dt * 0.4;

      if (vortexStrength > 0) {
        vx += -z * vortexStrength * dt * 0.6;
        vz += x * vortexStrength * dt * 0.6;
      }

      if (pointerOn) {
        const dx = x - px;
        const dy = y - py;
        const dz = z - pz;
        const distSq = dx * dx + dy * dy + dz * dz + 0.1;
        if (distSq < 9) {
          const f = forceStrength / distSq;
          vx += dx * f * dt;
          vy += dy * f * dt;
          vz += dz * f * dt;
        }
      }

      for (let s = 0; s < sw.length; s++) {
        const shock = sw[s];
        const sdx = x - shock.pos.x;
        const sdy = y - shock.pos.y;
        const sdz = z - shock.pos.z;
        const sdist = Math.sqrt(sdx * sdx + sdy * sdy + sdz * sdz) + 0.1;
        if (sdist < 4) {
          const sf = shock.strength * (1 - sdist / 4);
          const inv = 1 / sdist;
          vx += sdx * inv * sf * dt * 6;
          vy += sdy * inv * sf * dt * 6;
          vz += sdz * inv * sf * dt * 6;
        }
      }

      vx *= damp;
      vy *= damp;
      vz *= damp;

      x += vx * dt;
      y += vy * dt;
      z += vz * dt;

      // Wrap
      if (x > 6) x -= 12;
      else if (x < -6) x += 12;
      if (y > 6) y -= 12;
      else if (y < -6) y += 12;
      if (z > 3) z -= 6;
      else if (z < -3) z += 6;

      const speed = Math.sqrt(vx * vx + vy * vy + vz * vz);
      if (speed > maxSpeedFrame) maxSpeedFrame = speed;

      posArr[i3] = x;
      posArr[i3 + 1] = y;
      posArr[i3 + 2] = z;
      velocities[i3] = vx;
      velocities[i3 + 1] = vy;
      velocities[i3 + 2] = vz;
      speedArr[i] = speed;
    }

    // Park unused particles off-camera
    for (let i = count; i < MAX; i++) {
      posArr[i * 3 + 2] = 1e6;
      speedArr[i] = 0;
    }

    posAttr.needsUpdate = true;
    speedAttr.needsUpdate = true;

    // Smooth uMaxSpeed for stable gradient
    maxRef.value = maxRef.value * 0.92 + Math.max(2, maxSpeedFrame) * 0.08;
    material.uniforms.uMaxSpeed.value = maxRef.value;
  });

  return <points geometry={geometry} material={material} />;
};
