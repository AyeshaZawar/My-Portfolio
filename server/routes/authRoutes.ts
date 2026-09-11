import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DataService } from '../services/dataService';
import { requireAuth, AuthRequest, JWT_SECRET } from '../middleware/auth';

const router = Router();

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const admin = await DataService.getAdminByEmail(email);
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    if (admin.status === 'disabled') {
      return res.status(403).json({
        success: false,
        message: 'This administrator account has been disabled. Please contact the Super Admin.',
      });
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    // Update last login timestamp
    await DataService.updateAdmin(admin.id || admin._id, {
      lastLoginAt: new Date(),
    });

    // Create JWT
    const token = jwt.sign(
      {
        id: admin.id || admin._id,
        email: admin.email,
        role: admin.role,
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully.',
      token,
      admin: {
        id: admin.id || admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        status: admin.status,
      },
    });
  } catch (error: any) {
    console.error('[AuthRoutes] Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'An internal server error occurred while attempting to log in.',
    });
  }
});

// POST /api/auth/logout
router.post('/logout', (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    message: 'Logged out successfully.',
  });
});

// GET /api/auth/me
router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  return res.status(200).json({
    success: true,
    admin: req.admin,
  });
});

export default router;
