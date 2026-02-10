# 🔧 Troubleshooting Guide

## ❌ Error: Missing Assets (icon.png, splash.png)

### Problem:
```
Cannot find ./assets/icon.png
Cannot find ./assets/splash.png
```

### ✅ Solution (Choose One):

#### **Option 1: Quick Fix - Run without assets (Recommended for development)**

The `app.json` has been updated to work without image assets. Just run:

```bash
npx expo start
```

The app will work perfectly in development mode without icons.

---

#### **Option 2: Add Placeholder Assets**

1. Create the assets folder:
```bash
mkdir -p assets
```

2. Add any image files as placeholders:
   - `icon.png` (1024x1024) - App icon
   - `splash.png` (any size) - Splash screen image
   - `adaptive-icon.png` (1024x1024) - Android adaptive icon

You can use any image or create simple colored squares for testing.

---

#### **Option 3: Use Expo's Default Assets**

1. Initialize a new Expo project in a temp folder:
```bash
npx create-expo-app temp-app
```

2. Copy the assets folder:
```bash
cp -r temp-app/assets/* farmer-support-app/assets/
```

3. Delete the temp folder:
```bash
rm -rf temp-app
```

---

## 🐛 Other Common Issues

### Issue: Metro Bundler Cache Problems
```bash
# Clear cache and restart
npx expo start -c
```

### Issue: Dependencies Not Installing
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Issue: Port Already in Use
```bash
# Kill the process on port 8081
npx kill-port 8081

# Or start on different port
npx expo start --port 8082
```

### Issue: Navigation Error
Make sure all dependencies are installed:
```bash
npm install @react-navigation/native @react-navigation/stack
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler @react-native-community/masked-view
```

### Issue: Chart Library Not Working
```bash
npm install react-native-chart-kit react-native-svg
```

### Issue: Expo Go App Not Connecting
1. Make sure your phone and computer are on the same WiFi
2. Try scanning the QR code again
3. Or manually type the URL shown in terminal
4. Restart Expo Go app

---

## 🎯 For Production Build

When you're ready to build an APK, you'll want proper assets:

1. **Create Icon** (1024x1024 PNG):
   - Use a design tool like Figma, Canva, or Photoshop
   - Or use an online icon generator

2. **Create Splash Screen** (2048x2048 PNG):
   - Simple colored background with your logo
   - Will be automatically resized by Expo

3. **Update app.json** to include asset paths:
```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      ...
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        ...
      }
    }
  }
}
```

---

## 📞 Still Having Issues?

1. Check Expo documentation: https://docs.expo.dev/
2. Clear all caches: `npx expo start -c`
3. Reinstall dependencies: `rm -rf node_modules && npm install`
4. Make sure you're in the correct directory: `cd farmer-support-app`
5. Check Node.js version: `node -v` (should be v14+)

---

## ✅ Quick Checklist

- [ ] In correct directory (`farmer-support-app`)
- [ ] Dependencies installed (`npm install`)
- [ ] No other process on port 8081
- [ ] Phone and computer on same WiFi (for Expo Go)
- [ ] Updated app.json (without asset references for dev)

Run this command and you should be good to go:
```bash
npx expo start
```
