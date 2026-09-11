import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

// Load environment variables
dotenv.config();

import { connectMongoDB } from './server/db/mongodb';
import { seedInitialData } from './server/seed';
import authRoutes from './server/routes/authRoutes';
import projectRoutes from './server/routes/projectRoutes';
import adminRoutes from './server/routes/adminRoutes';
import settingsRoutes from './server/routes/settingsRoutes';
import uploadRoutes from './server/routes/uploadRoutes';
import messageRoutes from './server/routes/messageRoutes';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Basic Middlewares
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Static uploads serving
  const uploadsPath = path.join(process.cwd(), 'public', 'uploads');
  app.use('/uploads', express.static(uploadsPath));

  // Connect to Database & Seed Initial Super Admin & Portfolio Projects
  try {
    await connectMongoDB();
    await seedInitialData();
  } catch (err) {
    console.error('[Startup] Error during database initialization:', err);
  }

  // Health Check Endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'cinematic-portfolio-backend',
    });
  });

  // API Routes
  app.use('/api/auth', authRoutes);
  app.use('/api', projectRoutes);
  app.use('/api', adminRoutes);
  app.use('/api', settingsRoutes);
  app.use('/api', uploadRoutes);
  app.use('/api', messageRoutes);

  // Centralized API Error Handling Middleware
  app.use('/api', (err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('[API Error]', err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'An unexpected server error occurred.',
    });
  });

  // Frontend Integration (Vite Middleware in dev / Static dist in production)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Listen on 0.0.0.0:3000
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Server] Portfolio & Admin CMS Backend running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
