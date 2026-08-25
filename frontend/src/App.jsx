import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Preloader from './components/Preloader';

// Halaman
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HistoryPage from './pages/HistoryPage';
import RobotsPage from './pages/RobotsPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
// Lazy-loaded (heavy deps: leaflet map bundle stays out of the main chunk)
const DashboardPage = lazy(() => import('./pages/auth/DashboardPage'));
import ProfilePage from './pages/auth/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <Preloader>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-[#060d1a] text-slate-800 font-sans flex flex-col">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/robots" element={<RobotsPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={
                  <ProtectedRoute allowedRoles={['user', 'admin']}>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute allowedRoles={['user', 'admin']}>
                    <Suspense fallback={
                      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0a1628] to-[#060d1a] flex items-center justify-center">
                        <div className="flex items-center gap-3 text-white/40 text-sm font-mono">
                          <span className="w-4 h-4 rounded-full border-2 border-sky-400/30 border-t-sky-400 animate-spin" />
                          Loading monitoring console...
                        </div>
                      </div>
                    }>
                      <DashboardPage />
                    </Suspense>
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </Preloader>
    </AuthProvider>
  );
}