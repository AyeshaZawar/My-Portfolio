import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Cpu,
  Globe,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { categoryCardsData } from '../data/projectsData';
import type { CategoryCardData } from '../types/projects';

interface ProjectsSectionProps {
  onSelectCategory?: (category: CategoryCardData) => void;
  onOpenAllProjects?: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectCategory, onOpenAllProjects }) => {
  const handleCategoryClick = (cat: CategoryCardData) => {
    if (onSelectCategory) {
      onSelectCategory(cat);
    }
  };

  return (
    <section
      id="work"
      className="relative w-full bg-[#0B0B0A] text-[#E9E3DC] font-sans pt-24 pb-32 px-6 sm:px-12 lg:px-20 overflow-visible"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/4 w-[36rem] h-[36rem] bg-[#C8A77A]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[34rem] h-[34rem] bg-[#80746A]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Eyebrow Header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center space-x-4 mb-4"
        >
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#C8A77A] font-bold">
            03 // FEATURED WORK
          </span>
          <div className="w-20 h-[1px] bg-[#6F5B43]/50" />
        </motion.div>

        {/* Section Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-4 select-none"
        >
          <h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.2rem] tracking-tight uppercase leading-[0.88] text-[#E9E3DC]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span>CRAFTED PROJECTS &amp; </span>
            <span className="text-[#C8A77A]">CODE DIRECTORY.</span>
          </h2>
        </motion.div>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-sm md:text-base font-light text-[#A9A39D] leading-relaxed max-w-2xl mb-16"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Explore my portfolio organized into 3 key engineering collections: Frontend Practice Clones, Python &amp; AI Algorithmic Utilities, and Full-Stack Web Platforms. Cards stack in sequence as you scroll.
        </motion.p>

        {/* ================= 3-CARD TRUE STACKING CONTAINER ================= */}
        {/* Container with ample vertical scroll height so Card 1 sticks, Card 2 slides over Card 1, Card 3 slides over Card 2 */}
        <div className="relative w-full flex flex-col items-center space-y-28 sm:space-y-36 pb-16">
          {categoryCardsData.map((category, index) => {
            // Stack offsets so each sits right on top of the preceding card
            const topOffset = 110 + index * 24;

            const categoryThemeLabel = category.id === 'learning'
              ? 'Python & AI Collection'
              : category.id === 'main'
              ? 'Full-Stack Web Platforms'
              : 'Frontend Practice Clones';

            return (
              <div
                key={category.id}
                style={{
                  position: 'sticky',
                  top: `${topOffset}px`,
                  zIndex: index + 10,
                }}
                className="w-full max-w-2xl sm:max-w-2xl transition-all duration-500"
              >
                <motion.div
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: '-40px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, borderColor: '#C8A77A' }}
                  onClick={() => handleCategoryClick(category)}
                  className="group relative w-full rounded-2xl border-2 border-[#6F5B43] bg-[#222120] p-6 sm:p-8 md:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_20px_rgba(111,91,67,0.15)] cursor-pointer flex flex-col justify-between min-h-[480px] sm:min-h-[520px]"
                >
                  {/* Subtle Top Gold Highlight */}
                  <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-[#C8A77A] to-transparent pointer-events-none" />

                  {/* Top Bar: Category Number & Icon Badge */}
                  <div>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#6F5B43]/30">
                      <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#151514] border border-[#6F5B43]/50 text-[10px] font-mono tracking-widest uppercase text-[#C8A77A]">
                        {category.id === 'learning' ? (
                          <Cpu className="w-3.5 h-3.5 text-[#C8A77A]" />
                        ) : category.id === 'main' ? (
                          <Sparkles className="w-3.5 h-3.5 text-[#C8A77A]" />
                        ) : (
                          <Globe className="w-3.5 h-3.5 text-[#C8A77A]" />
                        )}
                        <span>{categoryThemeLabel}</span>
                      </div>

                      <span 
                        className="text-2xl sm:text-3xl font-extrabold text-[#C8A77A]"
                        style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                      >
                        CARD 0{category.number} / 03
                      </span>
                    </div>

                    {/* Card Title */}
                    <h3 
                      className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E9E3DC] tracking-tight uppercase group-hover:text-[#C8A77A] transition-colors flex items-center justify-between mb-3"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      <span>{category.title}</span>
                      <ArrowUpRight className="w-6 h-6 text-[#C8A77A] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </h3>

                    {/* Card Description */}
                    <p 
                      className="text-xs sm:text-sm text-[#A9A39D] leading-relaxed font-light mb-6"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {category.description}
                    </p>

                    {/* Feature Highlights */}
                    <div className="space-y-2 mb-6">
                      {category.features.map((feat, i) => (
                        <div 
                          key={i} 
                          className="flex items-center space-x-2.5 text-xs text-[#E9E3DC]"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#C8A77A] flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Bar: Tech Stack Tags & CTA Button */}
                  <div className="pt-4 border-t border-[#6F5B43]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-1.5">
                      {category.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2.5 py-1 rounded bg-[#151514] text-[#A9A39D] border border-[#6F5B43]/40 group-hover:border-[#C8A77A]/60 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold tracking-wider uppercase text-[#0B0B0A] bg-[#C8A77A] group-hover:bg-[#D8C3AA] px-4 py-2 rounded-md transition-colors self-start sm:self-auto">
                      <span>OPEN COLLECTION</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Corner Accents */}
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#C8A77A] rounded-tl" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#C8A77A] rounded-tr" />
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#C8A77A] rounded-bl" />
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#C8A77A] rounded-br" />
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* All Projects Directory CTA */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => {
              if (onOpenAllProjects) {
                onOpenAllProjects();
              } else {
                window.location.hash = '/projects/all';
              }
            }}
            className="group inline-flex items-center space-x-3 px-8 py-4 rounded-xl border border-[#6F5B43] bg-[#151514] hover:bg-[#222120] hover:border-[#C8A77A] text-[#E9E3DC] hover:text-[#C8A77A] text-xs font-mono font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-lg"
          >
            <span>VIEW ALL PROJECTS DIRECTORY</span>
            <ArrowUpRight className="w-4 h-4 text-[#C8A77A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProjectsSection;
