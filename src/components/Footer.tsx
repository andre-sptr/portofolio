import { ArrowUp } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/icons/BrandIcons";
import { motion } from "framer-motion";
import { useLenis } from "@/providers/LenisProvider";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const lenis = useLenis();

  const scrollToTop = () => {
    lenis?.scrollTo(0, { duration: 1.5 });
  };

  return (
    <footer className="relative border-t border-border bg-[#E9E3D5]">
      {/* Jahitan kraft di tepi atas */}
      <div className="absolute top-2 left-4 right-4 h-px border-t border-dashed border-[hsl(27_40%_50%/0.45)]" />

      <div className="container mx-auto px-4 py-10 md:py-14">
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-start">
          {/* Brand */}
          <div>
            <a href="#" className="flex items-center gap-2.5 mb-4 group">
              <div className="label-plate flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-primary">
                <span className="[text-shadow:0_1px_0_hsl(0_0%_100%/0.8)]">A</span>
              </div>
              <span className="font-bold text-lg tracking-tight">
                Andre<span className="text-primary">.dev</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Building smart digital solutions with networking, IoT, AI, and modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2.5">
              {[
                { name: "About", href: "#about" },
                { name: "Projects", href: "#projects" },
                { name: "Experience", href: "#experience" },
                { name: "Free Tools", href: "#tools" },
                { name: "Lab", href: "/lab" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors w-fit"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social & CTA */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Connect
            </h4>
            <div className="flex gap-2 mb-4">
              {[
                { icon: Github, href: "https://github.com/andre-sptr", label: "GitHub" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/andre-sptr", label: "LinkedIn" },
                { icon: Instagram, href: "https://www.instagram.com/andree.sptrr/", label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:text-primary"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground/80 leading-relaxed max-w-[14rem]">
              Open to freelance & collaboration — Riau, Indonesia.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 sm:pr-24">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <span>© {currentYear} Andre Saputra. All rights reserved.</span>
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
            whileHover={{ y: -2 }}
          >
            <span>Back to top</span>
            <div className="btn-tactile flex h-7 w-7 items-center justify-center rounded-full group-hover:text-primary">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
