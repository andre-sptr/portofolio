import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";
import type { SignalStormControls } from "./useSignalStormControls";

interface SignalStormCanvasProps {
  controls: SignalStormControls;
  isMobile: boolean;
}

export const SignalStormCanvas = ({ controls, isMobile }: SignalStormCanvasProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!wrapRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  const active = visible && !controls.paused;

  return (
    <div
      ref={wrapRef}
      className="relative h-[34rem] w-full overflow-hidden bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.08),transparent_45%),var(--surface-0)]"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "never"}
        performance={{ min: 0.5 }}
      >
        <ParticleField key={controls.resetKey} controls={controls} isMobile={isMobile} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,transparent,rgba(10,10,15,0.6))]" />
    </div>
  );
};
