import { useState, useEffect, useCallback } from 'react';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { TimelineSection } from './components/TimelineSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ContactSection } from './components/ContactSection';
import { CategoryPage } from './components/CategoryPage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { AllProjectsPage } from './components/AllProjectsPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { categoryCardsData, allProjectsData } from './data/projectsData';
import { getPublishedProjects } from './services/api';
import type { CategoryCardData, ProjectItem } from './types/projects';

type ViewMode = 
  | { type: 'home' }
  | { type: 'all' }
  | { type: 'category'; categoryId: 'templates' | 'learning' | 'main' }
  | { type: 'project'; projectSlug: string; categoryId: 'templates' | 'learning' | 'main' }
  | { type: 'admin' };

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>({ type: 'home' });
  const [projects, setProjects] = useState<ProjectItem[]>(allProjectsData);

  // Fetch dynamic projects from Backend/MongoDB CMS
  const loadDynamicProjects = useCallback(async () => {
    try {
      const dynamicList = await getPublishedProjects();
      if (Array.isArray(dynamicList) && dynamicList.length > 0) {
        setProjects(dynamicList);
      }
    } catch {
      // Graceful fallback to bundled allProjectsData
    }
  }, []);

  useEffect(() => {
    loadDynamicProjects();
  }, [loadDynamicProjects]);

  // Sync URL hash / path on load and browser back/forward
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.replace('#', '');
      const pathname = window.location.pathname;
      const target = hash || (pathname !== '/' ? pathname : '');

      // Check for Admin Portal secret route (e.g. /zisha-space or #/zisha-space)
      const lower = target.toLowerCase();
      if (
        lower === '/zisha-space' || 
        lower.startsWith('/zisha-space') || 
        lower === 'zisha-space' ||
        lower === '/ziha-space' || 
        lower.startsWith('/ziha-space')
      ) {
        setCurrentView({ type: 'admin' });
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      if (target.startsWith('/projects/')) {
        const parts = target.split('/').filter(Boolean); // ['projects', 'category', 'slug'?]
        if (parts.length >= 2 && parts[1] === 'all') {
          setCurrentView({ type: 'all' });
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        if (parts.length >= 3) {
          const catId = parts[1] as 'templates' | 'learning' | 'main';
          const slug = parts[2];
          setCurrentView({ type: 'project', projectSlug: slug, categoryId: catId });
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        } else if (parts.length >= 2) {
          const catId = parts[1] as 'templates' | 'learning' | 'main';
          if (['templates', 'learning', 'main'].includes(catId)) {
            setCurrentView({ type: 'category', categoryId: catId });
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
          }
        }
      }

      setCurrentView({ type: 'home' });
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Level 1 -> All Projects Directory
  const navigateToAllProjects = () => {
    window.location.hash = '/projects/all';
    setCurrentView({ type: 'all' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Level 1 -> Level 2 navigation
  const navigateToCategory = (category: CategoryCardData) => {
    const route = `/projects/${category.id}`;
    window.location.hash = route;
    setCurrentView({ type: 'category', categoryId: category.id });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Level 2 -> Level 3 navigation
  const navigateToProject = (project: ProjectItem) => {
    const route = `/projects/${project.category}/${project.slug}`;
    window.location.hash = route;
    setCurrentView({ type: 'project', projectSlug: project.slug, categoryId: project.category });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back Navigation: to Category
  const navigateBackToCategory = (categoryId: 'templates' | 'learning' | 'main') => {
    const route = `/projects/${categoryId}`;
    window.location.hash = route;
    setCurrentView({ type: 'category', categoryId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back Navigation: to Home
  const navigateBackToHome = () => {
    window.location.hash = '';
    if (
      window.location.pathname.toLowerCase().includes('zisha-space') ||
      window.location.pathname.toLowerCase().includes('ziha-space')
    ) {
      window.history.pushState(null, '', '/');
    }
    setCurrentView({ type: 'home' });
    loadDynamicProjects(); // re-fetch if admin modified projects
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render Admin Dashboard
  if (currentView.type === 'admin') {
    return (
      <AdminDashboard
        onReturnToPortfolio={navigateBackToHome}
        onViewProjectOnSite={(category, slug) => {
          const found = projects.find((p) => p.slug === slug || p.id === slug);
          if (found) {
            navigateToProject(found);
          } else {
            window.location.hash = `/projects/${category}/${slug}`;
            setCurrentView({
              type: 'project',
              projectSlug: slug,
              categoryId: category as any,
            });
          }
        }}
      />
    );
  }

  // Render All Projects Directory
  if (currentView.type === 'all') {
    return (
      <AllProjectsPage
        projects={projects}
        onBackToHome={navigateBackToHome}
        onSelectProject={navigateToProject}
      />
    );
  }

  // Render Level 3: Project Detail Page
  if (currentView.type === 'project') {
    const project = projects.find(
      (p) => p.slug === currentView.projectSlug || p.id === currentView.projectSlug
    ) || allProjectsData.find(
      (p) => p.slug === currentView.projectSlug || p.id === currentView.projectSlug
    ) || projects.find((p) => p.category === currentView.categoryId);

    if (project) {
      return (
        <ProjectDetailPage
          project={project}
          onBackToCategory={() => navigateBackToCategory(currentView.categoryId)}
          onBackToHome={navigateBackToHome}
        />
      );
    }
  }

  // Render Level 2: Category Page
  if (currentView.type === 'category') {
    const category = categoryCardsData.find((c) => c.id === currentView.categoryId) || categoryCardsData[0];
    const categoryProjects = projects.filter((p) => p.category === currentView.categoryId);

    return (
      <CategoryPage
        category={category}
        projects={categoryProjects.length > 0 ? categoryProjects : allProjectsData.filter((p) => p.category === currentView.categoryId)}
        onSelectProject={navigateToProject}
        onBackToHome={navigateBackToHome}
      />
    );
  }

  // Render Level 1: Main Portfolio with 3 Stacked Category Cards
  return (
    <div className="w-full min-h-screen bg-[#0B0B0A] text-[#E9E3DC] selection:bg-[#C8A77A] selection:text-[#0B0B0A]">
      <HeroSection onOpenAllProjects={navigateToAllProjects} />
      <AboutSection />
      <TimelineSection />
      <SkillsSection />
      <ProjectsSection 
        onSelectCategory={navigateToCategory} 
        onOpenAllProjects={navigateToAllProjects} 
      />
      <ContactSection />
    </div>
  );
}

export default App;
