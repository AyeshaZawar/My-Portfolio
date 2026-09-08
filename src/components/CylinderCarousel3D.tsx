import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowUpRight,
  ExternalLink,
  FolderGit2,
  ImageIcon
} from 'lucide-react';
import type { ProjectItem } from '../types/projects';

interface CylinderCarousel3DProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const CylinderCarousel3D: React.FC<CylinderCarousel3DProps> = ({
  projects,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  // Physics and rotation refs
  const rotationRef = useRef<number>(0);
  const targetRotationRef = useRef<number | null>(null);
  const velocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragLastXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);

  // React state for active index and responsive radius
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [radius, setRadius] = useState<number>(440);

  const totalCards = projects.length;
  const angleStep = 360 / Math.max(totalCards, 1);

  // Calculate responsive radius so cards form an open, uncrowded circular ring
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setRadius(300);
      } else if (w < 1024) {
        setRadius(380);
      } else {
        setRadius(460);
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Update DOM transform directly in RAF for 60fps buttery smoothness
  const applyTransform = useCallback((rot: number) => {
    if (ringRef.current) {
      // Pitch angle: rotateX(13deg) downward tilt for elevated cylindrical depth
      ringRef.current.style.transform = `rotateX(-13deg) rotateY(${rot}deg)`;
    }

    // Determine front-facing card (closest to 0 degrees modulo 360)
    if (totalCards > 0) {
      const normalized = ((-rot % 360) + 360) % 360;
      const index = Math.round(normalized / angleStep) % totalCards;
      setActiveProjectIndex(index);
    }
  }, [angleStep, totalCards]);

  // Main 60fps Physics & Ambient Animation Loop
  useEffect(() => {
    let animId: number;
    let prevTimestamp = performance.now();

    const animate = (timestamp: number) => {
      const dt = Math.min((timestamp - prevTimestamp) / 1000, 0.1);
      prevTimestamp = timestamp;

      // 1. Target Interpolation (Click-to-center or Prev/Next)
      if (targetRotationRef.current !== null) {
        const diff = targetRotationRef.current - rotationRef.current;
        if (Math.abs(diff) > 0.08) {
          rotationRef.current += diff * Math.min(dt * 8, 0.25);
          applyTransform(rotationRef.current);
        } else {
          rotationRef.current = targetRotationRef.current;
          targetRotationRef.current = null;
          velocityRef.current = 0;
          applyTransform(rotationRef.current);
        }
      } 
      // 2. Dragging Mode
      else if (isDraggingRef.current) {
        applyTransform(rotationRef.current);
      } 
      // 3. Inertia Decay Mode
      else if (Math.abs(velocityRef.current) > 0.05) {
        rotationRef.current += velocityRef.current * (dt * 60);
        velocityRef.current *= Math.pow(0.92, dt * 60); // 0.92 damping
        applyTransform(rotationRef.current);
      } 
      // 4. Ambient Continuous Spin (~12° to 14° per second)
      else if (!isPausedRef.current) {
        velocityRef.current = 0;
        const ambientSpeed = 13; // degrees per second
        rotationRef.current += ambientSpeed * dt;
        applyTransform(rotationRef.current);
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [applyTransform]);

  // Rotate to specific card taking the shortest angular path
  const rotateToCard = (index: number) => {
    const cardAngle = index * angleStep;
    const currentRot = rotationRef.current;
    
    // Find target rotation that places card at 0deg (facing front)
    // equation: (cardAngle + targetRot) % 360 == 0  => targetRot = -cardAngle + k * 360
    const desiredAngle = -cardAngle;
    const currentModulo = ((currentRot % 360) + 360) % 360;
    const desiredModulo = ((desiredAngle % 360) + 360) % 360;
    
    let delta = desiredModulo - currentModulo;
    if (delta > 180) delta -= 360;
    if (delta < -180) delta += 360;

    targetRotationRef.current = currentRot + delta;
    velocityRef.current = 0;
  };

  // Pointer Drag Handlers (Mouse & Touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag on primary pointer button
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragLastXRef.current = e.clientX;
    lastTimeRef.current = performance.now();
    targetRotationRef.current = null;
    velocityRef.current = 0;

    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max((now - lastTimeRef.current) / 1000, 0.001);
    const deltaX = e.clientX - dragLastXRef.current;
    
    dragLastXRef.current = e.clientX;
    lastTimeRef.current = now;

    // Proportional rotation based on container width
    const sensitivity = 0.28;
    rotationRef.current += deltaX * sensitivity;
    velocityRef.current = (deltaX * sensitivity) / (dt * 60);

    applyTransform(rotationRef.current);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (containerRef.current) {
      try {
        containerRef.current.releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
    }
  };

  // Mouse Wheel Rotation
  const handleWheel = (e: React.WheelEvent) => {
    // Smooth horizontal rotation via wheel
    const delta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
    targetRotationRef.current = null;
    rotationRef.current += delta * 0.15;
    applyTransform(rotationRef.current);
  };

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* 3D Perspective Stage Container */}
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        className="relative w-full h-[580px] sm:h-[640px] md:h-[680px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible touch-none"
        style={{
          perspective: '1400px',
          perspectiveOrigin: '50% 38%',
        }}
      >
        {/* Soft Radial Ambient Lighting beneath the ring */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-[#C8A77A]/8 blur-[120px] pointer-events-none -bottom-10" />

        {/* 3D Cylindrical Ring Container */}
        <div
          ref={ringRef}
          className="relative w-0 h-0 transition-none"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(-13deg) rotateY(0deg)',
          }}
        >
          {projects.map((proj, idx) => {
            const cardAngle = idx * angleStep;
            const isCurrent = idx === activeProjectIndex;

            return (
              <div
                key={proj.id}
                onClick={(e) => {
                  // If this card is already centered, let child buttons or open project trigger
                  if (idx !== activeProjectIndex) {
                    e.stopPropagation();
                    rotateToCard(idx);
                  }
                }}
                className="absolute top-0 left-0 -ml-[140px] sm:-ml-[155px] -mt-[210px] sm:-mt-[230px] w-[280px] sm:w-[310px] h-[420px] sm:h-[460px] rounded-2xl cursor-pointer transition-shadow duration-300"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                }}
              >
                {/* ========================================================= */}
                {/* 1. FRONT FACE (rotateY(0deg), backface-visibility: hidden) */}
                {/* ========================================================= */}
                <div
                  className={`absolute inset-0 rounded-2xl border-2 bg-[#222120]/95 backdrop-blur-xl p-5 flex flex-col justify-between shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-colors duration-300 ${
                    isCurrent
                      ? 'border-[#C8A77A] ring-1 ring-[#C8A77A]/50 shadow-[0_0_35px_rgba(200,167,122,0.25)]'
                      : 'border-[#6F5B43]/50 hover:border-[#C8A77A]/80'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(0deg)',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {/* Top: Landscape Preview Frame (Reserved space for user screenshot) */}
                  <div className="w-full aspect-[16/10] rounded-xl bg-[#151514] border border-[#6F5B43]/40 overflow-hidden relative group">
                    {proj.images && proj.images.length > 0 && proj.images[0].url ? (
                      <img
                        src={proj.images[0].url}
                        alt={proj.name}
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      /* High-end Landscape Preview Placeholder */
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center relative overflow-hidden bg-gradient-to-br from-[#1c1b1a] to-[#121211]">
                        {/* Subtle Grid Accent */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6F5B4315_1px,transparent_1px),linear-gradient(to_bottom,#6F5B4315_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                        
                        <div className="p-2.5 rounded-lg bg-[#222120] border border-[#6F5B43]/40 text-[#C8A77A] mb-2 shadow-sm">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] font-mono tracking-widest uppercase text-[#C8A77A] font-bold">
                          PREVIEW SCREENSHOT
                        </span>
                        <span className="text-[8px] font-mono text-[#A9A39D] mt-0.5 max-w-[170px] truncate">
                          {proj.name}
                        </span>
                      </div>
                    )}

                    {/* Overlay Badges */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0B0B0A]/85 backdrop-blur-md border border-[#6F5B43]/50 text-[9px] font-mono text-[#C8A77A] font-bold">
                      0{idx + 1}
                    </div>

                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#0B0B0A]/85 backdrop-blur-md border border-[#6F5B43]/50 text-[8px] font-mono text-[#A9A39D] uppercase">
                      {proj.typeLabel.split('/')[0].trim()}
                    </div>
                  </div>

                  {/* Middle: Title & Concise Details */}
                  <div className="space-y-2 py-1">
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A77A]" />
                      <span className="text-[9px] font-mono text-[#A9A39D] uppercase tracking-wider">
                        {proj.categoryLabel.split('//')[0]?.trim() || 'PROJECT'}
                      </span>
                    </div>

                    <h3
                      className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#E9E3DC] line-clamp-1 group-hover:text-[#C8A77A] transition-colors"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {proj.name}
                    </h3>

                    <p
                      className="text-[11px] sm:text-xs text-[#A9A39D] font-light line-clamp-2 leading-relaxed"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {proj.shortDescription}
                    </p>
                  </div>

                  {/* Bottom: Action Buttons */}
                  <div className="pt-3 border-t border-[#6F5B43]/30 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(proj);
                      }}
                      className="flex-1 py-2 px-3 bg-[#C8A77A] hover:bg-[#D8C3AA] text-[#0B0B0A] text-[10px] font-mono font-bold uppercase rounded-lg transition-all flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
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
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-[#151514] hover:bg-[#C8A77A] text-[#C8A77A] hover:text-[#0B0B0A] border border-[#6F5B43]/50 transition-all cursor-pointer"
                          title="Open Live Preview"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg bg-[#151514] hover:bg-[#C8A77A] text-[#C8A77A] hover:text-[#0B0B0A] border border-[#6F5B43]/50 transition-all cursor-pointer"
                        title="GitHub Repository"
                      >
                        <FolderGit2 className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* =========================================================== */}
                {/* 2. BACK FACE (rotateY(180deg), backface-visibility: hidden) */}
                {/* Mirrored reverse side so rear cards remain 100% visible!   */}
                {/* =========================================================== */}
                <div
                  className={`absolute inset-0 rounded-2xl border-2 bg-[#222120]/95 backdrop-blur-xl p-5 flex flex-col justify-between shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-colors duration-300 ${
                    isCurrent
                      ? 'border-[#C8A77A] ring-1 ring-[#C8A77A]/50 shadow-[0_0_35px_rgba(200,167,122,0.25)]'
                      : 'border-[#6F5B43]/50 hover:border-[#C8A77A]/80'
                  }`}
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    WebkitBackfaceVisibility: 'hidden',
                  }}
                >
                  {/* Top: Landscape Preview Frame */}
                  <div className="w-full aspect-[16/10] rounded-xl bg-[#151514] border border-[#6F5B43]/40 overflow-hidden relative group">
                    {proj.images && proj.images.length > 0 && proj.images[0].url ? (
                      <img
                        src={proj.images[0].url}
                        alt={proj.name}
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center relative overflow-hidden bg-gradient-to-br from-[#1c1b1a] to-[#121211]">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6F5B4315_1px,transparent_1px),linear-gradient(to_bottom,#6F5B4315_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />
                        <div className="p-2.5 rounded-lg bg-[#222120] border border-[#6F5B43]/40 text-[#C8A77A] mb-2 shadow-sm">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <span className="text-[9px] font-mono tracking-widest uppercase text-[#C8A77A] font-bold">
                          PREVIEW SCREENSHOT
                        </span>
                        <span className="text-[8px] font-mono text-[#A9A39D] mt-0.5 max-w-[170px] truncate">
                          {proj.name}
                        </span>
                      </div>
                    )}

                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#0B0B0A]/85 backdrop-blur-md border border-[#6F5B43]/50 text-[9px] font-mono text-[#C8A77A] font-bold">
                      0{idx + 1}
                    </div>

                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-[#0B0B0A]/85 backdrop-blur-md border border-[#6F5B43]/50 text-[8px] font-mono text-[#A9A39D] uppercase">
                      {proj.typeLabel.split('/')[0].trim()}
                    </div>
                  </div>

                  {/* Middle: Title & Details */}
                  <div className="space-y-2 py-1">
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A77A]" />
                      <span className="text-[9px] font-mono text-[#A9A39D] uppercase tracking-wider">
                        {proj.categoryLabel.split('//')[0]?.trim() || 'PROJECT'}
                      </span>
                    </div>

                    <h3
                      className="text-lg sm:text-xl font-bold uppercase tracking-tight text-[#E9E3DC] line-clamp-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      {proj.name}
                    </h3>

                    <p
                      className="text-[11px] sm:text-xs text-[#A9A39D] font-light line-clamp-2 leading-relaxed"
                      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                    >
                      {proj.shortDescription}
                    </p>
                  </div>

                  {/* Bottom: Action Buttons */}
                  <div className="pt-3 border-t border-[#6F5B43]/30 flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(proj);
                      }}
                      className="flex-1 py-2 px-3 bg-[#C8A77A] hover:bg-[#D8C3AA] text-[#0B0B0A] text-[10px] font-mono font-bold uppercase rounded-lg transition-all flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
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
                          onClick={(e) => e.stopPropagation()}
                          className="p-2 rounded-lg bg-[#151514] hover:bg-[#C8A77A] text-[#C8A77A] hover:text-[#0B0B0A] border border-[#6F5B43]/50 transition-all cursor-pointer"
                          title="Open Live Preview"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-lg bg-[#151514] hover:bg-[#C8A77A] text-[#C8A77A] hover:text-[#0B0B0A] border border-[#6F5B43]/50 transition-all cursor-pointer"
                        title="GitHub Repository"
                      >
                        <FolderGit2 className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CylinderCarousel3D;
