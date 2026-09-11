import React, { useState, useEffect } from 'react';
import {
  UserPlus,
  Shield,
  Trash2,
  CheckCircle,
  XCircle,
  Loader2,
  AlertTriangle,
  Lock,
  Mail,
  User
} from 'lucide-react';
import {
  getAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser
} from '../../services/api';

interface AdminUsersListProps {
  currentAdmin: any;
}

export const AdminUsersList: React.FC<AdminUsersListProps> = ({ currentAdmin }) => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);

  // New admin form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'ADMIN' | 'SUPER_ADMIN'>('ADMIN');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await getAdminUsers();
      setAdmins(data || []);
    } catch (err: any) {
      console.error('Error fetching admin users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newName || !newEmail || !newPassword) {
      setError('Please provide name, email, and password.');
      return;
    }

    try {
      setSubmitting(true);
      await createAdminUser({
        name: newName.trim(),
        email: newEmail.trim().toLowerCase(),
        password: newPassword,
        role: newRole,
      });

      setShowAddModal(false);
      setNewName('');
      setNewEmail('');
      setNewPassword('');
      setNewRole('ADMIN');
      fetchUsers();
    } catch (err: any) {
      setError(err.message || 'Failed to create administrator.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (admin: any) => {
    if (admin.id === currentAdmin?.id) {
      alert('You cannot disable your own active account.');
      return;
    }
    const newStatus = admin.status === 'active' ? 'disabled' : 'active';
    try {
      await updateAdminUser(admin.id, { status: newStatus });
      fetchUsers();
    } catch (err: any) {
      alert(err.message || 'Failed to update admin status.');
    }
  };

  const handleDeleteAdmin = async () => {
    if (!deleteTarget) return;
    try {
      await deleteAdminUser(deleteTarget.id);
      setDeleteTarget(null);
      fetchUsers();
    } catch (err: any) {
      alert(err.message || 'Failed to delete administrator.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#6F5B43]/30">
        <div>
          <h2
            className="text-3xl uppercase tracking-tight text-[#E9E3DC]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            ADMINISTRATOR <span className="text-[#C8A77A]">ACCOUNTS</span>
          </h2>
        </div>

        <button
          onClick={() => {
            setError(null);
            setShowAddModal(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-[#C8A77A] hover:bg-[#b59265] text-[#0B0B0A] text-xs font-mono uppercase font-bold flex items-center space-x-1.5 transition-all shadow-md cursor-pointer shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>ADD NEW ADMIN</span>
        </button>
      </div>

      {/* Admins Table */}
      <div className="bg-[#151514] border border-[#6F5B43]/40 rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center space-y-3">
            <Loader2 className="w-8 h-8 text-[#C8A77A] animate-spin" />
            <span className="text-xs font-mono text-[#A9A39D] uppercase tracking-widest">
              QUERYING ADMINISTRATORS...
            </span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#6F5B43]/30 bg-[#1b1a19] text-[#C8A77A] uppercase">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Last Active</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#6F5B43]/20">
                {admins.map((adm) => {
                  const isSelf = adm.id === currentAdmin?.id;
                  return (
                    <tr key={adm.id} className="hover:bg-[#222120] transition-colors">
                      <td className="py-3 px-4 font-medium text-[#E9E3DC] flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-[#222120] border border-[#6F5B43]/40 flex items-center justify-center text-[#C8A77A] font-bold text-xs shrink-0">
                          {adm.name ? adm.name[0].toUpperCase() : 'A'}
                        </div>
                        <div className="truncate max-w-xs">
                          <span className="block truncate font-bold text-sm text-[#E9E3DC]">
                            {adm.name}{' '}
                            {isSelf && (
                              <span className="text-[10px] text-[#C8A77A] font-normal ml-1">
                                (You)
                              </span>
                            )}
                          </span>
                          <span className="text-[11px] text-[#A9A39D] truncate block">
                            {adm.email}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span
                          className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold border ${
                            adm.role === 'SUPER_ADMIN'
                              ? 'bg-[#C8A77A]/15 text-[#C8A77A] border-[#C8A77A]/40'
                              : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                          }`}
                        >
                          <Shield className="w-3 h-3" />
                          <span>{adm.role === 'SUPER_ADMIN' ? 'SUPER ADMIN' : 'ADMIN'}</span>
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <button
                          disabled={isSelf}
                          onClick={() => handleToggleStatus(adm)}
                          className={`inline-flex items-center space-x-1 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold transition-all ${
                            adm.status === 'active'
                              ? 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/40'
                              : 'text-red-400 bg-red-950/40 border border-red-800/40'
                          } ${isSelf ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:opacity-80'}`}
                        >
                          {adm.status === 'active' ? (
                            <CheckCircle className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          <span>{adm.status}</span>
                        </button>
                      </td>

                      <td className="py-3 px-3 text-[#A9A39D]">
                        {adm.lastLoginAt
                          ? new Date(adm.lastLoginAt).toLocaleDateString()
                          : 'Never'}
                      </td>

                      <td className="py-3 px-4 text-right">
                        {!isSelf && (
                          <button
                            onClick={() => setDeleteTarget(adm)}
                            className="p-1.5 rounded-lg bg-[#222120] text-red-400 hover:text-red-200 hover:bg-red-950/40 border border-red-900/40 cursor-pointer"
                            title="Delete Admin"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add New Admin Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#151514] border border-[#6F5B43]/50 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-[#C8A77A]">
              <div className="w-10 h-10 rounded-xl bg-[#222120] border border-[#6F5B43]/40 flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold block text-[#C8A77A]">
                  ROLE ALLOCATION
                </span>
                <h3
                  className="text-xl uppercase font-bold text-[#E9E3DC]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  ADD NEW ADMINISTRATOR
                </h3>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs font-mono">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateAdmin} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#E9E3DC] font-semibold mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#A9A39D] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Jane Doe"
                    required
                    className="w-full pl-9 pr-3 py-2 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#E9E3DC] font-semibold mb-1">
                  Admin Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#A9A39D] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="editor@portfolio.com"
                    required
                    className="w-full pl-9 pr-3 py-2 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#E9E3DC] font-semibold mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#A9A39D] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    required
                    minLength={6}
                    className="w-full pl-9 pr-3 py-2 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#E9E3DC] font-semibold mb-1">
                  Assigned Permission Role
                </label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
                >
                  <option value="ADMIN">ADMIN (Can create, edit, publish portfolio items)</option>
                  <option value="SUPER_ADMIN">SUPER_ADMIN (Full control including user management)</option>
                </select>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#222120] text-[#E9E3DC] text-xs font-mono uppercase hover:bg-[#333130] cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-[#C8A77A] hover:bg-[#b59265] text-[#0B0B0A] text-xs font-mono uppercase font-bold cursor-pointer disabled:opacity-50 flex items-center space-x-2"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>CREATING...</span>
                    </>
                  ) : (
                    <span>CREATE ADMIN ACCOUNT</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#151514] border border-red-800/60 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center space-x-3 text-red-400">
              <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/60 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase font-bold block text-red-400">
                  REVOCATION CONFIRMATION
                </span>
                <h3
                  className="text-xl uppercase font-bold text-[#E9E3DC]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  DELETE ADMINISTRATOR
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#A9A39D] font-mono leading-relaxed">
              Are you sure you want to permanently delete administrator account{' '}
              <strong className="text-[#E9E3DC]">{deleteTarget.email}</strong>? This user will immediately lose access to the CMS.
            </p>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl bg-[#222120] text-[#E9E3DC] text-xs font-mono uppercase hover:bg-[#333130] cursor-pointer"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={handleDeleteAdmin}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-mono uppercase font-bold cursor-pointer"
              >
                CONFIRM DELETION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
