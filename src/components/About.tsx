import { Code2, Cpu, Workflow } from "lucide-react";

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
    description: "Developing dynamic and responsive web applications with PHP (CodeIgniter), JavaScript, and modern UI frameworks.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="gradient-text-gold">Me</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A passionate developer and designer dedicated to building exceptional digital products
            that make a difference.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-8 rounded-2xl group hover:glow-gold transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
