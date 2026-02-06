import { useState } from "react";
import { ExternalLink, Github, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import projectImageFireSense from "/project-iot.png";
import projectImageChatBot from "/project-n8n.png";
import projectImageKedisiplinan from "/project-web.png";
import projectImageHarLah from "/project-harlah.png";
import projectImagePDFTools from "/project-pdf.png";
import projectImageAI from "/project-ai.png";
import projectZI from "/project-zi.png";
import projectAetherNet from "/project-aethernet.png";
import projectFile from "/project-file.png";
import projectEduForum from "/project-eduforum.png";

const projects = [
  {
    title: "FireSense: Sistem Peringatan Dini Kebakaran",
    description: "Sistem IoT cerdas dengan logika Fuzzy untuk deteksi dini potensi kebakaran secara real-time",
    image: projectImageFireSense,
    tech: ["ESP32", "Figma", "Firebase"],
    category: "IoT",
    viewUrl: "",
    codeUrl: ""
  },
  {
    title: "WhatsApp AI ChatBot",
    description: "Workflow chatbot WhatsApp otomatis yang ditenagai oleh Gemini AI untuk menjawab pertanyaan dan membuat konten visual",
    image: projectImageChatBot,
    tech: ["n8n", "GeminiAI", "WhatsApp"],
    category: "AI & Tools",
    viewUrl: "https://wa.me/6287790596246",
    codeUrl: ""
  },
  {
    title: "Sistem Informasi Kedisiplinan",
    description: "Sistem informasi untuk pencatatan poin pelanggaran dan data kesehatan siswa secara digital",
    image: projectImageKedisiplinan,
    tech: ["CI4", "Bootstrap 5", "MySQL"],
    category: "Web Development",
    viewUrl: "https://binasiswa.icsiak.sch.id/",
    codeUrl: ""
  },
  {
    title: "HarLah 10 Tahun MAN IC Siak",
    description: "Platform digital yang dirancang untuk mempublikasikan perayaan HarLah ke-10 MAN Insan Cendekia Siak",
    image: projectImageHarLah,
    tech: ["React", "Bootstrap 5", "Node.js"],
    category: "Web Development",
    viewUrl: "https://harlah.flamyheart.site/",
    codeUrl: "https://github.com/andre-sptr/harlah"
  },
  {
    title: "AI Assistant MAN IC Siak",
    description: "Asisten AI yang dirancang untuk mendukung layanan dan administrasi di MAN Insan Cendekia Siak",
    image: projectImageAI,
    tech: ["React", "Bootstrap 5", "Node.js"],
    category: "AI & Tools",
    viewUrl: "https://ai.flamyheart.site/",
    codeUrl: "https://github.com/andre-sptr/ai-agent"
  },
  {
    title: "PDF Tools",
    description: "Serangkaian alat online untuk mengelola PDF—gabung, pisah, dan kompres dengan cepat",
    image: projectImagePDFTools,
    tech: ["React", "Bootstrap 5", "Node.js"],
    category: "AI & Tools",
    viewUrl: "https://pdf.flamyheart.site/",
    codeUrl: "https://github.com/andre-sptr/pdf-tools"
  },
  {
    title: "Zona Integritas",
    description: "Portal layanan digital terintegrasi untuk seluruh civitas akademika MAN Insan Cendekia Siak",
    image: projectZI,
    tech: ["React", "Bootstrap 5", "Node.js"],
    category: "Web Development",
    viewUrl: "https://zi.flamyheart.site/",
    codeUrl: "https://github.com/andre-sptr/zi"
  },
  {
    title: "AetherNet",
    description: "Visualisasi real-time koneksi antar node dalam jaringan AetherNet",
    image: projectAetherNet,
    tech: ["React", "Bootstrap 5", "Node.js"],
    category: "Web Development",
    viewUrl: "https://aethernet.flamyheart.site/",
    codeUrl: "https://github.com/andre-sptr/aethernet"
  },
  {
    title: "CloudShare - File Hosting",
    description: "Upload, share, and store your files with ease. Modern secure cloud storage platform for images, videos, and documents",
    image: projectFile,
    tech: ["React", "Bootstrap 5", "Node.js"],
    category: "Web Development",
    viewUrl: "https://file.flamyheart.site/",
    codeUrl: "https://github.com/andre-sptr/file"
  },
  {
    title: "EduForum - MAN IC Siak",
    description: "Platform sosial edukatif untuk siswa, guru, dan alumni MAN IC Siak",
    image: projectEduForum,
    tech: ["React", "Bootstrap 5", "Node.js"],
    category: "Web Development",
    viewUrl: "https://eduforum.flamyheart.site/",
    codeUrl: "https://github.com/andre-sptr/eduforum"
  },
];

const categories = ["All", "Web Development", "IoT", "AI & Tools"];

const Projects = () => {
  const [filter, setFilter] = useState("All");

  const filteredProjects = projects.filter(
    (project) => filter === "All" || project.category === filter
  );

  return (
    <section id="projects" className="py-24 px-4 bg-black/20">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            A showcase of my recent work, ranging from web applications to IoT solutions.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className={`rounded-full transition-all duration-300 ${
                  filter === category 
                    ? "bg-primary text-white glow-hover" 
                    : "border-white/10 hover:bg-white/5 hover:text-white"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.title}
                className="group relative rounded-2xl overflow-hidden glass-card border-white/5 hover:border-primary/50 transition-colors"
              >
                {/* Image Overlay */}
                <div className="relative aspect-video overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Floating Action Buttons */}
                  <div className="absolute bottom-4 right-4 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                    {project.codeUrl && (
                      <a href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="icon" variant="secondary" className="rounded-full w-10 h-10 hover:scale-110 transition-transform">
                          <Github className="w-5 h-5" />
                        </Button>
                      </a>
                    )}
                    {project.viewUrl && (
                      <a href={project.viewUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="icon" className="rounded-full w-10 h-10 bg-primary hover:bg-primary/90 hover:scale-110 transition-transform">
                          <ExternalLink className="w-5 h-5" />
                        </Button>
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech} 
                        className="text-xs px-2 py-1 rounded-md bg-white/5 text-muted-foreground border border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
