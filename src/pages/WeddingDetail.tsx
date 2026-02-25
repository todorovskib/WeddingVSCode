import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { GuestManager } from '../components/GuestManager';

export const WeddingDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const weddingId = id ? parseInt(id) : 0;

  const tabs = [
    { id: 'overview', label: '📋 Overview' },
    { id: 'guests', label: '👥 Guests & RSVP' },
    { id: 'checklist', label: '✅ Checklist' },
    { id: 'timeline', label: '⏰ Timeline' },
    { id: 'budget', label: '💰 Budget' },
    { id: 'gallery', label: '📸 Gallery' },
    { id: 'qna', label: '❓ FAQ' },
    { id: 'shop', label: '🛍️ Registry' }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-3xl font-bold mb-2">The Wedding of John & Jane</h1>
        <p className="text-gray-600">📅 December 25, 2024 • 📍 Skopje, Macedonia</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow mb-6 overflow-x-auto">
        <div className="flex gap-0">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 px-4 py-3 font-medium border-b-2 transition ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Wedding Overview</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-600 text-sm">Groom</p>
                <p className="text-lg font-bold">John</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-600 text-sm">Bride</p>
                <p className="text-lg font-bold">Jane</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-600 text-sm">Date</p>
                <p className="text-lg font-bold">Dec 25, 2024</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-600 text-sm">Location</p>
                <p className="text-lg font-bold">Skopje, MK</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guests' && (
          <GuestManager weddingId={weddingId} />
        )}

        {activeTab === 'checklist' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Wedding Checklist</h2>
            <div className="space-y-2">
              {['Reserve venue', 'Book photographer', 'Arrange catering', 'Send invitations', 'Plan honeymoon'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded">
                  <input type="checkbox" className="w-5 h-5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'timeline' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Wedding Timeline</h2>
            <div className="space-y-4">
              <div className="pl-4 border-l-4 border-purple-600">
                <p className="font-bold">10:00 AM - Guest Arrival</p>
                <p className="text-gray-600 text-sm">Guests gather at the venue</p>
              </div>
              <div className="pl-4 border-l-4 border-purple-400">
                <p className="font-bold">11:00 AM - Ceremony</p>
                <p className="text-gray-600 text-sm">Wedding ceremony begins</p>
              </div>
              <div className="pl-4 border-l-4 border-purple-400">
                <p className="font-bold">12:30 PM - Reception</p>
                <p className="text-gray-600 text-sm">Reception and dining</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'budget' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Budget Tracker</h2>
            <div className="space-y-3">
              {[
                { category: 'Venue', budgeted: 5000, spent: 4800 },
                { category: 'Catering', budgeted: 8000, spent: 7500 },
                { category: 'Photography', budgeted: 2000, spent: 1800 },
                { category: 'Decorations', budgeted: 1500, spent: 1200 }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">{item.category}</span>
                    <span className="text-sm text-gray-600">${item.spent} / ${item.budgeted}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${(item.spent / item.budgeted) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'qna' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded">
                <p className="font-bold mb-2">Q: What time should we arrive?</p>
                <p className="text-gray-600">A: Please arrive at 10:00 AM for check-in</p>
              </div>
            </div>
          </div>
        )}

        {['gallery', 'shop'].includes(activeTab) && (
          <div className="text-center py-8 text-gray-500">
            <p>Coming soon!</p>
          </div>
        )}
      </div>
    </div>
  );
};
