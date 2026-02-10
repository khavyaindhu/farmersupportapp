# Farmer Support App - React Native

A comprehensive farmer support application built with React Native and Expo, featuring multiple dashboards for Admins, Farmers, and Experts/Officers.

## Features

### Screens Implemented:
1. **Splash Screen** - Welcome screen with app logo
2. **Login Screen** - User authentication with role selection
3. **Admin Dashboard** - Manage farmers, experts, AgPAC, and data audits
4. **Farmer Dashboard** - Access to farming resources and management tools
5. **Expert/Officer Dashboard** - Manage assigned farmers and provide guidance
6. **Manage Crops** - View and manage different crops with alerts and tips
7. **Crop Analytics** - Visual analytics with pie charts showing crop distribution
8. **Visit Frequency** - Track field visits with bar chart visualization

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (install globally: `npm install -g expo-cli`)
- Android Studio (for Android development) or Xcode (for iOS development)

### Steps to Run the Project

1. **Navigate to the project directory:**
   ```bash
   cd farmer-support-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```
   or
   ```bash
   expo start
   ```

4. **Run on Android:**
   ```bash
   npm run android
   ```
   or press `a` in the Expo terminal

5. **Run on iOS (Mac only):**
   ```bash
   npm run ios
   ```
   or press `i` in the Expo terminal

## Building APK for Android

### Method 1: Using Expo Build (Recommended)

1. **Install EAS CLI:**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo:**
   ```bash
   eas login
   ```

3. **Configure the build:**
   ```bash
   eas build:configure
   ```

4. **Build APK:**
   ```bash
   eas build --platform android --profile preview
   ```

5. The APK will be available for download from the Expo dashboard.

### Method 2: Using Expo Classic Build

1. **Build the APK:**
   ```bash
   expo build:android -t apk
   ```

2. Follow the prompts and wait for the build to complete.

3. Download the APK from the provided URL.

### Method 3: Local Build (Advanced)

1. **Eject from Expo (Warning: This is irreversible):**
   ```bash
   expo eject
   ```

2. **Build using Android Studio or Gradle:**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. APK will be located at: `android/app/build/outputs/apk/release/app-release.apk`

## Project Structure

```
farmer-support-app/
├── screens/
│   ├── SplashScreen.js
│   ├── LoginScreen.js
│   ├── AdminDashboard.js
│   ├── FarmerDashboard.js
│   ├── ExpertDashboard.js
│   ├── ManageCropsScreen.js
│   ├── CropAnalyticsScreen.js
│   └── VisitFrequencyScreen.js
├── components/
│   └── (reusable components can be added here)
├── App.js
├── package.json
├── app.json
└── babel.config.js
```

## Key Dependencies

- **React Navigation** - For screen navigation
- **React Native Chart Kit** - For analytics charts (Pie Chart, Bar Chart)
- **React Native SVG** - For chart rendering
- **Expo** - For easier development and building

## Customization

### Colors
The app uses a consistent color scheme:
- Primary Green: `#2D5F3F`
- Secondary Green: `#5A8C69`
- Success Green: `#4CAF50`
- Background: `#F5F5DC`
- Field Background: `#C4B896`

### Navigation
Navigation is handled using React Navigation Stack Navigator. You can modify routes in `App.js`.

## Screenshots Reference

The UI is designed to match the provided flowchart exactly, including:
- Splash screen with plant icon
- Login screen with user selection
- Dashboard layouts for different user roles
- Crop management with image displays
- Analytics with pie and bar charts
- Visit frequency tracking

## Notes

- All screens are currently front-end only with mock data
- Backend integration points are ready for API connections
- Charts use sample data that can be replaced with real data from APIs
- The app supports both English and Hindi text as shown in the designs

## Future Enhancements

- Add backend API integration
- Implement actual authentication
- Add data persistence with AsyncStorage or Redux
- Implement real-time data updates
- Add more interactive features
- Include offline support

## Support

For issues or questions, please refer to the React Native and Expo documentation:
- [React Native Docs](https://reactnative.dev/)
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation Docs](https://reactnavigation.org/)
