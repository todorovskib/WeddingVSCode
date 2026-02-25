import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { weddingService } from '../services/api';

export const WeddingForm: React.FC<{ onWeddingCreated?: () => void }> = ({ onWeddingCreated }) => {
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    groomName: '',
    brideName: '',
    weddingDate: '',
    weddingTime: '',
    location: '',
    password: '',
    theme: 'elegant',
    description: '',
    tierId: 1,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: name === 'tierId' ? Number(value) : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!token) throw new Error('Not authenticated');
      await weddingService.create(formData, token);
      setSuccess('Wedding created successfully');
      setFormData({
        title: '',
        groomName: '',
        brideName: '',
        weddingDate: '',
        weddingTime: '',
        location: '',
        password: '',
        theme: 'elegant',
        description: '',
        tierId: 1,
      });
      onWeddingCreated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create wedding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-surface space-y-5 p-5 sm:p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-stone-500">Create</p>
        <h3 className="text-3xl font-semibold text-stone-900">New Wedding</h3>
        <p className="mt-1 text-sm text-stone-600">Set up the main wedding website details and planning workspace.</p>
      </div>

      {error && <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
      {success && <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{success}</div>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="groomName">Groom Name</label>
          <input id="groomName" type="text" name="groomName" value={formData.groomName} onChange={handleChange} required className="field" />
        </div>
        <div>
          <label className="label" htmlFor="brideName">Bride Name</label>
          <input id="brideName" type="text" name="brideName" value={formData.brideName} onChange={handleChange} required className="field" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="title">Wedding Title</label>
        <input
          id="title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="field"
          placeholder="The Wedding of..."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="weddingDate">Date</label>
          <input id="weddingDate" type="date" name="weddingDate" value={formData.weddingDate} onChange={handleChange} required className="field" />
        </div>
        <div>
          <label className="label" htmlFor="weddingTime">Time</label>
          <input id="weddingTime" type="time" name="weddingTime" value={formData.weddingTime} onChange={handleChange} className="field" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="location">Location</label>
        <input id="location" type="text" name="location" value={formData.location} onChange={handleChange} required className="field" placeholder="Skopje, Macedonia" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="theme">Theme</label>
          <select id="theme" name="theme" value={formData.theme} onChange={handleChange} className="field">
            <option value="elegant">Elegant</option>
            <option value="modern">Modern</option>
            <option value="traditional">Traditional</option>
            <option value="romantic">Romantic</option>
          </select>
        </div>
        <div>
          <label className="label" htmlFor="tierId">Subscription Tier</label>
          <select id="tierId" name="tierId" value={formData.tierId} onChange={handleChange} className="field">
            <option value={1}>Basic - $29</option>
            <option value={2}>Pro - $79</option>
            <option value={3}>Premium - $199</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label" htmlFor="password">Website Password (Optional)</label>
        <input id="password" type="password" name="password" value={formData.password} onChange={handleChange} className="field" placeholder="Leave blank for public access" />
      </div>

      <div>
        <label className="label" htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="field min-h-[100px]"
          placeholder="Tell guests what to expect..."
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary w-full py-3">
        {loading ? 'Creating...' : 'Create Wedding'}
      </button>
    </form>
  );
};

