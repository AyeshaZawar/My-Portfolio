import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Terminal, 
  Database, 
  Bot, 
  Sparkles, 
  Layers, 
  Cpu, 
  FileCheck2,
  Globe2,
  Boxes
} from 'lucide-react';

interface LanguageBall {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'ai' | 'database' | 'tools';
  categoryLabel: string;
  icon: React.ElementType;
  proficiency: string;
  direction: 'left' | 'right';
  size: 'large' | 'medium';
  floatDuration: number;
  floatDelay: number;
}

const languagesAndTech: LanguageBall[] = [
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    categoryLabel: 'React Framework',
    icon: Globe2,
    proficiency: 'SSR / SSG & App Router',
    direction: 'left',
    size: 'large',
    floatDuration: 5.2,
    floatDelay: 0.1,
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend',
    categoryLabel: 'Programming & Logic',
    icon: Terminal,
    proficiency: 'Data Structures & Algorithms',
    direction: 'right',
    size: 'large',
    floatDuration: 4.8,
    floatDelay: 0.3,
  },
  {
    id: 'ai-chatbot',
    name: 'AI Chatbot Integration',
    category: 'ai',
    categoryLabel: 'Intelligent Agents',
    icon: Bot,
    proficiency: 'API Streaming & Context Workflows',
    direction: 'left',
    size: 'large',
    floatDuration: 5.6,
    floatDelay: 0.5,
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'database',
    categoryLabel: 'Database & Auth',
    icon: Database,
    proficiency: 'PostgreSQL, Realtime & Auth APIs',
    direction: 'right',
    size: 'large',
    floatDuration: 4.8,
    floatDelay: 0.2,
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'database',
    categoryLabel: 'Relational Database',
    icon: Database,
    proficiency: 'Relational Schemas, Queries & Joins',
    direction: 'left',
    size: 'large',
    floatDuration: 5.3,
    floatDelay: 0.4,
  },
  {
    id: 'nosql',
    name: 'NoSQL',
    category: 'database',
    categoryLabel: 'Document & Key-Value Stores',
    icon: Database,
    proficiency: 'Scalable Collections & Fast Retrieval',
    direction: 'right',
    size: 'large',
    floatDuration: 4.6,
    floatDelay: 0.3,
  },
  {
    id: 'database',
    name: 'Database Systems',
    category: 'database',
    categoryLabel: 'Architecture & Modeling',
    icon: Database,
    proficiency: 'Supabase, SQL, NoSQL & Optimization',
    direction: 'left',
    size: 'medium',
    floatDuration: 5.0,
    floatDelay: 0.6,
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    category: 'database',
    categoryLabel: 'NoSQL Document Store',
    icon: Database,
    proficiency: 'Collections & Aggregations',
    direction: 'right',
    size: 'medium',
    floatDuration: 5.1,
    floatDelay: 0.5,
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    categoryLabel: 'UI Component Architecture',
    icon: Boxes,
    proficiency: 'Custom Hooks & State Management',
    direction: 'left',
    size: 'large',
    floatDuration: 5.3,
    floatDelay: 0.4,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend',
    categoryLabel: 'ES6+ Core',
    icon: Code2,
    proficiency: 'Async / DOM / Logic',
    direction: 'right',
    size: 'medium',
    floatDuration: 4.6,
    floatDelay: 0.6,
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    categoryLabel: 'Static Typing',
    icon: Code2,
    proficiency: 'Type Safety & Interfaces',
    direction: 'left',
    size: 'medium',
    floatDuration: 5.4,
    floatDelay: 0.2,
  },
  {
    id: 'html',
    name: 'HTML5',
    category: 'frontend',
    categoryLabel: 'Semantic Markup',
    icon: Layers,
    proficiency: 'Modern DOM Architecture',
    direction: 'right',
    size: 'medium',
    floatDuration: 4.9,
    floatDelay: 0.7,
  },
  {
    id: 'css',
    name: 'CSS3',
    category: 'frontend',
    categoryLabel: 'Responsive Layouts',
    icon: Sparkles,
    proficiency: 'Flexbox, Grid & Animations',
    direction: 'left',
    size: 'medium',
    floatDuration: 5.1,
    floatDelay: 0.3,
  },
  {
    id: 'ats',
    name: 'ATS Optimization',
    category: 'tools',
    categoryLabel: 'Resume Parsing & Metrics',
    icon: FileCheck2,
    proficiency: 'Keyword Density & Scoring',
    direction: 'right',
    size: 'large',
    floatDuration: 4.7,
    floatDelay: 0.5,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'Utility-First Styling',
    icon: Cpu,
    proficiency: 'Design Systems & Themes',
    direction: 'right',
    size: 'medium',
    floatDuration: 4.9,
    floatDelay: 0.8,
  },
];

export const SkillsSection: React.FC = () => {
  const [selectedBall, setSelectedBall] = useState<LanguageBall | null>(null);

  return (
    <section
      id="skills"
      className="relative w-full bg-[#0B0B0A] text-[#E9E3DC] font-sans py-24 lg:py-32 px-6 sm:px-12 lg:px-20 overflow-hidden"
    >
      {/* Subtle Glow Backdrop */}
      <div className="absolute top-1/3 left-1/4 w-[34rem] h-[34rem] bg-[#C8A77A]/5 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[32rem] h-[32rem] bg-[#80746A]/5 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-4"
        >
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#C8A77A] font-bold">
            02 // LANGUAGES &amp; CORE TECH
          </span>
          <div className="w-20 h-[1px] bg-[#6F5B43]/50" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-6 select-none"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] tracking-tight uppercase leading-[0.88] text-[#E9E3DC]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span>SKILLS, LANGUAGES &amp; </span>
            <span className="text-[#C8A77A]">TECHNOLOGIES.</span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-sm md:text-base font-light text-[#A9A39D] leading-relaxed max-w-2xl mb-12"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Comprehensive technical stack spanning full-stack web development, modern database systems, AI chatbot integration, and ATS performance tools. Hover or click any sphere to inspect its focus area.
        </motion.p>

        {/* ================= FLOATING SPHERES / BALLS CONTAINER ================= */}
        <div className="relative w-full min-h-[520px] rounded-2xl bg-[#151514] border border-[#6F5B43]/40 p-8 sm:p-12 overflow-hidden flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10">
          
          {/* Subtle grid background */}
          <div 
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#C8A77A 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {languagesAndTech.map((ball, idx) => {
            const Icon = ball.icon;
            const isLarge = ball.size === 'large';
            const initialX = ball.direction === 'left' ? -120 : 120;

            return (
              <motion.div
                key={ball.id}
                initial={{ 
                  opacity: 0, 
                  x: initialX, 
                  scale: 0.7,
                  rotate: ball.direction === 'left' ? -15 : 15 
                }}
                whileInView={{ 
                  opacity: 1, 
                  x: 0, 
                  scale: 1,
                  rotate: 0 
                }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.9, 
                  delay: idx * 0.06, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -12, 0, 10, 0],
                    x: [0, ball.direction === 'left' ? 4 : -4, 0, ball.direction === 'left' ? -4 : 4, 0],
                  }}
                  transition={{
                    y: {
                      duration: ball.floatDuration,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: ball.floatDelay,
                    },
                    x: {
                      duration: ball.floatDuration * 1.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: ball.floatDelay,
                    },
                  }}
                  whileHover={{ 
                    scale: 1.12, 
                    boxShadow: '0 0 30px rgba(200, 167, 122, 0.3)',
                    borderColor: '#C8A77A'
                  }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setSelectedBall(ball)}
                  className={`relative rounded-full cursor-pointer transition-colors duration-300 flex flex-col items-center justify-center text-center select-none shadow-[0_15px_35px_rgba(0,0,0,0.6)] ${
                    isLarge 
                      ? 'w-36 h-36 sm:w-44 sm:h-44 p-4' 
                      : 'w-28 h-28 sm:w-36 sm:h-36 p-3'
                  } bg-[#222120] border-2 border-[#6F5B43] hover:border-[#C8A77A] group`}
                >
                  {/* Spherical Reflection Highlight on Top */}
                  <div className="absolute top-2 inset-x-4 h-6 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

                  {/* Spherical Inner Rim Glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#C8A77A]/15 via-transparent to-black/60 pointer-events-none" />

                  {/* Icon */}
                  <div className="p-2 rounded-full bg-[#0B0B0A] border border-[#6F5B43]/50 text-[#C8A77A] mb-1.5 group-hover:scale-110 group-hover:border-[#C8A77A] transition-all">
                    <Icon className={isLarge ? 'w-5 h-5 sm:w-6 sm:h-6' : 'w-4 h-4 sm:w-5 sm:h-5'} />
                  </div>

                  {/* Ball Name */}
                  <h3 
                    className={`font-bold uppercase tracking-tight text-[#E9E3DC] group-hover:text-[#C8A77A] transition-colors leading-tight ${
                      isLarge ? 'text-xs sm:text-sm' : 'text-[11px] sm:text-xs'
                    }`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {ball.name}
                  </h3>

                  {/* Category Subtitle */}
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#A9A39D] mt-0.5 line-clamp-1">
                    {ball.categoryLabel}
                  </span>

                  {/* Ambient pulse dot */}
                  <div className="absolute bottom-2.5 w-1.5 h-1.5 rounded-full bg-[#C8A77A] opacity-70 group-hover:opacity-100" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Selected Sphere Detail Drawer / Banner */}
        {selectedBall && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 rounded-xl bg-[#222120] border border-[#C8A77A]/80 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-[#0B0B0A] border border-[#6F5B43] text-[#C8A77A]">
                <selectedBall.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="text-lg font-bold text-[#E9E3DC] uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {selectedBall.name}
                  </h4>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#151514] text-[#C8A77A] border border-[#6F5B43]/50">
                    {selectedBall.categoryLabel}
                  </span>
                </div>
                <p className="text-xs text-[#A9A39D] mt-1 font-mono">
                  Proficiency Focus: <strong className="text-[#E9E3DC]">{selectedBall.proficiency}</strong>
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedBall(null)}
              className="text-xs font-mono uppercase px-4 py-2 rounded-md bg-[#0B0B0A] hover:bg-[#151514] text-[#A9A39D] hover:text-[#E9E3DC] border border-[#6F5B43]/40 transition-colors"
            >
              Close Info
            </button>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default SkillsSection;
