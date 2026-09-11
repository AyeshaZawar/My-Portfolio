import React, { useEffect, useState } from 'react';
import {
  FolderGit2,
  CheckCircle2,
  FileEdit,
  Users,
  Plus,
  ArrowUpRight,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';
import { getAdminStats, getAdminProjects, togglePublishProject } from '../../services/api';

interface DashboardOverviewProps {
  onNavigateToAddProject: () => void;
  onNavigateToProjects: (category?: string) => void;
  onNavigateToUsers: () => void;
  onEditProject: (projectId: string) => void;
  onViewPortfolio: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigateToAddProject,
  onNavigateToProjects,
  onNavigateToUsers,
  onEditProject,
  onViewPortfolio,
}) => {
  const [stats, setStats] = useState<any>(null);
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsData, projectsData] = await Promise.all([
        getAdminStats(),
        getAdminProjects(),
      ]);
      setStats(statsData);
      setRecentProjects((projectsData || []).slice(0, 5));
    } catch (err) {
      console.error('Error loading dashboard overview:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleTogglePublish = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await togglePublishProject(id);
      loadData();
    } catch (err) {
      console.error('Error toggling publish:', err);
    }
  };

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-[#C8A77A] animate-spin" />
        <span className="text-xs font-mono text-[#A9A39D] uppercase tracking-widest">
          LOADING PORTFOLIO METRICS...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#6F5B43]/30">
        <div>
          <h2
            className="text-3xl sm:text-4xl uppercase tracking-tight text-[#E9E3DC]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            PORTFOLIO <span className="text-[#C8A77A]">DASHBOARD</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onNavigateToAddProject}
            className="px-4 py-2.5 rounded-xl bg-[#C8A77A] hover:bg-[#b59265] text-[#0B0B0A] text-xs font-mono uppercase font-bold flex items-center space-x-1.5 transition-all shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>ADD NEW PROJECT</span>
          </button>

          <button
            onClick={onViewPortfolio}
            className="px-4 py-2.5 rounded-xl bg-[#151514] hover:bg-[#222120] text-[#E9E3DC] border border-[#6F5B43]/40 text-xs font-mono uppercase flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <span>PREVIEW SITE</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C8A77A]" />
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Projects */}
        <div 
          onClick={() => onNavigateToProjects()}
          className="p-5 rounded-2xl bg-[#151514] border border-[#6F5B43]/40 hover:border-[#C8A77A] transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between text-[#A9A39D] mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">TOTAL PROJECTS</span>
            <FolderGit2 className="w-4 h-4 text-[#C8A77A]" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#E9E3DC]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {stats?.totalProjects ?? 0}
          </div>
        </div>

        {/* Published */}
        <div 
          onClick={() => onNavigateToProjects()}
          className="p-5 rounded-2xl bg-[#151514] border border-[#6F5B43]/40 hover:border-[#C8A77A] transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between text-[#A9A39D] mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">PUBLIC LIVE</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {stats?.publishedProjects ?? 0}
          </div>
        </div>

        {/* Drafts */}
        <div 
          onClick={() => onNavigateToProjects()}
          className="p-5 rounded-2xl bg-[#151514] border border-[#6F5B43]/40 hover:border-[#C8A77A] transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between text-[#A9A39D] mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">DRAFTS</span>
            <FileEdit className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-amber-400" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {stats?.draftProjects ?? 0}
          </div>
        </div>

        {/* Admins */}
        <div 
          onClick={onNavigateToUsers}
          className="p-5 rounded-2xl bg-[#151514] border border-[#6F5B43]/40 hover:border-[#C8A77A] transition-all cursor-pointer group shadow-sm"
        >
          <div className="flex items-center justify-between text-[#A9A39D] mb-2">
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">ADMIN ACCOUNTS</span>
            <Users className="w-4 h-4 text-[#C8A77A]" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-[#E9E3DC]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            {stats?.totalAdmins ?? 1}
          </div>
        </div>
      </div>

      {/* Recent Projects Table */}
      <div className="bg-[#151514] border border-[#6F5B43]/40 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3
              className="text-xl uppercase tracking-tight text-[#E9E3DC]"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              RECENT PORTFOLIO PROJECTS
            </h3>
          </div>

          <button
            onClick={() => onNavigateToProjects()}
            className="text-xs font-mono text-[#C8A77A] hover:underline uppercase font-bold cursor-pointer"
          >
            VIEW ALL PROJECTS →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-[#6F5B43]/30 text-[#C8A77A] uppercase">
                <th className="pb-3 px-2">Project</th>
                <th className="pb-3 px-2">Category</th>
                <th className="pb-3 px-2">Media</th>
                <th className="pb-3 px-2">Status</th>
                <th className="pb-3 px-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#6F5B43]/20">
              {recentProjects.map((p) => {
                const imgCount = p.images?.length || 0;
                const vidCount = p.videos?.length || 0;
                return (
                  <tr
                    key={p.id}
                    onClick={() => onEditProject(p.id)}
                    className="hover:bg-[#222120] transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-2 font-medium text-[#E9E3DC] flex items-center space-x-3">
                      {p.previewImage ? (
                        <img
                          src={p.previewImage}
                          alt=""
                          className="w-10 h-7 rounded object-cover border border-[#6F5B43]/40 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-7 rounded bg-[#0B0B0A] border border-[#6F5B43]/40 flex items-center justify-center text-[9px] text-[#A9A39D] shrink-0">
                          N/A
                        </div>
                      )}
                      <span className="font-bold text-sm text-[#E9E3DC] truncate max-w-xs block">
                        {p.title || p.name}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] uppercase font-bold bg-[#222120] text-[#C8A77A] border border-[#6F5B43]/40">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-[#A9A39D]">
                      <span>{imgCount} imgs</span>
                      {vidCount > 0 && <span className="text-[#C8A77A] ml-1">· {vidCount} vids</span>}
                    </td>
                    <td className="py-3 px-2">
                      <button
                        onClick={(e) => handleTogglePublish(p.id, e)}
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
                    <td className="py-3 px-2 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditProject(p.id);
                        }}
                        className="px-2.5 py-1 rounded bg-[#222120] hover:bg-[#C8A77A] hover:text-[#0B0B0A] text-[#C8A77A] transition-colors"
                      >
                        EDIT
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
