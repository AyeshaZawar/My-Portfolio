import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  Sparkles, 
  Terminal, 
  ArrowUpRight, 
  Camera, 
  Layers, 
  Bot, 
  FileCheck2, 
  Database as DatabaseIcon 
} from 'lucide-react';
import aboutMainImg from '../assets/about-main.png';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const whatIDoCards = [
  {
    id: 'frontend',
    title: 'UI/UX & FRONT END',
    description: 'Designing intuitive, user-centered web applications with Next.js, React & Tailwind CSS.',
    icon: Layers,
  },
  {
    id: 'backend',
    title: 'BACKEND & DATABASE',
    description: 'Building robust scalable backends with Python, Supabase, SQL & NoSQL architectures.',
    icon: DatabaseIcon,
  },
  {
    id: 'ai-bots',
    title: 'AI CHATBOT CREATION',
    description: 'Integrating intelligent agent workflows, streaming context pipelines & conversational LLMs.',
    icon: Bot,
  },
  {
    id: 'ats',
    title: 'ATS OPTIMIZATION',
    description: 'Engineering keyword-dense ATS algorithms, resume evaluators & score-boosting workflows.',
    icon: FileCheck2,
  },
];

export const AboutSection: React.FC = () => {
  return (
    <>
      {/* =========================================================================
          SECTION 1: ABOUT HERO / BANNER
          The landscape portrait image (/about-section.png) is strictly placed
          on the right side with a wide left gradient fade, so the person's face
          is clearly visible on the right and seamlessly blended into the #0B0B0A canvas.
          The left side has zero obstruction for headline and bio paragraphs.
          ========================================================================= */}
      <section 
        id="about" 
        className="relative w-full min-h-[580px] lg:min-h-[640px] bg-[#0B0B0A] text-[#E9E3DC] font-sans selection:bg-[#C8A77A] selection:text-[#0B0B0A] py-16 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-20 overflow-hidden flex flex-col justify-center border-t border-[#6F5B43]/20"
      >
        {/* Background photo: about-main.png placed with smooth gradient blending */}
        <div className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[56%] xl:w-[50%] z-0 overflow-hidden pointer-events-none">
          <img
            src={aboutMainImg}
            alt="Ayesha Zawar - About"
            className="w-full h-full object-cover object-[75%_center] opacity-35 sm:opacity-55 lg:opacity-95 transition-opacity duration-700 select-none"
          />

          {/* Smooth gradient feathering blending the photo seamlessly into the dark background */}
          <div className="absolute inset-y-0 left-0 w-36 sm:w-56 md:w-72 lg:w-96 bg-gradient-to-r from-[#0B0B0A] via-[#0B0B0A]/90 lg:via-[#0B0B0A]/80 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B0B0A] to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#0B0B0A] to-transparent pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          
          {/* Top Eyebrow Header */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-4 mb-8"
          >
            <span 
              className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#C8A77A] font-bold"
            >
              01 // ABOUT ME
            </span>
            <div className="w-16 h-[1px] bg-[#6F5B43]/40" />
          </motion.div>

          {/* Grid Layout: Left Content, Right Open Landscape */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* LEFT: Content & Bio sitting with 100% legibility */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="lg:col-span-8 xl:col-span-7 flex flex-col justify-center"
            >
              {/* Eyebrow */}
              <motion.div variants={fadeUpVariants} className="mb-2">
                <span className="text-xs font-mono tracking-[0.32em] uppercase text-[#C8A77A] font-medium">
                  CREATIVE DEVELOPER
                </span>
              </motion.div>

              {/* Headline */}
              <motion.div variants={fadeUpVariants} className="relative mb-5 select-none">
                <h2
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] tracking-tight uppercase leading-[0.88] text-[#E9E3DC]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  <span className="block">I DESIGN</span>
                  <span className="block text-[#C8A77A]">EXPERIENCES.</span>
                </h2>
              </motion.div>

              {/* Bio Paragraphs faithfully aligned with CV */}
              <motion.div
                variants={fadeUpVariants}
                className="text-sm md:text-[15px] font-light text-[#A9A39D] leading-[1.85] tracking-wide mb-8 space-y-4 max-w-2xl"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                <p>
                  Crafting digital experiences that are beautiful, functional &amp; unforgettable. Dedicated Full Stack Developer specializing in responsive Front End architectures, robust Back End systems, AI Chatbot Integrations, and ATS Optimization. With hands-on software development experience, I have engineered 6+ production projects spanning full-stack websites, management dashboards, ATS resume scoring algorithms, and conversational AI chatbots.
                </p>
                <p>
                  Currently pursuing my <span className="text-[#E9E3DC]">Bachelor of Science</span> at Govt. Degree College Malir Cantt Karachi, while continuously mastering <span className="text-[#E9E3DC]">Applied Python, Database architectures (Supabase, SQL, NoSQL), and Agentic AI</span> as a <strong className="text-[#C8A77A] font-medium">Certified Cloud Applied Generative AI Engineer (GenEng)</strong>.
                </p>
              </motion.div>

              {/* Action & Social Links */}
              <motion.div
                variants={fadeUpVariants}
                className="flex flex-wrap items-center gap-3 pt-1"
              >
                <a
                  href="#services"
                  className="inline-flex items-center space-x-2 px-6 py-3 border border-[#6F5B43] hover:border-[#C8A77A] bg-[#151514] text-xs font-mono text-[#E9E3DC] hover:text-[#C8A77A] transition-all rounded-sm mr-2 shadow-sm"
                >
                  <span>WHAT I DO &amp; SERVICES</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/ayesha-zawar-618451313/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-[#151514]/90 border border-[#6F5B43]/50 hover:border-[#C8A77A] hover:bg-[#222120] text-xs font-mono text-[#E9E3DC] transition-all"
                >
                  <span className="font-bold font-mono text-[#C8A77A]">in</span>
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-[#A9A39D] group-hover:text-[#C8A77A] transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/ayeshazawar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-[#151514]/90 border border-[#6F5B43]/50 hover:border-[#C8A77A] hover:bg-[#222120] text-xs font-mono text-[#E9E3DC] transition-all"
                >
                  <Camera className="w-3.5 h-3.5 text-[#C8A77A]" />
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3 text-[#A9A39D] group-hover:text-[#C8A77A] transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com/ayeshazawar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 px-3.5 py-2 rounded-lg bg-[#151514]/90 border border-[#6F5B43]/50 hover:border-[#C8A77A] hover:bg-[#222120] text-xs font-mono text-[#E9E3DC] transition-all"
                >
                  <span className="font-bold font-mono text-[#C8A77A]">fb</span>
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3 h-3 text-[#A9A39D] group-hover:text-[#C8A77A] transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </motion.div>
            </motion.div>

            {/* RIGHT: Open space corresponding to the portrait photograph */}
            <div className="hidden lg:block lg:col-span-4 xl:col-span-5 h-full" />

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SERVICES & COMPETENCIES
          Separate section with dark background hosting Experience/Learning cards,
          Metrics, and the 4 "WHAT I DO" capability cards.
          ========================================================================= */}
      <section 
        id="services" 
        className="relative w-full bg-[#0B0B0A] text-[#E9E3DC] font-sans selection:bg-[#C8A77A] selection:text-[#0B0B0A] py-20 lg:py-28 px-6 sm:px-12 lg:px-20 border-t border-[#6F5B43]/30 overflow-hidden"
      >
        {/* Subtle Ambient Light */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#C8A77A]/5 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#C8A77A] font-bold">
                  02 // SERVICES &amp; COMPETENCIES
                </span>
                <div className="w-12 h-[1px] bg-[#6F5B43]/40" />
              </div>
              <h3 
                className="text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#E9E3DC] leading-[0.9]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span>WHAT I DO &amp; </span>
                <span className="text-[#C8A77A]">CAPABILITIES.</span>
              </h3>
            </div>

            <p 
              className="text-xs sm:text-sm font-light text-[#A9A39D] max-w-md leading-relaxed"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              End-to-end production engineering combining modern front-end frameworks, scalable database management, ATS performance tools, and custom AI chatbots.
            </p>
          </div>

          {/* Structured Dual Highlights: Experience vs Learning */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16 items-stretch">
            
            {/* Dual Cards */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Experience Card */}
              <div className="p-6 rounded-2xl border border-[#6F5B43]/50 bg-[#151514] flex flex-col justify-between hover:border-[#C8A77A] transition-all shadow-md group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="p-1.5 rounded-lg bg-[#0B0B0A] text-[#C8A77A] border border-[#6F5B43]/30">
                        <Sparkles className="w-4 h-4" />
                      </span>
                      <h4 className="text-xs font-bold text-[#E9E3DC] tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        WORK EXPERIENCE
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#222120] text-[#C8A77A] border border-[#6F5B43]/40 font-semibold">
                      Orvin Global
                    </span>
                  </div>
                  
                  <ul className="space-y-2 text-xs text-[#A9A39D]">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A77A]" />
                      <span className="text-[#E9E3DC] font-medium">Web Developer (5 Month Remote Job)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A77A]" />
                      <span className="text-[#E9E3DC]">6+ Full-Stack Web Projects</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A77A]" />
                      <span className="text-[#E9E3DC]">Premium Admin Dashboards</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A77A]" />
                      <span className="text-[#E9E3DC]">ATS Resume Scoring &amp; Job Vacancies</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A77A]" />
                      <span className="text-[#E9E3DC]">AI Chatbots &amp; Applicant Tracking</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-[#6F5B43]/20 flex justify-between items-center text-[10px] font-mono text-[#A9A39D]">
                  <span>Status: Production Remote</span>
                  <span className="text-[#C8A77A] font-semibold">Orvin Global</span>
                </div>
              </div>

              {/* Learning Card */}
              <div className="p-6 rounded-2xl border border-[#6F5B43]/50 bg-[#151514] flex flex-col justify-between hover:border-[#C8A77A] transition-all shadow-md group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="p-1.5 rounded-lg bg-[#0B0B0A] text-[#C8A77A] border border-[#6F5B43]/30">
                        <Terminal className="w-4 h-4" />
                      </span>
                      <h4 className="text-xs font-bold text-[#E9E3DC] tracking-wider uppercase" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        CERTIFICATIONS &amp; AI
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#222120] text-[#C8A77A] border border-[#6F5B43]/40 font-semibold">
                      GIAIC &amp; Global Inst.
                    </span>
                  </div>

                  <ul className="space-y-2 text-xs text-[#A9A39D]">
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A77A]" />
                      <span className="text-[#E9E3DC]">Governor House Karachi (2024 — Present)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A77A]" />
                      <span>Certified Cloud Applied GenAI Engineer (GenEng)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A77A]" />
                      <span>Python, Supabase, SQL &amp; NoSQL</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A77A]" />
                      <span>Global Computer Institute (2021) — C.I.T &amp; MS Office</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-[#6F5B43]/20 flex justify-between items-center text-[10px] font-mono text-[#A9A39D]">
                  <span>Governor House Karachi</span>
                  <span className="text-[#C8A77A] font-semibold">GIAIC</span>
                </div>
              </div>
            </div>

            {/* Achievement Metrics Column */}
            <div className="md:col-span-4 flex flex-col justify-between gap-4">
              <div className="p-5 rounded-2xl bg-[#151514] border border-[#6F5B43]/40 flex items-center justify-between">
                <div>
                  <span 
                    className="text-4xl font-extrabold text-[#C8A77A] tracking-tight block"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    6+
                  </span>
                  <span className="text-[11px] font-mono tracking-widest text-[#A9A39D] uppercase">
                    PROJECTS AT ORVIN GLOBAL
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#0B0B0A] border border-[#6F5B43]/40 flex items-center justify-center text-[#C8A77A]">
                  <Layers className="w-4 h-4" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#151514] border border-[#6F5B43]/40 flex items-center justify-between">
                <div>
                  <span 
                    className="text-4xl font-extrabold text-[#E9E3DC] tracking-tight block"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    5 MO
                  </span>
                  <span className="text-[11px] font-mono tracking-widest text-[#A9A39D] uppercase">
                    ORVIN GLOBAL REMOTE EXP.
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#0B0B0A] border border-[#6F5B43]/40 flex items-center justify-center text-[#C8A77A]">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#151514] border border-[#6F5B43]/40 flex items-center justify-between">
                <div>
                  <span 
                    className="text-4xl font-extrabold text-[#E9E3DC] tracking-tight block"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    100%
                  </span>
                  <span className="text-[11px] font-mono tracking-widest text-[#A9A39D] uppercase">
                    DEDICATED QUALITY
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#0B0B0A] border border-[#6F5B43]/40 flex items-center justify-center text-[#C8A77A]">
                  <FileCheck2 className="w-4 h-4" />
                </div>
              </div>
            </div>

          </div>

          {/* 4 WHAT I DO Capability Cards Grid */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-mono tracking-[0.25em] text-[#C8A77A] uppercase font-bold">
                CORE TECHNICAL DOMAINS
              </span>
              <span className="text-[11px] font-mono text-[#A9A39D]">
                Specialized Offerings
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whatIDoCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <div
                    key={card.id}
                    className="p-6 rounded-2xl border border-[#6F5B43]/50 bg-[#151514] hover:border-[#C8A77A] transition-all flex flex-col justify-between group cursor-pointer shadow-lg hover:shadow-[0_12px_35px_rgba(0,0,0,0.85)]"
                  >
                    <div>
                      {/* Circular Icon */}
                      <div className="w-12 h-12 rounded-full border border-[#6F5B43]/60 group-hover:border-[#C8A77A] flex items-center justify-center text-[#C8A77A] mb-6 transition-colors bg-[#0B0B0A]">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <h4 
                        className="text-sm font-bold uppercase tracking-wider text-[#E9E3DC] mb-2"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {card.title}
                      </h4>
                      
                      <p className="text-xs font-light text-[#A9A39D] leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="flex justify-end mt-6 pt-4 border-t border-[#6F5B43]/20">
                      <ArrowUpRight className="w-4 h-4 text-[#A9A39D] group-hover:text-[#C8A77A] transform transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>
    </>
  );
};

export default AboutSection;
