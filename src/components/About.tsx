import { Cpu, Workflow, Globe, Server, Briefcase, School, Building2, CheckCircle2, GraduationCap, Bot, Network, BarChart } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: Network,
    title: "Networking & Infrastructure",
    description: "Experienced in network design, routing, configuration, troubleshooting, and fiber optic support, backed by CCNA and BNSP certification.",
    accent: "from-primary/15 to-secondary/10",
    span: "md:col-span-2",
  },
  {
    icon: Cpu,
    title: "IoT & Embedded Systems",
    description: "Developing IoT solutions using Arduino, ESP32, Raspberry Pi, and MQTT for real-time monitoring and early warning systems.",
    accent: "from-primary/10 to-secondary/15",
    span: "",
  },
  {
    icon: Workflow,
    title: "Automation & AI Workflow",
    description: "Building automation pipelines with n8n and bot integrations to accelerate reporting, recaps, and communication workflows.",
    accent: "from-secondary/15 to-primary/10",
    span: "",
  },
];

const skills = [
  { name: "Network Infrastructure", level: 92, icon: Network, color: "from-primary to-secondary" },
  { name: "IoT & Embedded", level: 88, icon: Cpu, color: "from-secondary to-primary" },
  { name: "Automation (n8n & Bot)", level: 86, icon: Bot, color: "from-primary to-primary/70" },
  { name: "Web Development", level: 84, icon: Globe, color: "from-secondary/90 to-primary" },
  { name: "Backend Systems", level: 80, icon: Server, color: "from-primary/80 to-secondary" },
  { name: "Data Analysis", level: 78, icon: BarChart, color: "from-secondary to-secondary/60" },
];

const experiences = [
  {
    period: "Jan 2026 - Present",
    role: "Admin Operation",
    company: "PT Telkom Infrastruktur Indonesia (Outsource)",
    sub: "Pekanbaru",
    icon: Building2,
    description: "Menangani operasional tiket gangguan jaringan dan memastikan proses penyelesaian berjalan sesuai SLA.",
    details: [
      "Mengelola end-to-end penyelesaian tiket Note-B untuk meminimalkan downtime jaringan.",
      "Memastikan teknisi memenuhi target Service Level Agreement (SLA).",
      "Mendukung instalasi dan maintenance kabel Fiber Optic pada lingkungan data center.",
    ],
  },
  {
    period: "Jan 2025 - Dec 2025",
    role: "Informatics Teacher & Robotics Coach",
    company: "MAN Insan Cendekia Siak",
    sub: "Educational Sector",
    icon: School,
    description: "Mengajar Informatika dan membina coding, multimedia, serta robotik untuk penguatan kompetensi digital siswa.",
    details: [
      "Menyusun materi pembelajaran Informatika yang komprehensif dan terstruktur.",
      "Membina kegiatan ekstrakurikuler IT berfokus pada coding, robotik, dan multimedia.",
      "Melatih tim robotik siswa untuk kompetisi dan event berbasis teknologi.",
    ],
  },
  {
    period: "Mar 2024 - Jul 2024",
    role: "Network Support Intern",
    company: "PT PLN Icon Plus, Batam",
    sub: "Internship",
    icon: Building2,
    description: "Berperan dalam instalasi dan troubleshooting infrastruktur jaringan pada proyek enterprise dan pemerintah.",
    details: [
      "Membantu instalasi, konfigurasi, dan troubleshooting jaringan on-site.",
      "Mendukung deployment dan pemeliharaan solusi jaringan untuk klien enterprise dan pemerintah.",
      "Mengelola rekap data operasional serta dokumentasi aktivitas lapangan.",
    ],
  },
  {
    period: "Oct 2021 - Oct 2025",
    role: "Bachelor of Applied Engineering",
    company: "Politeknik Caltex Riau",
    sub: "Electronics & Telecommunication Engineering",
    icon: GraduationCap,
    description: "Lulusan cum laude dengan fokus pada networking, telekomunikasi, IoT, dan embedded systems.",
    details: [
      "GPA 3.67/4.00 (Cum Laude).",
      "Relevant coursework: Networking, Telecommunications, Machine Learning, Electronics, dan Embedded Systems.",
    ],
  },
];

const AnimatedCounter = ({ value, suffix = "%" }: { value: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.span
      ref={ref}
      className="text-muted-foreground tabular-nums text-sm font-medium"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
    >
      {isInView ? (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {value}{suffix}
        </motion.span>
      ) : (
        `0${suffix}`
      )}
    </motion.span>
  );
};

const About = () => {
  return (
    <section id="about" className="py-16 md:py-24 px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Electronics and telecommunication engineering graduate with 1.5+
            years of professional experience in networking operations, IoT
            implementation, automation, and web solutions.
          </p>
        </motion.div>

        {/* Bento Grid Feature Cards */}
        <div className="grid md:grid-cols-4 gap-4 md:gap-5 mb-14 md:mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className={`glass-card p-6 sm:p-8 rounded-2xl group hover:border-primary/40 transition-all duration-300 relative overflow-hidden ${feature.span}`}
            >
              {/* Background Accent */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.accent} rounded-bl-full -mr-6 -mt-6 transition-all group-hover:scale-125 duration-500`} />

              <div className="relative z-10">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary/15 to-secondary/10 flex items-center justify-center mb-5 group-hover:shadow-[var(--glow-primary)] transition-all duration-300">
                  <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills + Journey */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-stretch">
          {/* Professional Journey */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8">
              Professional <span className="text-gradient">Journey</span>
            </h3>
            <div className="space-y-0">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="relative pl-7 sm:pl-8 border-l-2 border-border pb-8 last:pb-0 last:border-0 group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background transition-shadow group-hover:shadow-[var(--glow-primary)]" />

                  <div className="mb-2 flex flex-wrap items-center gap-2 text-sm text-primary font-medium">
                    <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 flex items-center gap-1.5">
                      <Briefcase className="w-3 h-3" />
                      {exp.period}
                    </span>
                  </div>

                  <h4 className="text-lg sm:text-xl font-bold text-foreground">
                    {exp.role}
                  </h4>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-muted-foreground mb-3 mt-1">
                    <div className="flex items-center gap-1.5">
                      <exp.icon className="w-4 h-4 text-secondary" />
                      <span className="font-medium text-secondary text-sm">
                        {exp.company}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5 bg-muted/40 p-4 rounded-xl border border-border">
                    {exp.details.map((detail, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-xs sm:text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technical Expertise */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-card p-6 sm:p-8 rounded-2xl h-fit sticky top-24"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-5 md:mb-6">
              Technical <span className="text-gradient">Expertise</span>
            </h3>
            <p className="text-muted-foreground mb-6 md:mb-8 text-sm sm:text-base leading-relaxed">
              Certified in Cisco CCNA and BNSP with practical experience across
              network operations, IoT development, and automation workflows. I
              focus on reliable implementation, measurable impact, and continuous
              improvement.
            </p>

            <div className="space-y-5">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.4 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-sm sm:text-base flex items-center gap-2">
                      <skill.icon className="w-4 h-4 text-primary" />
                      {skill.name}
                    </span>
                    <AnimatedCounter value={skill.level} />
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 1,
                        delay: 0.2 + index * 0.1,
                        ease: "easeOut",
                      }}
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
