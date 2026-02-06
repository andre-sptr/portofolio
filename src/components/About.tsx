import { Code2, Cpu, Workflow, Database, Globe, Server, Briefcase, School, Trophy, Building2, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Cpu,
    title: "Internet of Things (IoT)",
    description: "Building smart systems using Arduino, ESP32, and Raspberry Pi with C, Python, and MQTT integration.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Automating digital processes using n8n, Zapier, and custom API integrations for seamless productivity.",
  },
  {
    icon: Code2,
    title: "Web Development",
    description: "Developing dynamic and responsive web applications with CodeIgniter, JavaScript, and modern UI frameworks.",
  },
];

const skills = [
  { name: "Frontend Development", level: 90, icon: Globe },
  { name: "Backend Systems", level: 85, icon: Server },
  { name: "IoT & Embedded", level: 80, icon: Cpu },
  { name: "Database Management", level: 75, icon: Database },
];

const experiences = [
  {
    period: "Jan 2026 - Present",
    role: "Admin Operations",
    company: "PT Telkom Infrastruktur Indonesia",
    sub: "Placement: PT Telkom Infrastruktur Indonesia",
    icon: Building2,
    description: "Bertanggung jawab penuh atas administrasi tiket gangguan dan pelaporan data dalam proyek infrastruktur telekomunikasi.",
    details: [
      "Mengelola laporan tiket gangguan harian menggunakan Advanced Excel & Internal Tools.",
      "Memastikan validitas data administrasi proyek untuk stakeholder.",
      "Berkontribusi dalam efisiensi alur kerja administrasi tim teknis lapangan."
    ]
  },
  {
    period: "Jan 2025 - Dec 2025",
    role: "Guru Informatika & Pembina Robotik",
    company: "MAN IC Siak",
    sub: "Educational Sector",
    icon: School,
    description: "Mengajar mata pelajaran Informatika dan membina ekstrakurikuler robotik untuk mencetak siswa berprestasi.",
    details: [
      "Mengampu mapel Informatika (Algoritma, Pemrograman, Dampak Sosial TI).",
      "Membimbing tim robotik siswa meraih juara dalam kompetisi tingkat regional.",
      "Mengembangkan modul pembelajaran berbasis proyek (IoT & Coding)."
    ]
  }
];

const About = () => {
  return (
    <section id="about" className="py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate developer and designer dedicated to building exceptional digital products
            that make a difference.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="glass-card p-8 rounded-2xl group hover:border-primary/50 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full -mr-4 -mt-4 transition-all group-hover:scale-110" />
              
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="grid md:grid-cols-2 gap-12 items-stretch">
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="relative pl-0 md:pl-8"
          >
             <h3 className="text-3xl font-bold mb-6">Professional <span className="text-gradient">Journey</span></h3>
             <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-8 border-l-2 border-primary/20 pb-8 last:pb-0 last:border-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                    
                    <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-primary font-medium">
                      <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-1">
                        <Briefcase className="w-3 h-3" />
                        {exp.period}
                      </span>
                    </div>

                    <h4 className="text-xl font-bold text-foreground">{exp.role}</h4>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground mb-4 mt-1">
                      <div className="flex items-center gap-1.5">
                        <exp.icon className="w-4 h-4 text-secondary" />
                        <span className="font-medium text-secondary">{exp.company}</span>
                      </div>
                    </div>
                    
                    {/* <p className="text-muted-foreground mb-4 text-sm leading-relaxed border-l-2 border-white/5 pl-4 italic">
                      {exp.description}
                    </p> */}

                    <ul className="space-y-3 bg-white/5 p-4 rounded-xl border border-white/5">
                      {exp.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground/90">
                          <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
             </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6 }}
             className="glass-card p-8 rounded-2xl h-full"
          >
            <h3 className="text-3xl font-bold mb-6">Technical <span className="text-gradient">Expertise</span></h3>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              With a strong foundation in computer science and years of hands-on experience, 
              I bring a comprehensive skillset to every project. My approach combines technical 
              precision with creative problem-solving.
            </p>
            
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium flex items-center gap-2">
                      <skill.icon className="w-4 h-4 text-primary" />
                      {skill.name}
                    </span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
