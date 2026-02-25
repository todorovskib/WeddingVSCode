import React, { useEffect, useState } from 'react';
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
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (weddingId > 0) {
      void fetchGuests();
    }
  }, [weddingId]);

  const fetchGuests = async () => {
    setFetching(true);
    setError('');
    try {
      const data = await guestService.getWeddingGuests(weddingId);
      setGuests(data.guests || []);
    } catch (err) {
      console.error('Failed to fetch guests:', err);
      setError('Failed to load guest list');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await guestService.add({ weddingId, ...formData });
      setFormData({
        name: '',
        email: '',
        phone: '',
        relationship: '',
        dietaryRequirements: '',
        address: '',
        notes: '',
      });
      await fetchGuests();
    } catch (err) {
      console.error('Failed to add guest:', err);
      setError('Failed to add guest');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRsvp = async (id: number, status: 'confirmed' | 'pending' | 'declined') => {
    try {
      await guestService.updateRsvp(id, status, status === 'declined' ? 0 : 1);
      await fetchGuests();
    } catch (err) {
      console.error('Failed to update RSVP:', err);
      setError('Failed to update RSVP');
    }
  };

  const handleDeleteGuest = async (id: number) => {
    if (!window.confirm('Delete this guest?')) return;
    try {
      await guestService.delete(id);
      await fetchGuests();
    } catch (err) {
      console.error('Failed to delete guest:', err);
      setError('Failed to delete guest');
    }
  };

  return (
    <div className="space-y-5">
      <section className="card-surface p-5">
        <div className="mb-4">
          <h3 className="text-3xl font-semibold text-stone-900">Guest Manager</h3>
          <p className="text-sm text-stone-600">Add guests, collect details, and track RSVPs.</p>
        </div>

        {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}

        <form onSubmit={handleAddGuest} className="space-y-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input type="text" name="name" placeholder="Guest name" value={formData.name} onChange={handleChange} required className="field" />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="field" />
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="field" />
            <input type="text" name="relationship" placeholder="Relationship" value={formData.relationship} onChange={handleChange} className="field" />
          </div>
          <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="field" />
          <textarea name="dietaryRequirements" placeholder="Dietary requirements" value={formData.dietaryRequirements} onChange={handleChange} className="field min-h-[80px]" />
          <textarea name="notes" placeholder="Notes" value={formData.notes} onChange={handleChange} className="field min-h-[80px]" />
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Adding...' : 'Add Guest'}
          </button>
        </form>
      </section>

      <section className="card-surface p-5">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="text-2xl font-semibold text-stone-900">Guest List</h4>
          <span className="chip">{guests.length} guests</span>
        </div>
        {fetching ? (
          <p className="text-sm text-stone-600">Loading guests...</p>
        ) : guests.length === 0 ? (
          <p className="rounded-xl border border-dashed border-stone-300 p-4 text-sm text-stone-600">No guests added yet.</p>
        ) : (
          <div className="space-y-3">
            {guests.map((guest) => (
              <div key={guest.id} className="rounded-2xl border border-stone-200/80 bg-white/75 p-4">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-lg font-semibold text-stone-900">{guest.name}</p>
                    <p className="text-sm text-stone-600">{guest.email || 'No email'}{guest.phone ? ` | ${guest.phone}` : ''}</p>
                    <p className="mt-1 text-xs text-stone-500">
                      {guest.relationship || 'Relationship not set'}
                      {guest.dietaryRequirements ? ` | Diet: ${guest.dietaryRequirements}` : ''}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(['confirmed', 'pending', 'declined'] as const).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => handleUpdateRsvp(guest.id, status)}
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                          guest.rsvpStatus === status
                            ? status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-700'
                              : status === 'declined'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-stone-200 text-stone-700'
                            : 'bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                    <button type="button" onClick={() => handleDeleteGuest(guest.id)} className="btn-secondary text-red-700">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

