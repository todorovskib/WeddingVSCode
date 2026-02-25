# Backend Setup Guide

## Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm or yarn

## Installation Steps

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. PostgreSQL Setup

#### On Windows (if not already installed):
```powershell
# Download PostgreSQL from https://www.postgresql.org/download/windows/
# Run the installer with default settings (remember the password for 'postgres' user)
```

#### Create Database
```bash
# Open Command Prompt or PowerShell
psql -U postgres

# In psql console:
CREATE DATABASE macedonian_weddings;
\q  # Exit psql
```

#### Load Schema
```bash
psql -U postgres -d macedonian_weddings -f database.sql
```

### 3. Environment Configuration
```bash
# Copy example .env
cp .env.example .env

# Edit .env with your settings:
```

**.env contents:**
```
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/macedonian_weddings
JWT_SECRET=your_secret_key_change_this_in_production
NODE_ENV=development
PORT=5000
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_PUBLIC_KEY=pk_test_your_stripe_key
FRONTEND_URL=http://localhost:5173
```

### 4. Start Development Server
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## Common Issues

### Database Connection Failed
- Verify PostgreSQL is running: `pg_isready`
- Check credentials in .env
- Ensure database exists: `psql -U postgres -l`

### Port 5000 Already in Use
- Change PORT in .env
- Or kill process: `lsof -i :5000` (mac/linux) or `netstat -ano | findstr :5000` (windows)

### Module Not Found
- Run `npm install` again
- Delete node_modules: `rm -rf node_modules && npm install`

## API Documentation

Base URL: `http://localhost:5000/api`

### Example Requests

#### Sign Up
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123","firstName":"John","lastName":"Doe"}'
```

#### Create Wedding
```bash
curl -X POST http://localhost:5000/api/weddings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title":"John & Jane Wedding",
    "groomName":"John",
    "brideName":"Jane",
    "weddingDate":"2024-12-25",
    "location":"Skopje, Macedonia"
  }'
```

## Database Maintenance

### Backup Database
```bash
pg_dump -U postgres macedonian_weddings > backup.sql
```

### Restore Database
```bash
psql -U postgres macedonian_weddings < backup.sql
```

### Reset Database
```bash
# Delete all data (keep schema)
psql -U postgres -d macedonian_weddings -f database.sql
```

## Production Deployment

1. Build TypeScript:
   ```bash
   npm run build
   ```

2. Start production server:
   ```bash
   npm start
   ```

3. Deploy to hosting (Heroku, Railway, etc.)

## Testing API Endpoints

Use Postman or similar tools. Example collection:

1. **Sign Up**: POST /api/auth/signup
2. **Login**: POST /api/auth/login (get token)
3. **Create Wedding**: POST /api/weddings (use token)
4. **Get Weddings**: GET /api/weddings/my-weddings (use token)
5. **Add Guest**: POST /api/guests
6. **Get Products**: GET /api/products
