import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  FolderGit2, 
  ExternalLink, 
  Search, 
  Layers, 
  Sparkles, 
  Cpu, 
  Globe 
} from 'lucide-react';
import { allProjectsData } from '../data/projectsData';
import type { ProjectItem } from '../types/projects';

interface AllProjectsPageProps {
  onBackToHome: () => void;
  onSelectProject: (project: ProjectItem) => void;
}

export const AllProjectsPage: React.FC<AllProjectsPageProps> = ({
  onBackToHome,
  onSelectProject,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'main' | 'templates' | 'learning'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = allProjectsData.filter((project) => {
    const matchesFilter = selectedFilter === 'all' ? true : project.category === selectedFilter;
    const matchesSearch = 
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const filterTabs = [
    { id: 'all', label: 'ALL PROJECTS', count: allProjectsData.length },
    { id: 'main', label: 'MAIN PLATFORMS & BNB', count: allProjectsData.filter(p => p.category === 'main').length },
    { id: 'templates', label: 'TEMPLATES & CLONES', count: allProjectsData.filter(p => p.category === 'templates').length },
    { id: 'learning', label: 'PYTHON & ALGORITHMS', count: allProjectsData.filter(p => p.category === 'learning').length },
  ] as const;

  return (
    <div className="w-full min-h-screen bg-[#0B0B0A] text-[#E9E3DC] font-sans selection:bg-[#C8A77A] selection:text-[#0B0B0A]">
      {/* Top Fixed Bar */}
      <div className="sticky top-0 z-40 w-full px-6 sm:px-12 lg:px-16 py-4 bg-[#0B0B0A]/90 backdrop-blur-md border-b border-[#6F5B43]/30 flex items-center justify-between">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center space-x-2.5 text-xs font-mono tracking-wider uppercase text-[#A9A39D] hover:text-[#C8A77A] transition-colors group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>BACK TO PORTFOLIO</span>
        </button>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-mono font-bold tracking-widest text-[#C8A77A] uppercase">
            PROJECT DIRECTORY
          </span>
          <span className="text-xs font-mono text-[#A9A39D]">({allProjectsData.length} TOTAL)</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 py-12 lg:py-16">
        
        {/* Header Title */}
        <div className="mb-10">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#C8A77A] font-bold">
              CONSOLIDATED DIRECTORY
            </span>
            <div className="w-16 h-[1px] bg-[#6F5B43]/40" />
          </div>

          <h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-[#E9E3DC] mb-4"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            <span>ALL COMPLETED </span>
            <span className="text-[#C8A77A]">PROJECTS.</span>
          </h1>

          <p 
            className="text-sm md:text-base font-light text-[#A9A39D] max-w-3xl leading-relaxed"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            A unified directory showcasing full-stack enterprise recruitment applications (BNB — Bucks n Bricks), commercial websites, responsive frontend starters, and Python algorithmic data structures.
          </p>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#6F5B43]/30">
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-300 border ${
                  selectedFilter === tab.id
                    ? 'bg-[#C8A77A] text-[#0B0B0A] font-bold border-[#C8A77A] shadow-[0_4px_15px_rgba(200,167,122,0.25)]'
                    : 'bg-[#151514] text-[#A9A39D] border-[#6F5B43]/40 hover:border-[#C8A77A] hover:text-[#E9E3DC]'
                }`}
              >
                <span>{tab.label}</span>
                <span className="ml-1.5 opacity-75">({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px] md:w-80">
            <Search className="w-4 h-4 text-[#A9A39D] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#151514] border border-[#6F5B43]/40 text-xs font-mono text-[#E9E3DC] placeholder-[#5E5A56] focus:border-[#C8A77A] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-[#A9A39D] font-mono text-sm">
            <Layers className="w-10 h-10 mx-auto mb-3 text-[#6F5B43]" />
            <p>No projects match your search query.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedFilter('all'); }}
              className="mt-4 px-4 py-1.5 rounded-lg bg-[#222120] text-[#C8A77A] text-xs hover:bg-[#C8A77A] hover:text-[#0B0B0A] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const isMain = project.category === 'main';
              const isLearning = project.category === 'learning';

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative flex flex-col justify-between rounded-2xl bg-[#151514] border border-[#6F5B43]/40 hover:border-[#C8A77A] p-6 transition-all duration-300 shadow-lg hover:shadow-[0_12px_35px_rgba(0,0,0,0.85)]"
                >
                  <div>
                    {/* Top Row: Category Badge & Number */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold border ${
                        isMain 
                          ? 'bg-[#C8A77A]/15 text-[#C8A77A] border-[#C8A77A]/40'
                          : isLearning
                            ? 'bg-[#222120] text-[#E9E3DC] border-[#6F5B43]/50'
                            : 'bg-[#151514] text-[#A9A39D] border-[#6F5B43]/30'
                      }`}>
                        {isMain ? (
                          <Sparkles className="w-3 h-3 text-[#C8A77A]" />
                        ) : isLearning ? (
                          <Cpu className="w-3 h-3 text-[#A9A39D]" />
                        ) : (
                          <Globe className="w-3 h-3 text-[#A9A39D]" />
                        )}
                        <span>{project.category.toUpperCase()}</span>
                      </span>

                      <span className="text-xs font-mono text-[#5E5A56] group-hover:text-[#C8A77A] transition-colors">
                        #{String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 
                      onClick={() => onSelectProject(project)}
                      className="text-lg sm:text-xl font-bold text-[#E9E3DC] group-hover:text-[#C8A77A] transition-colors uppercase tracking-tight mb-2.5 cursor-pointer flex items-center justify-between"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      <span>{project.name}</span>
                      <ArrowUpRight className="w-4 h-4 text-[#A9A39D] group-hover:text-[#C8A77A] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </h3>

                    {/* Description */}
                    <p 
                      className="text-xs text-[#A9A39D] leading-relaxed line-clamp-3 mb-5 font-light"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {project.shortDescription}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#222120] text-[#A9A39D] border border-[#6F5B43]/30"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 text-[#6F5B43]">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-[#6F5B43]/25 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center space-x-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-[#C8A77A] hover:text-[#E9E3DC] transition-colors font-semibold"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>LIVE DEMO</span>
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 text-[#A9A39D] hover:text-[#E9E3DC] transition-colors"
                        >
                          <FolderGit2 className="w-3.5 h-3.5" />
                          <span>CODE</span>
                        </a>
                      )}
                    </div>

                    <button
                      onClick={() => onSelectProject(project)}
                      className="text-[11px] uppercase tracking-wider text-[#A9A39D] hover:text-[#C8A77A] transition-colors"
                    >
                      DETAILS &rarr;
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="mt-16 text-center">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-lg bg-[#C8A77A] text-[#0B0B0A] font-bold text-xs font-mono tracking-widest uppercase hover:bg-[#D8C3AA] transition-colors shadow-lg cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO MAIN PORTFOLIO</span>
          </button>
        </div>

      </div>
    </div>
  );
};

export default AllProjectsPage;
