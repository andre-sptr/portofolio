import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import projectImageFireSense from "/project-iot.png";
import projectImageChatBot from "/project-n8n.png";
import projectImageKedisiplinan from "/project-web.png";
import projectImageHarLah from "/project-harlah.png";
import projectImagePDFTools from "/project-pdf.png";
import projectImageAI from "/project-ai.png";

const projects = [
  {
    title: "FireSense: Sistem Peringatan Dini Kebakaran",
    description: "Sistem IoT cerdas dengan logika Fuzzy untuk deteksi dini potensi kebakaran secara real-time",
    image: projectImageFireSense,
    tech: ["ESP32", "Figma", "Firebase"],
    gradient: "from-primary/20 to-primary/5",
    viewUrl: "",
    codeUrl: ""
  },
  {
    title: "WhatsApp AI ChatBot",
    description: "Workflow chatbot WhatsApp otomatis yang ditenagai oleh Gemini AI untuk menjawab pertanyaan dan membuat konten visual",
    image: projectImageChatBot,
    tech: ["n8n", "GeminiAI", "WhatsApp"],
    gradient: "from-secondary/20 to-secondary/5",
    viewUrl: "https://wa.me/6287790596246",
    codeUrl: ""
  },
  {
    title: "Sistem Informasi Kedisiplinan",
    description: "Sistem informasi untuk pencatatan poin pelanggaran dan data kesehatan siswa secara digital",
    image: projectImageKedisiplinan,
    tech: ["CI4", "Bootsrap 5", "MySQL"],
    gradient: "from-primary/20 to-secondary/5",
    viewUrl: "https://binasiswa.icsiak.sch.id/",
    codeUrl: ""
  },
  {
    title: "HarLah 10 Tahun MAN IC Siak",
    description: "Platform digital yang dirancang untuk mempublikasikan perayaan HarLah ke-10 MAN Insan Cendekia Siak",
    image: projectImageHarLah,
    tech: ["React", "Bootsrap 5", "Node.js"],
    gradient: "from-secondary/20 to-secondary/10",
    viewUrl: "https://harlah.flamyheart.site/",
    codeUrl: "https://github.com/andre-sptr/harlah"
  },
  {
    title: "AI Assistant MAN IC Siak",
    description: "Asisten AI yang dirancang untuk mendukung layanan dan administrasi di MAN Insan Cendekia Siak.",
    image: projectImageAI,
    tech: ["React", "Bootstrap 5", "Node.js"],
    gradient: "from-primary/20 to-secondary/10",
    viewUrl: "https://ai.flamyheart.site/",
    codeUrl: "https://github.com/andre-sptr/ai-agent"
  },
  {
    title: "PDF Tools",
    description: "Serangkaian alat online untuk mengelola PDF—gabung, pisah, dan kompres dengan cepat",
    image: projectImagePDFTools,
    tech: ["React", "Bootsrap 5", "Node.js"],
    gradient: "from-primary/20 to-secondary/10",
    viewUrl: "https://pdf.flamyheart.site/",
    codeUrl: "https://github.com/andre-sptr/pdf-tools"
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 px-4 bg-gradient-to-b from-transparent to-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="gradient-text-blue">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of recent work combining innovation, design, and technology
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl overflow-hidden group hover:glow-blue transition-all duration-500 animate-fade-in-up flex flex-col h-full"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="overflow-hidden h-48 flex-shrink-0">
                <img 
                  src={project.image} 
                  alt={`Tangkapan layar dari proyek ${project.title}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-muted/60 text-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 pt-4 border-t border-border/50">
                  {project.viewUrl && (
                    <a href={project.viewUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" className="hover:text-primary">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </a>
                  )}
                  {project.codeUrl && (
                    <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" size="sm" className="hover:text-secondary">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
