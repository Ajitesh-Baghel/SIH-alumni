import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@contexts/AuthContext';
import Layout from '@components/layout/Layout';
import './styles/main.scss';

// Import pages (we'll create these next)
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/auth/LoginPage';
import SignupPage from '@pages/auth/SignupPage';
import DashboardPage from '@pages/DashboardPage';
import ProfilePage from '@pages/ProfilePage';
import DirectoryPage from '@pages/DirectoryPage';
import EventsPage from '@pages/EventsPage';
import JobsPage from '@pages/JobsPage';
import GalleryPage from '@pages/GalleryPage';
import ForumPage from '@pages/ForumPage';
import AdminPage from '@pages/AdminPage';
import SettingsPage from '@pages/SettingsPage';
import ContactPage from '@pages/ContactPage';
import NotFoundPage from '@pages/NotFoundPage';

// Protected Route component
import ProtectedRoute from '@components/common/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/directory" element={
              <ProtectedRoute>
                <DirectoryPage />
              </ProtectedRoute>
            } />
            <Route path="/events" element={
              <ProtectedRoute>
                <EventsPage />
              </ProtectedRoute>
            } />
            <Route path="/jobs" element={
              <ProtectedRoute>
                <JobsPage />
              </ProtectedRoute>
            } />
            <Route path="/gallery" element={
              <ProtectedRoute>
                <GalleryPage />
              </ProtectedRoute>
            } />
            <Route path="/forum" element={
              <ProtectedRoute>
                <ForumPage />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
            
            {/* Admin only routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminPage />
              </ProtectedRoute>
            } />
            
            {/* 404 page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
