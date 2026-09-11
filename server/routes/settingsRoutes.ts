import { Router, Response } from 'express';
import bcrypt from 'bcryptjs';
import { DataService } from '../services/dataService';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// PUT /api/settings/change-email
router.put('/settings/change-email', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { newEmail, currentPassword } = req.body;

    if (!newEmail || !currentPassword) {
      return res.status(400).json({
        success: false,
        message: 'New email and current password are required.',
      });
    }

    const cleanNewEmail = newEmail.toLowerCase().trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanNewEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    // Find current admin to verify password
    const adminId = req.admin!.id;
    const admin = await DataService.getAdminById(adminId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Administrator account not found.',
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect current password.',
      });
    }

    // Check if new email is already taken
    const existing = await DataService.getAdminByEmail(cleanNewEmail);
    if (existing && existing.id !== adminId && existing._id !== adminId) {
      return res.status(400).json({
        success: false,
        message: 'The requested email address is already in use by another account.',
      });
    }

    const updated = await DataService.updateAdmin(adminId, {
      email: cleanNewEmail,
    });

    return res.status(200).json({
      success: true,
      message: 'Account email updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    console.error('[SettingsRoutes] Error changing email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update email address.',
    });
  }
});

// PUT /api/settings/change-password
router.put('/settings/change-password', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required.',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters.',
      });
    }

    const adminId = req.admin!.id;
    const admin = await DataService.getAdminById(adminId);
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: 'Administrator account not found.',
      });
    }

    const isMatch = await bcrypt.compare(currentPassword, admin.passwordHash);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is not correct.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await DataService.updateAdmin(adminId, {
      passwordHash,
    });

    return res.status(200).json({
      success: true,
      message: 'Account password changed successfully.',
    });
  } catch (error: any) {
    console.error('[SettingsRoutes] Error changing password:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update password.',
    });
  }
});

export default router;
