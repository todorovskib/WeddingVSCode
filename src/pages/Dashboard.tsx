import React, { useState } from 'react';
import { WeddingForm } from '../components/WeddingForm';
import { WeddingList } from '../components/WeddingList';
import { Wedding } from '../types';

export const Dashboard: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedWedding, setSelectedWedding] = useState<Wedding | null>(null);

  const handleWeddingCreated = () => {
    setRefreshKey(k => k + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Wedding Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <WeddingForm onWeddingCreated={handleWeddingCreated} />
        </div>

        <div className="lg:col-span-2">
          <WeddingList key={refreshKey} onSelectWedding={setSelectedWedding} />

          {selectedWedding && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-4">Selected Wedding: {selectedWedding.title}</h3>
              <div className="space-y-2 text-sm">
                <p><strong>Couple:</strong> {selectedWedding.groomName} & {selectedWedding.brideName}</p>
                <p><strong>Date:</strong> {new Date(selectedWedding.weddingDate).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {selectedWedding.location}</p>
                <p><strong>Status:</strong> {selectedWedding.isPublished ? 'Published' : 'Draft'}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Edit Wedding
                </button>
                <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Guest Manager
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                  View Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-4 mt-8">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Total Weddings</p>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Published</p>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">Total Guests</p>
          <p className="text-2xl font-bold">0</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-gray-600 text-sm">RSVP Confirmed</p>
          <p className="text-2xl font-bold">0</p>
        </div>
      </div>
    </div>
  );
};
