import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  ArrowUpRight, 
  FolderGit2, 
  Mail, 
  Phone, 
  Menu, 
  X, 
  Camera,
  Sparkles
} from 'lucide-react';

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
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
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

interface HeroSectionProps {
  onOpenAllProjects?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAllProjects }) => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#0B0B0A] text-[#E9E3DC] font-sans selection:bg-[#C8A77A] selection:text-[#0B0B0A]">
      {/* ================= 1. REFINED GOLD CURSOR ================= */}
      {cursorPos.x >= 0 && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-50 rounded-full flex items-center justify-center backdrop-blur-[1px] hidden md:flex shadow-[0_0_15px_rgba(200,167,122,0.35)]"
          animate={{
            x: cursorPos.x - (isHovered ? 24 : 6),
            y: cursorPos.y - (isHovered ? 24 : 6),
            width: isHovered ? 48 : 12,
            height: isHovered ? 48 : 12,
            background: isHovered ? 'rgba(200, 167, 122, 0.15)' : '#C8A77A',
            borderColor: isHovered ? '#C8A77A' : 'transparent',
            borderWidth: isHovered ? 1.5 : 0,
          }}
          transition={{ type: 'spring', damping: 28, stiffness: 380, mass: 0.4 }}
        />
      )}

      {/* ================= 2. FIXED CLEAR VIDEO BACKGROUND ================= */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0B0B0A] flex items-center justify-end">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-screen w-auto max-w-none object-cover lg:object-contain origin-right scale-100 opacity-90 transition-opacity duration-700"
        >
          <source src="/videos/hero-main.mp4" type="video/mp4" />
          <source src="/videos/hero-1.mp4" type="video/mp4" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>

        {/* Clean Soft Edge Blend on Left so Text is Legible, Video is Crystal Clear */}
        <div className="absolute inset-y-0 left-0 w-full md:w-1/2 bg-gradient-to-r from-[#0B0B0A] via-[#0B0B0A]/75 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0B0B0A] to-transparent pointer-events-none" />
      </div>

      {/* ================= 3. VERTICAL SIDE RAIL ================= */}
      <div className="hidden xl:flex fixed left-7 top-1/2 -translate-y-1/2 z-40 flex-col items-center space-y-7 text-[#A9A39D] pointer-events-auto select-none">
        <a 
          href="https://www.linkedin.com/in/ayesha-zawar-618451313/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-bold text-sm font-mono tracking-tighter hover:text-[#C8A77A] transition-colors p-1"
          title="LinkedIn"
        >
          in
        </a>
        <a 
          href="https://instagram.com/ayeshazawar" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-[#C8A77A] transition-colors p-1"
          title="Instagram"
        >
          <Camera className="w-4 h-4" />
        </a>
        <a 
          href="https://facebook.com/ayeshazawar" 
          target="_blank" 
          rel="noopener noreferrer"
          className="font-bold text-xs font-mono tracking-tighter hover:text-[#C8A77A] transition-colors p-1"
          title="Facebook"
        >
          fb
        </a>
        <a 
          href="https://github.com/AyeshaZawar" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:text-[#C8A77A] transition-colors p-1"
          title="GitHub / Projects"
        >
          <FolderGit2 className="w-4 h-4" />
        </a>
      </div>

      {/* ================= 4. TRANSPARENT FIXED NAVIGATION HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between w-full px-6 sm:px-12 lg:px-16 py-4 sm:py-5 bg-transparent pointer-events-auto transition-all duration-300">
        {/* Clickable Ayesha Zawar Button -> Opens Sidebar */}
        <button
          onClick={() => setSidebarOpen(true)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group flex items-center space-x-3.5 transition-colors focus:outline-none cursor-pointer"
          title="Open Menu & Navigation"
        >
          <span className="p-2 rounded-xl bg-[#151514]/90 border border-[#6F5B43]/60 group-hover:border-[#C8A77A] transition-colors shadow-sm">
            <Menu className="w-4 h-4 text-[#C8A77A]" />
          </span>
          <span className="flex items-baseline space-x-2">
            <span 
              className="text-[#E9E3DC] text-sm sm:text-base md:text-lg font-bold tracking-[0.25em] uppercase"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              AYESHA
            </span>
            <span 
              className="text-[#C8A77A] text-3xl sm:text-4xl md:text-[2.6rem] font-bold tracking-wide select-none leading-none -mb-1"
              style={{ 
                fontFamily: "'Herr Von Muellerhoff', cursive",
                letterSpacing: '0.05em',
                WebkitTextStroke: '0.5px #C8A77A',
              }}
            >
              Zawar
            </span>
          </span>
        </button>

        {/* Right Header Balance Spacer */}
        <div className="w-10 h-10 pointer-events-none" aria-hidden="true" />
      </header>

      {/* ================= SLIDE-OVER SIDEBAR NAVIGATION DRAWER ================= */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm pointer-events-auto"
            />

            {/* Sidebar Panel */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-sm sm:max-w-md bg-[#151514] border-r border-[#6F5B43]/50 shadow-[0_25px_60px_rgba(0,0,0,0.98)] flex flex-col justify-between p-7 sm:p-9 pointer-events-auto overflow-y-auto"
            >
              {/* Top Header of Sidebar */}
              <div>
                <div className="flex items-center justify-between pb-6 mb-7 border-b border-[#6F5B43]/30">
                  <div>
                    <div className="flex items-baseline space-x-2">
                      <span 
                        className="text-lg font-bold tracking-[0.2em] uppercase text-[#E9E3DC]"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        AYESHA
                      </span>
                      <span 
                        className="text-3xl sm:text-4xl font-bold text-[#C8A77A] leading-none"
                        style={{ 
                          fontFamily: "'Herr Von Muellerhoff', cursive",
                          letterSpacing: '0.05em',
                          WebkitTextStroke: '0.5px #C8A77A',
                        }}
                      >
                        Zawar
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#C8A77A] tracking-wider uppercase">
                      Full Stack Developer
                    </span>
                  </div>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="p-2 rounded-lg border border-[#6F5B43]/40 hover:border-[#C8A77A] text-[#A9A39D] hover:text-[#E9E3DC] transition-colors cursor-pointer"
                    title="Close Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Sidebar Navigation Items */}
                <nav className="flex flex-col space-y-2.5">
                  {[
                    { name: 'HOME', href: '#' },
                    { name: 'ABOUT', href: '#about' },
                    { name: 'SERVICES', href: '#services' },
                    { name: 'JOURNEY', href: '#timeline' },
                    { name: 'PORTFOLIO', href: '#work' },
                    { 
                      name: 'ALL PROJECTS', 
                      action: () => {
                        setSidebarOpen(false);
                        if (onOpenAllProjects) {
                          onOpenAllProjects();
                        } else {
                          window.location.hash = '/projects/all';
                        }
                      },
                      isSpecial: true,
                    },
                    { name: 'SKILLS', href: '#skills' },
                    { name: 'CONTACT', href: '#contact' },
                  ].map((item) => {
                    if (item.action) {
                      return (
                        <button
                          key={item.name}
                          onClick={item.action}
                          className="w-full text-left px-4 py-3 rounded-xl bg-[#222120] border border-[#C8A77A]/60 hover:border-[#C8A77A] text-[#C8A77A] hover:bg-[#C8A77A]/15 text-xs font-mono font-bold tracking-[0.2em] uppercase flex items-center justify-between group transition-all cursor-pointer shadow-sm"
                        >
                          <span className="flex items-center space-x-2">
                            <Sparkles className="w-3.5 h-3.5 text-[#C8A77A]" />
                            <span>{item.name}</span>
                          </span>
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </button>
                      );
                    }
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className="px-4 py-2.5 rounded-xl hover:bg-[#222120] text-[#A9A39D] hover:text-[#E9E3DC] text-xs font-mono font-bold tracking-[0.2em] uppercase flex items-center justify-between group transition-colors"
                      >
                        <span>{item.name}</span>
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-[#C8A77A] transition-opacity" />
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Sidebar Footer */}
              <div className="pt-6 border-t border-[#6F5B43]/30">
                <div className="text-[11px] font-mono text-[#A9A39D] space-y-1.5 mb-4">
                  <div>ayeshazawar2616@gmail.com</div>
                  <div>+92 309 8782253</div>
                </div>

                <div className="flex items-center space-x-4 text-xs font-mono text-[#A9A39D]">
                  <a
                    href="https://github.com/AyeshaZawar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C8A77A] transition-colors"
                  >
                    GitHub
                  </a>
                  <span>&bull;</span>
                  <a
                    href="https://www.linkedin.com/in/ayesha-zawar-618451313/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#C8A77A] transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ================= 5. CONTENT LAYER ================= */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen w-full px-6 sm:px-12 lg:px-16 pt-24 sm:pt-28 pb-8 pointer-events-none">

        {/* Main Hero Row */}
        <div className="relative flex flex-col md:flex-row items-center justify-between w-full pt-10 pb-6 my-auto">
          
          {/* LEFT: Balanced Headline & Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl lg:max-w-[42rem] pointer-events-auto z-20"
          >
            {/* Minimal Badge */}
            <motion.div variants={fadeUpVariants} className="flex items-center space-x-2 mb-5">
              <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#222120] border border-[#6F5B43]/40 text-[10px] font-mono tracking-widest uppercase text-[#C8A77A]">
                <span>Full Stack Developer</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={fadeUpVariants} className="relative mb-5 select-none">
              <h1
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.2rem] tracking-tight uppercase leading-[0.88] text-[#E9E3DC]"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                <span className="block">
                  FULL STACK
                </span>
                <span className="block text-[#C8A77A]">
                  DEVELOPER
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={fadeUpVariants}
              className="text-sm md:text-[15px] font-light text-[#A9A39D] leading-[1.8] tracking-wide max-w-xl mb-8"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              <p>
                Hi, I'm <span className="text-[#E9E3DC] font-medium text-sm">Ayesha</span>{' '}
                <span className="text-[#C8A77A] font-bold text-base md:text-lg">Zawar</span>. Full Stack Developer with hands-on software development experience building responsive, high-performance web applications, scalable architectures, and modern digital platforms.
              </p>
            </motion.div>

            {/* Clean CTA Buttons */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-wrap items-center gap-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <motion.button
                onClick={() => {
                  if (onOpenAllProjects) {
                    onOpenAllProjects();
                  } else {
                    window.location.hash = '/projects/all';
                  }
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center space-x-2.5 px-7 py-3.5 bg-[#C8A77A] hover:bg-[#D8C3AA] text-[#0B0B0A] text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-300 rounded-md shadow-[0_4px_20px_rgba(200,167,122,0.3)] cursor-pointer"
              >
                <span>EXPLORE PROJECTS</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.button>

              <motion.a
                href="https://github.com/AyeshaZawar"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center space-x-2 px-6 py-3.5 border border-[#6F5B43]/60 bg-[#222120] hover:border-[#C8A77A] text-[#E9E3DC] hover:text-[#C8A77A] text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-300 rounded-md"
              >
                <FolderGit2 className="w-3.5 h-3.5 text-[#C8A77A]" />
                <span>GITHUB REPO</span>
              </motion.a>

              <motion.a
                href="#contact"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative inline-flex items-center space-x-2 px-5 py-3.5 border border-[#6F5B43]/40 hover:border-[#C8A77A] bg-transparent text-[#A9A39D] hover:text-[#E9E3DC] text-[11px] font-bold tracking-[0.18em] uppercase transition-all duration-300 rounded-md"
              >
                <Mail className="w-3.5 h-3.5 text-[#C8A77A]" />
                <span>CONTACT</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT: Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col items-start pointer-events-auto pr-8 xl:pr-14 z-20 select-none bg-[#222120] border border-[#6F5B43]/40 p-6 rounded-xl backdrop-blur-xl max-w-xs shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
          >
            {/* Quick Badges */}
            <div className="flex items-center space-x-2 mb-3 text-[10px] font-mono text-[#C8A77A]">
              <span>Full Stack Developer</span>
            </div>

            {/* Quote Statement */}
            <div 
              className="text-xs font-bold tracking-[0.15em] uppercase text-[#E9E3DC] space-y-1 mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <p>“CODE WITH PURPOSE.</p>
              <p className="text-[#C8A77A]">CRAFT WITH PRECISION.”</p>
            </div>

            {/* Calligraphy Signature */}
            <div className="flex items-baseline space-x-1.5 my-2 leading-none">
              <span 
                className="text-base sm:text-lg font-bold tracking-wider uppercase text-[#E9E3DC]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Ayesha
              </span>
              <span 
                className="text-[2.8rem] text-[#C8A77A] font-normal"
                style={{ 
                  fontFamily: "'Herr Von Muellerhoff', cursive",
                  letterSpacing: '0.05em',
                }}
              >
                Zawar
              </span>
            </div>
            
            {/* Details Bar */}
            <div className="mt-3 w-full space-y-2 pt-3 border-t border-[#6F5B43]/30 text-[10px] font-mono">
              <div className="flex items-center justify-between text-[#A9A39D]">
                <span>Status:</span>
                <span className="text-[#C8A77A] font-semibold">Available for Projects</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Quick Info Bar */}
        <div className="relative pointer-events-auto pt-3 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#A9A39D]">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5">
              <Mail className="w-3.5 h-3.5 text-[#C8A77A]" />
              <a href="mailto:ayeshazawar2616@gmail.com" className="hover:text-[#E9E3DC] transition-colors">ayeshazawar2616@gmail.com</a>
            </span>
            <span className="flex items-center space-x-1.5">
              <Phone className="w-3.5 h-3.5 text-[#C8A77A]" />
              <a href="tel:+923098782253" className="hover:text-[#E9E3DC] transition-colors">+92 309 8782253</a>
            </span>
          </div>
          <div className="flex items-center">
            <div className="flex items-center space-x-2.5 px-4 py-2 rounded-xl bg-[#222120] border border-[#6F5B43]/60 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#C8A77A] animate-pulse"></span>
              <span 
                className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-[#C8A77A]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                FULL STACK DEVELOPER
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
