#!/bin/bash

set -e

echo "🗑️  Cleaning up dist-server folder..."
rm -rf dist-server

# Load environment variables
if [ -f .env ]; then
  source .env
fi

FTP_HOST="w014c8ec.kasserver.com"
FTP_PORT=21

if [ -n "$FTP_USER" ] && [ -n "$FTP_PASSWORD" ]; then
  DEPLOY=true
  # Fail early instead of after a full build
  if ! command -v lftp >/dev/null 2>&1; then
    echo "❌ lftp is required for the upload. Install it with: brew install lftp"
    exit 1
  fi
else
  DEPLOY=false
fi

echo "🧪 Running tests with coverage..."
npm run test:coverage

echo "✅ Tests passed! Starting build process..."

echo "🗑️  Cleaning dist folder..."
rm -rf dist

rm -f website.zip

echo "🏗️  Building application..."
npm run build

echo "📦 Creating website.zip..."
cd dist
zip -r ../website.zip .
cd ..

echo "🗑️  Cleaning up dist-server folder..."
rm -rf dist-server

echo "📊 Uploading to SonarQube..."
npx sonarqube-scanner \
  -Dsonar.projectKey=$SONAR_KEY \
  -Dsonar.sources=src \
  -Dsonar.host.url=$SONAR_SERVER \
  -Dsonar.token=$SONAR_TOKEN \
  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
  -Dsonar.qualitygate.wait=true

if [ "$DEPLOY" = true ]; then
  echo "🚀 Uploading dist to $FTP_HOST..."
  # Password is passed via LFTP_PASSWORD so it never shows up in the process list.
  # mirror --delete removes files that are no longer part of the build (e.g. old hashed bundles).
  LFTP_PASSWORD="$FTP_PASSWORD" lftp -p "$FTP_PORT" -u "$FTP_USER" --env-password "$FTP_HOST" <<LFTP
set cmd:fail-exit yes
set ftp:ssl-force yes
set ftp:ssl-protect-data yes
set ssl:verify-certificate yes
set net:max-retries 2
set net:timeout 30
mirror --reverse --delete --parallel=4 --exclude-glob .DS_Store --verbose=1 dist/ /
bye
LFTP
  echo "✅ Build complete! Website uploaded to $FTP_HOST, website.zip created in root folder."
else
  echo "⚠️  FTP_USER/FTP_PASSWORD not set, skipping upload."
  echo "✅ Build complete! website.zip created in root folder."
fi