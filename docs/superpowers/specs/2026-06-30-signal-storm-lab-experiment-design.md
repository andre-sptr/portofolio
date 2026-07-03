# Signal Storm — Lab Experiment Design

**Date:** 2026-06-30
**Status:** Approved, implementing
**Scope:** Add a new live WebGL experiment to `/lab`, called "Signal Storm".

## Goal

Add a visually striking, on-brand GPU particle experiment to the Lab page as the **second live experiment** (after Falling Stack). It must reuse the existing `ExperimentShell` pattern and slot into the active-experiment switch in `src/pages/Lab.tsx`.

## Concept

Full-width canvas (height ~34rem) showing 20k particles (mobile cap 15k, slider 4k–30k) drifting through an analytic curl-noise flow field in 3D. Each particle is rendered as an additive blended point whose color is mixed from `electric violet (#818cf8)` → `cyan (#22d3ee)` based on its current speed. The cursor projects a 3D point onto the z=0 plane that acts as a repulsor (inverse-square falloff). Clicking emits a short-lived radial shockwave. Three preset modes — **Calm / Storm / Vortex** — change the noise strength and toggle a tangential vortex force around the y-axis.

## File structure

```
src/components/lab/SignalStormExperiment.tsx        ← Shell + controls UI
src/components/lab/signalStorm/
  SignalStormCanvas.tsx                              ← @react-three/fiber Canvas wrapper
  ParticleField.tsx                                  ← Points, ShaderMaterial, useFrame loop
  signalStorm.glsl.ts                                ← Vertex + fragment shader strings
  useSignalStormControls.ts                          ← Hook for mode / count / force / paused / reset state
```

## Simulation

- BufferGeometry with `position`, `aSpeed`, `aSize` attributes.
- Velocity stored in a separate Float32Array, not uploaded to GPU.
- Per-frame CPU loop, capped to `delta = min(delta, 1/30)` to avoid huge step on tab refocus.
- Forces per particle:
  - **Curl-flow:** cheap 3-axis sin/cos field sampled at `pos * 0.2` plus elapsed time (no Perlin lib — keep deps small).
  - **Mouse repulsor:** inverse-square within radius 3 units, magnitude = `forceStrength`.
  - **Vortex:** when mode = `vortex`, add tangential force around y-axis proportional to `(-z, 0, x)`.
  - **Shockwave:** linear-decay radial impulse from click point, lives 600ms.
- Velocity damp factor: 0.92 (storm) / 0.94 (calm, vortex).
- Position wrap on a `[-6,6] × [-6,6] × [-3,3]` box.
- Particles beyond `controls.particleCount` are parked at `z = 1e6` (off-camera).
- Upload `position` and `aSpeed` attribute buffers each frame (`needsUpdate = true`).

## Shader

- **Vertex:** size attenuation by `300 / -mvPos.z`, passes `vSpeed` to fragment.
- **Fragment:** disc mask via `gl_PointCoord` (`discard` outside r=0.5), additive blend, color = `mix(uColorLow, uColorHigh, smoothstep(0, 1, vSpeed/uMaxSpeed))`. `uMaxSpeed` re-computed each frame as `max(2, frameMaxSpeed)` to keep gradient stable.

## Interaction

- **pointermove**: raycast NDC → plane(z=0) → update pointer3D ref.
- **click**: push shockwave object `{ pos, strength: 3, age: 0 }`. Disabled on mobile (touch acts as repulsor only).
- **Mode toggle**: segmented control. Defaults to `Storm`.
- **Particle slider**: 4k–30k (desktop) or 4k–15k (mobile), step 1000.
- **Force slider**: 0–15, step 0.5, default 5.
- **Pause / Reset**: via `ExperimentShell` header controls — pause flips Canvas `frameloop="never"`; reset re-mounts `ParticleField` via `key={resetKey}` (re-randomizes positions).

## Performance

- `dpr={[1, 1.5]}`, `performance={{ min: 0.5 }}` — same as Hero `ThreeScene`.
- IntersectionObserver pauses `frameloop` when canvas scrolls > 100px out of view.
- Mobile auto-cap to 15k max particles, default 8k.
- Reduced-motion: render `<StaticExperimentPreview />` inside shell (same fallback as Falling Stack).

## Data + page integration

- `src/data/experiments.ts`: insert new entry at index 1 (after Falling Stack, before concepts) with `status: "live"`, `category: "WebGL"`, `accent: "#818cf8"`.
- `src/pages/Lab.tsx`: add `React.lazy` import for `SignalStormExperiment`, extend the existing ternary switch with a `signal-storm` branch.

## Out of scope

- GPGPU / FBO ping-pong simulation (overkill at 20k particles)
- Audio reactivity
- URL search-param sync (`?experiment=signal-storm`) — separate restructure task
- Saving preset state to localStorage
- Post-processing (bloom, depth-of-field)
