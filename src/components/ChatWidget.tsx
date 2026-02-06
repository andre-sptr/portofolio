import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, Minimize2, Maximize2, Loader2, Bot, User, RefreshCw, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// Configuration
const API_ENDPOINT = "https://ai.sumopod.com/v1/chat/completions";
const API_KEY = import.meta.env.VITE_SUMOPOD_API_KEY;
const MODEL = "gpt-4o-mini";
const MAX_TOKENS = 500;
const TEMPERATURE = 0.3;

// System Prompt
const SYSTEM_PROMPT = `
You are the AI Assistant for Andre Saputra's portfolio website.
Your role is to help visitors understand Andre's skills, projects, and background.
Be professional, friendly, and concise.

Knowledge Base:
Name: Andre Saputra
Role: Informatics Teacher, Full Stack Developer
Location: Siak (MAN IC Siak context)
Skills: Frontend (90%), Backend (85%), IoT (80%), Database (75%).
Tech Stack: React, Node.js, PHP (CodeIgniter), Arduino, ESP32, Python, n8n, Zapier.

Projects:
1. Reka AI: AI platform for digital engineering services & real-time coding assistant.
2. Fiscal AI Finance: AI-powered finance management application for fiscal prediction and reporting.
3. Undungan: Modern digital aqiqah invitation platform.
4. AET AI: AI solution for AET Student Association at Politeknik Caltex Riau.
5. SiTiket: Trouble ticket management system for Telkom Infrastructure.
6. SNMB: Landing page for MAN IC Siak new student national selection.
7. Perpus MAN IC Siak: Comprehensive digital library system with online lending.
8. EduForum: Social educational platform for MAN IC Siak community.
9. FireSense: IoT fire detection system using ESP32, Firebase, and Fuzzy Logic.
10. PDF Tools: Online PDF management suite (merge, split, compress).

Free Tools provided by Andre: Reka AI, AI Finance, EduForum, PDF Tools.
Contact: andresaputra07012019@gmail.com, GitHub (andre-sptr), LinkedIn (andre-saputra-434561381).

Guidelines:
- Answer questions based on this info.
- If unsure, suggest contacting Andre directly via email.
- Keep answers under 3-4 sentences unless detailed explanation is asked.
- Use "I" to refer to yourself as the AI Assistant, and "Andre" for the portfolio owner.
`;

// Types
interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const SUGGESTIONS = [
  "Apa skill utama Andre?",
  "Ceritakan tentang Reka AI",
  "Bagaimana cara kontak Andre?",
  "Apa itu Fiscal AI?",
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const requestTimestamps = useRef<number[]>([]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Rate Limiting Check
  const checkRateLimit = () => {
    const now = Date.now();
    const oneMinuteAgo = now - 60000;
    
    // Filter out timestamps older than 1 minute
    requestTimestamps.current = requestTimestamps.current.filter(t => t > oneMinuteAgo);
    
    if (requestTimestamps.current.length >= 10) {
      return false;
    }
    
    requestTimestamps.current.push(now);
    return true;
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Validate API Key
    if (!API_KEY) {
      toast.error("API Key missing! Please configure VITE_SUMOPOD_API_KEY in .env file.");
      console.error("API Key is missing. Check your .env file.");
      return;
    }
    
    if (!checkRateLimit()) {
      toast.error("Terlalu banyak permintaan. Mohon tunggu sebentar.");
      return;
    }

    const newMessage: Message = { role: "user", content };
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    // Logging usage
    console.log(`[ChatWidget] Message sent at ${new Date().toISOString()}:`, content);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
            newMessage
          ],
          max_tokens: MAX_TOKENS,
          temperature: TEMPERATURE
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      const aiContent = data.choices[0]?.message?.content || "Maaf, saya tidak dapat memproses permintaan Anda saat ini.";

      setMessages(prev => [...prev, { role: "assistant", content: aiContent }]);
      
      // Log success
      console.log(`[ChatWidget] Response received at ${new Date().toISOString()}`);

    } catch (error) {
            console.error("Chat Error Details:", error);
            if (error instanceof TypeError && error.message === "Failed to fetch") {
                toast.error("Gagal terhubung ke server AI. Periksa koneksi internet atau coba lagi nanti.");
            } else {
                toast.error("Gagal terhubung ke AI. Silakan coba lagi.");
            }
            setMessages(prev => [...prev, { role: "assistant", content: "Maaf, terjadi kesalahan koneksi. Silakan coba lagi nanti." }]);
          } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    toast.info("Percakapan telah dibersihkan.");
    console.log(`[ChatWidget] Chat cleared at ${new Date().toISOString()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(input);
    }
  };

  return (
    <>
      <AnimatePresence>
        {(!isOpen || isMinimized) && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              size="lg"
              className="rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg glow-hover p-0 relative"
              onClick={() => {
                setIsOpen(true);
                setIsMinimized(false);
              }}
            >
              <Bot className="w-8 h-8 text-white" />
              {/* Pulse effect if idle */}
              <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background animate-pulse" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col glass-card rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-primary/5 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/20">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Andre's Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-white/10"
                  onClick={handleClearChat}
                  title="Bersihkan Chat"
                >
                  <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-400" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-white/10"
                  onClick={() => setIsMinimized(true)}
                  title="Minimize"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-red-500/20 hover:text-red-500"
                  onClick={() => setIsOpen(false)}
                  title="Tutup"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
            >
              {messages.length === 0 && (
                <div className="text-center py-8 space-y-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Bot className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Halo! 👋</h4>
                    <p className="text-muted-foreground text-sm max-w-[80%] mx-auto">
                      Saya adalah asisten virtual Andre. Ada yang bisa saya bantu jelaskan mengenai portfolio ini?
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-2 max-w-[90%] mx-auto">
                    {SUGGESTIONS.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSendMessage(suggestion)}
                        className="text-xs text-left p-3 rounded-xl bg-white/5 hover:bg-primary/10 border border-white/5 hover:border-primary/30 transition-all duration-200"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      msg.role === "user" 
                        ? "bg-secondary/20 text-secondary" 
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div
                    className={`p-3 rounded-2xl max-w-[80%] text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted/50 border border-white/5 rounded-tl-none"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted/50 border border-white/5 rounded-2xl rounded-tl-none p-4 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-xs text-muted-foreground">Sedang mengetik...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-white/10 bg-background/50 backdrop-blur-md">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tulis pesan..."
                  className="bg-white/5 border-white/10 focus:border-primary/50"
                  disabled={isLoading}
                />
                <Button
                  onClick={() => handleSendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  size="icon"
                  className="bg-primary hover:bg-primary/90 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-center mt-2">
                 <span className="text-[10px] text-muted-foreground/50">
                    Powered by OpenAI • GPT-5.1
                 </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
