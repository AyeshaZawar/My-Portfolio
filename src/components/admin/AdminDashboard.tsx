import React, { useState, useEffect } from 'react';
import {
  AdminLayout,
  type AdminTab
} from './AdminLayout';
import { AdminLogin } from './AdminLogin';
import { DashboardOverview } from './DashboardOverview';
import { ProjectList } from './ProjectList';
import { ProjectForm } from './ProjectForm';
import { AdminMessagesList } from './AdminMessagesList';
import { AdminUsersList } from './AdminUsersList';
import { AdminSettings } from './AdminSettings';
import {
  getStoredToken,
  getStoredAdminUser,
  getCurrentAdmin,
  getAdminStats,
  logoutAdmin
} from '../../services/api';

interface AdminDashboardProps {
  onReturnToPortfolio: () => void;
  onViewProjectOnSite: (category: string, slug: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onReturnToPortfolio,
  onViewProjectOnSite,
}) => {
  const [adminUser, setAdminUser] = useState<any | null>(getStoredAdminUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(Boolean(getStoredToken()));
  const [currentTab, setCurrentTab] = useState<AdminTab>('dashboard');
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>('all');
  const [unreadCount, setUnreadCount] = useState<number>(0);

  const refreshUnreadCount = async () => {
    if (!getStoredToken()) return;
    try {
      const stats = await getAdminStats();
      if (typeof stats?.unreadMessages === 'number') {
        setUnreadCount(stats.unreadMessages);
      }
    } catch {
      // silently ignore
    }
  };

  // Verify session on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (getStoredToken()) {
        try {
          const user = await getCurrentAdmin();
          setAdminUser(user);
          setIsAuthenticated(true);
          refreshUnreadCount();
        } catch {
          setIsAuthenticated(false);
          setAdminUser(null);
        }
      }
    };
    checkAuth();
  }, []);

  const handleLoginSuccess = (user: any) => {
    setAdminUser(user);
    setIsAuthenticated(true);
    setCurrentTab('dashboard');
    refreshUnreadCount();
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  // If not authenticated, render the admin login form
  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onBackToPortfolio={onReturnToPortfolio}
      />
    );
  }

  return (
    <AdminLayout
      currentTab={currentTab}
      onSelectTab={(tab) => {
        if (tab === 'add-project') {
          setEditingProjectId(null);
        }
        setCurrentTab(tab);
        refreshUnreadCount();
      }}
      adminUser={adminUser}
      unreadCount={unreadCount}
      onLogout={handleLogout}
      onViewPortfolio={onReturnToPortfolio}
    >
      {/* 1. Dashboard Overview */}
      {currentTab === 'dashboard' && (
        <DashboardOverview
          onNavigateToAddProject={() => {
            setEditingProjectId(null);
            setCurrentTab('add-project');
          }}
          onNavigateToProjects={(category?: string) => {
            setProjectCategoryFilter(category || 'all');
            setCurrentTab('projects');
          }}
          onNavigateToUsers={() => setCurrentTab('users')}
          onNavigateToMessages={() => setCurrentTab('messages')}
          onEditProject={(id) => {
            setEditingProjectId(id);
            setCurrentTab('add-project');
          }}
          onViewPortfolio={onReturnToPortfolio}
        />
      )}

      {/* 2. Projects List */}
      {currentTab === 'projects' && (
        <ProjectList
          initialCategory={projectCategoryFilter}
          onAddNew={() => {
            setEditingProjectId(null);
            setCurrentTab('add-project');
          }}
          onEditProject={(id) => {
            setEditingProjectId(id);
            setCurrentTab('add-project');
          }}
          onViewProjectOnSite={onViewProjectOnSite}
        />
      )}

      {/* 3. Add / Edit Project Form */}
      {currentTab === 'add-project' && (
        <ProjectForm
          projectId={editingProjectId}
          onSuccess={() => {
            setEditingProjectId(null);
            setCurrentTab('projects');
          }}
          onCancel={() => {
            setEditingProjectId(null);
            setCurrentTab('projects');
          }}
        />
      )}

      {/* 4. Client Messages & Inquiries */}
      {currentTab === 'messages' && (
        <AdminMessagesList />
      )}

      {/* 5. Admin Management (Super Admin only) */}
      {currentTab === 'users' && (
        <AdminUsersList currentAdmin={adminUser} />
      )}

      {/* 6. Settings */}
      {currentTab === 'settings' && (
        <AdminSettings
          currentAdmin={adminUser}
          onAdminUpdated={(updated) => setAdminUser(updated)}
        />
      )}
    </AdminLayout>
  );
};
