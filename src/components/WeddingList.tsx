import React, { useEffect, useState } from 'react';
import { weddingService } from '../services/api';
import { Wedding } from '../types';

export const WeddingList: React.FC<{ onSelectWedding?: (wedding: Wedding) => void }> = ({ onSelectWedding }) => {
  const [weddings, setWeddings] = useState<Wedding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const fetchWeddings = async () => {
      try {
        const data = await weddingService.getAll(token);
        setWeddings(data.weddings || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weddings');
      } finally {
        setLoading(false);
      }
    };

    fetchWeddings();
  }, []);

  if (loading) return <div className="text-center py-4">Loading weddings...</div>;
  if (error) return <div className="text-red-600 text-sm">{error}</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Your Weddings</h3>
      
      {weddings.length === 0 ? (
        <p className="text-gray-500">No weddings yet. Create one to get started!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {weddings.map(wedding => (
            <div
              key={wedding.id}
              className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-lg transition"
              onClick={() => onSelectWedding?.(wedding)}
            >
              <h4 className="font-bold text-lg mb-2">{wedding.title}</h4>
              <p className="text-sm text-gray-600 mb-1">{wedding.groomName} & {wedding.brideName}</p>
              <p className="text-sm text-gray-600 mb-1">📅 {new Date(wedding.weddingDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">📍 {wedding.location}</p>
              <div className="mt-3 flex gap-2">
                <span className={`text-xs px-2 py-1 rounded ${wedding.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                  {wedding.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
