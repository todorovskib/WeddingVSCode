import React, { useState, useEffect } from 'react';
import { guestService } from '../services/api';
import { Guest } from '../types';

export const GuestManager: React.FC<{ weddingId: number }> = ({ weddingId }) => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: '',
    dietaryRequirements: '',
    address: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGuests();
  }, [weddingId]);

  const fetchGuests = async () => {
    try {
      const data = await guestService.getWeddingGuests(weddingId);
      setGuests(data.guests || []);
    } catch (err) {
      console.error('Failed to fetch guests:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await guestService.add({ weddingId, ...formData });
      setFormData({
        name: '',
        email: '',
        phone: '',
        relationship: '',
        dietaryRequirements: '',
        address: '',
        notes: ''
      });
      fetchGuests();
    } catch (err) {
      console.error('Failed to add guest:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRsvp = async (id: number, status: string, count: number) => {
    try {
      await guestService.updateRsvp(id, status, count);
      fetchGuests();
    } catch (err) {
      console.error('Failed to update RSVP:', err);
    }
  };

  const handleDeleteGuest = async (id: number) => {
    if (confirm('Are you sure you want to delete this guest?')) {
      try {
        await guestService.delete(id);
        fetchGuests();
      } catch (err) {
        console.error('Failed to delete guest:', err);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold mb-4">Guest Manager</h3>

      <form onSubmit={handleAddGuest} className="mb-6 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            name="name"
            placeholder="Guest Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="px-3 py-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="px-3 py-2 border rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="relationship"
            placeholder="Relationship"
            value={formData.relationship}
            onChange={handleChange}
            className="px-3 py-2 border rounded"
          />
        </div>

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />

        <textarea
          name="dietaryRequirements"
          placeholder="Dietary Requirements"
          value={formData.dietaryRequirements}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          rows={2}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Guest'}
        </button>
      </form>

      <div className="space-y-2">
        <h4 className="font-semibold mb-3">Guest List ({guests.length})</h4>
        {guests.length === 0 ? (
          <p className="text-gray-500">No guests added yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">RSVP</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {guests.map(guest => (
                  <tr key={guest.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{guest.name}</td>
                    <td className="p-2">{guest.email || '-'}</td>
                    <td className="p-2">
                      <button
                        onClick={() => handleUpdateRsvp(guest.id, 'confirmed', 1)}
                        className={`text-xs px-2 py-1 rounded ${
                          guest.rsvpStatus === 'confirmed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        ✓ Confirmed
                      </button>
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleDeleteGuest(guest.id)}
                        className="text-red-600 text-xs hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
