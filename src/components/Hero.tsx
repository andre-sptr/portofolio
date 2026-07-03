import { useRef } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Cpu,
  Download,
  Mail,
  RadioTower,
  Server,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { Github, Instagram, Linkedin } from "@/components/icons/BrandIcons";
import { Button } from "@/components/ui/button";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/motion/gsap";
import portraitImage from "/andre-saputra.png";
import { projects, type ProjectItem } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useIsMobile } from "@/hooks/use-mobile";

const COMMAND_PROJECT_IDS = ["sitiket", "reka-ai", "iot-system"] as const;

const COMMAND_PROJECTS = COMMAND_PROJECT_IDS.map((id) =>
  projects.find((project) => project.id === id)
).filter((project): project is ProjectItem => Boolean(project));

const SIGNALS = [
  { label: "Network operations", value: "Telecom infra", icon: RadioTower },
  { label: "AI tools", value: "Gemini + web apps", icon: Cpu },
  { label: "IoT systems", value: "ESP32 + MQTT", icon: Activity },
];

const CAPABILITIES = ["React", "TypeScript", "Node.js", "IoT", "AI Integration", "Network Automation"];

const STATUS_ROWS = [
  { label: "Current post", value: "PT Telkom Infrastruktur Indonesia" },
  { label: "Primary focus", value: "Production systems" },
  { label: "Operating mode", value: "Build, automate, monitor" },
];

const SOCIALS = [
  { href: "https://github.com/andre-sptr", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/andre-sptr", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/andree.sptrr/", icon: Instagram, label: "Instagram" },
  { href: "mailto:andresaputra07012019@gmail.com", icon: Mail, label: "Email" },
];

const PANEL_SCREWS = [
  "left-2 top-2",
  "right-2 top-2",
  "left-2 bottom-2",
  "right-2 bottom-2",
];

const Hero = () => {
  const prefersReduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const signalsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const commandPanelRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const introEls = [
      copyRef.current,
      signalsRef.current,
      profileRef.current,
      commandPanelRef.current,
      scrollIndicatorRef.current,
    ].filter((el): el is HTMLElement => Boolean(el));

    if (!prefersReduced) {
      gsap.set(introEls, { y: 28, opacity: 0 });

      gsap
        .timeline({ delay: 0.16 })
        .to(copyRef.current, { y: 0, opacity: 1, duration: 0.72, ease: "power3.out" })
        .to(signalsRef.current, { y: 0, opacity: 1, duration: 0.52, ease: "power2.out" }, "-=0.32")
        .to(profileRef.current, { y: 0, opacity: 1, duration: 0.58, ease: "power2.out" }, "-=0.34")
        .to(commandPanelRef.current, { y: 0, opacity: 1, duration: 0.68, ease: "power3.out" }, "-=0.42")
        .to(scrollIndicatorRef.current, { y: 0, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.2");
    } else {
      gsap.set(introEls, { y: 0, opacity: 1 });
    }

    if (!prefersReduced && !isMobile) {
      gsap.to(commandPanelRef.current, {
        y: -24,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }
  }, { scope: sectionRef, dependencies: [isMobile, prefersReduced] });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden pt-24 lg:pt-28"
      id="hero"
      aria-label="Introduction"
    >
      {/* Latar meja kerja: paper + graph paper blueprint */}
      <div className="mobile-bg-gradient absolute inset-0 -z-10" />
      <div className="blueprint-grid pointer-events-none absolute inset-0 z-0" />

      <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] items-center px-4 pb-16">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,0.96fr)_minmax(420px,0.74fr)] xl:gap-14">
          <div ref={copyRef} className="max-w-3xl">
            <div className="label-plate mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[hsl(var(--led-green))]">
              <span className="led led-green led-blink h-2 w-2" />
              Signal online
            </div>

            <p className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              <Terminal className="h-4 w-4 text-primary" />
              Network operations / AI tools / IoT systems
            </p>

            <h1 className="max-w-4xl text-[clamp(3.4rem,11vw,8.5rem)] font-bold leading-[0.86] tracking-normal text-foreground [text-shadow:0_2px_0_hsl(0_0%_100%/0.6)]">
              Andre
              <span className="block text-primary">Saputra</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Production web apps, AI tools, and IoT systems for telecom infrastructure.
              Currently building operational systems at{" "}
              <span className="font-semibold text-foreground">
                PT Telkom Infrastruktur Indonesia
              </span>
              .
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="btn-tactile-primary h-12 rounded-full px-7 text-sm font-semibold"
              >
                <a href="#projects">
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="btn-tactile h-12 rounded-full px-7 text-sm font-semibold text-foreground"
              >
                <a href="/cv-andre-saputra.pdf">
                  <Download className="mr-2 h-4 w-4" />
                  Download CV
                </a>
              </Button>
            </div>

            <div ref={signalsRef} className="mt-8 grid gap-3 sm:grid-cols-3">
              {SIGNALS.map((signal) => (
                <div
                  key={signal.label}
                  className="panel-raised rounded-[8px] p-3"
                >
                  <div className="well-inset mb-3 flex h-8 w-8 items-center justify-center rounded-[8px] text-primary">
                    <signal.icon className="h-4 w-4" />
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {signal.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground">{signal.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {CAPABILITIES.map((capability) => (
                <span
                  key={capability}
                  className="label-plate rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 lg:justify-self-end">
            {/* Kartu ID laminasi */}
            <motion.div
              ref={profileRef}
              className="panel-raised rounded-[10px] p-3 sm:p-4 lg:p-3"
              whileHover={prefersReduced ? undefined : { y: -3 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
            >
              <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
                <div className="well-inset relative h-20 w-20 overflow-hidden rounded-[8px] p-0.5 xl:h-24 xl:w-24">
                  <img
                    src={portraitImage}
                    alt="Andre Saputra"
                    className="h-full w-full rounded-[6px] object-cover"
                    decoding="async"
                  />
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    <ShieldCheck className="h-4 w-4" />
                    Verified builder profile
                  </div>
                  <div className="space-y-1.5">
                    {STATUS_ROWS.map((row) => (
                      <div key={row.label} className="grid grid-cols-[96px_1fr] gap-2 text-xs xl:grid-cols-[112px_1fr] xl:text-sm">
                        <span className="text-muted-foreground">{row.label}</span>
                        <span className="font-medium text-foreground">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="led led-green h-2 w-2" />
                  Available for collaboration
                </div>

                <div className="flex items-center gap-1">
                  {SOCIALS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target={social.href.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    >
                      <social.icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Panel instrumen — featured systems */}
            <div ref={commandPanelRef} className="panel-metal relative rounded-[10px] p-3 sm:p-4">
              {PANEL_SCREWS.map((pos) => (
                <span key={pos} className={`screw absolute ${pos} hidden sm:block`} aria-hidden="true" />
              ))}

              <div className="relative z-10 mb-3 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary [text-shadow:0_1px_0_hsl(0_0%_100%/0.7)]">
                    <Server className="h-4 w-4" />
                    Featured systems
                  </p>
                  <h2 className="text-xl font-semibold tracking-normal text-foreground xl:text-2xl">
                    Operational builds in the field
                  </h2>
                </div>
                <div className="label-plate hidden items-center gap-2 rounded-[8px] px-3 py-1.5 text-xs sm:flex">
                  <span className="led led-green led-blink h-2 w-2" />
                  <span className="text-right">
                    <span className="block font-semibold text-foreground">Live stack</span>
                    <span className="text-muted-foreground">monitored</span>
                  </span>
                </div>
              </div>

              <div className="relative z-10 space-y-3">
                {COMMAND_PROJECTS.map((project, index) => {
                  const href = project.viewUrl || project.codeUrl || "#projects";

                  return (
                    <a
                      key={project.id}
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="panel-raised panel-hoverable group grid gap-3 rounded-[8px] border-l-[3px] p-2.5 sm:grid-cols-[116px_1fr_auto] xl:grid-cols-[132px_1fr_auto]"
                      style={{ borderLeftColor: project.accent }}
                    >
                      <div className="well-inset aspect-[16/10] overflow-hidden rounded-[6px]">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                          loading={index === 0 ? "eager" : "lazy"}
                          decoding="async"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="font-mono-tight text-[11px] text-muted-foreground">
                            SYS-{String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="label-plate rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            {project.category}
                          </span>
                        </div>
                        <h3 className="text-base font-semibold tracking-normal text-foreground xl:text-lg">
                          {project.title}
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground xl:text-sm xl:leading-6">
                          {project.subtitle}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {project.tech.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="rounded-full bg-[var(--surface-2)] px-2 py-0.5 text-[11px] font-medium text-muted-foreground xl:px-2.5 xl:py-1"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center text-primary sm:justify-end">
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
