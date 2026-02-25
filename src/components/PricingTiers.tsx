import React, { useState } from 'react';

interface Tier {
  id: number;
  name: string;
  price: number;
  features: string[];
  maxGuests: number;
}

const TIERS: Tier[] = [
  {
    id: 1,
    name: 'Basic',
    price: 29,
    maxGuests: 50,
    features: [
      'Basic website',
      'Guest list (up to 50)',
      'RSVP manager',
      'Basic checklist',
      'Digital save-the-date'
    ]
  },
  {
    id: 2,
    name: 'Pro',
    price: 79,
    maxGuests: 200,
    features: [
      'Everything in Basic',
      'Guest list (up to 200)',
      'Dietary requirements collection',
      'Guest address collection',
      'Timeline management',
      'Budget tracker',
      'Gallery'
    ]
  },
  {
    id: 3,
    name: 'Premium',
    price: 199,
    maxGuests: 500,
    features: [
      'Everything in Pro',
      'Unlimited guests',
      'Seating arrangements',
      'Gift registry',
      'Password-protected site',
      'FAQ section',
      'Custom domain support',
      'Priority support'
    ]
  }
];

export const PricingTiers: React.FC<{ onSelectTier?: (tier: Tier) => void }> = ({ onSelectTier }) => {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  const handleSelect = (tier: Tier) => {
    setSelectedTier(tier.id);
    onSelectTier?.(tier);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center mb-8">Choose Your Wedding Website Plan</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TIERS.map(tier => (
          <div
            key={tier.id}
            className={`rounded-lg border-2 overflow-hidden transition ${
              selectedTier === tier.id
                ? 'border-purple-600 shadow-lg'
                : 'border-gray-200 hover:border-purple-400'
            }`}
          >
            <div className={`p-6 ${selectedTier === tier.id ? 'bg-purple-50' : 'bg-white'}`}>
              <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
              <div className="text-3xl font-bold text-purple-600 mb-1">${tier.price}</div>
              <p className="text-sm text-gray-600 mb-4">per wedding</p>

              <button
                onClick={() => handleSelect(tier)}
                className={`w-full py-2 rounded font-medium mb-4 ${
                  selectedTier === tier.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {selectedTier === tier.id ? '✓ Selected' : 'Select Plan'}
              </button>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">Guests: Up to {tier.maxGuests}</p>
                <ul className="space-y-2">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="text-sm flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
