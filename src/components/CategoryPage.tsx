import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  FolderGit2,
  ExternalLink,
  Layers,
  Grid
} from 'lucide-react';
import type { ProjectItem, CategoryCardData } from '../types/projects';
import { CylinderCarousel3D } from './CylinderCarousel3D';

interface CategoryPageProps {
  category: CategoryCardData;
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
  onBackToHome: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  projects,
  onSelectProject,
  onBackToHome,
}) => {
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');

  return (
    <div className="w-full min-h-screen bg-[#0B0B0A] text-[#E9E3DC] font-sans selection:bg-[#C8A77A] selection:text-[#0B0B0A] py-8 sm:py-12 px-4 sm:px-6 lg:px-12 relative overflow-x-hidden">
      {/* Background Ambience */}
      <div className="fixed top-20 left-1/4 w-[32rem] h-[32rem] bg-[#C8A77A]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="fixed bottom-20 right-1/4 w-[32rem] h-[32rem] bg-[#80746A]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto space-y-8 z-10">
        
        {/* Navigation Breadcrumb & View Toggle Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#6F5B43]/30">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#222120] hover:bg-[#C8A77A] text-[#C8A77A] hover:text-[#0B0B0A] text-xs font-mono uppercase border border-[#6F5B43]/50 transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO PORTFOLIO</span>
          </button>

          {/* Clean View Toggle */}
          <div className="flex items-center space-x-2 bg-[#151514] p-1 rounded-lg border border-[#6F5B43]/40">
            <button
              onClick={() => setViewMode('3d')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono uppercase transition-all cursor-pointer ${
                viewMode === '3d'
                  ? 'bg-[#C8A77A] text-[#0B0B0A] font-bold shadow-sm'
                  : 'text-[#A9A39D] hover:text-[#E9E3DC]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>3D REVOLVING CAROUSEL</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-mono uppercase transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#C8A77A] text-[#0B0B0A] font-bold shadow-sm'
                  : 'text-[#A9A39D] hover:text-[#E9E3DC]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>GRID VIEW</span>
            </button>
          </div>
        </div>

        {/* Clean Category Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#222120] border border-[#6F5B43]/50 text-[10px] font-mono text-[#C8A77A] uppercase tracking-widest">
            <span>CATEGORY {category.number}</span>
            <span>&bull;</span>
            <span>{category.categoryLabel}</span>
          </div>

          <h1 
            className="text-3xl sm:text-5xl font-bold uppercase tracking-tight text-[#E9E3DC]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {category.title}
          </h1>

          <p 
            className="text-xs sm:text-sm text-[#A9A39D] font-light max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {category.description}
          </p>
        </div>

        {/* ========================================================================= */}
        {/* 3D REVOLVING CYLINDER CAROUSEL OR GRID VIEW                               */}
        {/* ========================================================================= */}
        {viewMode === '3d' ? (
          <div className="py-4">
            <CylinderCarousel3D
              projects={projects}
              onSelectProject={onSelectProject}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="rounded-2xl border-2 border-[#6F5B43]/40 bg-[#222120] hover:border-[#C8A77A] p-5 flex flex-col justify-between transition-all duration-300 group shadow-[0_15px_35px_rgba(0,0,0,0.7)]"
              >
                {/* Top Landscape Preview Area */}
                <div className="w-full aspect-[16/10] rounded-xl bg-[#151514] border border-[#6F5B43]/40 overflow-hidden relative mb-4">
                  {proj.images && proj.images.length > 0 && proj.images[0].url ? (
                    <img
                      src={proj.images[0].url}
                      alt={proj.name}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#1c1b1a] to-[#121211]">
                      <div className="p-2 rounded-lg bg-[#222120] border border-[#6F5B43]/40 text-[#C8A77A] mb-1.5">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-[#C8A77A] font-bold">
                        PREVIEW SCREENSHOT
                      </span>
                    </div>
                  )}

                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0B0B0A]/85 border border-[#6F5B43]/50 text-[9px] font-mono text-[#C8A77A] font-bold">
                    0{idx + 1}
                  </div>

                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#0B0B0A]/85 border border-[#6F5B43]/50 text-[8px] font-mono text-[#A9A39D] uppercase">
                    {proj.typeLabel.split('/')[0].trim()}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 
                    onClick={() => onSelectProject(proj)}
                    className="text-xl font-bold uppercase tracking-tight text-[#E9E3DC] group-hover:text-[#C8A77A] transition-colors cursor-pointer flex items-center justify-between"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    <span className="truncate">{proj.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C8A77A] flex-shrink-0" />
                  </h3>

                  <p 
                    className="text-xs text-[#A9A39D] font-light line-clamp-2 leading-relaxed"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {proj.shortDescription}
                  </p>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 mt-4 border-t border-[#6F5B43]/30 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectProject(proj)}
                    className="flex-1 py-2 px-3 bg-[#C8A77A] hover:bg-[#D8C3AA] text-[#0B0B0A] text-xs font-mono font-bold uppercase rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <span>VIEW DETAILS</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center space-x-1.5">
                    {proj.liveUrl && (
                      <a
                        href={proj.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-[#151514] hover:bg-[#C8A77A] text-[#C8A77A] hover:text-[#0B0B0A] border border-[#6F5B43]/50 transition-all cursor-pointer"
                        title="Open Live Website"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-[#151514] hover:bg-[#C8A77A] text-[#C8A77A] hover:text-[#0B0B0A] border border-[#6F5B43]/50 transition-all cursor-pointer"
                      title="View GitHub Repository"
                    >
                      <FolderGit2 className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryPage;
