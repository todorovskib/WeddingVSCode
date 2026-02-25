# WedMKD - Quick Reference Guide

## 🚀 Start Development (All Commands)

### Terminal 1: Backend
```bash
cd backend
npm install          # First time only
npm run dev          # Runs on http://localhost:5000
```

### Terminal 2: Frontend
```bash
npm install          # First time only
npm run dev          # Runs on http://localhost:5173
```

### Terminal 3: Database (Setup only)
```bash
# Windows
psql -U postgres
CREATE DATABASE macedonian_weddings;
\q
psql -U postgres -d macedonian_weddings -f backend/database.sql

# macOS/Linux
createdb macedonian_weddings
psql macedonian_weddings < backend/database.sql
```

## 📝 Important Commands

### Backend
```bash
npm run dev          # Development server with auto-reload
npm run build        # Compile TypeScript
npm start            # Run production build
npm test             # Run tests (when added)
```

### Frontend
```bash
npm run dev          # Development server (Vite)
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Check code quality
```

### Database
```bash
psql -U postgres -l                                          # List databases
psql -d macedonian_weddings                                  # Connect to DB
psql macedonian_weddings < backend/database.sql             # Load schema
pg_dump macedonian_weddings > backup.sql                    # Backup DB
```

## 🔑 Environment Setup

### Backend .env
```
DATABASE_URL=postgresql://postgres:password@localhost:5432/macedonian_weddings
JWT_SECRET=change_me_in_production
NODE_ENV=development
PORT=5000
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
FRONTEND_URL=http://localhost:5173
```

### Frontend .env.local
```
VITE_API_URL=http://localhost:5000
```

## 🧭 Project Navigation

### Frontend Pages
- **/** - Home page
- **/login** - Login
- **/signup** - Sign up
- **/dashboard** - User dashboard
- **/wedding/:id** - Wedding details
- **/shop** - Product catalog

### Backend API Endpoints
- **POST /api/auth/signup** - Register
- **POST /api/auth/login** - Login
- **POST /api/weddings** - Create wedding
- **GET /api/weddings/my-weddings** - Get weddings
- **POST /api/guests** - Add guest
- **GET /api/products** - Get products

## 📐 File Organization

```
Project Root
├── backend/                 # Express API server
│   ├── src/
│   │   ├── config/         # Database config
│   │   ├── middleware/     # Auth & error handling
│   │   ├── models/         # Database operations
│   │   ├── controllers/    # Business logic
│   │   ├── routes/         # API endpoints
│   │   └── server.ts       # Entry point
│   ├── database.sql        # Schema
│   └── package.json
│
├── src/                    # React frontend
│   ├── components/         # UI components
│   ├── pages/             # Page components
│   ├── context/           # State management
│   ├── services/          # API client
│   ├── hooks/             # Custom hooks
│   ├── types/             # TypeScript types
│   ├── App.tsx            # Main component
│   ├── main.tsx           # Entry point
│   └── index.css          # Styles
│
├── package.json           # Frontend deps
├── vite.config.ts        # Vite config
├── tsconfig.json         # TypeScript config
└── README.md             # Documentation
```

## 🐛 Common Issues & Fixes

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# macOS/Linux
lsof -i :5000
kill -9 <PID>
```

### Database Connection Error
```bash
# Check if PostgreSQL is running
pg_isready

# Verify credentials in .env
# Verify database exists
psql -U postgres -l | grep macedonian_weddings
```

### Module Not Found
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors
```bash
# Build to check for errors
npm run build

# Check specific file
ts-node --files backend/src/server.ts
```

## 🔄 Development Workflow

### Adding a Feature

1. **Create branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Backend**
   - Create model in `backend/src/models/`
   - Create controller in `backend/src/controllers/`
   - Create route in `backend/src/routes/`
   - Add to `backend/src/server.ts`

3. **Frontend**
   - Create component in `src/components/` or `src/pages/`
   - Update types in `src/types/index.ts`
   - Add API service in `src/services/api.ts`
   - Create route in `src/App.tsx`

4. **Test**
   ```bash
   npm run dev  # Frontend
   npm run dev  # Backend
   # Test in browser
   ```

5. **Commit**
   ```bash
   git add .
   git commit -m "feat: Your feature description"
   git push origin feature/your-feature-name
   ```

## 💾 Database Operations

### View Tables
```bash
psql -d macedonian_weddings -c "\dt"
```

### View Table Schema
```bash
psql -d macedonian_weddings -c "\d table_name"
```

### Run SQL Query
```bash
psql -d macedonian_weddings -c "SELECT * FROM users LIMIT 5;"
```

### Backup Database
```bash
pg_dump macedonian_weddings > backup_$(date +%Y%m%d).sql
```

### Restore Database
```bash
psql macedonian_weddings < backup_20240225.sql
```

## 🔐 Security Checklist

- [ ] .env file not committed
- [ ] Use environment variables for secrets
- [ ] Validate user input on backend
- [ ] Use parameterized SQL queries (already done)
- [ ] Hash passwords with bcryptjs (already done)
- [ ] Use JWT for authentication (already done)
- [ ] CORS properly configured
- [ ] HTTPS in production
- [ ] Rate limiting implemented
- [ ] SQL injection protected (already done)

## 📊 Performance Tips

### Frontend
- Use React.memo for expensive components
- Lazy load routes with React.lazy()
- Optimize images
- Check bundle size: `npm run build`
- Use DevTools Performance tab

### Backend
- Add database indexes (schema already optimized)
- Use connection pooling (already done)
- Implement caching for frequently accessed data
- Monitor query performance
- Use pagination for large datasets

## 🎯 Testing Checklist

- [ ] Sign up works
- [ ] Login works
- [ ] Can create wedding
- [ ] Can add guests
- [ ] Can manage RSVP
- [ ] Can view products
- [ ] Add to cart works
- [ ] Responsive design works
- [ ] Navigation works
- [ ] Protected routes work

## 🚢 Deployment Checklist

### Before Deploying
- [ ] All tests pass
- [ ] No console errors
- [ ] .env configured for production
- [ ] Database backed up
- [ ] Code reviewed
- [ ] Performance tested
- [ ] Security audit completed

### Frontend Deployment (Vercel)
```bash
npm run build
vercel deploy
```

### Backend Deployment (Heroku)
```bash
npm run build
heroku create your-app-name
git push heroku main
```

## 📚 Documentation Files

| File | Content |
|------|---------|
| **README.md** | Overview & features |
| **QUICKSTART.md** | Fast setup |
| **PROJECT_SUMMARY.md** | Complete summary |
| **ARCHITECTURE.md** | System design |
| **FEATURES.md** | All features list |
| **ROADMAP.md** | Future features |
| **CONTRIBUTING.md** | Contribution guide |
| **BACKEND_SETUP.md** | Backend details |
| **FRONTEND_SETUP.md** | Frontend details |

## 🔗 Useful Links

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Guide](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 💡 Tips & Tricks

### Frontend
- Use Vite DevTools for debugging
- Check React DevTools extension
- Use browser DevTools Network tab to inspect API calls
- Use `localStorage` for persistence

### Backend
- Use Postman for API testing
- Check server logs for errors: `npm run dev` output
- Use `console.log` for debugging
- Use database console for queries

### General
- Keep 3 terminals open: backend, frontend, database
- Save environment files separately
- Test on actual devices/browsers
- Use version control (git)
- Document your changes

## 🆘 Getting Help

1. Check [README.md](./README.md)
2. Read [ARCHITECTURE.md](./ARCHITECTURE.md)
3. See [CONTRIBUTING.md](./CONTRIBUTING.md)
4. Check source code comments
5. Search error messages
6. Check documentation links above

---

**You're all set!** Start with `npm run dev` in each terminal. 🚀
