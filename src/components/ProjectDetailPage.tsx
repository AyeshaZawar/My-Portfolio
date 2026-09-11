import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  ExternalLink,
  FolderGit2,
  Play,
  RotateCw,
  ImageIcon,
  Tv,
  CheckCircle2,
  Copy,
  Check,
  Maximize2,
  Terminal,
  ShieldCheck
} from 'lucide-react';
import type { ProjectItem } from '../types/projects';

interface ProjectDetailPageProps {
  project: ProjectItem;
  onBackToCategory: () => void;
  onBackToHome: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBackToCategory,
  onBackToHome,
}) => {
  const [iframeKey, setIframeKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const handleCopyLink = () => {
    const url = project.liveUrl || project.githubUrl;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefreshPreview = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="w-full min-h-screen bg-[#0B0B0A] text-[#E9E3DC] font-sans selection:bg-[#C8A77A] selection:text-[#0B0B0A] py-12 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed top-1/4 left-1/4 w-[36rem] h-[36rem] bg-[#C8A77A]/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[36rem] h-[36rem] bg-[#80746A]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto space-y-12 z-10">
        
        {/* Navigation Breadcrumb Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#6F5B43]/30">
          <div className="flex items-center space-x-3 text-xs font-mono">
            <button
              onClick={onBackToHome}
              className="text-[#C8A77A] hover:text-[#E9E3DC] font-semibold transition-colors cursor-pointer"
            >
              HOME
            </button>
            <span className="text-[#6F5B43]">/</span>
            <button
              onClick={onBackToCategory}
              className="text-[#A9A39D] hover:text-[#E9E3DC] uppercase font-semibold transition-colors cursor-pointer"
            >
              {project.category} PROJECTS
            </button>
            <span className="text-[#6F5B43]">/</span>
            <span className="text-[#E9E3DC] font-bold uppercase">{project.name}</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onBackToCategory}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#222120] hover:bg-[#C8A77A] text-[#C8A77A] hover:text-[#0B0B0A] text-xs font-mono uppercase border border-[#6F5B43]/50 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO LIST</span>
            </button>
          </div>
        </div>

        {/* Project Header Overview */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full bg-[#222120] border border-[#6F5B43]/50 text-[#C8A77A] font-semibold">
              {project.typeLabel}
            </span>

            <span className="text-xs font-mono text-[#A9A39D] uppercase">
              {project.categoryLabel}
            </span>
          </div>

          <h1 
            className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight text-[#E9E3DC] leading-none"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {project.name}
          </h1>

          <p 
            className="text-sm sm:text-base md:text-lg text-[#A9A39D] font-light leading-relaxed max-w-4xl"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {project.detailedDescription || project.shortDescription}
          </p>

          {/* Quick Action Hub */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#C8A77A] hover:bg-[#D8C3AA] text-[#0B0B0A] text-xs font-bold uppercase font-mono rounded-lg transition-all shadow-md cursor-pointer"
              >
                <span>OPEN LIVE WEBSITE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#222120] hover:bg-[#C8A77A] text-[#E9E3DC] hover:text-[#0B0B0A] text-xs font-mono uppercase rounded-lg border border-[#6F5B43]/50 transition-all cursor-pointer"
            >
              <FolderGit2 className="w-3.5 h-3.5" />
              <span>VIEW GITHUB REPOSITORY</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            {project.streamlitUrl && (
              <a
                href={project.streamlitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#222120] hover:bg-[#C8A77A] text-[#C8A77A] hover:text-[#0B0B0A] text-xs font-mono uppercase rounded-lg border border-[#6F5B43]/50 transition-all cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>OPEN STREAMLIT DEMO</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#151514] hover:bg-[#222120] text-[#A9A39D] hover:text-[#E9E3DC] text-xs font-mono uppercase rounded-lg border border-[#6F5B43]/40 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#C8A77A]" />
                  <span>URL COPIED</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>SHARE LINK</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 1. LIVE FRONTEND PREVIEW — FIRST (STRICT REQUIREMENT)                    */}
        {/* ========================================================================= */}
        <section className="space-y-4 pt-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#6F5B43]/30">
            <div className="flex items-center space-x-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C8A77A] animate-pulse" />
              <h2 
                className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#C8A77A]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                1. LIVE FRONTEND PREVIEW
              </h2>
            </div>

            {project.liveUrl && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRefreshPreview}
                  className="p-1.5 text-[#A9A39D] hover:text-[#C8A77A] rounded-lg hover:bg-[#151514] transition-colors cursor-pointer"
                  title="Reload Live View"
                >
                  <RotateCw className="w-3.5 h-3.5" />
                </button>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center space-x-1 px-3 py-1 rounded-lg bg-[#222120] hover:bg-[#C8A77A] text-[#A9A39D] hover:text-[#0B0B0A] text-[11px] font-mono border border-[#6F5B43]/50 transition-all"
                >
                  <span>FULLSCREEN</span>
                  <Maximize2 className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Live Preview Container */}
          <div className="relative w-full rounded-2xl border-2 border-[#6F5B43] bg-[#222120] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)]">
            {/* Browser Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#151514] border-b border-[#6F5B43]/40">
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full bg-[#5E5A56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#80746A] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#C8A77A] inline-block" />
              </div>

              <div className="px-4 py-1 rounded-lg bg-[#0B0B0A] border border-[#6F5B43]/40 text-[11px] font-mono text-[#C8A77A] max-w-md truncate text-center flex-1 mx-4">
                {project.liveUrl || `${project.githubUrl} (source repository)`}
              </div>

              <div className="text-[10px] font-mono text-[#A9A39D] uppercase">
                {project.liveUrl ? 'VERCEL LIVE' : 'SOURCE CODE READY'}
              </div>
            </div>

            {/* Embedded Live Iframe or Clean Dedicated Preview Canvas */}
            {project.liveUrl ? (
              <div className="relative w-full h-[600px] bg-zinc-950">
                <iframe
                  key={iframeKey}
                  src={project.liveUrl}
                  title={`${project.name} Live Preview`}
                  className="w-full h-full border-0 bg-white"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                />
              </div>
            ) : (
              <div className="w-full h-[380px] flex flex-col items-center justify-center text-center p-8 bg-[#151514]">
                <div className="w-16 h-16 rounded-2xl bg-[#222120] border border-[#6F5B43] flex items-center justify-center text-[#C8A77A] mb-4">
                  <FolderGit2 className="w-8 h-8" />
                </div>
                <h3 
                  className="text-xl font-bold uppercase text-[#E9E3DC] tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  LIVE PREVIEW CONTAINER READY
                </h3>
                <p 
                  className="text-xs text-[#A9A39D] max-w-md mt-2 mb-6 font-light"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  This project's source code is hosted on GitHub. Once an active deployment URL is connected, it will render interactively right here.
                </p>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#C8A77A] hover:bg-[#D8C3AA] text-[#0B0B0A] text-xs font-mono font-bold uppercase rounded-lg transition-all"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>EXPLORE ON GITHUB</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. SCREEN RECORDING / VIDEO GALLERY (UNLIMITED DYNAMIC VIDEOS)            */}
        {/* ========================================================================= */}
        <section className="space-y-4 pt-8">
          <div className="flex items-center justify-between pb-3 border-b border-[#6F5B43]/30">
            <div className="flex items-center space-x-3">
              <Tv className="w-4 h-4 text-[#C8A77A]" />
              <h2 
                className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#E9E3DC]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                2. SCREEN RECORDINGS &amp; VIDEO WALKTHROUGHS
              </h2>
            </div>

            <span className="text-[10px] font-mono text-[#C8A77A] uppercase">
              {project.videos?.length || 0} VIDEOS AVAILABLE
            </span>
          </div>

          {(project.videos && project.videos.length > 0) ? (
            <div className="space-y-6">
              {project.videos.map((vid, vIdx) => (
                <div
                  key={vid.id || vIdx}
                  className="relative w-full rounded-2xl border-2 border-[#6F5B43] bg-[#222120] overflow-hidden p-6 sm:p-8 shadow-lg"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#6F5B43]/30">
                    <span className="text-[11px] font-mono text-[#C8A77A] uppercase tracking-widest font-semibold">
                      // {vid.title || `VIDEO 0${vIdx + 1}`}
                    </span>
                    <span className="text-[10px] font-mono text-[#A9A39D] bg-[#151514] px-2.5 py-1 rounded-full border border-[#6F5B43]/40">
                      VIDEO 0{vIdx + 1}
                    </span>
                  </div>

                  {vid.url ? (
                    <div className="w-full aspect-video rounded-xl overflow-hidden bg-black border border-[#6F5B43]/40 mb-4">
                      <video
                        src={vid.url}
                        controls
                        playsInline
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full aspect-video rounded-xl border border-[#6F5B43]/40 bg-[#151514] overflow-hidden flex flex-col items-center justify-center text-center p-6 mb-4">
                      <button
                        onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C8A77A] hover:bg-[#D8C3AA] text-[#0B0B0A] hover:scale-105 transition-all shadow-md mx-auto mb-3 cursor-pointer"
                      >
                        <Play className="w-6 h-6 fill-[#0B0B0A] ml-0.5" />
                      </button>
                      <h4 
                        className="text-base sm:text-lg font-bold text-[#E9E3DC] uppercase tracking-tight"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {vid.title}
                      </h4>
                      <p className="text-xs text-[#A9A39D] max-w-md mt-1 font-light">
                        {vid.caption || 'Upload an MP4 or WebM video file in the Admin CMS to enable interactive playback.'}
                      </p>
                    </div>
                  )}

                  {vid.caption && vid.url && (
                    <p className="text-xs text-[#A9A39D] font-light leading-relaxed">
                      {vid.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl border-2 border-[#6F5B43]/40 bg-[#222120] text-center">
              <Tv className="w-10 h-10 text-[#C8A77A] mx-auto mb-2 opacity-60" />
              <h4 
                className="text-base font-bold text-[#E9E3DC] uppercase"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                NO VIDEO WALKTHROUGHS ATTACHED
              </h4>
              <p className="text-xs text-[#A9A39D] font-light mt-1 max-w-md mx-auto">
                Walkthrough videos can be added anytime through the Admin Dashboard.
              </p>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 3. PROJECT IMAGES / SCREENSHOTS — THIRD (STRICT REQUIREMENT)              */}
        {/* ========================================================================= */}
        <section className="space-y-4 pt-8">
          <div className="flex items-center justify-between pb-3 border-b border-[#6F5B43]/30">
            <div className="flex items-center space-x-3">
              <ImageIcon className="w-4 h-4 text-[#C8A77A]" />
              <h2 
                className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#E9E3DC]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                3. PROJECT IMAGES &amp; SCREENSHOT GALLERY
              </h2>
            </div>

            <span className="text-[10px] font-mono text-[#C8A77A] uppercase">
              {project.images?.length || 0} ASSETS CONFIGURED
            </span>
          </div>

          {/* Screenshots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(project.images && project.images.length > 0) ? (
              project.images.map((img, idx) => (
                <div
                  key={img.id || idx}
                  className="rounded-2xl border-2 border-[#6F5B43]/40 bg-[#222120] hover:border-[#C8A77A] p-6 flex flex-col justify-between transition-all group shadow-lg"
                >
                  <div className="w-full aspect-video rounded-xl border border-[#6F5B43]/40 bg-[#151514] overflow-hidden flex flex-col items-center justify-center text-center mb-4 group-hover:border-[#C8A77A]/50 transition-colors">
                    {img.url ? (
                      <img
                        src={img.url}
                        alt={img.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="p-6">
                        <ImageIcon className="w-8 h-8 text-[#C8A77A] mx-auto mb-2" />
                        <span className="text-xs font-mono text-[#E9E3DC] font-semibold uppercase block">
                          {img.title}
                        </span>
                        <span className="text-[10px] font-mono text-[#A9A39D] mt-1 block">
                          UI SCREENSHOT SLOT 0{idx + 1}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 
                      className="text-base font-bold text-[#E9E3DC] uppercase tracking-tight mb-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {img.title}
                    </h4>
                    <p 
                      className="text-xs text-[#A9A39D] font-light leading-relaxed"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 p-12 rounded-2xl border-2 border-[#6F5B43]/40 bg-[#222120] text-center">
                <ImageIcon className="w-10 h-10 text-[#C8A77A] mx-auto mb-3" />
                <h4 
                  className="text-lg font-bold text-[#E9E3DC] uppercase tracking-tight"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  SCREENSHOT GALLERY READY
                </h4>
                <p className="text-xs text-[#A9A39D] font-light mt-1 max-w-md mx-auto" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                  Homepage screenshots, UI details, responsive views, and admin dashboard screenshots can be attached directly into the project data structure.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. TECHNICAL SPECIFICATIONS & VERIFIED FUNCTIONALITY                      */}
        {/* ========================================================================= */}
        <section className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-[#6F5B43]/30">
          {/* Left Column: Key Features / Verified Specs */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-[#C8A77A] uppercase tracking-widest mb-3 font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#C8A77A]" />
                <span>VERIFIED PROJECT FUNCTIONALITY</span>
              </div>

              {project.features && project.features.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl bg-[#222120] border border-[#6F5B43]/40 flex items-start space-x-2.5 text-xs font-mono text-[#E9E3DC]"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C8A77A] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {/* Demonstrates section */}
            {project.demonstrates && (
              <div className="p-4 rounded-xl bg-[#222120] border border-[#6F5B43]/40">
                <span className="text-[10px] font-mono text-[#C8A77A] uppercase tracking-widest block mb-1.5 font-semibold">
                  // WHAT THIS PROJECT DEMONSTRATES:
                </span>
                <p className="text-xs font-mono text-[#E9E3DC] leading-relaxed">
                  {project.demonstrates}
                </p>
              </div>
            )}
          </div>

          {/* Right Column: Technology Stack & Repositories */}
          <div className="lg:col-span-5 space-y-6 bg-[#222120] p-6 rounded-2xl border-2 border-[#6F5B43]/50 shadow-lg">
            <div>
              <span className="text-[10px] font-mono text-[#C8A77A] uppercase tracking-widest block mb-3 font-semibold">
                // TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-3 py-1 rounded-lg bg-[#151514] text-[#E9E3DC] border border-[#6F5B43]/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#6F5B43]/30">
              <span className="text-[10px] font-mono text-[#C8A77A] uppercase tracking-widest block mb-3 font-semibold">
                // SOURCE REPOSITORY
              </span>
              <div className="p-3 rounded-lg bg-[#151514] border border-[#6F5B43]/40 text-xs font-mono text-[#E9E3DC] break-all select-all flex items-center justify-between">
                <span className="truncate mr-2 text-[#C8A77A]">{project.githubUrl}</span>
                <button
                  onClick={handleCopyLink}
                  className="p-1 text-[#A9A39D] hover:text-[#C8A77A] rounded-md hover:bg-[#222120] shrink-0 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Back Button */}
        <div className="pt-8 pb-12 border-t border-[#6F5B43]/30 flex items-center justify-between">
          <button
            onClick={onBackToCategory}
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-[#222120] hover:bg-[#C8A77A] text-[#C8A77A] hover:text-[#0B0B0A] text-xs font-mono uppercase rounded-lg border border-[#6F5B43]/50 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>RETURN TO {project.category.toUpperCase()} PROJECTS</span>
          </button>

          <button
            onClick={onBackToHome}
            className="text-xs font-mono text-[#C8A77A] hover:text-[#D8C3AA] uppercase font-semibold transition-colors cursor-pointer"
          >
            BACK TO MAIN PORTFOLIO ↑
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetailPage;
