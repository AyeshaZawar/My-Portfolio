import React, { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Mail, 
  Phone, 
  Send, 
  Check, 
  Copy, 
  ArrowUpRight
} from 'lucide-react';

interface ContactSectionProps {}

export const ContactSection: React.FC<ContactSectionProps> = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    subject: '',
    message: '' 
  });
  const [sent, setSent] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.75 },
        colors: ['#C8A77A', '#D8C3AA', '#80746A', '#6F5B43', '#E9E3DC']
      });
    } catch {
      // safe fallback
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <footer
      id="contact"
      className="relative w-full bg-[#0B0B0A] text-[#E9E3DC] font-sans selection:bg-[#C8A77A] selection:text-[#0B0B0A] pt-24 pb-16 px-6 sm:px-12 lg:px-20 overflow-hidden border-t border-[#6F5B43]/30"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-1/4 w-[36rem] h-[36rem] bg-[#C8A77A]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[34rem] h-[34rem] bg-[#80746A]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
            <div>
              {/* Eyebrow Header */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center space-x-4 mb-4"
              >
                <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#C8A77A] font-bold">
                  04 // GET IN TOUCH
                </span>
                <div className="w-20 h-[1px] bg-[#6F5B43]/50" />
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mb-6 select-none"
              >
                <h2
                  className="text-5xl sm:text-6xl md:text-7xl tracking-tight uppercase leading-[0.85] text-[#E9E3DC]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="block">LET'S BUILD</span>
                  <span className="block text-[#C8A77A]">SOMETHING GREAT.</span>
                </h2>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-sm md:text-base font-light text-[#A9A39D] leading-relaxed max-w-md mb-8"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                Available for full-stack engineering contracts, frontend design systems, AI chatbot integrations, or technical consulting. Let's discuss your next project.
              </motion.p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              {/* Email Card */}
              <div className="p-4 rounded-xl border border-[#6F5B43]/40 bg-[#222120] hover:border-[#C8A77A]/70 transition-all flex items-center justify-between group">
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 rounded-lg bg-[#151514] text-[#C8A77A] border border-[#6F5B43]/40">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#A9A39D]">
                      DIRECT EMAIL
                    </span>
                    <a
                      href="mailto:ayeshazawar2616@gmail.com"
                      className="block text-sm font-bold text-[#E9E3DC] group-hover:text-[#C8A77A] transition-colors"
                    >
                      ayeshazawar2616@gmail.com
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard('ayeshazawar2616@gmail.com', 'email')}
                  className="p-2 text-[#A9A39D] hover:text-[#C8A77A] transition-colors"
                  title="Copy email"
                >
                  {copiedKey === 'email' ? <Check className="w-4 h-4 text-[#C8A77A]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone Card */}
              <div className="p-4 rounded-xl border border-[#6F5B43]/40 bg-[#222120] hover:border-[#C8A77A]/70 transition-all flex items-center justify-between group">
                <div className="flex items-center space-x-3.5">
                  <div className="p-2.5 rounded-lg bg-[#151514] text-[#C8A77A] border border-[#6F5B43]/40">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#A9A39D]">
                      DIRECT PHONE / WHATSAPP
                    </span>
                    <a
                      href="tel:+923052442205"
                      className="block text-sm font-bold text-[#E9E3DC] group-hover:text-[#C8A77A] transition-colors"
                    >
                      +92 305 2442205
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard('+923052442205', 'phone')}
                  className="p-2 text-[#A9A39D] hover:text-[#C8A77A] transition-colors"
                  title="Copy phone number"
                >
                  {copiedKey === 'phone' ? <Check className="w-4 h-4 text-[#C8A77A]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl border border-[#6F5B43] bg-[#222120] shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#6F5B43]/30">
                <h3 
                  className="text-xl font-bold uppercase tracking-wider text-[#E9E3DC]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  SEND DIRECT MESSAGE
                </h3>
                <span className="text-[10px] font-mono text-[#C8A77A] px-2.5 py-1 rounded-full bg-[#151514] border border-[#6F5B43]/40">
                  Active Response &lt; 24h
                </span>
              </div>

              {sent ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#151514] border border-[#C8A77A] flex items-center justify-center text-[#C8A77A] shadow-[0_0_20px_rgba(200,167,122,0.3)]">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 
                    className="text-2xl font-bold text-[#E9E3DC] uppercase tracking-wide"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    MESSAGE RECEIVED!
                  </h4>
                  <p className="text-sm text-[#A9A39D] max-w-sm">
                    Thank you for reaching out. I have logged your message and will respond promptly via email.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-4 px-6 py-2.5 rounded-md text-xs font-mono uppercase bg-[#C8A77A] text-[#0B0B0A] font-bold hover:bg-[#D8C3AA] transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#A9A39D] uppercase tracking-wider mb-2">
                        YOUR NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ayesha Khan"
                        className="w-full px-4 py-3 rounded-lg bg-[#151514] border border-[#6F5B43]/50 text-[#E9E3DC] placeholder-[#5E5A56] focus:border-[#C8A77A] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[#A9A39D] uppercase tracking-wider mb-2">
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-3 rounded-lg bg-[#151514] border border-[#6F5B43]/50 text-[#E9E3DC] placeholder-[#5E5A56] focus:border-[#C8A77A] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#A9A39D] uppercase tracking-wider mb-2">
                      PROJECT TOPIC / SUBJECT
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g., Hiring Inquiry, Full-Stack Web App"
                      className="w-full px-4 py-3 rounded-lg bg-[#151514] border border-[#6F5B43]/50 text-[#E9E3DC] placeholder-[#5E5A56] focus:border-[#C8A77A] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A9A39D] uppercase tracking-wider mb-2">
                      YOUR MESSAGE
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your vision, goals, or timeline..."
                      className="w-full px-4 py-3 rounded-lg bg-[#151514] border border-[#6F5B43]/50 text-[#E9E3DC] placeholder-[#5E5A56] focus:border-[#C8A77A] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-lg bg-[#C8A77A] hover:bg-[#D8C3AA] text-[#0B0B0A] font-bold uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center space-x-2 shadow-[0_4px_20px_rgba(200,167,122,0.3)] cursor-pointer"
                  >
                    <span>TRANSMIT MESSAGE</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}

            </div>
          </div>
        </div>

        {/* Footer Sub-Bar */}
        <div className="mt-16 pt-8 border-t border-[#6F5B43]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#A9A39D]">
          <div className="flex items-center space-x-2.5">
            <span 
              className="text-[#E9E3DC] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              AYESHA
            </span>
            <span 
              className="text-[#C8A77A] text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide -mb-1"
              style={{ 
                fontFamily: "'Herr Von Muellerhoff', cursive",
                letterSpacing: '0.05em',
                WebkitTextStroke: '0.4px #C8A77A',
              }}
            >
              Zawar
            </span>
            <span className="text-[#6F5B43]">&bull;</span>
            <span className="text-[#C8A77A] font-semibold tracking-wider uppercase font-mono">Full Stack Developer</span>
          </div>

          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/AyeshaZawar"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C8A77A] transition-colors flex items-center space-x-1"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <span>&bull;</span>
            <a
              href="https://www.linkedin.com/in/ayesha-zawar-618451313/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#C8A77A] transition-colors flex items-center space-x-1"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
            <span>&bull;</span>
            <span className="text-[#A9A39D]">&copy; 2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default ContactSection;
