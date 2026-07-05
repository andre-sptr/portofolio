export type SkillCategory = "Web" | "AI" | "Networking" | "IoT" | "Automation" | "Tools";

export interface SkillItem {
  id: string;
  label: string;
  shortLabel: string;
  category: SkillCategory;
  mass: number;
  accent: string;
}

export const skills: SkillItem[] = [
  { id: "react", label: "React", shortLabel: "React", category: "Web", mass: 1.1, accent: "#61dafb" },
  { id: "typescript", label: "TypeScript", shortLabel: "TS", category: "Web", mass: 1.0, accent: "#5AC8E0" },
  { id: "node", label: "Node.js", shortLabel: "Node", category: "Web", mass: 1.0, accent: "#3DDC84" },
  { id: "next", label: "Next.js", shortLabel: "Next", category: "Web", mass: 1.0, accent: "#f8fafc" },
  { id: "tailwind", label: "Tailwind CSS", shortLabel: "TW", category: "Web", mass: 0.9, accent: "#5AC8E0" },
  { id: "gsap", label: "GSAP", shortLabel: "GSAP", category: "Web", mass: 1.3, accent: "#3DDC84" },
  { id: "three", label: "Three.js", shortLabel: "3D", category: "Web", mass: 1.2, accent: "#F4B740" },
  { id: "gemini", label: "Gemini AI", shortLabel: "AI", category: "AI", mass: 1.2, accent: "#F4B740" },
  { id: "python", label: "Python", shortLabel: "Py", category: "AI", mass: 1.0, accent: "#facc15" },
  { id: "n8n", label: "n8n", shortLabel: "n8n", category: "Automation", mass: 0.9, accent: "#FF5C5C" },
  { id: "postgres", label: "PostgreSQL", shortLabel: "PG", category: "Tools", mass: 1.1, accent: "#5AC8E0" },
  { id: "docker", label: "Docker", shortLabel: "Docker", category: "Tools", mass: 1.0, accent: "#5AC8E0" },
  { id: "arduino", label: "Arduino", shortLabel: "ARD", category: "IoT", mass: 0.9, accent: "#2dd4bf" },
  { id: "esp32", label: "ESP32", shortLabel: "ESP", category: "IoT", mass: 1.0, accent: "#3DDC84" },
  { id: "mqtt", label: "MQTT", shortLabel: "MQTT", category: "IoT", mass: 0.9, accent: "#F4B740" },
  { id: "cisco", label: "Cisco", shortLabel: "CCNA", category: "Networking", mass: 1.2, accent: "#5AC8E0" },
  { id: "fiber", label: "Fiber Optic", shortLabel: "FO", category: "Networking", mass: 1.1, accent: "#F4B740" },
];
