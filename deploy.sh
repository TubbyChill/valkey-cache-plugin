#!/bin/bash

# Exit on any error
set -e

# Load environment variables
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Check if we're allowing failed tests
ALLOW_FAILED_TESTS=${ALLOW_FAILED_TESTS:-false}

echo "🚀 Starting deployment process..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running linters..."
npm run lint

# Run tests and calculate coverage
echo "🧪 Running tests..."
npm run test || {
  if [ "$ALLOW_FAILED_TESTS" = "true" ]; then
    echo "⚠️ Tests failed but ALLOW_FAILED_TESTS is true, continuing..."
  else
    echo "❌ Tests failed! Deployment aborted."
    exit 1
  fi
}

# Build the application
echo "🏗️ Building application..."
npm run build

# Run database migrations
echo "🗃️ Running database migrations..."
npm run migrate

# Deploy the application
echo "📤 Deploying application..."

# Stop the current PM2 process if it exists
pm2 stop valkey-cache-plugin || true

# Start the new version with PM2
pm2 start app/dist/index.js --name valkey-cache-plugin

# Notify deployment endpoint
if [ -n "$DEPLOY_NOTIFY_URL" ] && [ -n "$DEPLOY_API_KEY" ]; then
  echo "📢 Notifying deployment service..."
  COMMIT_HASH=$(git rev-parse --short HEAD)
  VERSION=$(node -p "require('./package.json').version")
  
  curl -X POST "$DEPLOY_NOTIFY_URL" \
    -H "Content-Type: application/json" \
    -H "x-api-key: $DEPLOY_API_KEY" \
    -d "{\"version\":\"$VERSION\",\"commit\":\"$COMMIT_HASH\",\"date\":\"$(date -u +"%Y-%m-%dT%H:%M:%SZ")\"}"
fi

echo "✅ Deployment completed successfully!" 