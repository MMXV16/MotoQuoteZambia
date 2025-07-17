# Development Guide

This guide will help you set up and contribute to MotoQuote Zambia's development.

## 🛠️ Development Setup

### Prerequisites

- **Node.js 18+** - Download from [nodejs.org](https://nodejs.org/)
- **Git** - For version control
- **VS Code** (recommended) - With the following extensions:
  - TypeScript and JavaScript Language Features
  - Tailwind CSS IntelliSense
  - ES7+ React/Redux/React-Native snippets
  - Prettier - Code formatter

### Quick Start

1. **Clone and setup**:
   ```bash
   git clone https://github.com/MMXV16/MotoQuoteZambia.git
   cd MotoQuoteZambia
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**: Navigate to `http://localhost:5000`

## 📁 Project Architecture

### Frontend Structure

```
client/src/
├── components/           # React components
│   ├── ui/              # Reusable UI components (buttons, inputs, etc.)
│   ├── quote-form/      # Quote-specific components
│   ├── header.tsx       # App header
│   └── footer.tsx       # App footer
├── contexts/            # React contexts for state management
│   ├── quote-context.tsx    # Quote state management
│   └── theme-context.tsx    # Dark/light theme
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx   # Mobile detection
│   └── use-toast.ts     # Toast notifications
├── lib/                 # Utility functions and configurations
│   ├── pricing.ts       # Quote calculation logic
│   ├── pdf-generator.ts # PDF generation
│   ├── utils.ts         # General utilities
│   └── validation.ts    # Form validation schemas
├── pages/               # Page components
│   ├── home.tsx         # Landing page
│   ├── quote.tsx        # Quote form page
│   └── not-found.tsx    # 404 page
├── App.tsx              # Main app component
├── main.tsx             # App entry point
└── index.css            # Global styles
```

### Backend Structure (Minimal)

```
server/
├── index.ts             # Server entry point
├── routes.ts            # API routes (placeholder)
├── storage.ts           # Storage interface (placeholder)
└── vite.ts              # Vite development server integration
```

### Shared Code

```
shared/
└── schema.ts            # TypeScript schemas and types
```

## 🎨 UI Component System

We use **Shadcn/ui** components built on **Radix UI** primitives:

### Component Categories

1. **Form Components**: Input, Button, Select, Checkbox, etc.
2. **Layout Components**: Card, Separator, Sheet, Dialog, etc.
3. **Navigation Components**: Tabs, Breadcrumb, Pagination, etc.
4. **Feedback Components**: Toast, Alert, Progress, etc.

### Adding New Components

```bash
# Add a new shadcn/ui component
npx shadcn-ui@latest add component-name
```

### Custom Component Guidelines

```tsx
// Example custom component
import { cn } from "@/lib/utils";

interface MyComponentProps {
  className?: string;
  children: React.ReactNode;
}

export function MyComponent({ className, children }: MyComponentProps) {
  return (
    <div className={cn("default-classes", className)}>
      {children}
    </div>
  );
}
```

## 🔄 State Management

### Quote Context

The main application state is managed using React Context:

```tsx
// Usage example
import { useQuote } from "@/contexts/quote-context";

function MyComponent() {
  const { state, dispatch } = useQuote();
  
  // Update personal info
  dispatch({ 
    type: "SET_PERSONAL_INFO", 
    payload: { fullName: "John Doe" } 
  });
  
  // Access current step
  const currentStep = state.currentStep;
}
```

### Available Actions

- `SET_STEP` - Navigate between form steps
- `SET_PERSONAL_INFO` - Update personal information
- `SET_VEHICLE_INFO` - Update vehicle details
- `SET_COVERAGE_INFO` - Update coverage options
- `SET_PRICING` - Update pricing calculations
- `RESET_QUOTE` - Reset entire form
- `LOAD_FROM_STORAGE` - Load saved progress

## 🧮 Quote Calculation Logic

### Pricing Components

Located in `lib/pricing.ts`:

```typescript
export function calculatePricing(
  vehicleInfo: Partial<VehicleInfo>,
  coverageInfo: Partial<CoverageInfo>
): PricingBreakdown {
  // Base premium calculation
  // Vehicle age factor
  // Make/model multipliers
  // Add-on costs
  // Duration calculations
}
```

### Pricing Factors

1. **Base Premium**: Third-party (K150) vs Comprehensive (K350)
2. **Vehicle Age**: K10 per year of age
3. **Make Multiplier**: Toyota/Nissan (1.0x), BMW (1.3x), Mercedes (1.4x)
4. **Add-ons**: Roadside (K50), Theft (K80), Windscreen (K30)

## 📋 Form Validation

We use **Zod** for schema validation:

### Schema Structure

```typescript
// Example schema (shared/schema.ts)
export const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  nrcPassport: z.string().min(5, "NRC/Passport number is required"),
  phoneNumber: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email address is required"),
});
```

### Form Integration

```tsx
// Example form component
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function MyFormComponent() {
  const form = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: state.personalInfo,
  });
  
  const onSubmit = (data: PersonalInfo) => {
    // Handle validated data
  };
}
```

## 🎯 Adding New Features

### 1. Form Steps

To add a new step to the quote form:

1. **Create component** in `components/quote-form/`
2. **Add to routing** in `pages/quote.tsx`
3. **Update progress bar** total steps
4. **Add validation schema** if needed
5. **Update state management** if required

### 2. New Vehicle Makes

Update the vehicle make multipliers in `lib/pricing.ts`:

```typescript
const VEHICLE_MAKE_MULTIPLIERS: Record<string, number> = {
  // Add new makes here
  isuzu: 1.1,
  mahindra: 1.0,
  // ... existing makes
};
```

### 3. New Coverage Options

1. **Update schema** in `shared/schema.ts`
2. **Add pricing logic** in `lib/pricing.ts`
3. **Update form UI** in `coverage-step.tsx`
4. **Update PDF generation** in `lib/pdf-generator.ts`

## 🧪 Testing Guidelines

### Testing Strategy

1. **Unit Tests**: For utility functions and calculations
2. **Component Tests**: For UI component behavior
3. **Integration Tests**: For form flows and state management
4. **E2E Tests**: For complete user journeys

### Writing Tests

```typescript
// Example test structure
import { describe, it, expect } from 'vitest';
import { calculatePricing } from '@/lib/pricing';

describe('Pricing Calculations', () => {
  it('should calculate base premium correctly', () => {
    const result = calculatePricing(
      { make: 'toyota', year: '2020' },
      { type: 'third-party', duration: '1' }
    );
    
    expect(result.basePremium).toBe(150);
  });
});
```

## 🎨 Styling Guidelines

### Tailwind CSS Usage

- Use **semantic class names** when possible
- Follow **mobile-first** responsive design
- Leverage **CSS custom properties** for theming
- Use **component variants** for reusable styles

### Design System

1. **Colors**: Primary (blue), Secondary (green), Neutral tones
2. **Typography**: Inter font family, responsive sizing
3. **Spacing**: Consistent 4px grid system
4. **Components**: Consistent border radius, shadows

### Theme Support

The app supports dark/light themes using CSS variables:

```css
/* Light theme */
:root {
  --background: hsl(0, 0%, 100%);
  --foreground: hsl(222.2, 84%, 4.9%);
  /* ... */
}

/* Dark theme */
.dark {
  --background: hsl(222.2, 84%, 4.9%);
  --foreground: hsl(210, 40%, 98%);
  /* ... */
}
```

## 🔍 Code Quality

### ESLint & Prettier

We use ESLint and Prettier for code quality:

```bash
# Check code quality
npm run lint

# Format code
npm run format
```

### TypeScript Best Practices

1. **Use strict mode** for better type safety
2. **Define interfaces** for component props
3. **Use generics** for reusable functions
4. **Avoid `any` type** - use `unknown` instead
5. **Leverage utility types** (`Partial`, `Pick`, `Omit`)

### Git Workflow

1. **Create feature branch**: `git checkout -b feature/new-feature`
2. **Make atomic commits**: Small, focused changes
3. **Write descriptive messages**: Clear commit descriptions
4. **Test before pushing**: Run tests and linting
5. **Create pull request**: With detailed description

## 🐛 Debugging

### Development Tools

1. **React Developer Tools**: Browser extension for React debugging
2. **VS Code Debugger**: Set breakpoints in TypeScript
3. **Network Tab**: Monitor API calls (when backend is added)
4. **Console Logging**: Strategic `console.log` statements

### Common Issues

1. **State not updating**: Check if using immutable updates
2. **Components not re-rendering**: Verify dependencies in hooks
3. **TypeScript errors**: Check type definitions and imports
4. **Styling issues**: Verify Tailwind classes and responsive design

## 📚 Learning Resources

### Frontend Technologies
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

### Component Libraries
- [Radix UI](https://www.radix-ui.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

### Form Handling
- [React Hook Form](https://react-hook-form.com/)
- [Zod Validation](https://zod.dev/)

---

Happy coding! 🚗💨 Remember, we're building for the Zambian community, so always consider local context and user needs.
