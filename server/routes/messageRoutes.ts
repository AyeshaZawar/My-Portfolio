import { Router, Request, Response } from 'express';
import { DataService } from '../services/dataService';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// ================= PUBLIC ROUTE =================
// POST /api/contact - Submit contact form from public portfolio
router.post('/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Name is required.',
      });
    }

    if (!email || typeof email !== 'string' || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Valid email address is required.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.',
      });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required.',
      });
    }

    const savedMessage = await DataService.createMessage({
      name,
      email,
      subject: subject || '',
      message,
    });

    return res.status(201).json({
      success: true,
      message: 'Your message has been received and logged successfully.',
      data: {
        id: savedMessage.id || savedMessage._id,
        createdAt: savedMessage.createdAt,
      },
    });
  } catch (error: any) {
    console.error('[MessageRoutes] Error processing contact submission:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to transmit message. Please try again or reach out directly.',
    });
  }
});

// ================= ADMIN PROTECTED ROUTES =================
// GET /api/admin/messages - List all received inquiries
router.get('/admin/messages', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { unread, search } = req.query;
    const filter: { isRead?: boolean; search?: string } = {};

    if (unread === 'true') filter.isRead = false;
    if (unread === 'false') filter.isRead = true;
    if (typeof search === 'string' && search.trim()) filter.search = search.trim();

    const messages = await DataService.getMessages(filter);
    const unreadCount = messages.filter((m) => !m.isRead).length;

    return res.status(200).json({
      success: true,
      count: messages.length,
      unreadCount,
      data: messages,
    });
  } catch (error: any) {
    console.error('[MessageRoutes] Error fetching messages:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve messages.',
    });
  }
});

// PATCH /api/admin/messages/:id/read - Toggle or set read status
router.patch('/admin/messages/:id/read', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;

    const shouldRead = typeof isRead === 'boolean' ? isRead : true;
    const updated = await DataService.markMessageRead(id, shouldRead);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: shouldRead ? 'Message marked as read.' : 'Message marked as unread.',
      data: updated,
    });
  } catch (error: any) {
    console.error('[MessageRoutes] Error updating message status:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to update message status.',
    });
  }
});

// POST /api/admin/messages/mark-all-read - Mark all messages as read
router.post('/admin/messages/mark-all-read', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    await DataService.markAllMessagesAsRead();
    return res.status(200).json({
      success: true,
      message: 'All messages have been marked as read.',
    });
  } catch (error: any) {
    console.error('[MessageRoutes] Error marking all as read:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to mark all messages as read.',
    });
  }
});

// DELETE /api/admin/messages/:id - Delete a message
router.delete('/admin/messages/:id', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await DataService.deleteMessage(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Message not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Message deleted successfully.',
    });
  } catch (error: any) {
    console.error('[MessageRoutes] Error deleting message:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to delete message.',
    });
  }
});

export default router;
