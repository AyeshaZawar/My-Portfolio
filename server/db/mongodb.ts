import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

let isConnected = false;
const FALLBACK_DIR = path.join(process.cwd(), 'data');
const FALLBACK_FILE = path.join(FALLBACK_DIR, 'db-fallback.json');

// Interface for fallback storage data
export interface FallbackDB {
  admins: any[];
  projects: any[];
  messages?: any[];
}

// Read fallback database from JSON file
export function readFallbackDB(): FallbackDB {
  try {
    if (!fs.existsSync(FALLBACK_DIR)) {
      fs.mkdirSync(FALLBACK_DIR, { recursive: true });
    }
    if (!fs.existsSync(FALLBACK_FILE)) {
      const initial: FallbackDB = { admins: [], projects: [], messages: [] };
      fs.writeFileSync(FALLBACK_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(FALLBACK_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!parsed.messages) {
      parsed.messages = [];
    }
    return parsed;
  } catch (err) {
    console.error('[FallbackDB] Error reading fallback file:', err);
    return { admins: [], projects: [], messages: [] };
  }
}

// Write fallback database to JSON file
export function writeFallbackDB(data: FallbackDB): void {
  try {
    if (!fs.existsSync(FALLBACK_DIR)) {
      fs.mkdirSync(FALLBACK_DIR, { recursive: true });
    }
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('[FallbackDB] Error writing fallback file:', err);
  }
}

// Connect to MongoDB with graceful handling
export async function connectMongoDB(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.log('[MongoDB] No MONGODB_URI provided in environment. Using durable local JSON database store.');
    isConnected = false;
    return false;
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnected = true;
    console.log('[MongoDB] Successfully connected to MongoDB database at:', uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@'));
    return true;
  } catch (error: any) {
    console.warn('[MongoDB] Connection failed:', error.message);
    console.log('[MongoDB] Falling back to local data store so application and admin dashboard remain 100% operational.');
    isConnected = false;
    return false;
  }
}

export function isMongoActive(): boolean {
  return isConnected && mongoose.connection.readyState === 1;
}
