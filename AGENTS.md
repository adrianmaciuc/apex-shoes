# AGENTS.md - Apex Shoes E-Commerce

This file provides essential guidelines for agentic coding tools working in this repository. Contains project overview, tech stack, architecture, build commands, code style conventions, testing patterns, and operational procedures.

## Project Overview

**Apex Shoes** (sole-street) - A demo e-commerce shoe shop built with React 19, TypeScript, and Vite. This is a learning project for experimenting with modern web development practices.

**Purpose**: Demo/educational project with mock data, no backend integration.

## Technology Stack

- **React 19.2.0** - UI library
- **TypeScript 5.9.3** - Static typing
- **Vite 7.2.4** - Build tool & dev server
- **Tailwind CSS 4.1.17** - Styling (via @tailwindcss/vite plugin)
- **React Router DOM 7.10.1** - Client-side routing
- **Framer Motion 12.23.25** - Animations
- **Lucide React 0.556.0** - Icons
- **Jest 30.2.0** - Testing framework
- **@testing-library/react 16.3.0** - React testing utilities

## Architecture

### Directory Structure

```
src/
├── components/          # Reusable React components
│   ├── layout/         # Layout components (Navigation, Breadcrumb)
│   ├── product/        # Product-specific components (ProductCard, ProductCardSkeleton)
│   └── ui/             # UI components (Skeleton, ImageZoom, EmptyState, LazyImage, PageTransition, ParticleBurst)
├── context/            # React Context providers (CartContext, WishlistContext)
├── data/               # Mock data (shoes.ts - 18 products across 5 categories)
├── pages/              # Page components (all lazy-loaded)
│   ├── HomePage.tsx
│   ├── CategoryPage.tsx
│   ├── ShoePage.tsx
│   ├── CartPage.tsx
│   ├── CheckoutPage.tsx
│   ├── OrderProcessingPage.tsx
│   ├── OrderSuccessPage.tsx
│   ├── WishlistPage.tsx
│   ├── AboutPage.tsx
│   └── ContactPage.tsx
├── types/              # TypeScript type definitions (index.ts)
├── utils/              # Utility functions (validation.ts, test-helpers.ts)
├── __tests__/          # Test files (context/, data/, utils/)
├── App.tsx             # Main app with routing and providers
├── index.css           # Global styles and Tailwind directives
├── main.tsx            # Entry point
└── jest.setup.ts       # Jest configuration with mocks
```

### Key Architecture Patterns

**State Management**

- React Context API (CartContext, WishlistContext)
- Custom hooks: `useCart()`, `useWishlist()`
- No external state management library

**Routing**

- React Router DOM v7 with lazy loading
- Code splitting with `React.lazy()` and `Suspense`
- Page transitions with Framer Motion (AnimatePresence + PageTransition)

**Styling**

- Tailwind CSS v4 (utility-first)
- Custom animations defined in tailwind.config.js (shimmer)
- CSS variables for theme colors
- Warm minimal color palette: Primary (#2D2D2D), Secondary (#FAF9F6), Accent (#E07A5F)

**Code Splitting**

- Manual chunks in vite.config.ts: vendor (react, react-dom, react-router-dom), motion (framer-motion)

## Type System

**Key Types** (src/types/index.ts):

- `Shoe` - Product data structure
- `ShoeCategory` - Category enum: "sneakers" | "running" | "casual" | "formal" | "boots"
- `CartItem` - Cart items with shoe, size, color, quantity
- `CategoryInfo` - Category metadata
- `OrderSummary` - Order calculation data
- `PaymentFormData` - Checkout form data
- `CompletedOrder` - Order confirmation data

**TypeScript Configuration**

- Strict mode enabled
- `noUnusedLocals: true`, `noUnusedParameters: true`
- `jsx: "react-jsx"`
- Target: ES2022, Module: ESNext
- Module resolution: bundler

## Build & Development Commands

### Development

```bash
npm run dev          # Start development server (Vite)
npm run build        # Build for production (tsc -b && vite build)
npm run preview      # Preview production build
```

### Code Quality (CRITICAL - Run after each change)

```bash
npm run lint         # Run ESLint - MOST IMPORTANT
npm run lint:fix     # Fix ESLint errors automatically
npm run type-check   # Run TypeScript type checking - IMPORTANT
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

### Testing

```bash
npm run test           # Run Jest tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage report
```

## Code Style & Linting

### ESLint Configuration

**Config Files**: eslint.config.js (flat config), .eslintrc.cjs (legacy)

**Plugins Used**:

- `@typescript-eslint` - TypeScript rules
- `react-hooks` - React Hooks rules
- `react-refresh` - Component refresh optimization
- `simple-import-sort` - Auto-sort imports (ERROR level)
- `unused-imports` - Detect/remove unused imports

**Key Rules**:

- Unused imports: ERROR (use eslint-plugin-unused-imports)
- Import sorting: ERROR (enforced order: external, internal)
- React Hooks rules: recommended
- `@typescript-eslint/no-unused-vars`: off (handled by unused-imports plugin)
- Max warnings: 2

**Import Order** (enforced by simple-import-sort):

1. React imports
2. External library imports
3. Internal imports (src/...)
4. Type imports
5. Relative imports

### Prettier Configuration

**Note**: No .prettierrc file found - using defaults or inline configs

- Check format: `npm run format:check`
- Format: `npm run format`
- Ignores: node_modules, dist, .vscode, .idea, \*.log, .env

### Testing Conventions

- Test files: `**/__tests__/**/*.test.ts?(x)` or `**/?(*.)+(spec|test).ts?(x)`
- Coverage threshold: 70% (branches, functions, lines, statements)
- Test environment: jsdom
- Setup: src/jest.setup.ts (mocks for matchMedia, IntersectionObserver)
- Collect coverage from: `src/**/*.{ts,tsx}` (excluding .d.ts, main.tsx, .stories.tsx)

## Key Features & Functionality

### Shopping Cart

- Add items with size/color/quantity selection
- Update quantities, remove items
- Cart total calculation
- Cart item count
- Toast notifications
- Free shipping over $100

### Wishlist

- Add/remove items to wishlist
- Wishlist item count

### Product Features

- 18 mock products across 5 categories
- Filtering by size, color, price range
- Sorting options
- Image gallery with zoom
- Size/color selection
- Product specifications

### Responsive Design

- Mobile-first approach
- Breakpoints: <640px (mobile), 640px-1024px (tablet), >1024px (desktop)

### Animations

- Framer Motion for transitions
- Page transitions (AnimatePresence)
- Shimmer loading skeletons
- Particle burst effects

## Component Patterns

### Custom Hooks

- `useCart()` - Access cart state and methods
- `useWishlist()` - Access wishlist state and methods

### Lazy Loading Pattern

```tsx
const ComponentName = lazy(() => import("./pages/ComponentName"));
// Wrap in <Suspense fallback={<PageLoader />}>
```

### Context Providers

- Wrapping order: CartProvider → WishlistProvider → Router → App
- Providers defined in src/context/

### UI Components

- Reusable components in src/components/ui/
- Skeleton loading states
- Empty states
- Image zoom functionality
- Lazy image loading

## Important Notes for Agents

1. **Always run `npm run lint` and `npm run type-check` after changes** - These are critical and must pass
2. **Import sorting is enforced** - Let ESLint auto-fix or follow the import order pattern
3. **No comments in code** unless explicitly requested (per project style)
4. **Use TypeScript types** from src/types/index.ts
5. **Lazy load pages** - All page components are lazy-loaded
6. **Use Context API** for global state - no Redux, Zustand, etc.
7. **Mock data** - All product data is in src/data/shoes.ts
8. **No backend** - This is a frontend demo project
9. **Test coverage threshold is 70%** - New code should maintain this
10. **Tailwind CSS v4** - Using the Vite plugin, not v3 syntax

## MCP Tools & External Resources

### Context7 MCP

If Context7 MCP is available, always consult the official documentation related to the task before performing any action. Use Context7 to:

- Look up API references for libraries and frameworks used in this project
- Verify best practices for React, TypeScript, Vite, Tailwind CSS, and other dependencies
- Check for updated patterns or deprecated APIs
- Research how to implement new features correctly

Always prefer official documentation over assumptions or outdated knowledge.

### Playwright MCP

If browser validation is required, use Playwright MCP. This is the preferred way to:

- Verify UI changes render correctly in a real browser environment
- Test user interactions (clicks, form submissions, navigation)
- Check responsive design across different screen sizes
- Validate that pages load without JavaScript errors
- Take screenshots or snapshots of the application state

Use Playwright MCP for any task that requires verifying how the application actually behaves in a browser, as opposed to Jest unit tests which use jsdom.

## Environment & Dependencies

**Node.js**: 18.x or higher required

**Key Dependencies** (package.json):

- @tailwindcss/vite, framer-motion, lucide-react, react, react-dom, react-router-dom

**Dev Dependencies**:

- @testing-library/\*, eslint, jest, prettier, tailwindcss, typescript, vite

## Configuration Files Summary

- `vite.config.ts` - Vite with React plugin, Tailwind plugin, manual chunks
- `tailwind.config.js` - Tailwind theme with custom shimmer animation
- `tsconfig.json` - Root config (references app and node configs)
- `tsconfig.app.json` - App TypeScript config (strict mode enabled)
- `jest.config.ts` - Jest config with ts-jest preset, jsdom environment, 70% coverage threshold
- `eslint.config.js` - ESLint flat config
- `.eslintrc.cjs` - Legacy ESLint config (may be phased out)
- `.prettierignore` - Files to ignore during formatting

## Demo Project Scope

**Included**:

- Fully functional shopping cart and wishlist
- Product browsing with filtering/sorting
- Responsive design
- Modern UI with animations
- TypeScript type safety
- Mock data (18 products)

**NOT Included** (by design):

- Backend/API integration
- Payment processing
- User authentication
- Database persistence
- Real order management
