import bcrypt from 'bcryptjs';
import { DataService } from './services/dataService';
import { allProjectsData } from '../src/data/projectsData';

export async function seedInitialData(): Promise<void> {
  try {
    // 1. Seed Super Admin
    const superAdminEmail = (process.env.SUPERADMIN_EMAIL || 'ayeshazawar2616@gmail.com').toLowerCase().trim();
    const existingAdmin = await DataService.getAdminByEmail(superAdminEmail);

    if (!existingAdmin) {
      const superAdminPassword = process.env.SUPERADMIN_PASSWORD || 'Admin@123456';
      const superAdminName = process.env.SUPERADMIN_NAME || 'Ayesha Zawar';
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(superAdminPassword, salt);

      await DataService.createAdmin({
        name: superAdminName,
        email: superAdminEmail,
        passwordHash,
        role: 'SUPER_ADMIN',
        status: 'active',
      });

      console.log(`[Seed] Created initial Super Admin: ${superAdminEmail} with default credentials.`);
    } else {
      if (process.env.SUPERADMIN_PASSWORD) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(process.env.SUPERADMIN_PASSWORD, salt);
        await DataService.updateAdmin(existingAdmin.id, { passwordHash });
        console.log(`[Seed] Synchronized Super Admin password for ${existingAdmin.email} from environment configuration.`);
      } else {
        console.log(`[Seed] Super Admin exists: ${existingAdmin.email} (${existingAdmin.role})`);
      }
    }

    // 2. Seed Initial Portfolio Projects if none exist
    const existingProjects = await DataService.getProjects({});
    if (existingProjects.length === 0) {
      console.log(`[Seed] No projects found in database. Seeding ${allProjectsData.length} existing portfolio projects...`);
      for (let i = 0; i < allProjectsData.length; i++) {
        const item = allProjectsData[i];
        
        // Find main cover / preview image if available
        let preview = '';
        if (item.images && item.images.length > 0 && item.images[0].url) {
          preview = item.images[0].url;
        }

        await DataService.createProject({
          title: item.name,
          name: item.name,
          subtitle: item.typeLabel || '',
          slug: item.slug,
          category: item.category,
          categoryLabel: item.categoryLabel || '',
          typeLabel: item.typeLabel || '',
          shortDescription: item.shortDescription || '',
          detailedDescription: item.detailedDescription || item.shortDescription || '',
          demonstrates: item.demonstrates || '',
          previewImage: preview,
          images: (item.images || []).map((img, imgIdx) => ({
            id: img.id || `img_${i}_${imgIdx}`,
            type: 'image',
            title: img.title || '',
            caption: img.caption || '',
            url: img.url || '',
            aspectRatio: img.aspectRatio || '16/9',
          })),
          videos: (item.videos || []).map((vid, vidIdx) => ({
            id: vid.id || `vid_${i}_${vidIdx}`,
            type: 'video',
            title: vid.title || '',
            caption: vid.caption || '',
            url: vid.url || '',
            aspectRatio: vid.aspectRatio || '16/9',
          })),
          githubUrl: item.githubUrl || 'https://github.com/AyeshaZawar',
          liveUrl: item.liveUrl || '',
          technologies: item.technologies || [],
          features: item.features || [],
          published: true,
          order: i,
        });
      }
      console.log(`[Seed] Successfully seeded ${allProjectsData.length} projects into the database.`);
    } else {
      console.log(`[Seed] Database contains ${existingProjects.length} projects.`);
    }
  } catch (err: any) {
    console.error('[Seed] Error seeding initial data:', err.message);
  }
}
