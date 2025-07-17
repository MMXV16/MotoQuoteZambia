# MotoQuote Zambia 🇿🇲

A modern, user-friendly motor insurance quotation platform designed specifically for the Zambian market. Get instant quotes for your vehicle insurance with transparency and ease.

![MotoQuote Zambia](https://img.shields.io/badge/Made%20in-Zambia-green?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjgwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iODAiIGZpbGw9IiMwMDczZTYiLz48L3N2Zz4=)

## 🚗 About MotoQuote Zambia

MotoQuote Zambia is a modern web application that simplifies motor insurance quotation for Zambian vehicle owners. Built with Zambian drivers in mind, it offers:

- **Instant Quotes**: Get motor insurance quotes in minutes, not days
- **Zambian-Focused**: Tailored for local vehicle makes, models, and requirements  
- **Transparent Pricing**: Clear breakdown of costs with no hidden fees
- **User-Friendly**: Simple 4-step process that anyone can complete
- **Mobile-First**: Works perfectly on your phone or computer

### 🌟 Key Features

- **Multi-Step Quote Process**: Personal info → Vehicle details → Coverage options → Final quote
- **Real-Time Pricing**: Dynamic calculations based on vehicle age, make, and coverage type
- **PDF Generation**: Download professional insurance quotes
- **Dark/Light Theme**: Choose your preferred viewing experience
- **Local Storage**: Your progress is saved automatically
- **Responsive Design**: Works on all devices

## 🏗️ Project Status

**⚠️ This is currently a demo project with no backend implementation.**

The current version is a frontend-only demonstration that showcases the user interface and experience. All data is stored locally in your browser, and no actual insurance policies are generated.

### 🔮 Planned Features (When Backend is Added)

When the backend infrastructure is implemented, MotoQuote Zambia will include:

#### 🔐 User Management
- User registration and authentication
- Profile management and quote history
- Secure document storage

#### 💾 Database Integration
- Quote persistence across sessions
- Vehicle database with local makes/models
- Insurance company rate tables
- Customer relationship management

#### 🏢 Insurance Provider Integration
- Real-time quotes from multiple insurers
- Policy comparison features
- Direct policy purchase capabilities
- Claims management system

#### 📱 Enhanced Features
- SMS notifications for quote updates
- Email delivery of policies
- Payment gateway integration (Mobile Money, Bank transfers)
- Multi-language support (English, Bemba, Nyanja, Tonga)

#### 📊 Analytics & Reporting
- Quote conversion tracking
- Popular vehicle insights
- Regional pricing analysis
- Administrative dashboards

#### 🔒 Security & Compliance
- Data encryption and security
- GDPR compliance features
- Audit trails for all transactions
- Secure API endpoints

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Wouter** - Lightweight routing

### UI Components
- **Radix UI** - Accessible component primitives
- **Shadcn/ui** - Modern component library
- **Lucide React** - Beautiful icons

### Development Tools
- **ESBuild** - Fast bundling
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing
- **Cross-env** - Environment variables

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- Modern web browser

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MMXV16/MotoQuoteZambia.git
   cd MotoQuoteZambia
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000` to see the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type check the code

## 📁 Project Structure

```
MotoQuoteZambia/
├── client/                    # Frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ui/          # Reusable UI components
│   │   │   └── quote-form/  # Quote form components
│   │   ├── contexts/        # React contexts
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions
│   │   └── pages/           # Page components
│   └── index.html           # HTML template
├── server/                   # Backend (minimal setup)
├── shared/                   # Shared TypeScript schemas
├── docs/                     # Documentation
└── package.json             # Dependencies and scripts
```

## 🌍 Deployment



## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- Built with ❤️ for the Zambian community
- Inspired by the need for accessible insurance in Zambia

## 📈 Roadmap

### Phase 1: Demo (Current)
- ✅ Frontend application
- ✅ Quote calculation logic
- ✅ PDF generation
- ✅ Responsive design

### Phase 2: Backend Integration (Planned)
- 🔄 User authentication system
- 🔄 Database integration
- 🔄 Insurance provider APIs
- 🔄 Payment processing

### Phase 3: Advanced Features (Future)
- 🔄 Mobile app development
- 🔄 Multi-language support
- 🔄 Claims management
- 🔄 Advanced analytics

---

Made with 🇿🇲 in Zambia for Zambians. Stay curious. Kwa lifasi (Kuchalo)!
