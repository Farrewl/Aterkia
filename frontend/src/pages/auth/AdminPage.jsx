import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks';
import { getAllProfiles, adminUpdateProfile } from '../../services/supabase';
import {
  Users,
  ShieldCheck,
  Loader2,
  Search,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useTranslation } from '../../i18n';

const DIVISION_OPTIONS = [
  'ASV',
  'AUV',
  'Mechanical',
  'Electrical',
  'Software',
  'Leadership',
  'Secretary & Treasurer',
  'Official',
];

export default function AdminPage() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [query, setQuery] = useState('');

  const load = useCallback(async () => {
    setIsLoading(true);
    const { data, error } = await getAllProfiles();
    if (error) {
      setMessage({ type: 'error', text: error });
    } else {
      setProfiles(data);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleChange = async (profile, patch) => {
    if (!window.confirm('Anda yakin ingin mengubah status akun ini?')) return;
    setIsSaving(true);
    setMessage(null);
    const { success, error } = await adminUpdateProfile(profile.id, patch);
    if (success) {
      setMessage({ type: 'success', text: 'Perubahan berhasil disimpan.' });
      setProfiles((prev) =>
        prev.map((p) => (p.id === profile.id ? { ...p, ...patch } : p))
      );
    } else {
      setMessage({ type: 'error', text: error });
    }
    setIsSaving(false);
  };

  const filtered = profiles.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      (p.name || '').toLowerCase().includes(q) ||
      (p.email || '').toLowerCase().includes(q) ||
      (p.division || '').toLowerCase().includes(q)
    );
  });

  const isSelf = (p) => user?.id === p.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0a1628] to-[#060d1a] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4" /> Admin
          </span>
          <h1 className="mt-2 text-3xl font-black font-display text-white tracking-tight">
            {t('admin.title')}
          </h1>
          <p className="mt-2 text-white/40 text-sm font-light max-w-2xl">
            {t('admin.desc')}
          </p>
        </div>

        {message && (
          <div className={`mb-6 flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-medium ${
            message.type === 'error'
              ? 'border-red-400/30 bg-red-500/10 text-red-200'
              : 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200'
          }`}>
            {message.type === 'error'
              ? <AlertTriangle className="w-4 h-4 shrink-0" />
              : <CheckCircle2 className="w-4 h-4 shrink-0" />}
            {message.text}
          </div>
        )}

        <div className="mb-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('admin.search')}
              className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-sky-400/30 focus:border-sky-400/50"
            />
          </div>
          <span className="text-xs text-white/40 font-mono flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5" /> {filtered.length} {t('admin.users')}
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/[0.04] text-xs uppercase tracking-wider text-white/40">
                <tr>
                  <th className="px-4 py-3 font-bold">{t('admin.colUser')}</th>
                  <th className="px-4 py-3 font-bold">{t('admin.colDivision')}</th>
                  <th className="px-4 py-3 font-bold">{t('admin.colRole')}</th>
                  <th className="px-4 py-3 font-bold">{t('admin.colStatus')}</th>
                  <th className="px-4 py-3 font-bold text-right">{t('admin.colActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {isLoading && (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center">
                      <Loader2 className="w-6 h-6 mx-auto animate-spin text-sky-400" />
                    </td>
                  </tr>
                )}
                {!isLoading && filtered.map((p) => {
                  const role = p.role === 'admin' ? 'admin' : 'user';
                  return (
                    <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-500/20 to-cyan-400/20 text-sm font-bold text-sky-300">
                            {(p.name || p.email || '?').slice(0, 1).toUpperCase()}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-white">{p.name || t('admin.noName')}</p>
                            <p className="truncate text-xs text-white/35">{p.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={p.division || ''}
                          disabled={isSaving || isSelf(p)}
                          onChange={(e) => handleChange(p, { division: e.target.value })}
                          className="rounded-lg bg-white/[0.05] border border-white/10 px-2.5 py-1.5 text-sm text-white focus:outline-none focus:border-sky-400/50 disabled:opacity-40"
                        >
                          <option value="">—</option>
                          {DIVISION_OPTIONS.map((d) => (
                            <option key={d} value={d} className="text-slate-800">{d}</option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={role}
                          disabled={isSaving || isSelf(p)}
                          onChange={(e) => handleChange(p, { role: e.target.value })}
                          className={`rounded-lg border px-2.5 py-1.5 text-sm font-semibold focus:outline-none disabled:opacity-40 ${
                            role === 'admin'
                              ? 'bg-amber-500/15 border-amber-400/30 text-amber-300'
                              : 'bg-white/[0.05] border-white/10 text-white'
                          }`}
                        >
                          <option value="user" className="text-slate-800">{t('admin.roleUser')}</option>
                          <option value="admin" className="text-slate-800">{t('admin.roleAdmin')}</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button
                          type="button"
                          disabled={isSaving || isSelf(p)}
                          onClick={() => handleChange(p, { is_active: !p.is_active })}
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold transition-colors disabled:opacity-40 ${
                            p.is_active
                              ? 'bg-emerald-500/15 text-emerald-300'
                              : 'bg-red-500/15 text-red-300'
                          }`}
                        >
                          <span className={`h-1.5 w-1.5 rounded-full ${p.is_active ? 'bg-emerald-400' : 'bg-red-400'}`} />
                          {p.is_active ? t('admin.active') : t('admin.inactive')}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className="text-xs text-white/25">
                          {isSelf(p) ? t('admin.self') : ''}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
