#!/bin/bash

# Setup script for Farmer Support App
# This creates placeholder image files for the app

echo "🌾 Setting up Farmer Support App..."

# Create assets directory
mkdir -p assets

# Create a simple SVG for icon (can be converted to PNG later)
cat > assets/icon.svg << 'EOF'
<svg width="1024" height="1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#2D5F3F"/>
  <text x="512" y="600" font-size="400" text-anchor="middle" fill="#F5F5DC">🌾</text>
</svg>
EOF

echo "✅ Assets directory created"
echo "✅ Icon template created"
echo ""
echo "⚠️  Note: The app will work without PNG assets, but for production:"
echo "   1. Create icon.png (1024x1024)"
echo "   2. Create splash.png (recommended size based on device)"
echo "   3. Create adaptive-icon.png (for Android, 1024x1024)"
echo ""
echo "🚀 You can now run: npx expo start"
