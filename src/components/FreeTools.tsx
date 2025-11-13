import { ExternalLink, FileText, Sparkles, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

const tools = [
  {
    name: "ChatBot",
    description: "",
    url: "https://wa.me/6287790596246",
    icon: "/manic.png",
    color: "secondary",
  },
  {
    name: "AI Agent",
    description: "",
    url: "https://ai.flamyheart.site",
    icon: "/maskot.png",
    color: "primary",
  },
  {
    name: "FDF Tools",
    description: "",
    url: "https://pdf.flamyheart.site",
    icon: FileText,
    color: "secondary",
  },
  {
    name: "File Hosting",
    description: "",
    url: "https://file.flamyheart.site",
    icon: Cloud,
    color: "primary",
  },
];

const colorClasses = {
  primary: {
    glow: "hover:glow-primary",
    text: "text-primary",
    border: "border-primary",
    hoverBg: "hover:bg-primary/10",
  },
  secondary: {
    glow: "hover:glow-secondary",
    text: "text-secondary",
    border: "border-secondary",
    hoverBg: "hover:bg-secondary/10",
  }
};

const FreeTools = () => {
  return (
    <section id="tools" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Free for Everyone</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Free <span className="gradient-text-gold">Tools</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful utilities and tools available for free. Built with care for academics.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool, index) => {
            const colors = colorClasses[tool.color];

            let iconContent;
            // Cek apakah 'tool.icon' adalah sebuah string (path gambar)
            if (typeof tool.icon === 'string') {
              iconContent = <img src={tool.icon} alt={tool.name} className="w-12 h-12 object-contain" />;
            } else {
              // Jika bukan, perlakukan sebagai komponen React
              const IconComponent = tool.icon;
              iconContent = <IconComponent className={`w-12 h-12 ${colors.text}`} />;
            }

            return (
              <div 
                key={index}
                className={`glass-card p-8 rounded-2xl group hover:glow-${tool.color} transition-all duration-500 animate-fade-in-up cursor-pointer`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => window.open(tool.url, '_blank')}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                    {iconContent}
                  </div>
                  <ExternalLink className={`w-5 h-5 text-${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
                
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {tool.description}
                </p>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className={`border-${tool.color} text-${tool.color} hover:bg-${tool.color}/10`}
                >
                  Launch Tool
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FreeTools;
