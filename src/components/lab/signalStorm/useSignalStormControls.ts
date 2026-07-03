import { useCallback, useState } from "react";

export type SignalStormMode = "calm" | "storm" | "vortex";

export interface SignalStormControls {
  mode: SignalStormMode;
  setMode: (mode: SignalStormMode) => void;
  particleCount: number;
  setParticleCount: (count: number) => void;
  forceStrength: number;
  setForceStrength: (force: number) => void;
  paused: boolean;
  setPaused: (paused: boolean) => void;
  resetKey: number;
  reset: () => void;
}

interface UseSignalStormControlsOptions {
  defaultCount: number;
}

export function useSignalStormControls({
  defaultCount,
}: UseSignalStormControlsOptions): SignalStormControls {
  const [mode, setMode] = useState<SignalStormMode>("storm");
  const [particleCount, setParticleCount] = useState(defaultCount);
  const [forceStrength, setForceStrength] = useState(5);
  const [paused, setPaused] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const reset = useCallback(() => {
    setResetKey((key) => key + 1);
  }, []);

  return {
    mode,
    setMode,
    particleCount,
    setParticleCount,
    forceStrength,
    setForceStrength,
    paused,
    setPaused,
    resetKey,
    reset,
  };
}
