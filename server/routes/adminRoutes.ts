import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { DataService } from '../services/dataService';
import { requireAuth, requireSuperAdmin, AuthRequest } from '../middleware/auth';

const router = Router();

// GET /api/admin/stats - Overview statistics for Dashboard
router.get('/admin/stats', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const stats = await DataService.getStats();
    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    console.error('[AdminRoutes] Error getting stats:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve administrative statistics.',
    });
  }
});

// GET /api/admin/users - List all administrators (Super Admin only)
router.get('/admin/users', requireAuth, requireSuperAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const admins = await DataService.getAdmins();
    return res.status(200).json({
      success: true,
      data: admins,
    });
  } catch (error: any) {
    console.error('[AdminRoutes] Error listing administrators:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve administrators list.',
    });
  }
});

// POST /api/admin/users - Create a secondary administrator (Super Admin only)
router.post('/admin/users', requireAuth, requireSuperAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters.',
      });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = await DataService.getAdminByEmail(cleanEmail);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An administrator with this email address already exists.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newAdmin = await DataService.createAdmin({
      name: name.trim(),
      email: cleanEmail,
      passwordHash,
      role: role === 'SUPER_ADMIN' ? 'SUPER_ADMIN' : 'ADMIN',
      status: 'active',
    });

    return res.status(201).json({
      success: true,
      message: 'Administrator created successfully.',
      data: newAdmin,
    });
  } catch (error: any) {
    console.error('[AdminRoutes] Error creating admin:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Failed to create administrator.',
    });
  }
});

// PATCH /api/admin/users/:id - Update administrator status or role (Super Admin only)
router.patch('/admin/users/:id', requireAuth, requireSuperAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { role, status, name } = req.body;

    const targetAdmin = await DataService.getAdminById(id);
    if (!targetAdmin) {
      return res.status(404).json({
        success: false,
        message: 'Administrator not found.',
      });
    }

    // Safety: Prevent disabling or demoting yourself
    if (req.admin?.id === id) {
      if (status === 'disabled') {
        return res.status(400).json({
          success: false,
          message: 'You cannot disable your own active account.',
        });
      }
      if (role && role !== 'SUPER_ADMIN') {
        return res.status(400).json({
          success: false,
          message: 'You cannot demote your own Super Admin role.',
        });
      }
    }

    const updateData: any = {};
    if (role && ['SUPER_ADMIN', 'ADMIN'].includes(role)) {
      updateData.role = role;
    }
    if (status && ['active', 'disabled'].includes(status)) {
      updateData.status = status;
    }
    if (name) {
      updateData.name = name.trim();
    }

    const updated = await DataService.updateAdmin(id, updateData);
    return res.status(200).json({
      success: true,
      message: 'Administrator updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    console.error('[AdminRoutes] Error updating admin:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update administrator.',
    });
  }
});

// DELETE /api/admin/users/:id - Delete administrator account (Super Admin only)
router.delete('/admin/users/:id', requireAuth, requireSuperAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    // Safety: Cannot delete oneself
    if (req.admin?.id === id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own Super Admin account.',
      });
    }

    const targetAdmin = await DataService.getAdminById(id);
    if (!targetAdmin) {
      return res.status(404).json({
        success: false,
        message: 'Administrator not found.',
      });
    }

    await DataService.deleteAdmin(id);
    return res.status(200).json({
      success: true,
      message: `Administrator ${targetAdmin.email} has been deleted.`,
    });
  } catch (error: any) {
    console.error('[AdminRoutes] Error deleting admin:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete administrator.',
    });
  }
});

export default router;
