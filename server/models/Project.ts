import mongoose, { Schema, Document } from 'mongoose';

export interface IProjectMedia {
  id: string;
  type: 'image' | 'video';
  title: string;
  caption?: string;
  url?: string;
  aspectRatio?: string;
}

export interface IProject extends Document {
  title: string;
  name: string;
  subtitle?: string;
  slug: string;
  category: 'main' | 'templates' | 'learning';
  categoryLabel?: string;
  typeLabel?: string;
  shortDescription: string;
  detailedDescription?: string;
  demonstrates?: string;
  previewImage?: string;
  images: IProjectMedia[];
  videos: IProjectMedia[];
  githubUrl: string;
  liveUrl?: string;
  technologies: string[];
  features?: string[];
  published: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const MediaSubSchema = new Schema(
  {
    id: { type: String, required: true },
    type: { type: String, enum: ['image', 'video'], default: 'image' },
    title: { type: String, default: '' },
    caption: { type: String, default: '' },
    url: { type: String, default: '' },
    aspectRatio: { type: String, default: '16/9' },
  },
  { _id: false }
);

const ProjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    name: {
      type: String,
      trim: true,
      maxlength: [120, 'Name cannot exceed 120 characters'],
    },
    subtitle: {
      type: String,
      trim: true,
      maxlength: [150, 'Subtitle cannot exceed 150 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Project slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['main', 'templates', 'learning'],
        message: '{VALUE} is not a valid category. Must be main, templates, or learning',
      },
      index: true,
    },
    categoryLabel: {
      type: String,
      trim: true,
    },
    typeLabel: {
      type: String,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
    },
    detailedDescription: {
      type: String,
      trim: true,
    },
    demonstrates: {
      type: String,
      trim: true,
    },
    previewImage: {
      type: String,
      default: '',
    },
    images: {
      type: [MediaSubSchema],
      default: [],
    },
    videos: {
      type: [MediaSubSchema],
      default: [],
    },
    githubUrl: {
      type: String,
      required: [true, 'GitHub URL is required'],
      trim: true,
    },
    liveUrl: {
      type: String,
      trim: true,
      default: '',
    },
    technologies: {
      type: [String],
      default: [],
    },
    features: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      default: true,
      index: true,
    },
    order: {
      type: Number,
      default: 0,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Auto-sync name and title
ProjectSchema.pre('save', function (next) {
  if (!this.name && this.title) {
    this.name = this.title;
  }
  if (!this.title && this.name) {
    this.title = this.name;
  }
  next();
});

export const ProjectModel = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
