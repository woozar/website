#!/bin/bash

set -e

echo "🧪 Running tests..."
npm run test:run

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

echo "✅ Build complete! website.zip created in root folder."