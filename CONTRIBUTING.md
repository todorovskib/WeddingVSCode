# Contributing to WedMKD

Thank you for your interest in contributing to the Macedonian Wedding Platform!

## Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/wedmkd.git
   cd wedmkd
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Follow the setup guides**
   - [Backend Setup](./BACKEND_SETUP.md)
   - [Frontend Setup](./FRONTEND_SETUP.md)

## Development Workflow

### Backend Development

1. Create feature branch: `feature/your-feature`
2. Add TypeScript models in `backend/src/models/`
3. Add controllers in `backend/src/controllers/`
4. Add routes in `backend/src/routes/`
5. Update database schema if needed
6. Write tests
7. Submit PR with description

### Frontend Development

1. Create feature branch: `feature/your-feature`
2. Create components in `src/components/`
3. Create pages in `src/pages/`
4. Update types in `src/types/`
5. Update API calls in `src/services/api.ts`
6. Test thoroughly
7. Submit PR

## Code Style

### Backend (TypeScript/Express)

```typescript
// Use interfaces for type safety
interface UserData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Use async/await
async function createUser(data: UserData) {
  try {
    // implementation
  } catch (error) {
    // handle error
  }
}

// Use descriptive variable names
const hashedPassword = await bcryptjs.hash(password, 10);

// Add JSDoc comments
/**
 * Creates a new user in the database
 * @param data - User registration data
 * @returns Created user object
 */
```

### Frontend (React/TypeScript)

```typescript
// Use functional components
interface ComponentProps {
  title: string;
  onAction?: () => void;
}

export const MyComponent: React.FC<ComponentProps> = ({ title, onAction }) => {
  // implementation
};

// Use hooks
const [state, setState] = useState(initialState);
const { data } = useAPI();

// Use descriptive class names
className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
```

## Commit Messages

Follow conventional commits:

```
feat: Add guest RSVP tracking
fix: Correct database connection error
docs: Update README with new API endpoints
style: Format code according to eslint rules
refactor: Extract wedding logic to custom hook
test: Add unit tests for auth service
chore: Update dependencies
```

## Pull Request Process

1. **Update README.md** if adding new features
2. **Add tests** for new functionality
3. **Update ROADMAP.md** if applicable
4. **Write clear PR description**:
   ```markdown
   ## Description
   Adds new guest filtering functionality
   
   ## Changes
   - Added filter by dietary requirements
   - Added filter by RSVP status
   
   ## Type of change
   - [x] New feature
   - [ ] Bug fix
   - [ ] Documentation update
   
   ## How to test
   1. Create a wedding
   2. Add guests with different dietary requirements
   3. Click on dietary filter
   ```

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
npm test
```

### Manual Testing Checklist
- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Works in Chrome, Firefox, Safari
- [ ] Database queries optimized
- [ ] Error handling implemented

## Database Changes

If modifying schema:

1. Update `backend/database.sql` with migration
2. Document schema changes
3. Include migration script in PR
4. Test with fresh database

## Performance Guidelines

- Keep component render methods under 100 lines
- Use React.memo for expensive components
- Optimize database queries
- Set reasonable timeouts
- Implement pagination for large lists
- Cache API responses where appropriate

## Security Considerations

- Never commit sensitive data (.env files)
- Validate all user inputs
- Use parameterized queries (already done with pg)
- Implement rate limiting for APIs
- Use HTTPS in production
- Keep dependencies updated
- Review security of external APIs

## Documentation

- Add JSDoc comments to functions
- Update README for new features
- Document API endpoints
- Add code examples where helpful
- Keep documentation up-to-date

## Questions?

- Check existing issues
- Read documentation
- Ask in discussions
- Open an issue with question label

## Code Review

Reviewers will check:

- [ ] Code quality
- [ ] Testing coverage
- [ ] Documentation
- [ ] Performance impact
- [ ] Security implications
- [ ] Browser compatibility
- [ ] Accessibility

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to make WedMKD better! 💍
