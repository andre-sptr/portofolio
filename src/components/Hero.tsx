import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import portraitImage from "/andre.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24 md:pt-0">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 animate-pulse" style={{ animationDuration: '8s' }} />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 max-w-5xl mx-auto text-center animate-fade-in">
        {/* Portrait Photo */}
        <div className="mb-8 flex justify-center animate-fade-in-up">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full opacity-75 group-hover:opacity-100 blur-lg animate-glow-pulse transition-opacity duration-500" />
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-background shadow-2xl">
              <img 
                src={portraitImage} 
                alt="FlamyHeart Portrait" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8 animate-fade-in-up">
          <span className="text-sm text-muted-foreground">Andre Saputra, S.Tr.T.</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="gradient-text-gold">Guru</span> <span className="gradient-text-blue">Informatika</span>
          <br />
          MAN Insan Cendekia Siak
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Where education meets innovation.
          Explore digital works crafted to inspire learning and creativity.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#projects">
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold transition-all duration-300 group"
            >
              Explore Projects
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
          <a href="#tools">
            <Button 
              size="lg" 
              variant="outline"
              className="border-secondary text-secondary hover:bg-secondary/10 hover:glow-blue transition-all duration-300"
            >
              View Free Tools
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
