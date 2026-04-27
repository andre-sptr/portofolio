import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '@/components/ui/theme-provider';

const Particles = ({ count = 120 }: { count?: number }) => {
  const points = useRef<THREE.Points>(null);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.04;
      points.current.rotation.x = state.clock.getElapsedTime() * 0.015;
    }
  });

  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.03 : 0.025}
        color={isDark ? "#818cf8" : "#6366f1"}
        sizeAttenuation
        transparent
        opacity={isDark ? 0.5 : 0.3}
      />
    </points>
  );
};

const AnimatedSphere = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const { theme } = useTheme();

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const primaryColor = isDark ? "#818cf8" : "#6366f1";
  const secondaryColor = isDark ? "#22d3ee" : "#0891b2";

  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.15;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
      <Sphere ref={sphereRef} args={[1, 100, 200]} scale={2.2}>
        <MeshDistortMaterial
          color={primaryColor}
          attach="material"
          distort={0.35}
          speed={1.2}
          roughness={isDark ? 0.2 : 0.35}
          metalness={isDark ? 0.8 : 0.6}
          opacity={isDark ? 1 : 0.7}
          transparent
        />
      </Sphere>
    </Float>
  );
};

const ThreeScene = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full overflow-hidden">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#0891b2" />
        <AnimatedSphere />
        <Particles count={150} />
      </Canvas>
    </div>
  );
};

export default ThreeScene;
