import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Upload,
  Image as ImageIcon,
  Video as VideoIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MoveUp,
  MoveDown,
  Sparkles,
  Layers,
  BookOpen
} from 'lucide-react';
import {
  createAdminProject,
  updateAdminProject,
  getAdminProjectById,
  uploadMedia
} from '../../services/api';

interface ProjectFormProps {
  projectId?: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

interface DynamicMedia {
  id: string;
  type: 'image' | 'video';
  title: string;
  caption?: string;
  url: string;
  aspectRatio?: string;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  projectId,
  onSuccess,
  onCancel,
}) => {
  const isEditing = Boolean(projectId);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<'main' | 'templates' | 'learning'>('main');
  const [categoryLabel, setCategoryLabel] = useState('');
  const [typeLabel, setTypeLabel] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  const [demonstrates, setDemonstrates] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [images, setImages] = useState<DynamicMedia[]>([]);
  const [videos, setVideos] = useState<DynamicMedia[]>([]);
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [technologiesText, setTechnologiesText] = useState('');
  const [featuresText, setFeaturesText] = useState('');
  const [published, setPublished] = useState(true);
  const [order, setOrder] = useState(0);

  // UI state
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Auto slug generation on title typing if adding new
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing && (!slug || slug === title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, ''))) {
      setSlug(
        val
          .toLowerCase()
          .trim()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
      );
    }
  };

  // Load existing project if editing
  useEffect(() => {
    if (!projectId) return;

    const loadProject = async () => {
      try {
        setLoading(true);
        const data = await getAdminProjectById(projectId);
        if (data) {
          setTitle(data.title || data.name || '');
          setSubtitle(data.subtitle || data.typeLabel || '');
          setSlug(data.slug || '');
          setCategory(data.category || 'main');
          setCategoryLabel(data.categoryLabel || '');
          setTypeLabel(data.typeLabel || '');
          setShortDescription(data.shortDescription || '');
          setDetailedDescription(data.detailedDescription || '');
          setDemonstrates(data.demonstrates || '');
          setPreviewImage(data.previewImage || '');
          setImages(data.images || []);
          setVideos(data.videos || []);
          setGithubUrl(data.githubUrl || '');
          setLiveUrl(data.liveUrl || '');
          setTechnologiesText((data.technologies || []).join(', '));
          setFeaturesText((data.features || []).join('\n'));
          setPublished(data.published !== false);
          setOrder(data.order || 0);
        }
      } catch (err: any) {
        setError(err.message || 'Failed to load project details.');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [projectId]);

  // Handle Cover Upload
  const handleCoverFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingCover(true);
      const res = await uploadMedia(file);
      setPreviewImage(res.url);
    } catch (err: any) {
      alert(err.message || 'Cover upload failed.');
    } finally {
      setUploadingCover(false);
    }
  };

  // ================= DYNAMIC IMAGES HANDLERS =================
  const handleAddImage = () => {
    const newImg: DynamicMedia = {
      id: `img_${Date.now()}_${images.length}`,
      type: 'image',
      title: `Screenshot ${images.length + 1}`,
      caption: '',
      url: '',
      aspectRatio: '16/9',
    };
    setImages([...images, newImg]);
  };

  const handleUpdateImage = (index: number, updates: Partial<DynamicMedia>) => {
    const updated = [...images];
    updated[index] = { ...updated[index], ...updates };
    setImages(updated);
  };

  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= images.length) return;
    const reordered = [...images];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIdx, 0, moved);
    setImages(reordered);
  };

  const handleImageFileUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await uploadMedia(file);
      handleUpdateImage(index, { url: res.url, title: res.originalName });
    } catch (err: any) {
      alert(err.message || 'Image upload failed.');
    }
  };

  // ================= DYNAMIC VIDEOS HANDLERS =================
  const handleAddVideo = () => {
    const newVid: DynamicMedia = {
      id: `vid_${Date.now()}_${videos.length}`,
      type: 'video',
      title: `Demo Video ${videos.length + 1}`,
      caption: '',
      url: '',
      aspectRatio: '16/9',
    };
    setVideos([...videos, newVid]);
  };

  const handleUpdateVideo = (index: number, updates: Partial<DynamicMedia>) => {
    const updated = [...videos];
    updated[index] = { ...updated[index], ...updates };
    setVideos(updated);
  };

  const handleRemoveVideo = (index: number) => {
    const updated = videos.filter((_, i) => i !== index);
    setVideos(updated);
  };

  const handleMoveVideo = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= videos.length) return;
    const reordered = [...videos];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIdx, 0, moved);
    setVideos(reordered);
  };

  const handleVideoFileUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const res = await uploadMedia(file);
      handleUpdateVideo(index, { url: res.url, title: res.originalName });
    } catch (err: any) {
      alert(err.message || 'Video upload failed.');
    }
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessNotice(null);

    if (!title.trim()) {
      setError('Please provide a project title.');
      return;
    }

    if (!githubUrl.trim()) {
      setError('Please provide a GitHub repository URL.');
      return;
    }

    const payload = {
      title: title.trim(),
      name: title.trim(),
      subtitle: subtitle.trim(),
      slug: slug.trim() || undefined,
      category,
      categoryLabel: categoryLabel.trim() || undefined,
      typeLabel: typeLabel.trim() || subtitle.trim() || undefined,
      shortDescription: shortDescription.trim(),
      detailedDescription: detailedDescription.trim() || shortDescription.trim(),
      demonstrates: demonstrates.trim() || undefined,
      previewImage: previewImage.trim(),
      images,
      videos,
      githubUrl: githubUrl.trim(),
      liveUrl: liveUrl.trim(),
      technologies: technologiesText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      features: featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
      published,
      order: Number(order) || 0,
    };

    try {
      setSaving(true);
      if (isEditing && projectId) {
        await updateAdminProject(projectId, payload);
        setSuccessNotice('Project updated successfully.');
      } else {
        await createAdminProject(payload);
        setSuccessNotice('Project created and published successfully.');
      }

      setTimeout(() => {
        onSuccess();
      }, 700);
    } catch (err: any) {
      setError(err.message || 'Failed to save project. Please check required fields.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#C8A77A] animate-spin" />
        <span className="text-xs font-mono text-[#A9A39D] uppercase tracking-widest">
          FETCHING PROJECT SPECIFICATIONS...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#6F5B43]/30">
        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="p-2 rounded-xl bg-[#151514] border border-[#6F5B43]/40 text-[#A9A39D] hover:text-[#C8A77A] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2
              className="text-3xl uppercase tracking-tight text-[#E9E3DC]"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {isEditing ? 'EDIT' : 'ADD NEW'} <span className="text-[#C8A77A]">PORTFOLIO PROJECT</span>
            </h2>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-[#151514] hover:bg-[#222120] text-[#A9A39D] text-xs font-mono uppercase transition-colors cursor-pointer border border-[#6F5B43]/30"
          >
            CANCEL
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-[#C8A77A] hover:bg-[#b59265] text-[#0B0B0A] text-xs font-mono uppercase font-bold flex items-center space-x-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>SAVING TO MONGODB...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'UPDATE PROJECT' : 'SAVE & PUBLISH'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs font-mono flex items-start space-x-2.5">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {successNotice && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 text-xs font-mono flex items-start space-x-2.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <span>{successNotice}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ============================================================= */}
        {/* SECTION 1: PROJECT BASIC INFORMATION & CATEGORY SELECTION     */}
        {/* ============================================================= */}
        <div className="bg-[#151514] border border-[#6F5B43]/40 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-[#6F5B43]/30 pb-3">
            <span className="text-xs font-mono uppercase text-[#C8A77A] tracking-wider font-bold block">
              01 // CORE SPECIFICATIONS &amp; CATEGORY
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Selector Cards */}
            <div
              onClick={() => setCategory('main')}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center space-x-2.5 ${
                category === 'main'
                  ? 'bg-[#222120] border-[#C8A77A] shadow-md ring-1 ring-[#C8A77A]'
                  : 'bg-[#0B0B0A] border-[#6F5B43]/30 hover:border-[#6F5B43]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#C8A77A]" />
              <span className="text-xs font-mono uppercase font-bold text-[#E9E3DC]">1. MAIN PROJECTS</span>
            </div>

            <div
              onClick={() => setCategory('templates')}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center space-x-2.5 ${
                category === 'templates'
                  ? 'bg-[#222120] border-[#C8A77A] shadow-md ring-1 ring-[#C8A77A]'
                  : 'bg-[#0B0B0A] border-[#6F5B43]/30 hover:border-[#6F5B43]'
              }`}
            >
              <Layers className="w-4 h-4 text-[#C8A77A]" />
              <span className="text-xs font-mono uppercase font-bold text-[#E9E3DC]">2. TEMPLATES</span>
            </div>

            <div
              onClick={() => setCategory('learning')}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center space-x-2.5 ${
                category === 'learning'
                  ? 'bg-[#222120] border-[#C8A77A] shadow-md ring-1 ring-[#C8A77A]'
                  : 'bg-[#0B0B0A] border-[#6F5B43]/30 hover:border-[#6F5B43]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#C8A77A]" />
              <span className="text-xs font-mono uppercase font-bold text-[#E9E3DC]">3. LEARNING</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold mb-1.5">
                Project Title <span className="text-[#C8A77A]">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. BNB — Bucks n Bricks"
                required
                className="w-full px-3.5 py-2.5 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
              />
            </div>

            {/* Subtitle / Type Label */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold mb-1.5">
                Subtitle / Architecture Type
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Full-Stack Construction & Architecture Platform"
                className="w-full px-3.5 py-2.5 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold mb-1.5">
                URL Slug <span className="text-[#C8A77A]">*</span>
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. bnb-bucks-n-bricks"
                required
                className="w-full px-3.5 py-2.5 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
              />
              <span className="text-[10px] font-mono text-[#A9A39D] mt-1 block">
                Accessible at: /projects/{category}/{slug || 'your-slug'}
              </span>
            </div>

            {/* Category Label override */}
            <div>
              <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold mb-1.5">
                Category Eyebrow Badge
              </label>
              <input
                type="text"
                value={categoryLabel}
                onChange={(e) => setCategoryLabel(e.target.value)}
                placeholder="e.g. Flagship Full-Stack Platform"
                className="w-full px-3.5 py-2.5 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
              />
            </div>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold mb-1.5">
              Short Description (Card Summary) <span className="text-[#C8A77A]">*</span>
            </label>
            <textarea
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Concise overview displayed on project cards..."
              required
              className="w-full p-3 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
            />
          </div>

          {/* Detailed Description */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold mb-1.5">
              Detailed Description &amp; Technical Breakdown
            </label>
            <textarea
              rows={4}
              value={detailedDescription}
              onChange={(e) => setDetailedDescription(e.target.value)}
              placeholder="In-depth explanation rendered on the project detail page..."
              className="w-full p-3 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
            />
          </div>

          {/* Demonstrates (Especially for Learning Category) */}
          <div>
            <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold mb-1.5">
              What This Project Demonstrates (Algorithmic / Architecture Mastery)
            </label>
            <input
              type="text"
              value={demonstrates}
              onChange={(e) => setDemonstrates(e.target.value)}
              placeholder="e.g. Object-Oriented Architecture, Python recursion, and Gemini AI agent integration"
              className="w-full px-3.5 py-2.5 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
            />
          </div>
        </div>

        {/* ============================================================= */}
        {/* SECTION 2: COVER / PREVIEW IMAGE                              */}
        {/* ============================================================= */}
        <div className="bg-[#151514] border border-[#6F5B43]/40 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-[#6F5B43]/30 pb-3">
            <span className="text-xs font-mono uppercase text-[#C8A77A] tracking-wider font-bold block">
              02 // PRIMARY PREVIEW / COVER IMAGE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
            <div className="md:col-span-2 space-y-3">
              <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold">
                Cover Image URL or Local File Upload
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={previewImage}
                  onChange={(e) => setPreviewImage(e.target.value)}
                  placeholder="https://... or /projects/main/cover.png"
                  className="flex-1 px-3.5 py-2.5 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
                />
                <label className="px-3.5 py-2.5 rounded-xl bg-[#222120] hover:bg-[#2a2927] border border-[#6F5B43]/40 text-[#C8A77A] text-xs font-mono uppercase cursor-pointer flex items-center space-x-1.5 shrink-0">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploadingCover ? 'UPLOADING...' : 'UPLOAD'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Preview Thumbnail */}
            <div className="h-32 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl overflow-hidden flex items-center justify-center relative">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview Cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-3 text-[#6F5B43]">
                  <ImageIcon className="w-8 h-8 mx-auto mb-1 opacity-50" />
                  <span className="text-[10px] font-mono uppercase">No preview set</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* SECTION 3: DYNAMIC IMAGES GALLERY (UNLIMITED)                 */}
        {/* ============================================================= */}
        <div className="bg-[#151514] border border-[#6F5B43]/40 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#6F5B43]/30 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-[#C8A77A] tracking-wider font-bold block">
                03 // DYNAMIC IMAGES GALLERY ({images.length} ATTACHED)
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddImage}
              className="px-3.5 py-1.5 rounded-lg bg-[#C8A77A] hover:bg-[#b59265] text-[#0B0B0A] text-xs font-mono uppercase font-bold flex items-center space-x-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD IMAGE</span>
            </button>
          </div>

          {images.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#0B0B0A] border border-dashed border-[#6F5B43]/40 text-center text-xs font-mono text-[#A9A39D] space-y-2">
              <ImageIcon className="w-8 h-8 text-[#6F5B43] mx-auto" />
              <p>No extra gallery screenshots added yet.</p>
              <button
                type="button"
                onClick={handleAddImage}
                className="text-[#C8A77A] hover:underline uppercase font-bold cursor-pointer"
              >
                + CLICK TO ADD FIRST SCREENSHOT
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {images.map((img, idx) => (
                <div
                  key={img.id || idx}
                  className="p-4 rounded-xl bg-[#0B0B0A] border border-[#6F5B43]/40 flex flex-col md:flex-row items-start md:items-center gap-4"
                >
                  {/* Thumbnail */}
                  <div className="w-24 h-16 rounded-lg bg-[#151514] border border-[#6F5B43]/30 overflow-hidden shrink-0 flex items-center justify-center">
                    {img.url ? (
                      <img
                        src={img.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-5 h-5 text-[#6F5B43]" />
                    )}
                  </div>

                  {/* Fields */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                    <div>
                      <label className="block text-[10px] font-mono text-[#A9A39D] uppercase mb-1">
                        Title / Label
                      </label>
                      <input
                        type="text"
                        value={img.title}
                        onChange={(e) => handleUpdateImage(idx, { title: e.target.value })}
                        placeholder="e.g. Dashboard Overview"
                        className="w-full px-2.5 py-1.5 bg-[#151514] border border-[#6F5B43]/40 rounded-lg text-xs font-mono text-[#E9E3DC]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#A9A39D] uppercase mb-1">
                        Image URL
                      </label>
                      <input
                        type="text"
                        value={img.url}
                        onChange={(e) => handleUpdateImage(idx, { url: e.target.value })}
                        placeholder="https://... or /projects/img.png"
                        className="w-full px-2.5 py-1.5 bg-[#151514] border border-[#6F5B43]/40 rounded-lg text-xs font-mono text-[#E9E3DC]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#A9A39D] uppercase mb-1">
                        Upload or Caption
                      </label>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={img.caption || ''}
                          onChange={(e) => handleUpdateImage(idx, { caption: e.target.value })}
                          placeholder="Caption..."
                          className="flex-1 px-2.5 py-1.5 bg-[#151514] border border-[#6F5B43]/40 rounded-lg text-xs font-mono text-[#E9E3DC]"
                        />
                        <label className="px-2.5 py-1.5 bg-[#222120] hover:bg-[#2a2927] text-[#C8A77A] text-[10px] font-mono rounded-lg border border-[#6F5B43]/40 cursor-pointer flex items-center justify-center shrink-0">
                          <Upload className="w-3 h-3" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFileUpload(idx, e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Reorder */}
                  <div className="flex items-center space-x-1 shrink-0 self-end md:self-center">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveImage(idx, 'up')}
                      className="p-1.5 text-[#A9A39D] hover:text-[#C8A77A] disabled:opacity-20 cursor-pointer"
                      title="Move up"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === images.length - 1}
                      onClick={() => handleMoveImage(idx, 'down')}
                      className="p-1.5 text-[#A9A39D] hover:text-[#C8A77A] disabled:opacity-20 cursor-pointer"
                      title="Move down"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="p-1.5 text-red-400 hover:text-red-200 cursor-pointer"
                      title="Remove image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ============================================================= */}
        {/* SECTION 4: DYNAMIC VIDEOS GALLERY (UNLIMITED)                 */}
        {/* ============================================================= */}
        <div className="bg-[#151514] border border-[#6F5B43]/40 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#6F5B43]/30 pb-3">
            <div>
              <span className="text-xs font-mono uppercase text-[#C8A77A] tracking-wider font-bold block">
                04 // DYNAMIC VIDEOS GALLERY ({videos.length} ATTACHED)
              </span>
            </div>

            <button
              type="button"
              onClick={handleAddVideo}
              className="px-3.5 py-1.5 rounded-lg bg-[#C8A77A] hover:bg-[#b59265] text-[#0B0B0A] text-xs font-mono uppercase font-bold flex items-center space-x-1.5 cursor-pointer shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD VIDEO</span>
            </button>
          </div>

          {videos.length === 0 ? (
            <div className="p-8 rounded-xl bg-[#0B0B0A] border border-dashed border-[#6F5B43]/40 text-center text-xs font-mono text-[#A9A39D] space-y-2">
              <VideoIcon className="w-8 h-8 text-[#6F5B43] mx-auto" />
              <p>No video recordings attached yet.</p>
              <button
                type="button"
                onClick={handleAddVideo}
                className="text-[#C8A77A] hover:underline uppercase font-bold cursor-pointer"
              >
                + CLICK TO ADD FIRST DEMO VIDEO
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {videos.map((vid, idx) => (
                <div
                  key={vid.id || idx}
                  className="p-4 rounded-xl bg-[#0B0B0A] border border-[#6F5B43]/40 flex flex-col md:flex-row items-start md:items-center gap-4"
                >
                  {/* Video Preview or Placeholder */}
                  <div className="w-24 h-16 rounded-lg bg-[#151514] border border-[#6F5B43]/30 overflow-hidden shrink-0 flex items-center justify-center">
                    {vid.url ? (
                      <video
                        src={vid.url}
                        className="w-full h-full object-cover"
                        muted
                      />
                    ) : (
                      <VideoIcon className="w-5 h-5 text-[#6F5B43]" />
                    )}
                  </div>

                  {/* Fields */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
                    <div>
                      <label className="block text-[10px] font-mono text-[#A9A39D] uppercase mb-1">
                        Video Title
                      </label>
                      <input
                        type="text"
                        value={vid.title}
                        onChange={(e) => handleUpdateVideo(idx, { title: e.target.value })}
                        placeholder="e.g. Architecture Tour"
                        className="w-full px-2.5 py-1.5 bg-[#151514] border border-[#6F5B43]/40 rounded-lg text-xs font-mono text-[#E9E3DC]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#A9A39D] uppercase mb-1">
                        Video MP4/WEBM URL
                      </label>
                      <input
                        type="text"
                        value={vid.url}
                        onChange={(e) => handleUpdateVideo(idx, { url: e.target.value })}
                        placeholder="/videos/demo.mp4 or https://..."
                        className="w-full px-2.5 py-1.5 bg-[#151514] border border-[#6F5B43]/40 rounded-lg text-xs font-mono text-[#E9E3DC]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-[#A9A39D] uppercase mb-1">
                        Upload Video
                      </label>
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          value={vid.caption || ''}
                          onChange={(e) => handleUpdateVideo(idx, { caption: e.target.value })}
                          placeholder="Caption..."
                          className="flex-1 px-2.5 py-1.5 bg-[#151514] border border-[#6F5B43]/40 rounded-lg text-xs font-mono text-[#E9E3DC]"
                        />
                        <label className="px-2.5 py-1.5 bg-[#222120] hover:bg-[#2a2927] text-[#C8A77A] text-[10px] font-mono rounded-lg border border-[#6F5B43]/40 cursor-pointer flex items-center justify-center shrink-0">
                          <Upload className="w-3 h-3" />
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => handleVideoFileUpload(idx, e)}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Reorder */}
                  <div className="flex items-center space-x-1 shrink-0 self-end md:self-center">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveVideo(idx, 'up')}
                      className="p-1.5 text-[#A9A39D] hover:text-[#C8A77A] disabled:opacity-20 cursor-pointer"
                      title="Move up"
                    >
                      <MoveUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === videos.length - 1}
                      onClick={() => handleMoveVideo(idx, 'down')}
                      className="p-1.5 text-[#A9A39D] hover:text-[#C8A77A] disabled:opacity-20 cursor-pointer"
                      title="Move down"
                    >
                      <MoveDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveVideo(idx)}
                      className="p-1.5 text-red-400 hover:text-red-200 cursor-pointer"
                      title="Remove video"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ============================================================= */}
        {/* SECTION 5: REPOSITORIES, DEPLOYMENTS & LIVE PREVIEW URLS      */}
        {/* ============================================================= */}
        <div className="bg-[#151514] border border-[#6F5B43]/40 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-[#6F5B43]/30 pb-3">
            <span className="text-xs font-mono uppercase text-[#C8A77A] tracking-wider font-bold block">
              05 // DEPLOYMENT &amp; SOURCE CODE LINKS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold mb-1.5">
                GitHub Repository URL <span className="text-[#C8A77A]">*</span>
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/AyeshaZawar/your-repo"
                required
                className="w-full px-3.5 py-2.5 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold mb-1.5">
                Live Deployment / Vercel Preview URL
              </label>
              <input
                type="url"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                placeholder="https://your-project.vercel.app"
                className="w-full px-3.5 py-2.5 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
              />
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* SECTION 6: TECHNOLOGIES & KEY FEATURES                        */}
        {/* ============================================================= */}
        <div className="bg-[#151514] border border-[#6F5B43]/40 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="border-b border-[#6F5B43]/30 pb-3">
            <span className="text-xs font-mono uppercase text-[#C8A77A] tracking-wider font-bold block">
              06 // STACK &amp; HIGHLIGHTS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold mb-1.5">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={technologiesText}
                onChange={(e) => setTechnologiesText(e.target.value)}
                placeholder="React, TypeScript, Next.js, Tailwind CSS, Supabase"
                className="w-full px-3.5 py-2.5 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold mb-1.5">
                Verified Features (one per line)
              </label>
              <textarea
                rows={3}
                value={featuresText}
                onChange={(e) => setFeaturesText(e.target.value)}
                placeholder="Interactive 3D Preview&#10;ATS Resume Scoring Engine&#10;Custom Admin Controls"
                className="w-full p-2.5 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
              />
            </div>
          </div>
        </div>

        {/* ============================================================= */}
        {/* SECTION 7: PUBLISHING STATUS & ORDERING                       */}
        {/* ============================================================= */}
        <div className="bg-[#151514] border border-[#6F5B43]/40 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="border-b border-[#6F5B43]/30 pb-3">
            <span className="text-xs font-mono uppercase text-[#C8A77A] tracking-wider font-bold block">
              07 // PUBLISHING CONTROLS &amp; ORDER
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-6">
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-5 h-5 rounded border-[#6F5B43]/50 text-[#C8A77A] focus:ring-[#C8A77A] bg-[#0B0B0A]"
              />
              <div>
                <span className="text-xs font-mono uppercase font-bold text-[#E9E3DC] block">
                  Publish to Public Website
                </span>
                <span className="text-[10px] font-mono text-[#A9A39D]">
                  {published
                    ? 'Active: Public visitors can view and interact with this project.'
                    : 'Draft: Only visible in Admin Dashboard.'}
                </span>
              </div>
            </label>

            <div className="flex items-center space-x-2">
              <label className="text-xs font-mono uppercase text-[#A9A39D]">
                Display Order:
              </label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                className="w-20 px-3 py-1.5 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] text-center"
              />
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl bg-[#151514] hover:bg-[#222120] text-[#A9A39D] text-xs font-mono uppercase transition-colors cursor-pointer border border-[#6F5B43]/30"
          >
            CANCEL
          </button>

          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-[#C8A77A] hover:bg-[#b59265] text-[#0B0B0A] text-xs font-mono uppercase font-bold flex items-center space-x-2 transition-all shadow-md cursor-pointer disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>SAVING TO MONGODB...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>{isEditing ? 'UPDATE PROJECT' : 'SAVE & PUBLISH'}</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
