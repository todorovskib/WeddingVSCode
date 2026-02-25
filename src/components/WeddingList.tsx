import React, { useEffect, useState } from 'react';
import { weddingService } from '../services/api';
import { Wedding } from '../types';

interface Props {
  onSelectWedding?: (wedding: Wedding) => void;
  onLoadedWeddings?: (weddings: Wedding[]) => void;
}

export const WeddingList: React.FC<Props> = ({ onSelectWedding, onLoadedWeddings }) => {
  const [weddings, setWeddings] = useState<Wedding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchWeddings = async () => {
      try {
        const data = await weddingService.getAll(token);
        const loaded = data.weddings || [];
        setWeddings(loaded);
        onLoadedWeddings?.(loaded);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weddings');
      } finally {
        setLoading(false);
      }
    };

    fetchWeddings();
  }, [onLoadedWeddings]);

  if (loading) return <div className="card-surface p-4 text-center text-stone-600">Loading weddings...</div>;
  if (error) return <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>;

  return (
    <div className="card-surface space-y-4 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-3xl font-semibold text-stone-900">Your Weddings</h3>
        <span className="chip">{weddings.length} total</span>
      </div>

      {weddings.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone-300 bg-white/60 p-5 text-sm text-stone-600">
          No weddings yet. Use the form to create your first wedding website.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {weddings.map((wedding) => (
            <button
              type="button"
              key={wedding.id}
              className="w-full rounded-2xl border border-stone-200/80 bg-white/90 p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              onClick={() => onSelectWedding?.(wedding)}
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-xl font-semibold text-stone-900">{wedding.title}</h4>
                <span className={`chip ${wedding.isPublished ? 'text-emerald-700' : 'text-stone-700'}`}>
                  {wedding.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="mt-2 text-sm text-stone-700">
                {wedding.groomName} & {wedding.brideName}
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs text-stone-600">
                <span className="chip">Date: {new Date(wedding.weddingDate).toLocaleDateString()}</span>
                <span className="chip">Location: {wedding.location}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

