import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Shield,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
  KeyRound
} from 'lucide-react';
import { changeEmail, changePassword } from '../../services/api';

interface AdminSettingsProps {
  currentAdmin: any;
  onAdminUpdated: (updated: any) => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({
  currentAdmin,
  onAdminUpdated,
}) => {
  // Change Email State
  const [newEmail, setNewEmail] = useState(currentAdmin?.email || '');
  const [emailCurrentPassword, setEmailCurrentPassword] = useState('');
  const [emailSaving, setEmailSaving] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  // Change Password State
  const [pwdCurrent, setPwdCurrent] = useState('');
  const [pwdNew, setPwdNew] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const [pwdSaving, setPwdSaving] = useState(false);
  const [pwdSuccess, setPwdSuccess] = useState<string | null>(null);
  const [pwdError, setPwdError] = useState<string | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setEmailSuccess(null);

    if (!newEmail || !emailCurrentPassword) {
      setEmailError('Please provide your new email address and current password.');
      return;
    }

    try {
      setEmailSaving(true);
      const res = await changeEmail(newEmail, emailCurrentPassword);
      setEmailSuccess('Email address updated successfully.');
      setEmailCurrentPassword('');
      if (res.data) {
        onAdminUpdated(res.data);
      }
    } catch (err: any) {
      setEmailError(err.message || 'Failed to update email.');
    } finally {
      setEmailSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdError(null);
    setPwdSuccess(null);

    if (!pwdCurrent || !pwdNew || !pwdConfirm) {
      setPwdError('Please complete all password fields.');
      return;
    }

    if (pwdNew !== pwdConfirm) {
      setPwdError('New passwords do not match.');
      return;
    }

    if (pwdNew.length < 6) {
      setPwdError('New password must be at least 6 characters.');
      return;
    }

    try {
      setPwdSaving(true);
      await changePassword(pwdCurrent, pwdNew);
      setPwdSuccess('Password changed successfully.');
      setPwdCurrent('');
      setPwdNew('');
      setPwdConfirm('');
    } catch (err: any) {
      setPwdError(err.message || 'Failed to update password.');
    } finally {
      setPwdSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <div className="pb-4 border-b border-[#6F5B43]/30">
        <h2
          className="text-3xl uppercase tracking-tight text-[#E9E3DC]"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          ACCOUNT <span className="text-[#C8A77A]">SETTINGS</span>
        </h2>
      </div>

      {/* Account Info Summary */}
      <div className="bg-[#151514] border border-[#6F5B43]/40 rounded-2xl p-5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-[#222120] border border-[#6F5B43]/40 flex items-center justify-center text-[#C8A77A]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-bold text-[#E9E3DC] block">
              {currentAdmin?.name || 'Administrator'}
            </span>
            <span className="text-xs font-mono text-[#A9A39D]">
              {currentAdmin?.email}
            </span>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-[#C8A77A]/15 text-[#C8A77A] border border-[#C8A77A]/40">
          {currentAdmin?.role}
        </span>
      </div>

      {/* Change Email Form */}
      <div className="bg-[#151514] border border-[#6F5B43]/40 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="border-b border-[#6F5B43]/30 pb-3 flex items-center space-x-2 text-[#C8A77A]">
          <Mail className="w-4 h-4" />
          <h3
            className="text-lg uppercase text-[#E9E3DC]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            UPDATE EMAIL ADDRESS
          </h3>
        </div>

        {emailError && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs font-mono flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{emailError}</span>
          </div>
        )}

        {emailSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 text-xs font-mono flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{emailSuccess}</span>
          </div>
        )}

        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold mb-1">
              New Email Address
            </label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold mb-1">
              Current Password (to authorize change)
            </label>
            <input
              type="password"
              value={emailCurrentPassword}
              onChange={(e) => setEmailCurrentPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full px-3.5 py-2 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={emailSaving}
              className="px-4 py-2 rounded-xl bg-[#C8A77A] hover:bg-[#b59265] text-[#0B0B0A] text-xs font-mono uppercase font-bold flex items-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {emailSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>UPDATING...</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>SAVE NEW EMAIL</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Change Password Form */}
      <div className="bg-[#151514] border border-[#6F5B43]/40 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="border-b border-[#6F5B43]/30 pb-3 flex items-center space-x-2 text-[#C8A77A]">
          <KeyRound className="w-4 h-4" />
          <h3
            className="text-lg uppercase text-[#E9E3DC]"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            CHANGE SECURITY PASSWORD
          </h3>
        </div>

        {pwdError && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs font-mono flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{pwdError}</span>
          </div>
        )}

        {pwdSuccess && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 text-emerald-200 text-xs font-mono flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{pwdSuccess}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={pwdCurrent}
              onChange={(e) => setPwdCurrent(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full px-3.5 py-2 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold mb-1">
                New Password (min. 6 chars)
              </label>
              <input
                type="password"
                value={pwdNew}
                onChange={(e) => setPwdNew(e.target.value)}
                placeholder="••••••••••••"
                required
                minLength={6}
                className="w-full px-3.5 py-2 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[#E9E3DC] font-semibold mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                value={pwdConfirm}
                onChange={(e) => setPwdConfirm(e.target.value)}
                placeholder="••••••••••••"
                required
                minLength={6}
                className="w-full px-3.5 py-2 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-xs font-mono text-[#E9E3DC] focus:outline-none focus:border-[#C8A77A]"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={pwdSaving}
              className="px-4 py-2 rounded-xl bg-[#C8A77A] hover:bg-[#b59265] text-[#0B0B0A] text-xs font-mono uppercase font-bold flex items-center space-x-2 cursor-pointer disabled:opacity-50"
            >
              {pwdSaving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>UPDATING PASSWORD...</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5" />
                  <span>SAVE NEW PASSWORD</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
