#!/bin/bash

# Create MySQL database
echo "Creating MySQL database..."
mysql -u root -proot -e "CREATE DATABASE IF NOT EXISTS valkey_cache;"

# Create .env file
echo "Creating .env file..."
cat > .env << EOL
# Database
DATABASE_URL="mysql://root:root@localhost:3306/valkey_cache"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="$(openssl rand -base64 32)"

# OAuth Providers
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Email Provider (for password reset)
EMAIL_SERVER_HOST=""
EMAIL_SERVER_PORT=""
EMAIL_SERVER_USER=""
EMAIL_SERVER_PASSWORD=""
EMAIL_FROM=""
EOL

# Make script executable
chmod +x setup.sh

echo "Environment setup complete!"
echo "Please fill in the OAuth provider credentials in .env"
echo "Then run: npm run db:setup" 