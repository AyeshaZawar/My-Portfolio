import React, { useState, useEffect } from 'react';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  Eye,
  EyeOff,
  FolderGit2,
  Layers,
  Sparkles,
  BookOpen,
  Loader2,
  AlertTriangle,
  MoveUp,
  MoveDown
} from 'lucide-react';
import {
  getAdminProjects,
  togglePublishProject,
  deleteAdminProject,
  reorderAdminProjects
} from '../../services/api';

interface ProjectListProps {
  initialCategory?: string;
  onAddNew: () => void;
  onEditProject: (id: string) => void;
  onViewProjectOnSite: (category: string, slug: string) => void;
}

export const ProjectList: React.FC<ProjectListProps> = ({
  initialCategory = 'all',
  onAddNew,
  onEditProject,
  onViewProjectOnSite,
}) => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [reordering, setReordering] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const cat = selectedCategory === 'all' ? undefined : selectedCategory;
      const pub = statusFilter === 'all' ? undefined : statusFilter === 'published';
      const data = await getAdminProjects(cat, searchQuery || undefined, pub);
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching admin projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [selectedCategory, statusFilter]);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProjects();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleTogglePublish = async (id: string) => {
    try {
      await togglePublishProject(id);
      fetchProjects();
    } catch (err) {
      console.error('Error toggling publish:', err);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      setDeleting(true);
      await deleteAdminProject(deleteTarget.id);
      setDeleteTarget(null);
      fetchProjects();
    } catch (err: any) {
      alert(err.message || 'Failed to delete project.');
    } finally {
      setDeleting(false);
    }
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const newIdx = direction === 'up' ? index - 1 : index + 1;
    if (newIdx < 0 || newIdx >= projects.length) return;

    const reordered = [...projects];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(newIdx, 0, moved);
    setProjects(reordered);

    try {
      setReordering(true);
      const ids = reordered.map((p) => p.id);
      await reorderAdminProjects(ids);
    } catch (err) {
      console.error('Error updating order:', err);
      fetchProjects();
    } finally {
      setReordering(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#6F5B43]/30">
        <div>
          <h2
            className="text-3xl uppercase tracking-tight text-[#E9E3DC]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            PROJECT <span className="text-[#C8A77A]">DIRECTORY</span>
          </h2>
        </div>

        <button
          onClick={onAddNew}
          className="px-4 py-2.5 rounded-xl bg-[#C8A77A] hover:bg-[#b59265] text-[#0B0B0A] text-xs font-mono uppercase font-bold flex items-center space-x-1.5 transition-all shadow-md cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>ADD NEW PROJECT</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#151514] p-4 rounded-2xl border border-[#6F5B43]/40">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#A9A39D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, technology, or description..."
            className="w-full pl-10 pr-4 py-2 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] placeholder-[#6F5B43] focus:outline-none focus:border-[#C8A77A]"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#0B0B0A] p-1 rounded-xl border border-[#6F5B43]/30">
          {[
            { id: 'all', label: 'All' },
            { id: 'main', label: 'Main Projects' },
            { id: 'templates', label: 'Templates' },
            { id: 'learning', label: 'Learning' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#C8A77A] text-[#0B0B0A] font-bold shadow-sm'
                  : 'text-[#A9A39D] hover:text-[#E9E3DC]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Status Dropdown */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          className="bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl px-3 py-2 text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
        >
          <option value="all">Status: All</option>
          <option value="published">Published Only</option>
          <option value="draft">Drafts Only</option>
        </select>
      </div>

      {/* Projects Table */}
      <div className="bg-[#151514] border border-[#6F5B43]/40 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-[#C8A77A] animate-spin" />
            <span className="text-xs font-mono text-[#A9A39D] uppercase tracking-widest">
              QUERYING PROJECTS...
            </span>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-20 text-center space-y-3 px-4">
            <FolderGit2 className="w-10 h-10 text-[#6F5B43] mx-auto" />
            <h4
              className="text-lg uppercase text-[#E9E3DC]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              NO PROJECTS FOUND
            </h4>
            <p className="text-xs text-[#A9A39D] font-mono max-w-sm mx-auto">
              No portfolio items match your filter criteria. Try changing your search query or click "Add New Project".
            </p>
            <button
              onClick={onAddNew}
              className="mt-2 px-4 py-2 rounded-xl bg-[#C8A77A] text-[#0B0B0A] text-xs font-mono uppercase font-bold cursor-pointer"
            >
              CREATE FIRST PROJECT
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#6F5B43]/30 bg-[#1b1a19] text-[#C8A77A] uppercase">
                  <th className="py-3 px-4 w-12 text-center">Order</th>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Media Elements</th>
                  <th className="py-3 px-3">Live URLs</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#6F5B43]/20">
                {projects.map((p, idx) => {
                  const imgCount = p.images?.length || 0;
                  const vidCount = p.videos?.length || 0;
                  return (
                    <tr key={p.id} className="hover:bg-[#222120] transition-colors">
                      {/* Order Controls */}
                      <td className="py-3 px-2 text-center">
                        <div className="flex flex-col items-center justify-center space-y-0.5">
                          <button
                            disabled={idx === 0 || reordering}
                            onClick={() => handleMoveOrder(idx, 'up')}
                            className="p-1 hover:text-[#C8A77A] text-[#A9A39D] disabled:opacity-20 cursor-pointer"
                            title="Move up"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[10px] font-mono font-bold text-[#A9A39D]">
                            {idx + 1}
                          </span>
                          <button
                            disabled={idx === projects.length - 1 || reordering}
                            onClick={() => handleMoveOrder(idx, 'down')}
                            className="p-1 hover:text-[#C8A77A] text-[#A9A39D] disabled:opacity-20 cursor-pointer"
                            title="Move down"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Cover & Info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          {p.previewImage ? (
                            <img
                              src={p.previewImage}
                              alt=""
                              className="w-14 h-10 rounded-lg object-cover border border-[#6F5B43]/40 shrink-0 bg-black"
                            />
                          ) : (
                            <div className="w-14 h-10 rounded-lg bg-[#0B0B0A] border border-[#6F5B43]/40 flex items-center justify-center text-[9px] text-[#A9A39D] shrink-0">
                              NO COVER
                            </div>
                          )}
                          <span className="font-bold text-sm text-[#E9E3DC] block truncate max-w-xs sm:max-w-sm">
                            {p.title || p.name}
                          </span>
                        </div>
                      </td>

                      {/* Category Badge */}
                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold border ${
                            p.category === 'main'
                              ? 'bg-[#C8A77A]/15 text-[#C8A77A] border-[#C8A77A]/40'
                              : p.category === 'templates'
                              ? 'bg-blue-950/40 text-blue-300 border-blue-800/40'
                              : 'bg-purple-950/40 text-purple-300 border-purple-800/40'
                          }`}
                        >
                          {p.category === 'main' ? (
                            <Sparkles className="w-3 h-3" />
                          ) : p.category === 'templates' ? (
                            <Layers className="w-3 h-3" />
                          ) : (
                            <BookOpen className="w-3 h-3" />
                          )}
                          <span>
                            {p.category === 'main'
                              ? 'Main Project'
                              : p.category === 'templates'
                              ? 'Template'
                              : 'Learning'}
                          </span>
                        </span>
                      </td>

                      {/* Media Counts */}
                      <td className="py-3 px-3 text-[#A9A39D]">
                        <div className="space-y-0.5">
                          <span className="block">{imgCount} images</span>
                          <span className={vidCount > 0 ? 'text-[#C8A77A]' : 'text-[#6F5B43]'}>
                            {vidCount} videos
                          </span>
                        </div>
                      </td>

                      {/* Live Links */}
                      <td className="py-3 px-3 text-[11px]">
                        <div className="space-y-1">
                          {p.liveUrl ? (
                            <a
                              href={p.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-400 hover:underline flex items-center space-x-1 truncate max-w-[120px]"
                            >
                              <ExternalLink className="w-3 h-3 shrink-0" />
                              <span className="truncate">Live Deployment</span>
                            </a>
                          ) : (
                            <span className="text-[#6F5B43] block">No live URL</span>
                          )}

                          {p.githubUrl ? (
                            <a
                              href={p.githubUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[#C8A77A] hover:underline flex items-center space-x-1 truncate max-w-[120px]"
                            >
                              <ExternalLink className="w-3 h-3 shrink-0" />
                              <span className="truncate">GitHub Repo</span>
                            </a>
                          ) : null}
                        </div>
                      </td>

                      {/* Status Toggle */}
                      <td className="py-3 px-3">
                        <button
                          onClick={() => handleTogglePublish(p.id)}
                          className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold transition-all cursor-pointer ${
                            p.published !== false
                              ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 hover:bg-emerald-900/60'
                              : 'bg-amber-950/40 text-amber-400 border border-amber-800/40 hover:bg-amber-900/60'
                          }`}
                        >
                          {p.published !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                          <span>{p.published !== false ? 'PUBLISHED' : 'DRAFT'}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => onViewProjectOnSite(p.category, p.slug)}
                            title="Preview on site"
                            className="p-1.5 rounded-lg bg-[#222120] text-[#A9A39D] hover:text-[#C8A77A] border border-[#6F5B43]/40 cursor-pointer"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onEditProject(p.id)}
                            title="Edit Project"
                            className="p-1.5 rounded-lg bg-[#222120] text-[#A9A39D] hover:text-[#E9E3DC] hover:bg-[#333130] border border-[#6F5B43]/40 cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteTarget(p)}
                            title="Delete Project"
                            className="p-1.5 rounded-lg bg-[#222120] text-red-400 hover:text-red-200 hover:bg-red-950/50 border border-red-900/40 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#151514] border border-red-800/60 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-red-400">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/60 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold block text-red-400">
                  DELETION CONFIRMATION
                </span>
                <h3
                  className="text-xl uppercase font-bold text-[#E9E3DC]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  DELETE PORTFOLIO ITEM
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#A9A39D] font-mono leading-relaxed">
              Are you sure you want to permanently delete{' '}
              <strong className="text-[#E9E3DC]">
                "{deleteTarget.title || deleteTarget.name}"
              </strong>
              ? This action will remove the project and its attached gallery from MongoDB and the public site.
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                disabled={deleting}
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl bg-[#222120] text-[#E9E3DC] text-xs font-mono uppercase hover:bg-[#333130] cursor-pointer"
              >
                CANCEL
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono uppercase font-bold cursor-pointer disabled:opacity-50"
              >
                {deleting ? 'DELETING...' : 'YES, PERMANENTLY DELETE'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
