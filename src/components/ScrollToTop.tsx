import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "@/providers/LenisProvider";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    // If URL carries a hash, let the hash-scroll handler (Navigation) own it.
    if (hash) return;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, lenis]);

  return null;
};

export default ScrollToTop;
