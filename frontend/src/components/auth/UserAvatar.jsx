import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, Monitor } from 'lucide-react';
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
        className="flex items-center justify-center rounded-full p-0.5 ring-2 ring-transparent hover:ring-olympic-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-olympic-500/30 focus:outline-none"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        {user.avatar ? (
          <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
        ) : (
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-olympic-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
            {initials}
          </div>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} aria-hidden="true" />
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

            <a
              href="/monitoring/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <Monitor className="w-4 h-4 text-slate-400" />
              Monitoring {isAdmin ? '(Admin)' : '(View Only)'}
            </a>

            {isAdmin && (
              <Link
                to="/admin"
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
        </>
      )}
    </div>
  );
}
