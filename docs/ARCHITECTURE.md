# Technical Architecture

This document outlines the technical architecture of MotoQuote Zambia, including current implementation and planned future enhancements.

## 🏗️ Current Architecture (Demo Phase)

### Overview

MotoQuote Zambia is currently a **frontend-only React application** that demonstrates the user interface and experience for motor insurance quotation in Zambia.

```
┌─────────────────────────────────────────────────────────────┐
│                    Client Application                       │
├─────────────────────────────────────────────────────────────┤
│  React 18 + TypeScript + Vite                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐  │
│  │    UI       │ │   State     │ │     Utilities       │  │
│  │ Components  │ │ Management  │ │   & Libraries       │  │
│  │             │ │             │ │                     │  │
│  │ • Shadcn/ui │ │ • React     │ │ • Zod Validation    │  │
│  │ • Radix UI  │ │   Context   │ │ • PDF Generation    │  │
│  │ • Framer    │ │ • Local     │ │ • Pricing Logic     │  │
│  │   Motion    │ │   Storage   │ │ • Form Handling     │  │
│  └─────────────┘ └─────────────┘ └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### Frontend Core
- **React 18** - Component-based UI framework
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Wouter** - Lightweight client-side routing

#### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Component library built on Radix UI
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library

#### State Management
- **React Context** - Built-in state management
- **Local Storage** - Persistent client-side storage
- **React Hook Form** - Form state management

#### Validation & Data
- **Zod** - TypeScript-first schema validation
- **React Hook Form** - Form handling and validation

#### Additional Libraries
- **jsPDF** - PDF generation
- **Lucide React** - Icon library
- **date-fns** - Date manipulation

### Data Flow

```
User Input → Form Validation → Context Update → Local Storage → PDF Generation
     ↑                                                              ↓
User Interface ← State Updates ← Context Dispatch ← Pricing Calculation
```

1. **User Input**: Form fields capture user data
2. **Validation**: Zod schemas validate input in real-time
3. **State Management**: React Context manages application state
4. **Persistence**: Local Storage saves progress automatically
5. **Calculations**: Pricing logic calculates insurance quotes
6. **PDF Generation**: jsPDF creates downloadable quotes

## 🚀 Planned Architecture (Full Implementation)

### System Overview

The full implementation will be a **three-tier architecture** with modern cloud-native patterns:

```
┌───────────────────────────────────────────────────────────────────┐
│                        Presentation Layer                         │
├───────────────────────────────────────────────────────────────────┤
│  Web App (React)  │  Mobile App (React Native)  │  Admin Panel    │
└───────────────────┴─────────────────────────────┴─────────────────┘
                                    │
                                    │ HTTPS/WSS
                                    ▼
┌───────────────────────────────────────────────────────────────────┐
│                       Application Layer                           │
├───────────────────────────────────────────────────────────────────┤
│                      API Gateway (Node.js/Express)                │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│  │   Auth      │ │   Quote     │ │  Insurance  │ │   Payment   │ │
│  │  Service    │ │  Service    │ │   Provider  │ │   Service   │ │
│  │             │ │             │ │  Integration│ │             │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
└───────────────────────────────────────────────────────────────────┘
                                    │
                                    │ Database Queries
                                    ▼
┌───────────────────────────────────────────────────────────────────┐
│                         Data Layer                                │
├───────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│  │ PostgreSQL  │ │    Redis    │ │  File Store │ │  Analytics  │ │
│  │(Main Data)  │ │  (Cache)    │ │(Documents)  │ │(Telemetry)  │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
└───────────────────────────────────────────────────────────────────┘
```

### Backend Services

#### API Gateway
- **Framework**: Node.js with Express/Fastify
- **Purpose**: Route requests, authentication, rate limiting
- **Features**: Request/response transformation, logging, monitoring

#### Microservices Architecture

##### 1. Authentication Service
```typescript
interface AuthService {
  // User management
  registerUser(userData: UserRegistration): Promise<User>;
  authenticateUser(credentials: LoginCredentials): Promise<AuthToken>;
  refreshToken(token: string): Promise<AuthToken>;
  
  // Session management
  createSession(userId: string): Promise<Session>;
  validateSession(sessionId: string): Promise<boolean>;
  revokeSession(sessionId: string): Promise<void>;
}
```

##### 2. Quote Service
```typescript
interface QuoteService {
  // Quote management
  createQuote(quoteData: QuoteRequest): Promise<Quote>;
  calculatePremium(vehicleInfo: VehicleInfo, coverage: Coverage): Promise<Premium>;
  saveQuote(quoteId: string, data: QuoteData): Promise<void>;
  
  // Quote retrieval
  getQuote(quoteId: string): Promise<Quote>;
  getUserQuotes(userId: string): Promise<Quote[]>;
  generateQuotePDF(quoteId: string): Promise<Buffer>;
}
```

##### 3. Insurance Provider Integration
```typescript
interface InsuranceProviderService {
  // Provider management
  getAvailableProviders(): Promise<InsuranceProvider[]>;
  getProviderRates(providerId: string, criteria: RatingCriteria): Promise<Rate[]>;
  
  // Policy management
  createPolicy(quoteId: string, providerId: string): Promise<Policy>;
  updatePolicy(policyId: string, updates: PolicyUpdates): Promise<Policy>;
  
  // Claims
  submitClaim(policyId: string, claimData: ClaimData): Promise<Claim>;
  getClaimStatus(claimId: string): Promise<ClaimStatus>;
}
```

##### 4. Payment Service
```typescript
interface PaymentService {
  // Payment processing
  processPayment(paymentData: PaymentRequest): Promise<PaymentResult>;
  refundPayment(paymentId: string, amount?: number): Promise<RefundResult>;
  
  // Mobile money integration (MTN, Airtel)
  initiateMobilePayment(phone: string, amount: number): Promise<MobilePaymentSession>;
  confirmMobilePayment(sessionId: string, pin: string): Promise<PaymentResult>;
  
  // Bank integration
  processBankTransfer(bankDetails: BankTransferData): Promise<TransferResult>;
}
```

##### 5. Notification Service
```typescript
interface NotificationService {
  // SMS notifications
  sendSMS(phoneNumber: string, message: string): Promise<SMSResult>;
  
  // Email notifications
  sendEmail(emailData: EmailRequest): Promise<EmailResult>;
  
  // Push notifications
  sendPushNotification(deviceToken: string, notification: PushNotification): Promise<void>;
}
```

### Database Design

#### Primary Database (PostgreSQL)

```sql
-- Users and Authentication
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone_number VARCHAR(20) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  nrc_passport VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token_hash VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Vehicles and Insurance
CREATE TABLE vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  make VARCHAR(50) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  registration_number VARCHAR(20) UNIQUE NOT NULL,
  engine_type vehicle_engine_type NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES vehicles(id) ON DELETE CASCADE,
  coverage_type coverage_type NOT NULL,
  duration INTEGER NOT NULL,
  add_ons JSONB DEFAULT '{}',
  pricing_breakdown JSONB NOT NULL,
  status quote_status DEFAULT 'draft',
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID REFERENCES quotes(id) ON DELETE RESTRICT,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  provider_id UUID REFERENCES insurance_providers(id),
  policy_number VARCHAR(100) UNIQUE NOT NULL,
  status policy_status NOT NULL,
  effective_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  premium_amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Insurance Providers
CREATE TABLE insurance_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  code VARCHAR(10) UNIQUE NOT NULL,
  api_endpoint VARCHAR(500),
  api_key_hash VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  rating_factors JSONB DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Claims Management
CREATE TABLE claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  policy_id UUID REFERENCES policies(id) ON DELETE RESTRICT,
  claim_number VARCHAR(100) UNIQUE NOT NULL,
  incident_date DATE NOT NULL,
  incident_description TEXT NOT NULL,
  estimated_amount DECIMAL(10,2),
  status claim_status DEFAULT 'submitted',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Caching Layer (Redis)

```
# User sessions
user:session:{sessionId} → {userId, expiresAt, permissions}

# Quote cache (temporary storage)
quote:temp:{quoteId} → {quoteData, calculations}

# Provider rates cache
provider:rates:{providerId}:{criteria_hash} → {rates, cachedAt}

# Vehicle lookup cache
vehicle:lookup:{make}:{model}:{year} → {baseRates, factors}

# User quote history cache
user:quotes:{userId} → [quoteId1, quoteId2, ...]
```

### External Integrations

#### Insurance Provider APIs
```typescript
interface ProviderIntegration {
  // Standardized interface for all providers
  getRates(request: RateRequest): Promise<RateResponse>;
  createPolicy(request: PolicyRequest): Promise<PolicyResponse>;
  updatePolicy(policyId: string, updates: PolicyUpdate): Promise<PolicyResponse>;
  cancelPolicy(policyId: string, reason: string): Promise<CancelResponse>;
}

// Example implementations
class ProfessionalInsuranceAPI implements ProviderIntegration { ... }
class ZurichInsuranceAPI implements ProviderIntegration { ... }
class MadisonInsuranceAPI implements ProviderIntegration { ... }
```

#### Payment Gateway Integrations

##### Mobile Money (MTN Mobile Money, Airtel Money)
```typescript
interface MobileMoneyProvider {
  initializePayment(request: MobilePaymentRequest): Promise<PaymentSession>;
  checkStatus(sessionId: string): Promise<PaymentStatus>;
  processRefund(paymentId: string, amount: number): Promise<RefundResult>;
}
```

##### Banking Integration
```typescript
interface BankingProvider {
  initiateTransfer(request: BankTransferRequest): Promise<TransferSession>;
  verifyAccount(accountNumber: string, bankCode: string): Promise<AccountInfo>;
  processDirectDebit(request: DirectDebitRequest): Promise<DebitResult>;
}
```

#### SMS/Communication Services
```typescript
interface SMSProvider {
  sendSMS(phoneNumber: string, message: string): Promise<SMSResult>;
  checkBalance(): Promise<BalanceInfo>;
  getDeliveryStatus(messageId: string): Promise<DeliveryStatus>;
}

// Zambian SMS providers
class MTNSMSService implements SMSProvider { ... }
class AirtelSMSService implements SMSProvider { ... }
```

### Security Architecture

#### Authentication & Authorization
- **JWT Tokens** for stateless authentication
- **Refresh Token Rotation** for enhanced security
- **Role-Based Access Control (RBAC)** for permissions
- **Multi-Factor Authentication** for admin access

#### Data Protection
- **Encryption at Rest** - AES-256 for sensitive data
- **Encryption in Transit** - TLS 1.3 for all communications
- **Personal Data Masking** - PII protection in logs
- **Data Retention Policies** - Automatic cleanup of old data

#### API Security
- **Rate Limiting** - Per-user and per-endpoint limits
- **Input Validation** - Comprehensive request validation
- **CORS Policies** - Proper cross-origin resource sharing
- **API Versioning** - Backward compatibility management

### Deployment Architecture

#### Cloud Infrastructure (Azure/AWS)

```
                    ┌─────────────────┐
                    │   Load Balancer │
                    │   (Azure LB)    │
                    └─────────────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
        ┌───────▼───────┐         ┌──────▼──────┐
        │   Web App 1   │         │  Web App 2  │
        │ (App Service) │         │(App Service)│
        └───────────────┘         └─────────────┘
                │                         │
                └────────────┬────────────┘
                             │
                    ┌────────▼────────┐
                    │   Database      │
                    │ (Azure SQL DB)  │
                    └─────────────────┘
```

#### Container Orchestration (Kubernetes)

```yaml
# Example Kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: motoquote-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: motoquote-api
  template:
    metadata:
      labels:
        app: motoquote-api
    spec:
      containers:
      - name: api
        image: motoquote/api:latest
        ports:
        - containerPort: 3000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: db-credentials
              key: url
```

### Monitoring & Observability

#### Application Monitoring
- **Azure Application Insights** - Performance monitoring
- **Custom Metrics** - Business KPIs tracking
- **Error Tracking** - Comprehensive error logging
- **User Analytics** - Usage patterns and behavior

#### Infrastructure Monitoring
- **Azure Monitor** - Infrastructure health
- **Log Analytics** - Centralized log management
- **Alerts** - Proactive issue detection
- **Performance Dashboards** - Real-time monitoring

### Performance Optimization

#### Frontend Optimization
- **Code Splitting** - Lazy loading of routes
- **Asset Optimization** - Image compression and CDN
- **Caching Strategies** - Browser and service worker caching
- **Bundle Analysis** - Regular bundle size monitoring

#### Backend Optimization
- **Database Indexing** - Optimized query performance
- **Connection Pooling** - Efficient database connections
- **Caching Layers** - Redis for frequently accessed data
- **API Response Compression** - Reduced payload sizes

#### Network Optimization
- **CDN Usage** - Global content delivery
- **HTTP/2** - Improved connection efficiency
- **Compression** - Gzip/Brotli for all responses
- **Prefetching** - Predictive resource loading

## 📱 Mobile Architecture (Future)

### React Native App
```
┌─────────────────────────────────────────┐
│           Mobile Application            │
├─────────────────────────────────────────┤
│  React Native + TypeScript              │
│  ┌─────────────┐ ┌─────────────────────┐│
│  │     UI      │ │   Native Features   ││
│  │ Components  │ │                     ││
│  │             │ │ • Camera (Doc Scan) ││
│  │ • Navigation│ │ • Biometric Auth    ││
│  │ • Forms     │ │ • Push Notifications││
│  │ • Animations│ │ • Offline Storage   ││
│  └─────────────┘ └─────────────────────┘│
└─────────────────────────────────────────┘
```

### Progressive Web App (PWA)
- **Service Workers** - Offline functionality
- **Push Notifications** - Quote updates and reminders
- **App-like Experience** - Native-feeling interactions
- **Install Prompts** - Add to home screen capability

---

This architecture ensures scalability, maintainability, and security while providing an excellent user experience for Zambian motor insurance customers.
