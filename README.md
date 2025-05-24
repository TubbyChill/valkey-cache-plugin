# ValKey Cache Plugin Website

A modern website for the ValKey Cache Plugin, built with Next.js, Express, and MySQL, following clean architecture principles.

## Project Structure

```
valkey-cache-plugin/
├── app/                      # Backend (Express + Prisma)
│   ├── prisma/              # Database schema and migrations
│   └── src/                 # Source code
│       ├── data/            # Data layer
│       │   └── repositories/# Data repositories
│       ├── domain/          # Domain layer
│       │   ├── entities/    # Domain entities
│       │   ├── repositories/# Repository interfaces
│       │   └── usecases/    # Business logic
│       │       ├── auth/    # Authentication use cases
│       │       └── page/    # Page-related use cases
│       └── presentation/    # Presentation layer
│           └── api/         # API endpoints
│               └── routes/  # Route handlers
├── website/                 # Frontend (Next.js)
│   ├── src/                # Source code
│   │   ├── app/           # Next.js app directory
│   │   │   └── [lang]/    # Language-specific routes
│   │   │       ├── about/ # About page
│   │   │       ├── blog/  # Blog pages
│   │   │       ├── docs/  # Documentation
│   │   │       ├── login/ # Authentication
│   │   │       ├── map/   # Site map
│   │   │       ├── pricing/# Pricing page
│   │   │       └── signup/# Registration
│   │   ├── components/    # React components
│   │   │   ├── layout/   # Layout components
│   │   │   ├── navigation/# Navigation components
│   │   │   ├── pages/    # Page components
│   │   │   └── ui/       # UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── i18n/         # Internationalization
│   │   │   └── translations/ # Translation files
│   │   └── lib/          # Utility functions
│   └── tests/            # Test files
│       └── e2e/         # End-to-end tests
├── .gitignore           # Git ignore file
├── deploy.sh            # Deployment script
├── package.json         # Project dependencies
├── PROJECT_STATUS.md    # Project status tracking
├── README.md           # Project documentation
└── spec.md             # Technical specifications
```

## Prerequisites

- Node.js 18+
- MySQL 8+
- PM2 (for production deployment)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/valkey-cache-plugin.git
   cd valkey-cache-plugin
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```env
   # Database
   DATABASE_URL="mysql://user:password@localhost:3306/valkey_cache"

   # Authentication
   JWT_SECRET="your-jwt-secret"
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"

   # OAuth Providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   GITHUB_CLIENT_ID="your-github-client-id"
   GITHUB_CLIENT_SECRET="your-github-client-secret"

   # Stripe Integration
   STRIPE_SECRET_KEY="your-stripe-secret-key"
   STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"
   STRIPE_PRICE_ID="your-stripe-price-id"

   # Email (Brevo/Sendinblue)
   BREVO_API_KEY="your-brevo-api-key"
   BREVO_SENDER_EMAIL="noreply@valkey-cache-plugin.com"
   BREVO_SENDER_NAME="ValKey Cache Plugin"

   # Twilio
   TWILIO_ACCOUNT_SID="your-twilio-account-sid"
   TWILIO_AUTH_TOKEN="your-twilio-auth-token"
   TWILIO_PHONE_NUMBER="your-twilio-phone-number"

   # OpenAI (for translations)
   OPENAI_API_KEY="your-openai-api-key"

   # Deployment
   DEPLOY_NOTIFY_URL="http://localhost:3000/api/deploy"
   DEPLOY_API_KEY="your-deploy-api-key"
   ALLOW_FAILED_TESTS=false

   # Application
   NODE_ENV="development"
   PORT=3000
   API_RATE_LIMIT="100"
   API_RATE_WINDOW="15m"
   ```

4. Initialize the database:
   ```bash
   npm run migrate
   ```

5. Start the development servers:
   ```bash
   npm run dev
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## Development

- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build both applications
- `npm run test` - Run all tests
- `npm run lint` - Run linting

## Deployment

The project includes a deployment script that:
1. Runs tests and ensures >90% pass rate
2. Builds the application
3. Runs database migrations
4. Deploys using PM2
5. Notifies the deployment endpoint

To deploy:
```bash
chmod +x deploy.sh
./deploy.sh
```

### Deployment Configuration

- `ALLOW_FAILED_TESTS`: Set to `true` to force deployment even if tests fail
- `DEPLOY_NOTIFY_URL`: Endpoint to notify after successful deployment
- `DEPLOY_API_KEY`: API key for deployment notifications

## Features

- 🔐 OAuth authentication (Google & GitHub)
- 💳 Stripe integration for payments
- 📧 Email integration via Brevo
- 📱 SMS notifications via Twilio
- 🌐 Multilingual support with AI translations
- 📊 Admin dashboard
- 🔑 API key management
- 📝 Content management system
- 🚀 Performance optimized

## Architecture

The project follows clean architecture principles with clear separation between:
- Domain Layer: Business logic and entities
- Data Layer: Database interactions
- Presentation Layer: API routes and controllers

## Testing

Tests are written using Jest and must pass with >90% coverage before deployment.
Override this requirement by setting `ALLOW_FAILED_TESTS=true`.

## License

[Your License Here] 