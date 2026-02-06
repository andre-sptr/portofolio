import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Cloud, MessageSquare, Bot } from 'lucide-react';

const tools = [
  {
    name: "Reka AI",
    description: "A real-time AI coding assistant that transforms your ideas into executable code instantly.",
    url: "https://ai.andresptr.site/",
    icon: "/reka.png",
    color: "secondary",
    isImage: true
  },
  {
    name: "AI Finance",
    description: "An intelligent finance tracker powered by AI to simplify your money management.",
    url: "https://fiscal.andresptr.site/",
    icon: "/fiscal.png",
    color: "primary",
    isImage: true
  },
  {
    name: "PDF Tools",
    description: "Comprehensive suite for merging, splitting, and converting PDF documents.",
    url: "https://pdf.andresptr.site",
    icon: FileText,
    color: "secondary",
    isImage: false
  },
  {
    name: "EduForum",
    description: "The exclusive interactive learning platform for MAN IC Siak. Empowers students and teachers with tools.",
    url: "https://eduforum.flamyheart.site/",
    icon: "/manic.png",
    color: "primary",
    isImage: true
  },
];

const FreeTools = () => {
  return (
    <section id="tools" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Free Tools</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of free, powerful tools designed to boost your productivity.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <motion.a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass-card p-6 rounded-2xl border-white/5 hover:border-primary/50 transition-all hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                tool.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'
              }`}>
                {tool.isImage ? (
                  <img src={tool.icon as string} alt={tool.name} className="w-10 h-10 object-contain" />
                ) : (
                  <tool.icon className="w-8 h-8" />
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {tool.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {tool.description}
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreeTools;
