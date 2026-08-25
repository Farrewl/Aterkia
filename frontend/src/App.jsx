import React from 'react';
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
import DashboardPage from './pages/auth/DashboardPage';
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
                    <DashboardPage />
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