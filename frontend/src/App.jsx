import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { I18nProvider } from './i18n';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import EntryAnimation from './components/EntryAnimation';
import ErrorBoundary from './components/ErrorBoundary';

// Halaman
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HistoryPage from './pages/HistoryPage';
import RobotsPage from './pages/RobotsPage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/auth/ProfilePage';
import AdminPage from './pages/auth/AdminPage';
import MonitoringPage from './pages/MonitoringPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

export default function App() {
  const location = useLocation();
  const showNavbar = !location.pathname.startsWith('/monitoring');

  return (
    <I18nProvider>
      <AuthProvider>
        <EntryAnimation>
          <ErrorBoundary>
            <ScrollToTop />
            <div className="min-h-screen bg-[#060d1a] text-slate-800 font-sans flex flex-col">
              {showNavbar && <Navbar />}
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
                  <Route path="/admin" element={
                    <ProtectedRoute allowedRoles={['admin']}>
                      <AdminPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/monitoring" element={<MonitoringPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              {showNavbar && <Footer />}
            </div>
          </ErrorBoundary>
        </EntryAnimation>
      </AuthProvider>
    </I18nProvider>
  );
}