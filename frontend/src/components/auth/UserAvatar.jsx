import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks';

export default function UserAvatar() {
  const { user, logout, hasRole } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const isAdmin = hasRole('admin');

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-200"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
        ) : (
          <div className="w-8 h-8 rounded-full bg-olympic-500/20 flex items-center justify-center text-olympic-300 font-bold text-sm">
            {initials}
          </div>
        )}
        <ChevronDown className={`w-4 h-4 text-olympic-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-lg border border-slate-100 py-2 animate-fade-in z-50">
          <div className="px-4 py-3 border-b border-slate-100">
            <p className="font-semibold text-slate-800 text-sm">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.email}</p>
            <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${isAdmin ? 'bg-olympic-100 text-olympic-700' : 'bg-slate-100 text-slate-600'}`}>
              {isAdmin ? 'Admin' : 'User'}
            </span>
          </div>

          <Link
            to="/profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <User className="w-4 h-4 text-slate-400" />
            Profil
          </Link>

          {isAdmin && (
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              Dashboard Admin
            </Link>
          )}

          <div className="border-t border-slate-100 my-2" />

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Keluar
          </button>
        </div>
      )}

      <div
        className="fixed inset-0 z-40"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />
    </div>
  );
}