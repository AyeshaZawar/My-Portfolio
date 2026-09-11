import React, { useState } from 'react';
import {
  LayoutDashboard,
  FolderGit2,
  PlusCircle,
  Mail,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Shield,
  Menu,
  X,
  UserCheck
} from 'lucide-react';

export type AdminTab = 'dashboard' | 'projects' | 'add-project' | 'messages' | 'users' | 'settings';

interface AdminLayoutProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  adminUser: any;
  unreadCount?: number;
  onLogout: () => void;
  onViewPortfolio: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onSelectTab,
  adminUser,
  unreadCount = 0,
  onLogout,
  onViewPortfolio,
  children,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isSuperAdmin = adminUser?.role === 'SUPER_ADMIN';

  const navItems = [
    { id: 'dashboard' as AdminTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'projects' as AdminTab, label: 'Projects', icon: FolderGit2 },
    { id: 'add-project' as AdminTab, label: 'Add Project', icon: PlusCircle },
    { id: 'messages' as AdminTab, label: 'Messages', icon: Mail, badge: unreadCount },
    ...(isSuperAdmin
      ? [{ id: 'users' as AdminTab, label: 'Admin Management', icon: Users }]
      : []),
    { id: 'settings' as AdminTab, label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (tab: AdminTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0B0A] text-[#E9E3DC] font-sans flex flex-col md:flex-row selection:bg-[#C8A77A] selection:text-[#0B0B0A]">
      {/* Mobile Top Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-[#151514] border-b border-[#6F5B43]/40 sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[#222120] border border-[#6F5B43]/40 flex items-center justify-center text-[#C8A77A]">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider font-mono text-[#E9E3DC] block">
              PORTFOLIO CMS
            </span>
            <span className="text-[10px] font-mono text-[#C8A77A]">
              {adminUser?.role === 'SUPER_ADMIN' ? 'SUPER ADMIN' : 'ADMIN'}
            </span>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-[#222120] text-[#E9E3DC] border border-[#6F5B43]/40"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-[#151514] border-r border-[#6F5B43]/30 flex flex-col justify-between p-5 z-40 transition-transform duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Logo / Brand */}
          <div className="pb-4 border-b border-[#6F5B43]/30 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#222120] border border-[#6F5B43]/50 flex items-center justify-center text-[#C8A77A] shadow-inner">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#C8A77A] uppercase font-bold block">
                ADMINISTRATION
              </span>
              <h1
                className="text-base font-bold uppercase text-[#E9E3DC] tracking-tight"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                PORTFOLIO CMS
              </h1>
            </div>
          </div>

          {/* User Badge */}
          <div className="p-3 rounded-xl bg-[#0B0B0A] border border-[#6F5B43]/30 flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#222120] text-[#C8A77A] flex items-center justify-center font-mono text-xs font-bold">
              <UserCheck className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <span className="text-xs font-medium text-[#E9E3DC] block truncate">
                {adminUser?.name || 'Administrator'}
              </span>
              <span
                className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase ${
                  isSuperAdmin
                    ? 'bg-[#C8A77A]/20 text-[#C8A77A]'
                    : 'bg-zinc-800 text-zinc-300'
                }`}
              >
                {adminUser?.role}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <span className="text-[10px] font-mono tracking-widest text-[#6F5B43] uppercase block px-3 mb-2 font-semibold">
              NAVIGATION
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#C8A77A] text-[#0B0B0A] font-bold shadow-md'
                      : 'text-[#A9A39D] hover:text-[#E9E3DC] hover:bg-[#222120]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold leading-none ${
                        isActive
                          ? 'bg-[#0B0B0A] text-[#C8A77A]'
                          : 'bg-[#C8A77A] text-[#0B0B0A]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-[#6F5B43]/30 space-y-2">
          <button
            onClick={onViewPortfolio}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg bg-[#222120] text-[#C8A77A] hover:bg-[#2a2927] text-xs font-mono uppercase border border-[#6F5B43]/40 transition-colors cursor-pointer"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>LIVE SITE</span>
            </span>
            <span className="text-[10px] text-[#A9A39D]">↗</span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-2 px-3.5 py-2 rounded-lg text-red-400 hover:bg-red-950/30 hover:text-red-300 text-xs font-mono uppercase transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOGOUT</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};
