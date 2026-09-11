// Frontend API Client for Public Portfolio & Admin Dashboard CMS

const TOKEN_KEY = 'ayesha_portfolio_admin_token';
const ADMIN_USER_KEY = 'ayesha_portfolio_admin_user';

export function getStoredToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setStoredToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearStoredAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ADMIN_USER_KEY);
}

export function getStoredAdminUser(): any | null {
  try {
    const raw = localStorage.getItem(ADMIN_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setStoredAdminUser(user: any): void {
  localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user));
}

async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getStoredToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 && endpoint.startsWith('/api/admin')) {
      clearStoredAuth();
    }
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

// ================= PUBLIC PORTFOLIO APIs =================
export async function getPublishedProjects(category?: string, search?: string) {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.append('category', category);
  if (search) params.append('search', search);

  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await apiRequest<{ success: boolean; count: number; data: any[] }>(`/api/projects${query}`);
  return res.data;
}

export async function getPublishedProjectDetail(slugOrId: string) {
  const res = await apiRequest<{ success: boolean; data: any }>(`/api/projects/${encodeURIComponent(slugOrId)}`);
  return res.data;
}

// ================= AUTH APIs =================
export async function loginAdmin(email: string, password: string) {
  const res = await apiRequest<{
    success: boolean;
    message: string;
    token: string;
    admin: any;
  }>('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  if (res.token) {
    setStoredToken(res.token);
    setStoredAdminUser(res.admin);
  }

  return res;
}

export async function logoutAdmin() {
  try {
    await apiRequest('/api/auth/logout', { method: 'POST' });
  } finally {
    clearStoredAuth();
  }
}

export async function getCurrentAdmin() {
  const res = await apiRequest<{ success: boolean; admin: any }>('/api/auth/me');
  if (res.admin) {
    setStoredAdminUser(res.admin);
  }
  return res.admin;
}

// ================= ADMIN DASHBOARD STATS =================
export async function getAdminStats() {
  const res = await apiRequest<{ success: boolean; data: any }>('/api/admin/stats');
  return res.data;
}

// ================= ADMIN PROJECT CRUD APIs =================
export async function getAdminProjects(category?: string, search?: string, published?: boolean) {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.append('category', category);
  if (search) params.append('search', search);
  if (typeof published === 'boolean') params.append('published', String(published));

  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await apiRequest<{ success: boolean; count: number; data: any[] }>(`/api/admin/projects${query}`);
  return res.data;
}

export async function getAdminProjectById(id: string) {
  const res = await apiRequest<{ success: boolean; data: any }>(`/api/admin/projects/${id}`);
  return res.data;
}

export async function createAdminProject(projectData: any) {
  const res = await apiRequest<{ success: boolean; message: string; data: any }>('/api/admin/projects', {
    method: 'POST',
    body: JSON.stringify(projectData),
  });
  return res.data;
}

export async function updateAdminProject(id: string, projectData: any) {
  const res = await apiRequest<{ success: boolean; message: string; data: any }>(`/api/admin/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(projectData),
  });
  return res.data;
}

export async function togglePublishProject(id: string) {
  const res = await apiRequest<{ success: boolean; message: string; data: any }>(`/api/admin/projects/${id}/publish`, {
    method: 'PATCH',
  });
  return res.data;
}

export async function deleteAdminProject(id: string) {
  const res = await apiRequest<{ success: boolean; message: string }>(`/api/admin/projects/${id}`, {
    method: 'DELETE',
  });
  return res;
}

export async function reorderAdminProjects(orderedIds: string[]) {
  const res = await apiRequest<{ success: boolean; message: string }>('/api/admin/projects/reorder', {
    method: 'POST',
    body: JSON.stringify({ orderedIds }),
  });
  return res;
}

// ================= ADMIN USER MANAGEMENT APIs =================
export async function getAdminUsers() {
  const res = await apiRequest<{ success: boolean; data: any[] }>('/api/admin/users');
  return res.data;
}

export async function createAdminUser(userData: any) {
  const res = await apiRequest<{ success: boolean; message: string; data: any }>('/api/admin/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  return res.data;
}

export async function updateAdminUser(id: string, updateData: any) {
  const res = await apiRequest<{ success: boolean; message: string; data: any }>(`/api/admin/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updateData),
  });
  return res.data;
}

export async function deleteAdminUser(id: string) {
  const res = await apiRequest<{ success: boolean; message: string }>(`/api/admin/users/${id}`, {
    method: 'DELETE',
  });
  return res;
}

// ================= SETTINGS APIs =================
export async function changeEmail(newEmail: string, currentPassword: string) {
  const res = await apiRequest<{ success: boolean; message: string; data: any }>('/api/settings/change-email', {
    method: 'PUT',
    body: JSON.stringify({ newEmail, currentPassword }),
  });
  if (res.data) {
    setStoredAdminUser(res.data);
  }
  return res;
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const res = await apiRequest<{ success: boolean; message: string }>('/api/settings/change-password', {
    method: 'PUT',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  return res;
}

// ================= MEDIA UPLOAD API =================
export async function uploadMedia(file: File): Promise<{
  url: string;
  filename: string;
  originalName: string;
  size: number;
  mimeType: string;
  type: 'image' | 'video';
}> {
  const token = getStoredToken();
  const formData = new FormData();
  formData.append('file', file);

  const headers: Record<string, string> = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch('/api/upload', {
    method: 'POST',
    headers,
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Media upload failed.');
  }

  return data.file;
}
