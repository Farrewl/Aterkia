import React, { useState } from 'react';
import { useAuth } from '../../hooks';
import { User, Mail, Shield, Key, Save, Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const { user, updateProfile, hasRole } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    division: user?.division || '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

  const isAdmin = hasRole('admin');

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const result = await updateProfile({
      name: formData.name,
      division: formData.division || undefined,
    });

    setIsSaving(false);

    if (result.success) {
      setMessage({ type: 'success', text: 'Profile updated successfully' });
    } else {
      setMessage({ type: 'error', text: result.error });
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Konfirmasi password tidak cocok' });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password minimal 8 karakter' });
      return;
    }

    setMessage({ type: 'info', text: 'Fitur ganti password akan segera tersedia' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: e.target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-olympic-50 border border-olympic-100 mb-4 shadow-lg shadow-olympic-500/10">
            <User className="w-10 h-10 text-olympic-500" />
          </div>
          <h1 className="text-3xl font-black font-display text-olympic-900 tracking-tight">User Profile</h1>
          <p className="text-slate-500 text-sm mt-1.5">Kelola informasi akun dan preferensi Anda</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-olympic-500/10 border border-slate-100 overflow-hidden">
          <div className="border-b border-slate-100">
            <nav className="flex" aria-label="Profile tabs">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${
                  activeTab === 'profile'
                    ? 'border-olympic-500 text-olympic-600'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${
                  activeTab === 'security'
                    ? 'border-olympic-500 text-olympic-600'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4" />
                  Keamanan
                </span>
              </button>
            </nav>
          </div>

          <div className="p-6 sm:p-8">
            {message && (
              <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-fade-in ${
                message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' :
                'bg-sky-50 text-sky-700 border border-sky-200'
              }`}>
                {message.type === 'success' && <CheckCircle className="w-5 h-5 shrink-0" />}
                {message.type === 'error' && <AlertTriangle className="w-5 h-5 shrink-0" />}
                {message.type === 'info' && <Info className="w-5 h-5 shrink-0" />}
                <span className="text-sm font-medium">{message.text}</span>
              </div>
            )}

            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-olympic-500/30 focus:border-olympic-400 transition-all"
                        placeholder="Nama lengkap Anda"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="email"
                        value={user?.email || ''}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-sm text-slate-600 cursor-not-allowed"
                        placeholder="Email tidak dapat diubah"
                        disabled
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Divisi
                    </label>
                    <select
                      name="division"
                      value={formData.division}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-olympic-500/30 focus:border-olympic-400 transition-all"
                    >
                      <option value="">Pilih divisi</option>
                      <option value="ASV">ASV Division</option>
                      <option value="AUV">AUV Division</option>
                      <option value="Leadership">Leadership</option>
                      <option value="Mechanical">Mechanical</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Software">Software</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Peran
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        value={isAdmin ? 'Administrator' : 'User'}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-sm text-slate-600 cursor-not-allowed"
                        disabled
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-3 rounded-xl bg-olympic-500 hover:bg-olympic-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-olympic-500/25 hover:shadow-xl hover:shadow-olympic-500/30 transition-all duration-300 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            )}

            {activeTab === 'security' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Password Saat Ini
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-olympic-500/30 focus:border-olympic-400 transition-all"
                        placeholder="Masukkan password saat ini"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Password Baru
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-olympic-500/30 focus:border-olympic-400 transition-all"
                        placeholder="Minimal 8 karakter"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Konfirmasi Password Baru
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-olympic-500/30 focus:border-olympic-400 transition-all"
                        placeholder="Ulangi password baru"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-olympic-500 hover:bg-olympic-600 text-white font-bold text-sm tracking-wide shadow-lg shadow-olympic-500/25 hover:shadow-xl hover:shadow-olympic-500/30 transition-all duration-300 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Ubah Password</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Tim Aterkia RoboBoat &middot; Universitas Diponegoro
        </p>
      </div>
    </div>
  );
}

function Info({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}