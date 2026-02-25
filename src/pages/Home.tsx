import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PricingTiers } from '../components/PricingTiers';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('token');

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Your Perfect Macedonian Wedding Website</h1>
          <p className="text-xl mb-8">Create a stunning, personalized wedding website with guest management, RSVP tools, and more</p>
          {!user ? (
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => navigate('/signup')}
                className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100"
              >
                Get Started Free
              </button>
              <button
                onClick={() => navigate('/login')}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-purple-600"
              >
                Sign In
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100"
            >
              Go to Dashboard
            </button>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Your Special Day</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '👥',
              title: 'Guest Management',
              description: 'Easily manage guest lists, collect dietary requirements, and track addresses'
            },
            {
              icon: '✅',
              title: 'RSVP System',
              description: 'Password-protected RSVP login for guests to confirm attendance'
            },
            {
              icon: '📋',
              title: 'Wedding Checklist',
              description: 'Stay organized with customizable checklists and timelines'
            },
            {
              icon: '💌',
              title: 'Digital Invitations',
              description: 'Send beautiful save-the-dates and invitations digitally'
            },
            {
              icon: '💰',
              title: 'Budget Tracker',
              description: 'Track wedding expenses across all categories'
            },
            {
              icon: '🛍️',
              title: 'Wedding Shop',
              description: 'Buy invitations, decorations, gifts, and more'
            }
          ].map((feature, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-12 px-4">
        <div className="container mx-auto">
          <PricingTiers />
        </div>
      </section>

      {/* Shop Preview Section */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Shop Wedding Essentials</h2>
        <p className="text-center text-gray-600 mb-12">
          Browse our curated collection of wedding products from invitations to decorations,<br />
          or partner with local vendors for flowers, cakes, and more.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="block mx-auto bg-purple-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-700"
        >
          Browse the Shop
        </button>
      </section>

      {/* Call to Action */}
      <section className="bg-purple-600 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Your Wedding Website?</h2>
          <p className="text-lg mb-8">Join couples from across Macedonia creating unforgettable wedding experiences</p>
          {!user && (
            <button
              onClick={() => navigate('/signup')}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100"
            >
              Start Free Trial
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
