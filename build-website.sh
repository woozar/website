#!/bin/bash

set -e

echo "🗑️  Cleaning up dist-server folder..."
rm -rf dist-server

# Load environment variables
if [ -f .env ]; then
  source .env
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

echo "✅ Build complete! website.zip created in root folder."