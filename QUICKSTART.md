# Macedonian Wedding Platform - Quick Start Guide

## 🚀 Start Here

### ✅ Already Completed
- PostgreSQL 18 is installed and running
- Database `macedonian_weddings` is created
- All tables are loaded with the schema
- Backend environment (.env) is configured
- Backend dependencies are installed

### Next Steps: Start the Application

### Option 1: Windows with PowerShell

**Terminal 1 - Backend Setup**
```powershell
cd backend
# npm install (already completed)
# PostgreSQL is already running
npm run dev
# Backend runs on http://localhost:5000
```

**Terminal 2 - Frontend Setup**
```powershell
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

**Terminal 3 - Database (One time)**
```powershell
# PostgreSQL is already running at localhost:5432
# Database is already created: macedonian_weddings
# Schema is already loaded

# Verify database is working:
$env:PGPASSWORD="Neznam123!"; & "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d macedonian_weddings -c "\dt"
```

### Option 2: macOS/Linux

**Terminal 1 - Backend**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 - Frontend**
```bash
npm install
npm run dev
```

**Terminal 3 - Database (One time)**
```bash
createdb macedonian_weddings
psql macedonian_weddings < backend/database.sql
```

## 📋 Initial Checklist

- [x] Node.js 18+ installed: `node --version`
- [x] PostgreSQL installed at C:\Program Files\PostgreSQL\18
- [x] Database created: `macedonian_weddings`
- [x] Backend .env configured with DATABASE_URL
- [x] Frontend dependencies installed: `npm list react`
- [x] Backend running on port 5000
- [ ] Frontend running on port 5173 (run `npm run dev` in root folder)

## 🧪 Test the Application

1. Navigate to http://localhost:5173
2. Click "Get Started Free"
3. Create an account
4. Create your first wedding
5. Add guests
6. Browse the shop

## 🔍 Verify Setup

### Backend Health Check
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"ok","timestamp":"2024-..."}
```

### Test Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@example.com",
    "password":"Test123!",
    "firstName":"John",
    "lastName":"Doe"
  }'
```

## 📁 Project Layout

```
.
├── backend/                    # Express API
│   ├── src/
│   ├── database.sql
│   └── package.json
├── src/                        # React app
├── package.json
├── vite.config.ts
└── README.md
```

## 🆘 Troubleshooting

### "Cannot find module 'pg'"
```bash
cd backend && npm install
```

### "ECONNREFUSED 127.0.0.1:5432"
```powershell
# PostgreSQL not running - Start it:
& "C:\Program Files\PostgreSQL\18\bin\postgres.exe" -D "C:\Program Files\PostgreSQL\18\data"
```

### "psql is not recognized" (Windows)
```powershell
# Use full path to psql:
$env:PGPASSWORD="Neznam123!"
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d macedonian_weddings -c "\dt"
```

### "Port 5000 already in use"
```powershell
# Find and kill process on port 5000:
Get-NetTCPConnection -LocalPort 5000 | Stop-Process -Force
# Or change PORT in backend/.env
```

### "database does not exist"
```powershell
$env:PGPASSWORD="Neznam123!"
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE DATABASE macedonian_weddings;"
& "C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d macedonian_weddings -f backend/database.sql
```

## 📚 Documentation

- [Full README](./README.md)
- [Backend Setup](./BACKEND_SETUP.md)
- [Frontend Setup](./FRONTEND_SETUP.md)
- [Feature Roadmap](./ROADMAP.md)

## 💡 Tips

- Keep 3 terminals open: backend, frontend, database
- Check browser console for frontend errors
- Check terminal for backend errors
- Use `npm run build` to check for TypeScript errors

## ✨ Next Steps After Setup

1. Create test weddings
2. Try adding guests
3. Test RSVP functionality
4. Browse products in shop
5. Explore pricing tiers
6. Check guest management features

## 🎯 Core Features Working

- [x] Database schema created and loaded
- [x] Backend API running on port 5000
- [x] User authentication scaffolding
- [x] Create wedding event endpoints
- [x] Guest list management endpoints
- [x] RSVP collection setup
- [x] Product catalog endpoints
- [x] Pricing tiers structure
- [x] Dashboard routes
- [x] Navigation and routing

## 🔄 To Continue Development

Edit files in `src/` and `backend/src/` - changes auto-reload on save!

Happy coding! 💍
