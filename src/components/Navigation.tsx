import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navigation: React.FC = () => {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-purple-600 cursor-pointer" onClick={() => navigate('/')}>
            💍 WedMKD
          </h1>

          <div className="hidden md:flex gap-6">
            <a href="/" className="text-gray-600 hover:text-gray-800">Home</a>
            <a href="/shop" className="text-gray-600 hover:text-gray-800">Shop</a>
            {token && <a href="/dashboard" className="text-gray-600 hover:text-gray-800">Dashboard</a>}
          </div>
        </div>

        <div className="flex gap-4 items-center">
          {token && user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.email}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => navigate('/login')}
                className="text-purple-600 px-4 py-2 rounded hover:bg-gray-100"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/signup')}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
