import mongoose, { Schema, Document } from 'mongoose';

export type AdminRole = 'SUPER_ADMIN' | 'ADMIN';
export type AdminStatus = 'active' | 'disabled';

export interface IAdmin extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: AdminRole;
  status: AdminStatus;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AdminSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Admin name is required'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        'Please enter a valid email address',
      ],
    },
    passwordHash: {
      type: String,
      required: [true, 'Password hash is required'],
    },
    role: {
      type: String,
      enum: ['SUPER_ADMIN', 'ADMIN'],
      default: 'ADMIN',
    },
    status: {
      type: String,
      enum: ['active', 'disabled'],
      default: 'active',
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent re-compilation in development mode
export const AdminModel = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
