# 💍 WedMKD - Macedonian Wedding Platform

A comprehensive full-stack web application for creating personalized wedding websites with guest management, RSVP tracking, and e-commerce integration for wedding products.

## 🎯 Features

### Wedding Website Builder
- **Guest Management**: Create and manage guest lists with dietary requirements and addresses
- **RSVP System**: Password-protected guest portals for confirming attendance
- **Digital Save-the-Dates**: Send beautiful digital invitations
- **Wedding Checklist**: Customizable task management and timelines
- **Budget Tracker**: Monitor wedding expenses across all categories
- **Timeline Management**: Display ceremony and reception schedule
- **Seating Arrangements**: Organize table assignments
- **Gallery**: Share wedding photos (engagement, pre-nuptials, etc.)
- **Gift Registry**: Create wishlists integrated with the shop
- **FAQ Section**: Answer guest questions

### E-Commerce Features
- **Wedding Shop**: Browse and purchase wedding products
- **Product Categories**:
  - Invitations
  - Table Decorations
  - Candles
  - Godfather/Groom Gifts
  - Wedding Envelopes
  - And more...
- **Vendor Partnerships**: Partner with local vendors for cakes, flowers, and decorations
- **Product Discovery**: Filter by category and price
- **Shopping Cart**: Multi-item cart system
- **Order Management**: Track orders (integration with Stripe)

### Tiered Pricing Plans
1. **Basic** ($29)
   - Up to 50 guests
   - Basic website
   - Guest list & RSVP
   - Checklist

2. **Pro** ($79)
   - Up to 200 guests
   - All Basic features
   - Timeline & Budget tracker
   - Gallery
   - Dietary requirements collection

3. **Premium** ($199)
   - Unlimited guests
   - All Pro features
   - Seating arrangements
   - Custom domain support
   - Priority support

## 🏗️ Project Structure

```
├── backend/                    # Express.js API server
│   ├── src/
│   │   ├── config/            # Database configuration
│   │   ├── controllers/       # Business logic
│   │   ├── models/            # Database models
│   │   ├── routes/            # API endpoints
│   │   ├── middleware/        # Auth, error handling
│   │   └── server.ts          # Express app setup
│   ├── database.sql           # Complete schema
│   ├── package.json
│   └── tsconfig.json
│
├── src/                        # React frontend
│   ├── components/            # Reusable UI components
│   ├── pages/                 # Page components
│   ├── context/               # React Context (Auth, Wedding)
│   ├── hooks/                 # Custom React hooks
│   ├── services/              # API client services
│   ├── types/                 # TypeScript interfaces
│   ├── App.tsx                # Main app component
│   ├── main.tsx              # Entry point
│   └── index.css             # Tailwind styles
│
├── package.json               # Frontend dependencies
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
└── README.md                 # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL 12+
- Git

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup PostgreSQL Database**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE macedonian_weddings;

# Exit psql
\q
```

4. **Load database schema**
```bash
psql -U postgres -d macedonian_weddings -f database.sql
```

5. **Create .env file**
```bash
cp .env.example .env
```

6. **Update .env with your credentials**
```
DATABASE_URL=postgresql://user:password@localhost:5432/macedonian_weddings
JWT_SECRET=your_secret_key_here
NODE_ENV=development
PORT=5000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
FRONTEND_URL=http://localhost:5173
```

7. **Start the backend**
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. **In the project root directory**
```bash
npm install
```

2. **Create .env file** (optional for local dev)
```bash
VITE_API_URL=http://localhost:5000
```

3. **Start development server**
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user

### Weddings
- `POST /api/weddings` - Create wedding (protected)
- `GET /api/weddings/my-weddings` - Get user's weddings (protected)
- `GET /api/weddings/:id` - Get wedding details
- `PUT /api/weddings/:id` - Update wedding (protected)
- `POST /api/weddings/:id/publish` - Publish wedding (protected)
- `DELETE /api/weddings/:id` - Delete wedding (protected)
- `GET /api/weddings/:id/stats` - Get wedding statistics

### Guests
- `POST /api/guests` - Add guest to wedding
- `GET /api/guests/wedding/:weddingId` - Get wedding guests
- `PUT /api/guests/:id` - Update guest
- `PATCH /api/guests/:id/rsvp` - Update RSVP status
- `DELETE /api/guests/:id` - Delete guest

### Products
- `POST /api/products` - Create product
- `GET /api/products` - Get all products
- `GET /api/products/categories` - Get product categories
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/:id` - Get product details

## 🛠️ Tech Stack

### Backend
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Password Hashing**: bcryptjs
- **Payment**: Stripe (ready for integration)

### Frontend
- **Framework**: React 18
- **Language**: TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **State Management**: React Context API

## 🔐 Authentication Flow

1. User signs up/logs in
2. Backend validates credentials and returns JWT token
3. Frontend stores token in localStorage
4. Token sent in Authorization header for protected routes
5. Backend validates token with middleware
6. Access granted/denied based on token validity

## 💳 Payment Integration

The system is ready for Stripe integration for:
- Product purchases
- Subscription tier upgrades
- Order processing

Configuration in `backend/src/config/` and stripe webhook handlers ready to be implemented.

## 📊 Database Schema Highlights

- **Users**: Authentication and account management
- **Weddings**: Wedding event information and settings
- **Guests**: Guest list with RSVP tracking
- **Products**: Wedding products and inventory
- **Orders**: E-commerce orders and items
- **Timeline**: Wedding schedule and events
- **Budget**: Expense tracking
- **Vendors**: Partnership management
- **Gallery**: Photo management
- **Seating**: Table arrangements

## 🚢 Deployment

### Backend Deployment (Heroku/Railway)
```bash
cd backend
npm run build
```

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
npm run preview
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## 📝 Additional Features to Implement

- [ ] Email notifications for guest RSVP
- [ ] SMS reminders
- [ ] Video message from couple
- [ ] Live streaming integration
- [ ] Real-time chat for wedding parties
- [ ] Mobile-first guest interface
- [ ] Admin dashboard for vendors
- [ ] Analytics and reporting
- [ ] Multi-language support (Macedonian, English)
- [ ] Advanced analytics
- [ ] Social media integration
- [ ] Payment remittance system for money envelopes

## 📜 License

MIT License - See LICENSE file for details

## 👥 Authors

WedMKD Development Team

## 🤙 Support

For issues, questions, or feature requests, please open an issue in the GitHub repository.

---

**Made with ❤️ for Macedonian couples** 💍
