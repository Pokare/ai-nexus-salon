import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import DemoLayout from './components/DemoLayout';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Contents from './pages/Contents';
import QA from './pages/QA';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Demo routes - no login required */}
          <Route element={<DemoLayout />}>
            <Route path="/demo" element={<Dashboard />} />
            <Route path="/demo/contents" element={<Contents />} />
            <Route path="/demo/qa" element={<QA />} />
            <Route path="/demo/notifications" element={<Notifications />} />
          </Route>

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/contents" element={<Contents />} />
              <Route path="/qa" element={<QA />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Route>

          <Route path="/" element={<Navigate to="/demo" replace />} />
          <Route path="*" element={<Navigate to="/demo" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
