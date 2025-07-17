# Contributing to MotoQuote Zambia

Thank you for your interest in contributing to MotoQuote Zambia! This project aims to make motor insurance more accessible for all Zambians. 🇿🇲

## 🌟 Ways to Contribute

We welcome contributions from developers, designers, insurance professionals, and anyone passionate about improving digital services in Zambia.

### 🎯 Current Priorities

1. **Backend Implementation** - Database design, API development
2. **Zambian Vehicle Database** - Comprehensive list of vehicles sold in Zambia
3. **Localization** - Support for local languages (Bemba, Nyanja, Tonga)
4. **Mobile Responsiveness** - Ensuring perfect mobile experience
5. **Accessibility** - Making the app usable for everyone
6. **Testing** - Comprehensive test coverage

### 🛠️ Technical Contributions

#### Frontend Development
- React/TypeScript development
- UI/UX improvements
- Performance optimization
- Mobile responsiveness
- Accessibility features

#### Backend Development (Future)
- Node.js/Express API development
- Database design (PostgreSQL/MongoDB)
- Authentication systems
- Payment gateway integration
- SMS/Email notifications

#### DevOps & Infrastructure
- CI/CD pipeline setup
- Docker containerization
- Cloud deployment
- Performance monitoring

### 📝 Non-Technical Contributions

#### Content & Localization
- Translating interface to local languages
- Creating help documentation
- Writing user guides
- Insurance industry insights

#### Design & UX
- UI/UX design improvements
- User research and testing
- Accessibility audits
- Mobile app design

#### Data & Research
- Zambian vehicle make/model database
- Insurance rate research
- Market analysis
- User feedback collection

## 🚀 Getting Started

### 1. Fork the Repository

Click the "Fork" button at the top of the repository page.

### 2. Clone Your Fork

```bash
git clone https://github.com/MMXV16/MotoQuoteZambia.git
cd MotoQuoteZambia
```

### 3. Set Up Development Environment

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

Good branch naming examples:
- `feature/add-bemba-language`
- `fix/mobile-responsive-quote-form`
- `docs/update-installation-guide`
- `ui/improve-accessibility`

## 📋 Development Guidelines

### Code Style

We use **ESLint** and **Prettier** for consistent code formatting:

```bash
# Check code style
npm run lint

# Auto-fix style issues
npm run lint:fix

# Format code
npm run format
```

### TypeScript Guidelines

1. **Use strict types** - Avoid `any` type
2. **Define interfaces** for component props
3. **Use proper imports** - Prefer named imports
4. **Document complex types** with comments

```typescript
// ✅ Good
interface QuoteFormProps {
  onSubmit: (data: QuoteData) => void;
  isLoading?: boolean;
}

// ❌ Avoid
function handleData(data: any) {
  // ...
}
```

### Component Guidelines

1. **Use functional components** with hooks
2. **Follow naming conventions** - PascalCase for components
3. **Keep components focused** - Single responsibility
4. **Use proper prop destructuring**

```tsx
// ✅ Good
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant = 'primary', children, onClick }: ButtonProps) {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}
```

### CSS/Styling Guidelines

1. **Use Tailwind CSS** utility classes
2. **Follow mobile-first** responsive design
3. **Use semantic class names** when creating custom styles
4. **Support dark/light themes**

```tsx
// ✅ Good - Mobile-first responsive
<div className="p-4 md:p-6 lg:p-8 bg-white dark:bg-gray-800">
  <h1 className="text-xl md:text-2xl lg:text-3xl">Title</h1>
</div>
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

1. **Unit tests** for utility functions
2. **Component tests** for UI behavior
3. **Integration tests** for user flows

```typescript
// Example test
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders button with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

## 📝 Commit Guidelines

### Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Commit Types

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### Examples

```bash
# Good commit messages
git commit -m "feat: add Lozi language support to quote form"
git commit -m "fix: resolve mobile responsiveness issue on summary page"
git commit -m "docs: update installation instructions"
git commit -m "style: improve button hover states"

# Add more detail for complex changes
git commit -m "feat(pricing): add support for commercial vehicles

- Add commercial vehicle category to pricing logic
- Update form validation to handle commercial vehicles
- Add new pricing tiers for trucks and buses
- Update PDF generation to include commercial vehicle details

Closes #123"
```

## 🔀 Pull Request Process

### Before Submitting

1. **Test your changes** thoroughly
2. **Update documentation** if needed
3. **Add tests** for new features
4. **Check code style** with linting tools
5. **Ensure responsive design** works on mobile

### Pull Request Template

When creating a PR, please include:

```markdown
## What this PR does
Brief description of the changes

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Other (please describe)

## How to test
Step-by-step instructions to test the changes

## Screenshots (if applicable)
Before/after screenshots for UI changes

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] Mobile responsiveness verified
```

### Review Process

1. **Automated checks** must pass (linting, tests)
2. **Code review** by maintainers
3. **Testing** on different devices/browsers
4. **Approval** and merge

## 🌍 Localization

### Adding New Languages

To add support for a new Zambian language:

1. **Create translation files** in `src/locales/`
2. **Update language selector** component
3. **Test all UI elements** in the new language
4. **Ensure proper text direction** and formatting

### Translation Guidelines

1. **Use clear, simple language** that's easy to understand
2. **Consider cultural context** for insurance terms
3. **Maintain consistent terminology** across the app
4. **Test with native speakers** when possible

## 🎨 Design Contributions

### Design System

We follow these design principles:

1. **Accessibility first** - WCAG 2.1 AA compliance
2. **Mobile-first** - Responsive design for all devices
3. **Inclusive design** - Consider diverse users
4. **Zambian context** - Culturally appropriate design

### UI/UX Improvements

1. **User research** and testing
2. **Wireframes** and mockups
3. **Accessibility audits**
4. **Usability testing** with real users

## 🐛 Bug Reports

### Before Reporting

1. **Check existing issues** to avoid duplicates
2. **Test on latest version**
3. **Try on different browsers/devices**

### Bug Report Template

```markdown
**Bug Description**
Clear description of what the bug is

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- Device: [e.g. iPhone 12, Samsung Galaxy S21]
- OS: [e.g. iOS 15, Android 11, Windows 10]
- Browser: [e.g. Chrome 95, Safari 15]
- App Version: [e.g. 1.0.0]

**Additional Context**
Any other context about the problem
```

## 💡 Feature Requests

### Before Requesting

1. **Check existing issues** and discussions
2. **Consider the Zambian context** - Will this help local users?
3. **Think about implementation** complexity

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of what you want to happen

**Describe alternatives you've considered**
Alternative solutions or features you've considered

**Additional context**
- How would this benefit Zambian users?
- Are there any specific local requirements?
- Any mockups or examples?
```

## 🤝 Community Guidelines

### Be Respectful

- **Inclusive language** that welcomes everyone
- **Constructive feedback** and discussions
- **Respect different perspectives** and experiences
- **Help newcomers** learn and contribute

### Focus on Impact

- **Consider local context** - How does this help Zambians?
- **Think about accessibility** - Can everyone use this?
- **Prioritize user needs** over technical preferences
- **Collaborate effectively** with team members

## 🎓 Learning Resources

### For New Contributors

1. **Git & GitHub**: [GitHub's Git Tutorial](https://try.github.io/)
2. **React**: [Official React Tutorial](https://react.dev/learn)
3. **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
4. **Tailwind CSS**: [Tailwind Documentation](https://tailwindcss.com/docs)


## 📞 Getting Help

### Communication Channels

1. **GitHub Issues** - Bug reports and feature requests
2. **GitHub Discussions** - General questions and ideas
3. **Email** - Direct contact for sensitive issues

## 🏆 Recognition

### Contributors

All contributors will be recognized in:
- **README.md** - Contributors section
- **Release notes** - Major contributions highlighted
- **Social media** - Featuring community contributions

### Types of Recognition

1. **Code contributors** - GitHub profile featured
2. **Documentation writers** - Special thanks in docs
3. **Designers** - Portfolio inclusion permission
4. **Translators** - Language-specific recognition
5. **Community helpers** - Special contributor badge

---

## 🚀 Ready to Contribute?

1. **Read this guide** thoroughly
2. **Set up your development environment**
3. **Look for `good first issue` labels**
4. **Join our community discussions**
5. **Make your first contribution**
