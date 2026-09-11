import { isMongoActive, readFallbackDB, writeFallbackDB } from '../db/mongodb';
import { ProjectModel } from '../models/Project';
import { AdminModel } from '../models/Admin';
import { MessageModel } from '../models/Message';
import crypto from 'crypto';

export interface ProjectFilter {
  category?: string;
  published?: boolean;
  search?: string;
}

export const DataService = {
  // ================= PROJECT METHODS =================
  async getProjects(filter: ProjectFilter = {}): Promise<any[]> {
    if (isMongoActive()) {
      const query: any = {};
      if (filter.category) {
        query.category = filter.category;
      }
      if (typeof filter.published === 'boolean') {
        query.published = filter.published;
      }
      if (filter.search) {
        const regex = new RegExp(filter.search, 'i');
        query.$or = [{ title: regex }, { name: regex }, { shortDescription: regex }, { technologies: regex }];
      }

      const projects = await ProjectModel.find(query).sort({ order: 1, createdAt: -1 }).lean();
      return projects.map((p: any) => ({ ...p, id: p._id.toString() }));
    } else {
      const db = readFallbackDB();
      let list = [...(db.projects || [])];

      if (filter.category) {
        list = list.filter((p) => p.category === filter.category);
      }
      if (typeof filter.published === 'boolean') {
        list = list.filter((p) => (filter.published ? p.published !== false : p.published === false));
      }
      if (filter.search) {
        const s = filter.search.toLowerCase();
        list = list.filter(
          (p) =>
            (p.title && p.title.toLowerCase().includes(s)) ||
            (p.name && p.name.toLowerCase().includes(s)) ||
            (p.shortDescription && p.shortDescription.toLowerCase().includes(s)) ||
            (p.technologies && p.technologies.some((t: string) => t.toLowerCase().includes(s)))
        );
      }

      list.sort((a, b) => (a.order || 0) - (b.order || 0));
      return list;
    }
  },

  async getProjectByIdOrSlug(identifier: string, publishedOnly = false): Promise<any | null> {
    if (isMongoActive()) {
      const query: any = {
        $or: [{ slug: identifier }],
      };
      if (/^[0-9a-fA-F]{24}$/.test(identifier)) {
        query.$or.push({ _id: identifier });
      }
      if (publishedOnly) {
        query.published = true;
      }

      const project = await ProjectModel.findOne(query).lean();
      if (!project) return null;
      return { ...project, id: (project as any)._id.toString() };
    } else {
      const db = readFallbackDB();
      const project = (db.projects || []).find(
        (p) => (p.id === identifier || p._id === identifier || p.slug === identifier) && (!publishedOnly || p.published !== false)
      );
      return project || null;
    }
  },

  async createProject(data: any): Promise<any> {
    if (isMongoActive()) {
      const created = await ProjectModel.create(data);
      return { ...created.toObject(), id: created._id.toString() };
    } else {
      const db = readFallbackDB();
      const id = 'proj_' + crypto.randomUUID().slice(0, 12);
      const newProj = {
        ...data,
        id,
        _id: id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      db.projects.push(newProj);
      writeFallbackDB(db);
      return newProj;
    }
  },

  async updateProject(id: string, updateData: any): Promise<any | null> {
    if (isMongoActive()) {
      const updated = await ProjectModel.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true, runValidators: true }
      ).lean();
      if (!updated) return null;
      return { ...updated, id: (updated as any)._id.toString() };
    } else {
      const db = readFallbackDB();
      const idx = db.projects.findIndex((p) => p.id === id || p._id === id);
      if (idx === -1) return null;
      db.projects[idx] = {
        ...db.projects[idx],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };
      writeFallbackDB(db);
      return db.projects[idx];
    }
  },

  async deleteProject(id: string): Promise<boolean> {
    if (isMongoActive()) {
      const res = await ProjectModel.findByIdAndDelete(id);
      return !!res;
    } else {
      const db = readFallbackDB();
      const initialLen = db.projects.length;
      db.projects = db.projects.filter((p) => p.id !== id && p._id !== id);
      const deleted = db.projects.length < initialLen;
      if (deleted) writeFallbackDB(db);
      return deleted;
    }
  },

  async reorderProjects(orderedIds: string[]): Promise<boolean> {
    if (isMongoActive()) {
      const ops = orderedIds.map((id, index) => ({
        updateOne: {
          filter: { _id: id },
          update: { order: index },
        },
      }));
      await ProjectModel.bulkWrite(ops);
      return true;
    } else {
      const db = readFallbackDB();
      orderedIds.forEach((id, index) => {
        const item = db.projects.find((p) => p.id === id || p._id === id);
        if (item) {
          item.order = index;
        }
      });
      writeFallbackDB(db);
      return true;
    }
  },

  // ================= ADMIN METHODS =================
  async getAdmins(): Promise<any[]> {
    if (isMongoActive()) {
      const admins = await AdminModel.find({}, '-passwordHash').sort({ createdAt: -1 }).lean();
      return admins.map((a: any) => ({ ...a, id: a._id.toString() }));
    } else {
      const db = readFallbackDB();
      return (db.admins || []).map(({ passwordHash: _passwordHash, ...rest }) => ({
        ...rest,
        id: rest.id || rest._id,
      }));
    }
  },

  async getAdminByEmail(email: string): Promise<any | null> {
    const cleanEmail = email.toLowerCase().trim();
    if (isMongoActive()) {
      const admin = await AdminModel.findOne({ email: cleanEmail }).lean();
      if (!admin) return null;
      return { ...admin, id: (admin as any)._id.toString() };
    } else {
      const db = readFallbackDB();
      const admin = (db.admins || []).find((a) => a.email && a.email.toLowerCase().trim() === cleanEmail);
      return admin ? { ...admin, id: admin.id || admin._id } : null;
    }
  },

  async getAdminById(id: string): Promise<any | null> {
    if (isMongoActive()) {
      const admin = await AdminModel.findById(id).lean();
      if (!admin) return null;
      return { ...admin, id: (admin as any)._id.toString() };
    } else {
      const db = readFallbackDB();
      const admin = (db.admins || []).find((a) => a.id === id || a._id === id);
      return admin ? { ...admin, id: admin.id || admin._id } : null;
    }
  },

  async createAdmin(data: any): Promise<any> {
    const cleanData = {
      ...data,
      email: data.email.toLowerCase().trim(),
    };
    if (isMongoActive()) {
      const created = await AdminModel.create(cleanData);
      const obj = created.toObject();
      delete obj.passwordHash;
      return { ...obj, id: obj._id.toString() };
    } else {
      const db = readFallbackDB();
      const id = 'admin_' + crypto.randomUUID().slice(0, 10);
      const newAdmin = {
        ...cleanData,
        id,
        _id: id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      db.admins.push(newAdmin);
      writeFallbackDB(db);
      const { passwordHash: _passwordHash, ...safe } = newAdmin;
      return safe;
    }
  },

  async updateAdmin(id: string, updateData: any): Promise<any | null> {
    if (updateData.email) {
      updateData.email = updateData.email.toLowerCase().trim();
    }
    if (isMongoActive()) {
      const updated = await AdminModel.findByIdAndUpdate(
        id,
        { ...updateData, updatedAt: new Date() },
        { new: true }
      ).lean();
      if (!updated) return null;
      delete (updated as any).passwordHash;
      return { ...updated, id: (updated as any)._id.toString() };
    } else {
      const db = readFallbackDB();
      const idx = db.admins.findIndex((a) => a.id === id || a._id === id);
      if (idx === -1) return null;
      db.admins[idx] = {
        ...db.admins[idx],
        ...updateData,
        updatedAt: new Date().toISOString(),
      };
      writeFallbackDB(db);
      const { passwordHash: _passwordHash, ...safe } = db.admins[idx];
      return safe;
    }
  },

  async deleteAdmin(id: string): Promise<boolean> {
    if (isMongoActive()) {
      const res = await AdminModel.findByIdAndDelete(id);
      return !!res;
    } else {
      const db = readFallbackDB();
      const prev = db.admins.length;
      db.admins = db.admins.filter((a) => a.id !== id && a._id !== id);
      const deleted = db.admins.length < prev;
      if (deleted) writeFallbackDB(db);
      return deleted;
    }
  },

  async getStats(): Promise<any> {
    const all = await this.getProjects({});
    const admins = await this.getAdmins();

    const mainCount = all.filter((p) => p.category === 'main').length;
    const templatesCount = all.filter((p) => p.category === 'templates').length;
    const learningCount = all.filter((p) => p.category === 'learning').length;
    const publishedCount = all.filter((p) => p.published !== false).length;
    const draftCount = all.filter((p) => p.published === false).length;

    const messages = await this.getMessages();
    const unreadMessages = messages.filter((m) => !m.isRead).length;

    return {
      totalProjects: all.length,
      publishedProjects: publishedCount,
      draftProjects: draftCount,
      byCategory: {
        main: mainCount,
        templates: templatesCount,
        learning: learningCount,
      },
      totalAdmins: admins.length,
      superAdmins: admins.filter((a) => a.role === 'SUPER_ADMIN').length,
      totalMessages: messages.length,
      unreadMessages,
    };
  },

  // ================= DIRECT MESSAGES METHODS =================
  async createMessage(data: { name: string; email: string; subject?: string; message: string }): Promise<any> {
    const cleanData = {
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
      subject: (data.subject || '').trim(),
      message: data.message.trim(),
      isRead: false,
    };

    if (isMongoActive()) {
      const created = await MessageModel.create(cleanData);
      return { ...created.toObject(), id: created._id.toString() };
    } else {
      const db = readFallbackDB();
      if (!db.messages) db.messages = [];
      const id = 'msg_' + crypto.randomUUID().slice(0, 12);
      const newMsg = {
        ...cleanData,
        id,
        _id: id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      db.messages.unshift(newMsg); // newest first
      writeFallbackDB(db);
      return newMsg;
    }
  },

  async getMessages(filter: { isRead?: boolean; search?: string } = {}): Promise<any[]> {
    if (isMongoActive()) {
      const query: any = {};
      if (typeof filter.isRead === 'boolean') {
        query.isRead = filter.isRead;
      }
      if (filter.search) {
        const regex = new RegExp(filter.search, 'i');
        query.$or = [{ name: regex }, { email: regex }, { subject: regex }, { message: regex }];
      }
      const list = await MessageModel.find(query).sort({ createdAt: -1 }).lean();
      return list.map((m: any) => ({ ...m, id: m._id.toString() }));
    } else {
      const db = readFallbackDB();
      let list = [...(db.messages || [])];
      if (typeof filter.isRead === 'boolean') {
        list = list.filter((m) => Boolean(m.isRead) === filter.isRead);
      }
      if (filter.search) {
        const s = filter.search.toLowerCase();
        list = list.filter(
          (m) =>
            (m.name && m.name.toLowerCase().includes(s)) ||
            (m.email && m.email.toLowerCase().includes(s)) ||
            (m.subject && m.subject.toLowerCase().includes(s)) ||
            (m.message && m.message.toLowerCase().includes(s))
        );
      }
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      return list;
    }
  },

  async markMessageRead(id: string, isRead = true): Promise<any | null> {
    if (isMongoActive()) {
      const updated = await MessageModel.findByIdAndUpdate(
        id,
        { isRead, updatedAt: new Date() },
        { new: true }
      ).lean();
      if (!updated) return null;
      return { ...updated, id: (updated as any)._id.toString() };
    } else {
      const db = readFallbackDB();
      if (!db.messages) db.messages = [];
      const idx = db.messages.findIndex((m) => m.id === id || m._id === id);
      if (idx === -1) return null;
      db.messages[idx] = {
        ...db.messages[idx],
        isRead,
        updatedAt: new Date().toISOString(),
      };
      writeFallbackDB(db);
      return db.messages[idx];
    }
  },

  async markAllMessagesAsRead(): Promise<boolean> {
    if (isMongoActive()) {
      await MessageModel.updateMany({ isRead: false }, { isRead: true, updatedAt: new Date() });
      return true;
    } else {
      const db = readFallbackDB();
      if (!db.messages) db.messages = [];
      db.messages.forEach((m) => {
        m.isRead = true;
        m.updatedAt = new Date().toISOString();
      });
      writeFallbackDB(db);
      return true;
    }
  },

  async deleteMessage(id: string): Promise<boolean> {
    if (isMongoActive()) {
      const res = await MessageModel.findByIdAndDelete(id);
      return !!res;
    } else {
      const db = readFallbackDB();
      if (!db.messages) return false;
      const initial = db.messages.length;
      db.messages = db.messages.filter((m) => m.id !== id && m._id !== id);
      const deleted = db.messages.length < initial;
      if (deleted) writeFallbackDB(db);
      return deleted;
    }
  },
};
