import React, { useState, useEffect, useCallback } from 'react';
import {
  Mail,
  MailOpen,
  Trash2,
  Reply,
  CheckCheck,
  Search,
  RefreshCw,
  Loader2,
  Clock,
  User,
  AlertTriangle,
  X,
  Inbox
} from 'lucide-react';
import {
  getAdminMessages,
  markMessageRead,
  markAllMessagesRead,
  deleteAdminMessage
} from '../../services/api';

export const AdminMessagesList: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<any | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true);
      const unreadParam =
        filterType === 'unread' ? true : filterType === 'read' ? false : undefined;
      const res = await getAdminMessages({
        unread: unreadParam,
        search: searchQuery || undefined,
      });
      const list = Array.isArray(res) ? res : (res as any)?.data;
      setMessages(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error('Error loading messages:', error);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  }, [filterType, searchQuery]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleToggleRead = async (msg: any, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const newStatus = !msg.isRead;
      await markMessageRead(msg.id || msg._id, newStatus);
      setMessages((prev) =>
        prev.map((item) =>
          (item.id === msg.id || item._id === msg.id) ? { ...item, isRead: newStatus } : item
        )
      );
      if (selectedMessage && (selectedMessage.id === msg.id || selectedMessage._id === msg.id)) {
        setSelectedMessage({ ...selectedMessage, isRead: newStatus });
      }
    } catch (err) {
      console.error('Failed to toggle read state:', err);
    }
  };

  const handleOpenMessage = async (msg: any) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      try {
        await markMessageRead(msg.id || msg._id, true);
        setMessages((prev) =>
          prev.map((item) =>
            (item.id === msg.id || item._id === msg.id) ? { ...item, isRead: true } : item
          )
        );
      } catch (err) {
        console.error('Failed to auto mark read:', err);
      }
    }
  };

  const handleMarkAllRead = async () => {
    try {
      setIsMarkingAll(true);
      await markAllMessagesRead();
      setMessages((prev) => prev.map((m) => ({ ...m, isRead: true })));
    } catch (err) {
      console.error('Failed to mark all as read:', err);
    } finally {
      setIsMarkingAll(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      setIsDeleting(true);
      await deleteAdminMessage(deleteTarget.id || deleteTarget._id);
      setMessages((prev) =>
        prev.filter((m) => m.id !== deleteTarget.id && m._id !== deleteTarget.id)
      );
      if (
        selectedMessage &&
        (selectedMessage.id === deleteTarget.id || selectedMessage._id === deleteTarget.id)
      ) {
        setSelectedMessage(null);
      }
      setDeleteTarget(null);
    } catch (err) {
      console.error('Failed to delete message:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (isoString: string) => {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  const safeMessages = Array.isArray(messages) ? messages : [];
  const totalUnread = safeMessages.filter((m) => !m.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-[#6F5B43]/30">
        <div>
          <h2
            className="text-3xl uppercase tracking-tight text-[#E9E3DC]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            CLIENT MESSAGES &amp; INQUIRIES
          </h2>
        </div>

        <div className="flex items-center space-x-2.5">
          {totalUnread > 0 && (
            <button
              onClick={handleMarkAllRead}
              disabled={isMarkingAll}
              className="px-3.5 py-2 rounded-xl bg-[#222120] text-[#C8A77A] hover:bg-[#2a2927] border border-[#6F5B43]/40 text-xs font-mono uppercase font-bold transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              {isMarkingAll ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <CheckCheck className="w-3.5 h-3.5" />
              )}
              <span>MARK ALL AS READ</span>
            </button>
          )}

          <button
            onClick={() => fetchMessages()}
            className="p-2.5 rounded-xl bg-[#222120] text-[#A9A39D] hover:text-[#C8A77A] border border-[#6F5B43]/40 transition-colors cursor-pointer"
            title="Refresh messages"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-[#C8A77A]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Filter Pills */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#C8A77A] text-[#0B0B0A]'
                : 'bg-[#151514] text-[#A9A39D] hover:text-[#E9E3DC] border border-[#6F5B43]/30'
            }`}
          >
            ALL ({safeMessages.length})
          </button>

          <button
            onClick={() => setFilterType('unread')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
              filterType === 'unread'
                ? 'bg-[#C8A77A] text-[#0B0B0A]'
                : 'bg-[#151514] text-[#A9A39D] hover:text-[#E9E3DC] border border-[#6F5B43]/30'
            }`}
          >
            <span>UNREAD</span>
            {totalUnread > 0 && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            )}
          </button>

          <button
            onClick={() => setFilterType('read')}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all cursor-pointer ${
              filterType === 'read'
                ? 'bg-[#C8A77A] text-[#0B0B0A]'
                : 'bg-[#151514] text-[#A9A39D] hover:text-[#E9E3DC] border border-[#6F5B43]/30'
            }`}
          >
            READ
          </button>
        </div>

        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#6F5B43] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by sender, email, subject, or message..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#151514] border border-[#6F5B43]/40 text-xs font-mono text-[#E9E3DC] placeholder-[#5E5A56] focus:border-[#C8A77A] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Messages List / Feed */}
      {loading ? (
        <div className="py-24 flex flex-col items-center justify-center space-y-3 text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#C8A77A]" />
          <span className="text-xs font-mono text-[#A9A39D] uppercase tracking-wider">
            SYNCHRONIZING INBOX...
          </span>
        </div>
      ) : safeMessages.length === 0 ? (
        <div className="py-24 rounded-2xl border border-[#6F5B43]/30 bg-[#151514] text-center flex flex-col items-center justify-center p-8 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-[#222120] border border-[#6F5B43]/40 flex items-center justify-center text-[#C8A77A]">
            <Inbox className="w-7 h-7" />
          </div>
          <h3
            className="text-2xl uppercase tracking-tight text-[#E9E3DC]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            NO INQUIRIES LOGGED YET
          </h3>
          <p className="text-xs font-mono text-[#A9A39D] max-w-md">
            When visitors fill out the contact form on your portfolio website, their submissions will appear here instantly.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {safeMessages.map((msg) => {
            const isUnread = !msg.isRead;
            return (
              <div
                key={msg.id || msg._id}
                onClick={() => handleOpenMessage(msg)}
                className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isUnread
                    ? 'bg-[#1e1c1a] border-[#C8A77A] shadow-[0_4px_20px_rgba(200,167,122,0.15)] ring-1 ring-[#C8A77A]/40'
                    : 'bg-[#151514] border-[#6F5B43]/30 hover:border-[#6F5B43]'
                }`}
              >
                {/* Left: Info */}
                <div className="flex items-start space-x-3.5 min-w-0 flex-1">
                  {/* Status Indicator */}
                  <button
                    onClick={(e) => handleToggleRead(msg, e)}
                    className="mt-1 text-[#C8A77A] hover:text-[#E9E3DC] transition-colors shrink-0"
                    title={isUnread ? 'Mark as read' : 'Mark as unread'}
                  >
                    {isUnread ? (
                      <div className="relative">
                        <Mail className="w-5 h-5 text-[#C8A77A]" />
                        <span className="w-2 h-2 rounded-full bg-amber-400 absolute -top-1 -right-1" />
                      </div>
                    ) : (
                      <MailOpen className="w-5 h-5 text-[#6F5B43]" />
                    )}
                  </button>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-sm font-bold ${isUnread ? 'text-[#E9E3DC]' : 'text-[#D8C3AA]'}`}>
                        {msg.name}
                      </span>
                      <span className="text-xs font-mono text-[#A9A39D]">
                        &lt;{msg.email}&gt;
                      </span>
                      {isUnread && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold bg-[#C8A77A] text-[#0B0B0A]">
                          NEW
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-mono uppercase font-bold text-[#C8A77A] truncate">
                      {msg.subject || 'Direct Portfolio Inquiry'}
                    </h4>

                    <p className="text-xs text-[#A9A39D] line-clamp-2 leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </div>

                {/* Right: Date & Quick Actions */}
                <div className="flex sm:flex-col sm:items-end justify-between items-center shrink-0 space-y-2 border-t sm:border-t-0 border-[#6F5B43]/20 pt-2 sm:pt-0">
                  <span className="text-[11px] font-mono text-[#A9A39D] flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(msg.createdAt)}</span>
                  </span>

                  <div className="flex items-center space-x-1.5" onClick={(e) => e.stopPropagation()}>
                    <a
                      href={`mailto:${msg.email}?subject=${encodeURIComponent(
                        'Re: ' + (msg.subject || 'Portfolio Inquiry')
                      )}`}
                      className="p-1.5 rounded-lg bg-[#222120] text-[#C8A77A] hover:bg-[#2a2927] border border-[#6F5B43]/40 text-xs transition-colors"
                      title="Reply via email"
                    >
                      <Reply className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={(e) => handleToggleRead(msg, e)}
                      className="p-1.5 rounded-lg bg-[#222120] text-[#A9A39D] hover:text-[#E9E3DC] border border-[#6F5B43]/40 text-xs transition-colors"
                      title={isUnread ? 'Mark as read' : 'Mark as unread'}
                    >
                      {isUnread ? <CheckCheck className="w-3.5 h-3.5" /> : <Mail className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      onClick={() => setDeleteTarget(msg)}
                      className="p-1.5 rounded-lg bg-[#222120] text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-[#6F5B43]/40 text-xs transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Message Modal View */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl bg-[#151514] border border-[#6F5B43] rounded-2xl p-6 sm:p-8 space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#6F5B43]/30">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C8A77A] font-bold block">
                  INQUIRY SPECIFICATION
                </span>
                <h3
                  className="text-2xl uppercase tracking-tight text-[#E9E3DC]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {selectedMessage.subject || 'Direct Portfolio Inquiry'}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMessage(null)}
                className="p-2 text-[#A9A39D] hover:text-[#E9E3DC] rounded-lg bg-[#222120] border border-[#6F5B43]/30 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sender Meta */}
            <div className="p-4 rounded-xl bg-[#0B0B0A] border border-[#6F5B43]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-[#222120] border border-[#6F5B43]/50 flex items-center justify-center text-[#C8A77A]">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-[#E9E3DC] block">
                    {selectedMessage.name}
                  </span>
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-[#C8A77A] hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 text-[#A9A39D]">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatDate(selectedMessage.createdAt)}</span>
              </div>
            </div>

            {/* Full Message Body */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono text-[#A9A39D] uppercase tracking-wider block">
                MESSAGE BODY:
              </span>
              <div className="p-5 rounded-xl bg-[#222120] border border-[#6F5B43]/40 text-sm text-[#E9E3DC] leading-relaxed whitespace-pre-wrap font-sans">
                {selectedMessage.message}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#6F5B43]/30">
              <button
                onClick={() => setDeleteTarget(selectedMessage)}
                className="px-4 py-2 rounded-xl text-xs font-mono uppercase bg-red-950/40 border border-red-800/60 text-red-300 hover:bg-red-900/50 transition-colors flex items-center space-x-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>DELETE INQUIRY</span>
              </button>

              <div className="flex items-center space-x-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                    'Re: ' + (selectedMessage.subject || 'Portfolio Inquiry')
                  )}`}
                  className="px-5 py-2.5 rounded-xl text-xs font-mono uppercase font-bold bg-[#C8A77A] text-[#0B0B0A] hover:bg-[#D8C3AA] transition-colors flex items-center space-x-2 shadow-md"
                >
                  <Reply className="w-4 h-4" />
                  <span>REPLY VIA EMAIL</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#151514] border border-[#6F5B43] rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center space-x-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-lg font-bold text-[#E9E3DC]">Confirm Delete</h3>
            </div>
            <p className="text-xs text-[#A9A39D]">
              Are you sure you want to permanently delete the inquiry from{' '}
              <strong className="text-[#E9E3DC]">{deleteTarget.name}</strong>? This action cannot be reversed.
            </p>
            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-mono uppercase bg-[#222120] text-[#A9A39D] hover:text-[#E9E3DC] border border-[#6F5B43]/30"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-4 py-2 rounded-xl text-xs font-mono uppercase bg-red-600 hover:bg-red-700 text-white font-bold flex items-center space-x-1.5"
              >
                {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
