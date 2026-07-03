import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useLenis } from "@/providers/LenisProvider";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Projects", href: "/#projects" },
  { name: "Experience", href: "/#experience" },
  { name: "Free Tools", href: "/#tools" },
  { name: "Lab", href: "/lab" },
  { name: "Contact", href: "/#contact" },
];

const getInitialActiveSection = () => {
  if (typeof window === "undefined") return "/";
  if (window.location.pathname === "/lab") return "/lab";
  if (window.location.pathname === "/" && window.location.hash) return `/${window.location.hash}`;
  return "/";
};

const MagneticNavLink = ({
  href,
  name,
  isActive,
  prefersReduced,
  onClick,
}: {
  href: string;
  name: string;
  isActive: boolean;
  prefersReduced: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 28 });
  const springY = useSpring(y, { stiffness: 400, damping: 28 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(((e.clientX - rect.left) / rect.width - 0.5) * 8);
    y.set(((e.clientY - rect.top) / rect.height - 0.5) * 8);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: springX, y: springY }}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {isActive && (
        <motion.span
          layoutId="nav-pill"
          className="well-inset absolute inset-0 rounded-full"
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
      <span className="relative z-10">{name}</span>
    </motion.a>
  );
};

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReduced = usePrefersReducedMotion();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(getInitialActiveSection);
  const location = useLocation();
  const navigate = useNavigate();
  const lenis = useLenis();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection via IntersectionObserver
  const observeSections = useCallback(() => {
    const sectionIds = ["about", "projects", "experience", "tools", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(`/#${id}`);
            }
          });
        },
        { threshold: 0.3, rootMargin: "-80px 0px -40% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (window.location.pathname === "/lab") {
      return;
    }
    const cleanup = observeSections();
    return cleanup;
  }, [observeSections]);

  // Reset to Home when at top
  useEffect(() => {
    const handleTop = () => {
      if (window.location.pathname !== "/lab" && window.scrollY < 200) setActiveSection("/");
    };
    window.addEventListener("scroll", handleTop);
    return () => window.removeEventListener("scroll", handleTop);
  }, []);

  const scrollToTarget = useCallback(
    (target: HTMLElement | number) => {
      if (lenis) {
        lenis.scrollTo(target, {
          offset: typeof target === "number" ? 0 : -80,
          duration: 1.1,
        });
      } else {
        const top =
          typeof target === "number"
            ? target
            : target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [lenis]
  );

  const scrollToHashWithRetry = useCallback(
    (id: string) => {
      let attempts = 0;
      const tryIt = () => {
        const el = document.getElementById(id);
        if (el) {
          scrollToTarget(el);
        } else if (attempts++ < 60) {
          requestAnimationFrame(tryIt);
        }
      };
      tryIt();
    },
    [scrollToTarget]
  );

  const handleNavClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault();

      if (href === "/") {
        if (location.pathname !== "/") {
          navigate("/");
        }
        scrollToTarget(0);
        setActiveSection("/");
        window.history.replaceState(null, "", "/");
        return;
      }

      if (href.startsWith("/#")) {
        const id = href.slice(2);
        if (location.pathname !== "/") {
          navigate(href);
          // Wait for Index + lazy chunks to mount, then scroll
          setTimeout(() => scrollToHashWithRetry(id), 80);
        } else {
          scrollToHashWithRetry(id);
          window.history.replaceState(null, "", `#${id}`);
        }
        setActiveSection(href);
        return;
      }

      // Other internal routes (e.g. /lab)
      if (href.startsWith("/")) {
        navigate(href);
        setActiveSection(href);
      }
    },
    [location.pathname, navigate, scrollToHashWithRetry, scrollToTarget]
  );

  return (
    <>
      {/* Scroll Progress Bar — gauge tembaga */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-[linear-gradient(180deg,hsl(27_70%_52%),hsl(27_60%_38%))] shadow-[0_1px_1px_hsl(0_0%_100%/0.6)] origin-left z-[100]"
        style={{ scaleX }}
      />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "panel-metal rounded-none border-x-0 border-t-0 py-2"
          : "bg-transparent py-4"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              onClick={(e) => handleNavClick(e, "/")}
              className="flex items-center gap-2.5 group"
            >
              <div className="label-plate relative flex h-9 w-9 items-center justify-center rounded-[8px] text-lg font-bold text-primary transition-shadow duration-300 group-hover:shadow-[var(--shadow-raised-hover)]">
                <span className="relative z-10 [text-shadow:0_1px_0_hsl(0_0%_100%/0.8)]">A</span>
              </div>
              <span className="font-bold text-lg sm:text-xl tracking-tight">
                Andre<span className="text-primary">.dev</span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <MagneticNavLink
                  key={link.name}
                  href={link.href}
                  name={link.name}
                  isActive={activeSection === link.href}
                  prefersReduced={prefersReduced}
                  onClick={(e) => handleNavClick(e, link.href)}
                />
              ))}
              <div className="w-px h-6 bg-border mx-2" />
              <a href="/#contact" onClick={(e) => handleNavClick(e, "/#contact")}>
                <Button
                  size="sm"
                  className="btn-tactile-primary rounded-full"
                >
                  Let's Talk
                </Button>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                className="text-foreground p-2 hover:bg-accent rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden overflow-hidden"
              >
                <div className="panel-raised mt-3 rounded-2xl p-3 flex flex-col gap-1 max-h-[80vh] overflow-y-auto">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.href;
                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        className={`block py-3 px-4 text-base rounded-xl transition-all duration-200 ${isActive
                          ? "text-primary bg-primary/10 font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent"
                          }`}
                        onClick={(e) => {
                          handleNavClick(e, link.href);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        {link.name}
                      </a>
                    );
                  })}
                  <div className="pt-2 border-t border-border mt-1">
                    <a
                      href="/#contact"
                      onClick={(e) => {
                        handleNavClick(e, "/#contact");
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Button className="btn-tactile-primary w-full rounded-full">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Let's Talk
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
