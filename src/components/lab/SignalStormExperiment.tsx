import type { ExperimentItem } from "@/data/experiments";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/use-mobile";
import { ExperimentShell } from "@/components/lab/ExperimentShell";
import { StaticExperimentPreview } from "@/components/lab/StaticExperimentPreview";
import { SignalStormCanvas } from "@/components/lab/signalStorm/SignalStormCanvas";
import {
  useSignalStormControls,
  type SignalStormMode,
} from "@/components/lab/signalStorm/useSignalStormControls";

interface SignalStormExperimentProps {
  experiment: ExperimentItem;
}

const MODES: { id: SignalStormMode; label: string }[] = [
  { id: "calm", label: "Calm" },
  { id: "storm", label: "Storm" },
  { id: "vortex", label: "Vortex" },
];

export function SignalStormExperiment({ experiment }: SignalStormExperimentProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const defaultCount = isMobile ? 8000 : 20000;
  const maxCount = isMobile ? 15000 : 30000;
  const controls = useSignalStormControls({ defaultCount });

  if (prefersReducedMotion) {
    return (
      <ExperimentShell
        experiment={experiment}
        paused
        onTogglePaused={() => undefined}
        onReset={() => undefined}
      >
        <div className="p-5">
          <StaticExperimentPreview />
        </div>
      </ExperimentShell>
    );
  }

  return (
    <ExperimentShell
      experiment={experiment}
      paused={controls.paused}
      onTogglePaused={() => controls.setPaused(!controls.paused)}
      onReset={controls.reset}
    >
      <SignalStormCanvas controls={controls} isMobile={isMobile} />

      <div className="grid gap-4 border-t border-white/10 bg-white/[0.02] p-4 md:grid-cols-[auto_1fr_1fr] md:items-center md:gap-6">
        <div className="flex gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => controls.setMode(m.id)}
              className={`min-h-9 rounded-full px-4 text-xs font-medium transition-colors ${
                controls.mode === m.id
                  ? "bg-[var(--electric)]/15 text-[var(--electric)]"
                  : "text-muted-foreground hover:text-[var(--warm-white)]"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          <span>
            Particles:{" "}
            <span className="text-[var(--warm-white)]">
              {controls.particleCount.toLocaleString()}
            </span>
          </span>
          <input
            type="range"
            min={4000}
            max={maxCount}
            step={1000}
            value={Math.min(controls.particleCount, maxCount)}
            onChange={(e) => controls.setParticleCount(Number(e.target.value))}
            className="accent-[var(--electric)]"
          />
        </label>

        <label className="flex flex-col gap-1 text-xs text-muted-foreground">
          <span>
            Force:{" "}
            <span className="text-[var(--warm-white)]">{controls.forceStrength.toFixed(1)}</span>
          </span>
          <input
            type="range"
            min={0}
            max={15}
            step={0.5}
            value={controls.forceStrength}
            onChange={(e) => controls.setForceStrength(Number(e.target.value))}
            className="accent-[var(--electric)]"
          />
        </label>
      </div>

      <p className="border-t border-white/10 px-5 py-3 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {isMobile
          ? "Drag finger to disturb the field · Switch modes above"
          : "Move cursor to disturb · Click for shockwave"}
      </p>
    </ExperimentShell>
  );
}
