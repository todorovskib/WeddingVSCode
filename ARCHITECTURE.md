# WedMKD - Project Architecture & Implementation Guide

## 📐 Architecture Overview

### System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│    React SPA (Vite) - Pages, Components, Services          │
│    - Authentication UI                                       │
│    - Wedding Management                                      │
│    - Guest Management                                        │
│    - Product Catalog                                         │
│    - Shopping Cart                                           │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST
┌──────────────────────────┼──────────────────────────────────┐
│              API Layer (Node.js/Express)                    │
│  - Authentication Routes                                     │
│  - Wedding CRUD Operations                                  │
│  - Guest Management                                          │
│  - Product Management                                        │
│  - Order Processing                                          │
│  - User Management                                           │
└──────────────────────────┬──────────────────────────────────┘
                           │ SQL Queries
┌──────────────────────────┼──────────────────────────────────┐
│         Database Layer (PostgreSQL)                         │
│  - Users Table                                               │
│  - Weddings Table                                            │
│  - Guests Table                                              │
│  - Products Table                                            │
│  - Orders Table                                              │
│  - Vendors Table                                             │
│  - And more... (see database.sql)                           │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### 1. Authentication Flow
```
User Input → Login Component
    ↓
Auth Service (api.ts) → POST /api/auth/login
    ↓
Backend: authController.login()
    ↓
Database: Fetch user & verify password
    ↓
Generate JWT Token
    ↓
Return token → localStorage
    ↓
Update AuthContext
    ↓
Redirect to Dashboard
```

### 2. Wedding Creation Flow
```
Dashboard Component → WeddingForm
    ↓
Form Submission → weddingService.create()
    ↓
POST /api/weddings + JWT Token
    ↓
Backend: weddingController.createWedding()
    ↓
Database: Insert wedding_events record
    ↓
Return created wedding
    ↓
Update WeddingContext & UI
    ↓
Show success message
```

### 3. Guest Management Flow
```
GuestManager Component
    ↓
Add Guest Form
    ↓
guestService.add() → POST /api/guests
    ↓
Backend: guestController.addGuest()
    ↓
Database: Insert guests record
    ↓
Fetch & Display Guest List
    ↓
Real-time UI Update
```

### 4. E-Commerce Flow
```
ProductCatalog Component
    ↓
productService.getAll()
    ↓
Display Products Grid
    ↓
Add to Cart
    ↓
Cart Context/State
    ↓
Checkout → Stripe Payment
    ↓
POST /api/orders
    ↓
Database: Create order
    ↓
Order confirmation
```

## 🗂️ File Structure in Detail

### Backend Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # PostgreSQL connection pool
│   │
│   ├── middleware/
│   │   ├── auth.ts              # JWT authentication
│   │   └── errorHandler.ts      # Global error handling
│   │
│   ├── models/
│   │   ├── User.ts              # User operations
│   │   ├── Wedding.ts           # Wedding CRUD
│   │   ├── Guest.ts             # Guest management
│   │   └── Product.ts           # Product queries
│   │
│   ├── controllers/
│   │   ├── authController.ts    # Auth logic
│   │   ├── weddingController.ts # Wedding logic
│   │   ├── guestController.ts   # Guest logic
│   │   └── productController.ts # Product logic
│   │
│   ├── routes/
│   │   ├── auth.ts              # /api/auth/*
│   │   ├── weddings.ts          # /api/weddings/*
│   │   ├── guests.ts            # /api/guests/*
│   │   ├── products.ts          # /api/products/*
│   │   └── orders.ts            # /api/orders/*
│   │
│   └── server.ts                # Express app entry
│
├── database.sql                  # Complete schema
├── package.json
└── tsconfig.json
```

### Frontend Structure

```
src/
├── components/                   # Reusable UI components
│   ├── Login.tsx                # Login form
│   ├── Signup.tsx               # Registration form
│   ├── Navigation.tsx           # Top navigation bar
│   ├── WeddingForm.tsx          # Create wedding form
│   ├── WeddingList.tsx          # Display weddings
│   ├── GuestManager.tsx         # Manage guests
│   ├── ProductCatalog.tsx       # Product browsing
│   ├── PricingTiers.tsx         # Pricing display
│   └── ...additional components
│
├── pages/                        # Full page components
│   ├── Home.tsx                 # Landing page
│   ├── Dashboard.tsx            # User dashboard
│   ├── WeddingDetail.tsx        # Wedding management
│   ├── Shop.tsx                 # E-commerce page
│   └── ...additional pages
│
├── context/                      # React Context providers
│   ├── AuthContext.tsx          # Auth state & functions
│   └── WeddingContext.tsx       # Wedding state
│
├── hooks/                        # Custom React hooks
│   └── useAPI.ts                # API call hook
│
├── services/                     # API client
│   └── api.ts                   # API endpoints
│
├── types/                        # TypeScript interfaces
│   └── index.ts                 # All types
│
├── App.tsx                       # Main component with routing
├── main.tsx                      # React entry point
└── index.css                    # Tailwind CSS imports
```

## 🔐 Authentication System

### Token Storage
```typescript
// localStorage stores JWT token
localStorage.getItem('token')  // Retrieved on app load
localStorage.setItem('token', token)  // Stored after login
localStorage.removeItem('token')  // Cleared on logout
```

### Protected Routes
```typescript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
// Only rendered if token exists
```

### Request Headers
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

## 🗄️ Database Schema Overview

### Key Relationships

```
Users
├── 1 → N Wedding Events
├── 1 → N Orders
└── (vendor relationships)

Wedding Events
├── 1 → N Guests
├── 1 → N Timeline Items
├── 1 → N Budget Items
├── 1 → N Checklists
├── 1 → N Gallery
├── 1 → N Seating Arrangements
├── 1 → N Save-the-Dates
├── 1 → N FAQ
└── 1 → N Gift Registry

Products
├── 1 → N Order Items
├── N → 1 Vendors
└── N → 1 Categories

Orders
└── 1 → N Order Items
```

### Indexing Strategy
- `user_id` on wedding_events (fast user lookup)
- `wedding_id` on guests (guest queries)
- `category` on products (filtering)
- `user_id` on orders (user's orders)

## 🚀 API V1 Endpoints

### Auth Endpoints
```
POST   /api/auth/signup      - Register
POST   /api/auth/login       - Login
```

### Wedding Endpoints
```
POST   /api/weddings                - Create
GET    /api/weddings/my-weddings    - List (protected)
GET    /api/weddings/:id            - Details
PUT    /api/weddings/:id            - Update (protected)
POST   /api/weddings/:id/publish    - Publish (protected)
DELETE /api/weddings/:id            - Delete (protected)
GET    /api/weddings/:id/stats      - Statistics
```

### Guest Endpoints
```
POST   /api/guests                  - Add guest
GET    /api/guests/wedding/:id      - List guests
PUT    /api/guests/:id              - Update
PATCH  /api/guests/:id/rsvp         - Update RSVP
DELETE /api/guests/:id              - Delete
```

### Product Endpoints
```
POST   /api/products                - Create (admin)
GET    /api/products                - List all
GET    /api/products/categories     - Get categories
GET    /api/products/category/:cat  - Filter by category
GET    /api/products/:id            - Product details
```

## 💾 State Management

### React Context (Global State)

```typescript
// AuthContext
{
  user: User | null,
  token: string | null,
  login(),
  signup(),
  logout()
}

// WeddingContext
{
  selectedWedding: Wedding | null,
  selectWedding(),
  clearSelection()
}
```

### Component Local State
```typescript
// useState for:
- Form fields
- Loading states
- Error messages
- Toggle states
```

## 🔄 Request/Response Pattern

### Successful Response
```json
{
  "message": "Operation successful",
  "data": { /* response data */ },
  "token": "jwt_token_if_auth"
}

// Or for list endpoints:
{
  "items": [],
  "total": 100,
  "page": 1
}
```

### Error Response
```json
{
  "error": "Description of what went wrong",
  "status": 400
}
```

## ⚡ Performance Optimizations

### Frontend
- Code splitting with React.lazy()
- Image optimization
- Tailwind CSS purging
- Minification via Vite
- Component memoization

### Backend
- Database indexing
- Query optimization
- Connection pooling
- Response caching (future)
- Rate limiting (future)

## 🔒 Security Implementations

### Password Security
- bcryptjs hashing (10 rounds)
- Never stored in plain text
- Verified on every login

### Token Security
- JWT with expiration (7 days)
- Stored in localStorage (consider secure HttpOnly in production)
- Validated on protected routes
- Revoked on logout

### Input Validation
- Form validation on frontend
- Server-side validation on backend
- Parameterized SQL queries (pg library)
- Type checking with TypeScript

## 📈 Scalability Considerations

### Current Limitations
- Single database server
- Single backend instance
- No caching layer
- No CDN

### Future Scaling Steps
1. Add Redis for caching
2. Implement database read replicas
3. Use CDN for static assets
4. Add API versioning
5. Implement microservices (if needed)
6. Add message queues for async tasks

## 🧪 Testing Strategy (Future)

### Backend Testing
```bash
# Unit tests for models/controllers
# Integration tests for API endpoints
# Database tests with transactions
npm test
```

### Frontend Testing
```bash
# Component testing with React Testing Library
# Integration tests
# E2E tests with Cypress
npm test
```

## 🚢 Deployment Architecture

### Development
```
Localhost:5173 (Frontend)
     ↓
Localhost:5000 (Backend)
     ↓
PostgreSQL (Local)
```

### Production
```
Vercel/Netlify (Frontend)
     ↓
Heroku/Railway (Backend)
     ↓
AWS RDS/Cloud SQL (PostgreSQL)
     ↓
S3/Cloud Storage (Images)
```

## 📚 Technology Decisions

### Why React?
- Component reusability
- Large ecosystem
- Easy state management
- Great developer experience

### Why Express?
- Lightweight and flexible
- Fast development
- Good for REST APIs
- Extensive middleware ecosystem

### Why PostgreSQL?
- ACID compliance
- Advanced features
- Great for relational data
- Open source and reliable

### Why TypeScript?
- Type safety
- Better IDE support
- Catches errors early
- Self-documenting code

---

This architecture supports:
- ✅ Current feature set
- ✅ Easy feature additions
- ✅ Good performance
- ✅ Security best practices
- ✅ Scalability path forward
