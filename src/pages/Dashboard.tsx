import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WeddingForm } from '../components/WeddingForm';
import { WeddingList } from '../components/WeddingList';
import { weddingService } from '../services/api';
import { GuestStats, Wedding } from '../types';

const emptyStats: GuestStats = {
  totalGuests: 0,
  confirmedCount: 0,
  declinedCount: 0,
  pendingCount: 0,
};

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedWedding, setSelectedWedding] = useState<Wedding | null>(null);
  const [weddings, setWeddings] = useState<Wedding[]>([]);
  const [selectedStats, setSelectedStats] = useState<GuestStats>(emptyStats);
  const [statsLoading, setStatsLoading] = useState(false);

  const handleWeddingCreated = () => {
    setRefreshKey((k) => k + 1);
  };

  const handleSelectWedding = async (wedding: Wedding) => {
    setSelectedWedding(wedding);
    setStatsLoading(true);
    try {
      const response = await weddingService.getStats(wedding.id);
      setSelectedStats(response.stats || emptyStats);
    } catch (error) {
      console.error('Failed to load wedding stats', error);
      setSelectedStats(emptyStats);
    } finally {
      setStatsLoading(false);
    }
  };

  const quickStats = useMemo(() => {
    const publishedCount = weddings.filter((w) => w.isPublished).length;
    return [
      { label: 'Total Weddings', value: weddings.length.toString() },
      { label: 'Published', value: publishedCount.toString() },
      { label: 'Total Guests', value: String(selectedStats.totalGuests) },
      { label: 'RSVP Confirmed', value: String(selectedStats.confirmedCount) },
    ];
  }, [weddings, selectedStats]);

  return (
    <div className="page-wrap section-gap space-y-6">
      <section className="card-surface-strong px-5 py-7 sm:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-stone-500">Dashboard</p>
            <h1 className="mt-2 text-5xl font-semibold text-stone-900">Your Wedding Planning Hub</h1>
            <p className="mt-2 text-sm text-stone-600">
              Create wedding sites, manage guests, and monitor planning progress from one place.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            <button className="btn-secondary" type="button" onClick={() => navigate('/shop')}>
              Open Shop
            </button>
            {selectedWedding && (
              <button className="btn-primary" type="button" onClick={() => navigate(`/wedding/${selectedWedding.id}`)}>
                Open Wedding
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-1">
          <WeddingForm onWeddingCreated={handleWeddingCreated} />
        </div>

        <div className="space-y-6 xl:col-span-2">
          <WeddingList
            key={refreshKey}
            onSelectWedding={handleSelectWedding}
            onLoadedWeddings={setWeddings}
          />

          {selectedWedding && (
            <section className="card-surface p-5 sm:p-6">
              <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-stone-500">Selected Wedding</p>
                  <h2 className="text-3xl font-semibold text-stone-900">{selectedWedding.title}</h2>
                  <p className="mt-1 text-sm text-stone-600">
                    {selectedWedding.groomName} & {selectedWedding.brideName}
                  </p>
                </div>
                <span className={`chip ${selectedWedding.isPublished ? 'text-emerald-700' : 'text-stone-700'}`}>
                  {selectedWedding.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-stone-200/80 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-stone-500">Date</p>
                  <p className="mt-1 text-lg font-semibold text-stone-900">
                    {new Date(selectedWedding.weddingDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="rounded-xl border border-stone-200/80 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.14em] text-stone-500">Location</p>
                  <p className="mt-1 text-lg font-semibold text-stone-900">{selectedWedding.location}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <button type="button" className="btn-secondary" onClick={() => navigate(`/wedding/${selectedWedding.id}`)}>
                  View Website
                </button>
                <button type="button" className="btn-secondary" onClick={() => navigate(`/wedding/${selectedWedding.id}`)}>
                  Guest Manager
                </button>
                <button type="button" className="btn-primary" onClick={() => navigate(`/wedding/${selectedWedding.id}`)}>
                  Manage Details
                </button>
              </div>

              <div className="mt-4 text-sm text-stone-600">
                {statsLoading ? 'Loading guest stats...' : `Guests: ${selectedStats.totalGuests} | Confirmed: ${selectedStats.confirmedCount}`}
              </div>
            </section>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickStats.map((stat) => (
          <div key={stat.label} className="card-surface p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-stone-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-stone-900">{stat.value}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

