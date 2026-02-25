# Frontend Setup Guide

## Prerequisites
- Node.js 18+
- npm or yarn
- Backend server running on http://localhost:5000

## Installation Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
```bash
# Create .env file (optional for local dev, but recommended)
echo "VITE_API_URL=http://localhost:5000" > .env.local
```

### 3. Start Development Server
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### 4. Open in Browser
Navigate to `http://localhost:5173`

## Available Scripts

### Development
```bash
npm run dev
```
Starts Vite development server with hot reload

### Build
```bash
npm run build
```
Creates optimized production build in `dist/` folder

### Preview Production Build
```bash
npm run preview
```
Preview the production build locally

### Linting
```bash
npm run lint
```
Check code quality with ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── WeddingForm.tsx
│   ├── WeddingList.tsx
│   ├── GuestManager.tsx
│   ├── ProductCatalog.tsx
│   ├── PricingTiers.tsx
│   └── Navigation.tsx
├── pages/              # Page components (full pages)
│   ├── Home.tsx
│   ├── Dashboard.tsx
│   ├── WeddingDetail.tsx
│   └── Shop.tsx
├── context/            # React Context providers
│   ├── AuthContext.tsx
│   └── WeddingContext.tsx
├── hooks/              # Custom React hooks
│   └── useAPI.ts
├── services/           # API client
│   └── api.ts
├── types/              # TypeScript interfaces
│   └── index.ts
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Tailwind CSS
```

## Key Features

### Authentication (AuthContext)
- Login/Signup
- JWT token management
- Protected routes

### Wedding Management (WeddingContext)
- Select active wedding
- Share wedding data across components

## Pages

### Home (/)
- Landing page with features overview
- Pricing tiers
- Call-to-action buttons

### Login (/login)
- Email/password authentication
- Error handling

### Signup (/signup)
- New user registration
- Redirect to dashboard on success

### Dashboard (/dashboard)
- Create new weddings
- View all weddings
- Quick statistics

### Wedding Detail (/wedding/:id)
- Tabs for different features
- Guest management
- Checklist
- Timeline
- Budget tracker
- Gallery
- FAQ
- Registry

### Shop (/shop)
- Product catalog
- Category filtering
- Shopping cart
- Checkout

## API Integration

The frontend communicates with backend via `src/services/api.ts`:

```typescript
// Example usage
import { weddingService } from '../services/api';

const weddings = await weddingService.getAll(token);
```

## Styling

Using **Tailwind CSS** for styling:
- Responsive design
- Utility-first approach
- Pre-configured colors and spacing

## Common Issues

### CORS Errors
- Ensure backend is running on http://localhost:5000
- Check CORS configuration in backend/src/server.ts
- Verify FRONTEND_URL in backend .env

### API Calls Failing
- Check browser DevTools Network tab
- Verify JWT token in localStorage
- Ensure backend endpoints exist

### Vite Port Conflict
- Change port in vite.config.ts
- Or kill process on port 5173

### Build Errors
- Delete `node_modules` and `dist`
- Run `npm install` again
- Check for TypeScript errors: `npm run build`

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Environment Variables for Production
Create `vercel.json` or Netlify environment variables:
```json
{
  "env": {
    "VITE_API_URL": "https://your-backend-url.com"
  }
}
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips
1. Use React.memo for expensive components
2. Lazy load routes with React.lazy()
3. Optimize images
4. Monitor bundle size: `npm run build` and check dist/

## Development Workflow

1. **Create component**
   ```bash
   touch src/components/MyComponent.tsx
   ```

2. **Add TypeScript types**
   ```typescript
   interface MyComponentProps {
     title: string;
   }
   ```

3. **Test component**
   - Import in a page
   - Check in browser at http://localhost:5173

4. **Build and test**
   ```bash
   npm run build
   npm run preview
   ```

## Troubleshooting

### Module not found errors
```bash
npm install
```

### TypeScript errors
Check `tsconfig.json` and types folder

### Styling issues
Check `tailwind.config.js` and `src/index.css`

### Hot reload not working
- Restart dev server: Ctrl+C then `npm run dev`
- Clear browser cache

## Getting Help

- Check React documentation: https://react.dev
- Vite docs: https://vitejs.dev
- Tailwind docs: https://tailwindcss.com
- React Router: https://reactrouter.com
