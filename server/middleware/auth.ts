import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { DataService } from '../services/dataService';

export const JWT_SECRET =
  process.env.JWT_SECRET || 'cinematic_portfolio_secure_jwt_secret_key_change_in_production_2026';

export interface AuthRequest extends Request {
  admin?: {
    id: string;
    email: string;
    name: string;
    role: 'SUPER_ADMIN' | 'ADMIN';
    status: string;
  };
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Authentication required. No Bearer token provided.',
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Invalid authentication token format.',
      });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: string;
      email: string;
      role: 'SUPER_ADMIN' | 'ADMIN';
    };

    const admin = await DataService.getAdminById(decoded.id);
    if (!admin) {
      res.status(401).json({
        success: false,
        message: 'Administrator account no longer exists.',
      });
      return;
    }

    if (admin.status === 'disabled') {
      res.status(403).json({
        success: false,
        message: 'Administrator account has been disabled. Please contact Super Admin.',
      });
      return;
    }

    req.admin = {
      id: admin.id || admin._id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
      status: admin.status,
    };

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: 'Session expired or invalid token. Please log in again.',
    });
  }
}

export function requireSuperAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
  if (!req.admin) {
    res.status(401).json({
      success: false,
      message: 'Authentication required.',
    });
    return;
  }

  if (req.admin.role !== 'SUPER_ADMIN') {
    res.status(403).json({
      success: false,
      message: 'Access denied. This action requires Super Admin privileges.',
    });
    return;
  }

  next();
}
