import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Lenis from "lenis";
import { gsap, ScrollTrigger } from '@/lib/motion/gsap';


const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    // Storing the imperative Lenis instance in state is intentional — it lets
    // consumers (e.g. Navigation) read it via useLenis() after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    instance.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(1000, 16);

    return () => {
      gsap.ticker.remove(tickerCb);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}
