import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Signup: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(formData.email, formData.password, formData.firstName, formData.lastName);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrap flex min-h-screen items-center justify-center py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-stone-200/80 bg-white/90 shadow-2xl lg:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-stone-50 via-rose-50 to-emerald-50 p-10 lg:block">
          <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Start Planning</p>
          <h2 className="mt-4 text-5xl font-semibold text-stone-900">Create your WedMKD account</h2>
          <p className="mt-4 text-sm leading-7 text-stone-600">
            Build your wedding website, manage guests, and organize the full celebration from one dashboard.
          </p>
        </div>

        <div className="p-6 sm:p-10">
          <h1 className="text-4xl font-semibold text-stone-900">Create Account</h1>
          <p className="mt-2 text-sm text-stone-600">Set up your planning workspace in a few steps.</p>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="field" />
              </div>
              <div>
                <label className="label" htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="field" />
              </div>
            </div>

            <div>
              <label className="label" htmlFor="signup-email">Email</label>
              <input id="signup-email" type="email" name="email" value={formData.email} onChange={handleChange} required className="field" autoComplete="email" />
            </div>

            <div>
              <label className="label" htmlFor="signup-password">Password</label>
              <input id="signup-password" type="password" name="password" value={formData.password} onChange={handleChange} required className="field" autoComplete="new-password" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-5 text-sm text-stone-600">
            Already registered?{' '}
            <Link to="/login" className="font-semibold text-rose-700 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

