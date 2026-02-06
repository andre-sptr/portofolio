import { motion, Variants } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import portraitImage from "/andre.png";
import ThreeScene from "./ThreeScene";

const Hero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-24 md:pt-0">
      {/* 3D Background */}
      <ThreeScene />
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] -z-10" />

      <div className="container relative z-10 mx-auto mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content */}
          <motion.div 
            className="text-center lg:text-left order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="inline-block mb-4">
              <span className="px-4 py-2 rounded-full glass border border-primary/20 text-sm font-medium text-primary bg-primary/10 backdrop-blur-md">
                Available for Freelance & Collaboration
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              Crafting Digital <br />
              <span className="text-gradient">Experiences</span> <br />
              That Matter.
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              I'm <span className="font-semibold text-foreground">Andre Saputra</span>, a passionate Informatics Teacher and Full Stack Developer. I transform complex problems into beautiful, functional, and user-centric digital solutions.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center lg:justify-start mb-12">
              <Button size="lg" className="rounded-full h-12 px-8 text-base bg-primary hover:bg-primary/90 glow-hover group">
                View Projects
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-12 px-8 text-base border-primary/20 hover:bg-primary/5 hover:text-primary transition-colors">
                Contact Me
              </Button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-6 justify-center lg:justify-start items-center text-muted-foreground">
              <a href="https://github.com/andre-sptr" className="hover:text-primary transition-colors transform hover:scale-110 duration-200">
                <Github className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/in/andre-sptr" className="hover:text-primary transition-colors transform hover:scale-110 duration-200">
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/andree.sptrr/" className="hover:text-primary transition-colors transform hover:scale-110 duration-200">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="mailto:andresaputra07012019@gmail.com" className="hover:text-primary transition-colors transform hover:scale-110 duration-200">
                <Mail className="w-6 h-6" />
              </a>
              <div className="w-px h-8 bg-border mx-2"></div>
              <a href="/CV_Andre-Saputra.pdf" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors group">
                <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                Download CV
              </a>
            </motion.div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div 
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary rounded-[2rem] rotate-6 opacity-20 blur-2xl animate-pulse" />
              <div className="absolute inset-0 border-2 border-primary/30 rounded-[2rem] rotate-3" />
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl glass-card">
                <img 
                  src={portraitImage} 
                  alt="Andre Saputra" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Floating Cards/Badges */}
              <motion.div 
                className="absolute -bottom-6 -left-6 glass p-4 rounded-xl border border-white/10 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <p className="text-sm font-bold text-foreground">Online & Ready</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
