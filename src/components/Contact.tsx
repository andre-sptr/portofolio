import { Mail, Github, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: Github, url: "https://github.com/andre-sptr/", label: "GitHub" },
  { icon: Linkedin, url: "https://www.linkedin.com/in/andre-saputra-434561381", label: "LinkedIn" },
  { icon: Instagram, url: "https://www.instagram.com/andree.sptrr", label: "Instagram" },
];

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Let's <span className="gradient-text-gold">Connect</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
          
          <div className="glass-card p-12 rounded-3xl mb-8 hover:glow-gold transition-all duration-500">
            <Mail className="w-12 h-12 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Get in Touch</h3>
            <a 
              href="mailto:andresaputra07012019@gmail.com" 
              className="text-xl text-primary hover:text-primary/80 transition-colors"
            >
            </a>
          </div>
          
          <div className="flex justify-center gap-4">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="outline"
                size="lg"
                className="hover:glow-blue transition-all duration-300"
                onClick={() => window.open(social.url, '_blank')}
              >
                <social.icon className="w-5 h-5" />
                <span className="ml-2 hidden sm:inline">{social.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
