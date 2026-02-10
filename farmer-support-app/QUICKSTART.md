# 🚀 Quick Start Guide - Farmer Support App

## ⚡ Fastest Way to Get Started

### 1. Install Dependencies
```bash
cd farmer-support-app
npm install
```

### 2. Start the App
```bash
npx expo start
```

### 3. Run on Your Device
- **Android**: Press `a` or scan QR code with Expo Go app
- **iOS**: Press `i` or scan QR code with Camera app

---

## 📱 Generate APK (Android)

### Option A: Using EAS (Recommended)
```bash
# Install EAS CLI
npm install -g eas-cli

# Login
eas login

# Build APK
eas build --platform android --profile preview
```

### Option B: Using Expo Classic
```bash
expo build:android -t apk
```

---

## 🎯 Navigation Flow

1. **Splash Screen** → Auto-navigates after 3 seconds
2. **Login Screen** → Select role (Admin/Farmer/Officer)
3. **Dashboard** → Based on selected role:
   - Admin → Admin Dashboard
   - Officer → Expert Dashboard  
   - Farmer → Farmer Dashboard

---

## 📂 File Structure

```
screens/
├── SplashScreen.js        # Entry point
├── LoginScreen.js         # Login & role selection
├── AdminDashboard.js      # Admin home
├── FarmerDashboard.js     # Farmer home
├── ExpertDashboard.js     # Expert/Officer home
├── ManageCropsScreen.js   # Crop management
├── CropAnalyticsScreen.js # Analytics with charts
└── VisitFrequencyScreen.js # Visit tracking
```

---

## 🎨 Key Features

✅ Multiple user roles (Admin, Farmer, Expert)
✅ Beautiful UI matching the flowchart design
✅ Analytics with Pie & Bar charts
✅ Bilingual support (English & Hindi)
✅ Responsive design
✅ Easy navigation between screens

---

## 🛠️ Troubleshooting

**Problem**: Dependencies not installing
```bash
# Clear cache and reinstall
rm -rf node_modules
npm cache clean --force
npm install
```

**Problem**: Metro bundler issues
```bash
# Reset metro bundler
npx expo start -c
```

**Problem**: Build fails
```bash
# Make sure you're logged into Expo
eas login
# or
expo login
```

---

## 📞 Need Help?

- Check the main README.md for detailed documentation
- Visit [Expo Documentation](https://docs.expo.dev/)
- Visit [React Native Documentation](https://reactnative.dev/)

---

## 🎉 You're Ready!

The app is now ready to run. All 8 screens from your flowchart are implemented and functional!
