import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { weddingService } from '../services/api';
import { Wedding } from '../types';

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
    tierId: 1
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (!token) throw new Error('Not authenticated');
      
      const result = await weddingService.create(formData, token);
      setSuccess('Wedding created successfully!');
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
        tierId: 1
      });
      onWeddingCreated?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create wedding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Create New Wedding</h3>

      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-600 text-sm">{success}</div>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Groom Name</label>
          <input
            type="text"
            name="groomName"
            value={formData.groomName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Bride Name</label>
          <input
            type="text"
            name="brideName"
            value={formData.brideName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Wedding Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
          placeholder="e.g., The Wedding of John & Jane"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="weddingDate"
            value={formData.weddingDate}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Time</label>
          <input
            type="time"
            name="weddingTime"
            value={formData.weddingTime}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border rounded"
          placeholder="Skopje, Macedonia"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Website Password (Optional)</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          placeholder="Leave blank for public access"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Theme</label>
          <select
            name="theme"
            value={formData.theme}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="elegant">Elegant</option>
            <option value="modern">Modern</option>
            <option value="traditional">Traditional</option>
            <option value="romantic">Romantic</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Subscription Tier</label>
          <select
            name="tierId"
            value={formData.tierId}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          >
            <option value={1}>Basic - $29</option>
            <option value={2}>Pro - $79</option>
            <option value={3}>Premium - $199</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          rows={3}
          placeholder="Tell guests about your wedding..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 text-white py-2 rounded font-medium hover:bg-purple-700 disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Wedding'}
      </button>
    </form>
  );
};
