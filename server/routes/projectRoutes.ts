import { Router, Request, Response } from 'express';
import { DataService } from '../services/dataService';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Helper to generate URL-safe slug
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

// ================= PUBLIC PROJECT ROUTES =================

// GET /api/projects - Public published projects
router.get('/projects', async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    const filter: any = { published: true };

    if (category && typeof category === 'string') {
      filter.category = category;
    }
    if (search && typeof search === 'string') {
      filter.search = search;
    }

    const projects = await DataService.getProjects(filter);
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error: any) {
    console.error('[ProjectRoutes] Error fetching public projects:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve published projects.',
    });
  }
});

// GET /api/projects/:idOrSlug - Public single project
router.get('/projects/:idOrSlug', async (req: Request, res: Response) => {
  try {
    const { idOrSlug } = req.params;
    const project = await DataService.getProjectByIdOrSlug(idOrSlug, true);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or is currently unpublished.',
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    console.error('[ProjectRoutes] Error fetching project detail:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve project details.',
    });
  }
});

// ================= ADMIN PROTECTED PROJECT ROUTES =================

// GET /api/admin/projects - All projects (published & drafts)
router.get('/admin/projects', requireAuth, async (req: Request, res: Response) => {
  try {
    const { category, search, published } = req.query;
    const filter: any = {};

    if (category && typeof category === 'string' && category !== 'all') {
      filter.category = category;
    }
    if (typeof published === 'string') {
      filter.published = published === 'true';
    }
    if (search && typeof search === 'string') {
      filter.search = search;
    }

    const projects = await DataService.getProjects(filter);
    return res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error: any) {
    console.error('[AdminProjectRoutes] Error listing projects:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve project list.',
    });
  }
});

// GET /api/admin/projects/:id - Project by ID for editing
router.get('/admin/projects/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await DataService.getProjectByIdOrSlug(id, false);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    return res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    console.error('[AdminProjectRoutes] Error getting project by id:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve project.',
    });
  }
});

// POST /api/admin/projects - Create new project
router.post('/admin/projects', requireAuth, async (req: Request, res: Response) => {
  try {
    const {
      title,
      name,
      subtitle,
      slug,
      category,
      categoryLabel,
      typeLabel,
      shortDescription,
      detailedDescription,
      demonstrates,
      previewImage,
      images,
      videos,
      githubUrl,
      liveUrl,
      technologies,
      features,
      published,
      order,
    } = req.body;

    // Validation
    const projectTitle = (title || name || '').trim();
    if (!projectTitle) {
      return res.status(400).json({
        success: false,
        message: 'Project title is required.',
      });
    }

    if (!category || !['main', 'templates', 'learning'].includes(category)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category. Must be one of: main, templates, learning.',
      });
    }

    if (!githubUrl || !githubUrl.trim()) {
      return res.status(400).json({
        success: false,
        message: 'GitHub repository URL is required.',
      });
    }

    // Generate or sanitize slug
    let finalSlug = slug ? slugify(slug) : slugify(projectTitle);
    if (!finalSlug) {
      finalSlug = 'project-' + Date.now();
    }

    // Check slug collision
    const existing = await DataService.getProjectByIdOrSlug(finalSlug, false);
    if (existing) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    // Normalize media
    const normalizedImages = Array.isArray(images)
      ? images.map((img: any, idx: number) => ({
          id: img.id || `img_${Date.now()}_${idx}`,
          type: 'image',
          title: img.title || '',
          caption: img.caption || '',
          url: img.url || '',
          aspectRatio: img.aspectRatio || '16/9',
        }))
      : [];

    const normalizedVideos = Array.isArray(videos)
      ? videos.map((vid: any, idx: number) => ({
          id: vid.id || `vid_${Date.now()}_${idx}`,
          type: 'video',
          title: vid.title || '',
          caption: vid.caption || '',
          url: vid.url || '',
          aspectRatio: vid.aspectRatio || '16/9',
        }))
      : [];

    // Fallback preview image if not specified
    let finalPreview = previewImage || '';
    if (!finalPreview && normalizedImages.length > 0 && normalizedImages[0].url) {
      finalPreview = normalizedImages[0].url;
    }

    // Default category label
    const defaultLabels: Record<string, string> = {
      main: 'Flagship Full-Stack Platform',
      templates: 'Responsive UI Architecture & Template',
      learning: 'Algorithmic Mastery & Applied AI',
    };

    const newProject = await DataService.createProject({
      title: projectTitle,
      name: projectTitle,
      subtitle: subtitle || typeLabel || '',
      slug: finalSlug,
      category,
      categoryLabel: categoryLabel || defaultLabels[category] || '',
      typeLabel: typeLabel || subtitle || '',
      shortDescription: shortDescription || '',
      detailedDescription: detailedDescription || shortDescription || '',
      demonstrates: demonstrates || '',
      previewImage: finalPreview,
      images: normalizedImages,
      videos: normalizedVideos,
      githubUrl: githubUrl.trim(),
      liveUrl: (liveUrl || '').trim(),
      technologies: Array.isArray(technologies)
        ? technologies.filter(Boolean)
        : typeof technologies === 'string'
        ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : [],
      features: Array.isArray(features)
        ? features.filter(Boolean)
        : typeof features === 'string'
        ? features.split('\n').map((f) => f.trim()).filter(Boolean)
        : [],
      published: published !== false,
      order: typeof order === 'number' ? order : 0,
    });

    return res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      data: newProject,
    });
  } catch (error: any) {
    console.error('[AdminProjectRoutes] Error creating project:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create project.',
    });
  }
});

// PUT /api/admin/projects/:id - Update existing project
router.put('/admin/projects/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const existing = await DataService.getProjectByIdOrSlug(id, false);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    const {
      title,
      name,
      subtitle,
      slug,
      category,
      categoryLabel,
      typeLabel,
      shortDescription,
      detailedDescription,
      demonstrates,
      previewImage,
      images,
      videos,
      githubUrl,
      liveUrl,
      technologies,
      features,
      published,
      order,
    } = req.body;

    const projectTitle = (title || name || existing.title || existing.name).trim();

    // Check slug change
    let finalSlug = existing.slug;
    if (slug && slugify(slug) !== existing.slug) {
      finalSlug = slugify(slug);
      const duplicate = await DataService.getProjectByIdOrSlug(finalSlug, false);
      if (duplicate && duplicate.id !== id && duplicate._id !== id) {
        return res.status(400).json({
          success: false,
          message: 'The requested slug is already used by another project.',
        });
      }
    }

    // Normalize media
    const normalizedImages = Array.isArray(images)
      ? images.map((img: any, idx: number) => ({
          id: img.id || `img_${Date.now()}_${idx}`,
          type: 'image',
          title: img.title || '',
          caption: img.caption || '',
          url: img.url || '',
          aspectRatio: img.aspectRatio || '16/9',
        }))
      : existing.images || [];

    const normalizedVideos = Array.isArray(videos)
      ? videos.map((vid: any, idx: number) => ({
          id: vid.id || `vid_${Date.now()}_${idx}`,
          type: 'video',
          title: vid.title || '',
          caption: vid.caption || '',
          url: vid.url || '',
          aspectRatio: vid.aspectRatio || '16/9',
        }))
      : existing.videos || [];

    let finalPreview = previewImage;
    if (!finalPreview && normalizedImages.length > 0 && normalizedImages[0].url) {
      finalPreview = normalizedImages[0].url;
    }

    const updated = await DataService.updateProject(id, {
      title: projectTitle,
      name: projectTitle,
      subtitle: subtitle !== undefined ? subtitle : existing.subtitle,
      slug: finalSlug,
      category: category || existing.category,
      categoryLabel: categoryLabel !== undefined ? categoryLabel : existing.categoryLabel,
      typeLabel: typeLabel !== undefined ? typeLabel : existing.typeLabel,
      shortDescription: shortDescription !== undefined ? shortDescription : existing.shortDescription,
      detailedDescription: detailedDescription !== undefined ? detailedDescription : existing.detailedDescription,
      demonstrates: demonstrates !== undefined ? demonstrates : existing.demonstrates,
      previewImage: finalPreview,
      images: normalizedImages,
      videos: normalizedVideos,
      githubUrl: githubUrl !== undefined ? githubUrl.trim() : existing.githubUrl,
      liveUrl: liveUrl !== undefined ? liveUrl.trim() : existing.liveUrl,
      technologies: Array.isArray(technologies)
        ? technologies.filter(Boolean)
        : typeof technologies === 'string'
        ? technologies.split(',').map((t) => t.trim()).filter(Boolean)
        : existing.technologies,
      features: Array.isArray(features)
        ? features.filter(Boolean)
        : typeof features === 'string'
        ? features.split('\n').map((f) => f.trim()).filter(Boolean)
        : existing.features,
      published: published !== undefined ? !!published : existing.published,
      order: typeof order === 'number' ? order : existing.order,
    });

    return res.status(200).json({
      success: true,
      message: 'Project updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    console.error('[AdminProjectRoutes] Error updating project:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to update project.',
    });
  }
});

// PATCH /api/admin/projects/:id/publish - Toggle published status
router.patch('/admin/projects/:id/publish', requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await DataService.getProjectByIdOrSlug(id, false);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    const updated = await DataService.updateProject(id, {
      published: !project.published,
    });

    return res.status(200).json({
      success: true,
      message: `Project ${updated.published ? 'published' : 'moved to draft'}.`,
      data: updated,
    });
  } catch (error: any) {
    console.error('[AdminProjectRoutes] Error toggling publish:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update project publish status.',
    });
  }
});

// DELETE /api/admin/projects/:id - Delete project with validation
router.delete('/admin/projects/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await DataService.getProjectByIdOrSlug(id, false);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    const success = await DataService.deleteProject(id);
    if (!success) {
      return res.status(500).json({
        success: false,
        message: 'Could not delete project.',
      });
    }

    return res.status(200).json({
      success: true,
      message: `Project "${project.title || project.name}" deleted successfully.`,
    });
  } catch (error: any) {
    console.error('[AdminProjectRoutes] Error deleting project:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete project.',
    });
  }
});

// POST /api/admin/projects/reorder - Reorder projects
router.post('/admin/projects/reorder', requireAuth, async (req: Request, res: Response) => {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({
        success: false,
        message: 'orderedIds array is required.',
      });
    }

    await DataService.reorderProjects(orderedIds);
    return res.status(200).json({
      success: true,
      message: 'Projects reordered successfully.',
    });
  } catch (error: any) {
    console.error('[AdminProjectRoutes] Error reordering projects:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to reorder projects.',
    });
  }
});

export default router;
