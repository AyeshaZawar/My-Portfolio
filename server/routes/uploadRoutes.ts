import { Router, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

// Ensure public/uploads directory exists
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Storage configuration with sanitized names and extension preservation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const cleanBase = path
      .basename(file.originalname, ext)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${cleanBase}-${uniqueSuffix}${ext}`);
  },
});

// File filter for safe image and video formats
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedMime = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/svg+xml',
    'video/mp4',
    'video/webm',
    'video/quicktime',
  ];

  if (allowedMime.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not permitted. Please upload an image or video file.`));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit for video and high-res screenshot support
  },
});

// POST /api/upload - Single media file upload (requires admin auth)
router.post(
  '/upload',
  requireAuth,
  upload.single('file'),
  (req: AuthRequest, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file was uploaded.',
        });
      }

      const isVideo = req.file.mimetype.startsWith('video/');
      const fileUrl = `/uploads/${req.file.filename}`;

      return res.status(200).json({
        success: true,
        message: 'File uploaded successfully.',
        file: {
          url: fileUrl,
          filename: req.file.filename,
          originalName: req.file.originalname,
          size: req.file.size,
          mimeType: req.file.mimetype,
          type: isVideo ? 'video' : 'image',
        },
      });
    } catch (error: any) {
      console.error('[UploadRoutes] Error uploading file:', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'File upload failed.',
      });
    }
  }
);

export default router;
