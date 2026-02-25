import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WeddingProvider } from './context/WeddingContext';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { WeddingDetail } from './pages/WeddingDetail';
import { Shop } from './pages/Shop';
import { Navigation } from './components/Navigation';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <WeddingProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/shop" element={<Shop />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/wedding/:id"
              element={
                <ProtectedRoute>
                  <WeddingDetail />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </WeddingProvider>
    </AuthProvider>
  );
}
