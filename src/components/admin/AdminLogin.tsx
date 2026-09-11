import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { loginAdmin } from '../../services/api';

interface AdminLoginProps {
  onLoginSuccess: (admin: any) => void;
  onBackToPortfolio: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess, onBackToPortfolio }) => {
  const [email, setEmail] = useState('ayeshazawar2616@gmail.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please enter both your administrator email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await loginAdmin(email, password);
      onLoginSuccess(res.admin);
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0B0A] text-[#E9E3DC] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-[#C8A77A] selection:text-[#0B0B0A]">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[32rem] h-[32rem] bg-[#C8A77A]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-[30rem] h-[30rem] bg-[#80746A]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Back link */}
        <button
          onClick={onBackToPortfolio}
          className="inline-flex items-center space-x-2 text-xs font-mono text-[#A9A39D] hover:text-[#C8A77A] uppercase transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>RETURN TO PUBLIC PORTFOLIO</span>
        </button>

        {/* Card */}
        <div className="bg-[#151514] border border-[#6F5B43]/50 rounded-2xl p-7 sm:p-8 shadow-2xl relative">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#222120] border border-[#6F5B43]/40 flex items-center justify-center text-[#C8A77A]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2
                className="text-2xl font-bold uppercase tracking-tight text-[#E9E3DC]"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                PORTFOLIO <span className="text-[#C8A77A]">CONTROL</span>
              </h2>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-200 text-xs font-mono flex items-start space-x-2">
              <span className="text-red-400 font-bold">•</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#C8A77A] font-semibold mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A9A39D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@portfolio.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-sm font-mono text-[#E9E3DC] placeholder-[#6F5B43] focus:outline-none focus:border-[#C8A77A] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#C8A77A] font-semibold mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A9A39D] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full pl-10 pr-10 py-2.5 bg-[#0B0B0A] border border-[#6F5B43]/40 rounded-xl text-sm font-mono text-[#E9E3DC] placeholder-[#6F5B43] focus:outline-none focus:border-[#C8A77A] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A9A39D] hover:text-[#E9E3DC] p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 rounded-xl bg-[#C8A77A] hover:bg-[#b59265] text-[#0B0B0A] font-bold text-xs font-mono uppercase tracking-widest flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </>
                ) : (
                  <span>SIGN IN TO DASHBOARD</span>
                )}
              </button>
            </div>
          </form>

          {/* Quick credential guidance for initial setup */}
          <div className="mt-6 pt-4 border-t border-[#6F5B43]/30 text-center">
            <span className="text-[11px] font-mono text-[#A9A39D]">
              Default Super Admin: <span className="text-[#C8A77A]">ayeshazawar2616@gmail.com</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
