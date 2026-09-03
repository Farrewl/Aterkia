import React, { useState } from 'react';
import { useAuth } from '../../hooks';
import { User, Mail, Shield, Key, Save, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useTranslation } from '../../i18n';

function InfoIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function ProfilePage() {
  const { t } = useTranslation();
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
      setMessage({ type: 'error', text: 'New password confirmation does not match' });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters' });
      return;
    }

    setMessage({ type: 'info', text: 'Password change will be available soon' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (e.target.type === 'checkbox') {
      setFormData((prev) => ({ ...prev, [name]: e.target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const inputClass = 'w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder:text-white/25 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500/50 transition-all';
  const inputClassDisabled = 'w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 text-sm text-white/30 cursor-not-allowed';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0a1628] to-[#060d1a] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-sky-500/10 border border-sky-500/20 mb-4">
            <User className="w-10 h-10 text-sky-400" />
          </div>
          <h1 className="text-3xl font-black font-display text-white tracking-tight">{t('profile.title')}</h1>
          <p className="text-white/40 text-sm mt-1.5">{t('profile.subtitle')}</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl shadow-black/30 border border-white/10 overflow-hidden">
          <div className="border-b border-white/10">
            <nav className="flex" aria-label="Profile tabs">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${
                  activeTab === 'profile'
                    ? 'border-sky-400 text-sky-300'
                    : 'border-transparent text-white/35 hover:text-white/60'
                }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <User className="w-4 h-4" />
                  Profile
                </span>
              </button>
              {isAdmin && (
                <button
                  onClick={() => setActiveTab('security')}
                  className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors border-b-2 ${
                    activeTab === 'security'
                      ? 'border-sky-400 text-sky-300'
                      : 'border-transparent text-white/35 hover:text-white/60'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <Shield className="w-4 h-4" />
                    Security
                  </span>
                </button>
              )}
            </nav>
          </div>

          <div className="p-6 sm:p-8">
            {message && (
              <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-fade-in ${
                message.type === 'success' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/25' :
                message.type === 'error' ? 'bg-red-500/10 text-red-300 border border-red-500/25' :
                'bg-sky-500/10 text-sky-300 border border-sky-500/25'
              }`} role="alert">
                {message.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                {message.type === 'error' && <AlertTriangle className="w-5 h-5 shrink-0" />}
                {message.type === 'info' && <InfoIcon className="w-5 h-5 shrink-0" />}
                <span className="text-sm font-medium">{message.text}</span>
              </div>
            )}

            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label htmlFor="profile-name" className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/25" />
                      <input
                        id="profile-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClass}
                        placeholder={t('profile.namePlaceholder')}
                        disabled={!isAdmin}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="profile-email" className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/25" />
                      <input
                        id="profile-email"
                        type="email"
                        value={user?.email || ''}
                        className={inputClassDisabled}
                        placeholder={t('profile.emailLocked')}
                        disabled
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="profile-division" className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                      Division
                    </label>
                    <select
                      id="profile-division"
                      name="division"
                      value={formData.division}
                      onChange={handleChange}
                      className={`${inputClass} pl-4 [&>option]:bg-olympic-900 ${!isAdmin ? 'opacity-60 cursor-not-allowed' : ''}`}
                      disabled={!isAdmin}
                    >
                      <option value="">{t('profile.selectDivision')}</option>
                      <option value="ASV">{t('profile.divisionASV')}</option>
                      <option value="AUV">{t('profile.divisionAUV')}</option>
                      <option value="Leadership">{t('profile.divisionLeadership')}</option>
                      <option value="Mechanical">{t('profile.divisionMechanical')}</option>
                      <option value="Electrical">{t('profile.divisionElectrical')}</option>
                      <option value="Software">{t('profile.divisionSoftware')}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="profile-role" className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                      Role
                    </label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/25" />
                      <input
                        id="profile-role"
                        type="text"
                        value={isAdmin ? 'Administrator' : 'User'}
                        className={inputClassDisabled}
                        disabled
                      />
                    </div>
                  </div>
                </div>

                {isAdmin && <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-sky-500/20 transition-all duration-300 flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                    <Save className="w-4 h-4" />
                    <span>{t('profile.saveChanges')}</span>
                  </button>
                </div>}
              </form>
            )}

            {activeTab === 'security' && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="space-y-5">
                  <div>
                    <label htmlFor="pw-current" className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/25" />
                      <input
                        id="pw-current"
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                        className={inputClass}
                        placeholder={t('profile.currentPassword')}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pw-new" className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/25" />
                      <input
                        id="pw-new"
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                        className={inputClass}
                        placeholder={t('profile.newPasswordHint')}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="pw-confirm" className="block text-xs font-bold text-white/40 uppercase tracking-wider mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/25" />
                      <input
                        id="pw-confirm"
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                        className={inputClass}
                        placeholder={t('profile.repeatPassword')}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-sky-500/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>{t('profile.changePassword')}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-white/25 mt-6">
          Aterkia RoboBoat Team &middot; Universitas Diponegoro
        </p>
      </div>
    </div>
  );
}
