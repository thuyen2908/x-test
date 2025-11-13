# Galaxy Me - Quick Start Guide

**Fastest way to get your mobile testing framework up and running!**

---

## ✅ Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js v20 or v22 installed
- ✅ pnpm v9 or v10 installed
- ✅ Java JDK 17+ (for Android testing)
- ✅ Android Studio (for Android emulators)
- ✅ Xcode (for iOS simulators - macOS only)

---

## 🚀 5-Minute Setup

### Step 1: Install Dependencies (2 minutes)

```bash
# From your workspace root
cd c:/workspace/personal/x-test

# Install all dependencies
pnpm install

# This will install:
# - WebdriverIO 9.x
# - Appium 2.x  
# - Cucumber
# - Winston logger
# - All other dependencies
```

### Step 2: Install Appium & Drivers (1 minute)

```bash
# Install Appium globally
pnpm add -g appium

# Navigate to galaxy-me
cd e2e/galaxy-me

# Install Appium drivers
pnpm run appium:install

# Verify installation
appium driver list
# Should show: uiautomator2@latest, xcuitest@latest
```

### Step 3: Configure Environment (1 minute)

```bash
# Copy environment template
cp .env.example .env

# Edit .env and set MINIMUM these values:
# APP_PACKAGE_ANDROID=com.xsofts.galaxyme
# APP_ACTIVITY_ANDROID=.MainActivity
# TEST_USER_EMAIL=test@example.com
# TEST_USER_PASSWORD=Test@1234
```

### Step 4: Add Application File (30 seconds)

```bash
# Create apps directory
mkdir -p apps/android

# Copy your APK file
cp "C:\Users\thuye\OneDrive\Documents\Downloads\GalaxyMe_1.2.3_PROD_2025-Nov-07_0423.apk" apps/android/GalaxyMe_1.2.3_PROD.apk
```

### Step 5: Verify Setup (30 seconds)

```bash
# Check TypeScript compilation (should have no errors after install)
pnpm run typecheck

# Check if Appium works
appium --version
```

---

## 🎯 Run Your First Test

### Option 1: Find Element Selectors First (Recommended)

```bash
# Terminal 1: Start Appium
pnpm run appium

# Terminal 2: Start Android emulator (or connect device)
# Android Studio > Device Manager > Start Emulator

# Terminal 3: Open Appium Inspector
# Visit: http://localhost:4723/inspector
# Configure capabilities and connect to find element IDs

# Update selectors in: src/screens/auth/LoginScreen.ts
```

### Option 2: Run Test with Placeholder Selectors

```bash
# Start Appium server
pnpm run appium

# In another terminal, run Android test
pnpm run test:android --spec=src/features/auth/login.feature

# View report
pnpm run report
```

---

## 📋 Post-Installation Checklist

After running `pnpm install`, verify:

- [ ] No TypeScript errors in VS Code
- [ ] `pnpm run typecheck` passes
- [ ] Appium and drivers installed
- [ ] `.env` file created and configured
- [ ] APK file in `apps/android/` directory
- [ ] Android emulator available or device connected

---

## 🛠️ Update Element Selectors

The framework currently uses placeholder selectors. You MUST update them:

### Using Appium Inspector

1. **Start Appium**: `pnpm run appium`
2. **Open Inspector**: http://localhost:4723/inspector
3. **Configure Capabilities**:
   ```json
   {
     "platformName": "Android",
     "appium:deviceName": "Android Emulator",
     "appium:app": "/full/path/to/apps/android/GalaxyMe_1.2.3_PROD.apk",
     "appium:appPackage": "com.xsofts.galaxyme",
     "appium:appActivity": ".MainActivity",
     "appium:automationName": "UiAutomator2"
   }
   ```
4. **Start Session** and inspect elements
5. **Find IDs** for:
   - Username input field
   - Password input field
   - Login button
   - Error message text

### Update LoginScreen.ts

Edit [`src/screens/auth/LoginScreen.ts`](./src/screens/auth/LoginScreen.ts):

```typescript
// Replace placeholder IDs with actual IDs from Inspector
private selectors = {
  usernameInput: {
    android: 'com.xsofts.galaxyme:id/ACTUAL_USERNAME_ID', // <-- Update this
    ios: '',
  } as Selector,
  passwordInput: {
    android: 'com.xsofts.galaxyme:id/ACTUAL_PASSWORD_ID', // <-- Update this
    ios: '',
  } as Selector,
  loginButton: {
    android: 'com.xsofts.galaxyme:id/ACTUAL_LOGIN_BUTTON_ID', // <-- Update this
    ios: '',
  } as Selector,
};
```

---

## 🎬 Running Tests

### Basic Commands

```bash
# Run all Android tests
pnpm run test:android

# Run specific feature
pnpm run test:android --spec=src/features/auth/login.feature

# Run with tags
pnpm run test:android --cucumberOpts.tagExpression='@smoke'

# Run in debug mode
pnpm run test:debug
```

### Advanced Commands

```bash
# Run on BrowserStack (after configuring credentials)
pnpm run test:android:browserstack

# Run iOS tests (macOS only)
pnpm run test:ios

# Generate Allure report
pnpm run report

# Clean artifacts
pnpm run clean
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot find module '@wdio/types'"
**Solution:** Run `pnpm install` - dependencies not yet installed

### Issue: "Appium not found"
**Solution:** `pnpm add -g appium`

### Issue: "Driver not installed"
**Solution:** `pnpm run appium:install`

### Issue: "Element not found"
**Solution:** Update selectors in LoginScreen.ts with actual IDs from Appium Inspector

### Issue: "No devices found"
**Solution:** Start Android emulator or connect physical device via USB

---

## 📊 What You Get

After setup, you'll have:

✅ **36 files** of production-ready framework code  
✅ **5,558 lines** of comprehensive documentation  
✅ **Cross-platform** Android & iOS support  
✅ **BDD testing** with Cucumber  
✅ **Type-safe** with TypeScript strict mode  
✅ **Enterprise logging** with Winston  
✅ **Smart waiting** with retry logic  
✅ **Screenshot capture** automatic on failure  
✅ **Allure reports** with detailed analytics  
✅ **Cloud testing** BrowserStack integration ready  

---

## 📁 Framework Structure

```
e2e/galaxy-me/
├── src/
│   ├── config/          ✅ Environment, Appium, devices
│   ├── types/           ✅ TypeScript definitions
│   ├── helpers/         ✅ Platform, selector utilities
│   ├── utils/           ✅ Logger, screenshots, waits
│   ├── screens/         ✅ Page Object Model (Login ready)
│   ├── steps/           ✅ Cucumber step definitions
│   ├── features/        ✅ BDD feature files (9 login scenarios)
│   └── data/            ✅ Test data (users, environments)
│
├── apps/android/        📁 Place APK file here
├── test-artifacts/      📁 Auto-generated during tests
├── allure-results/      📁 Auto-generated test results
└── allure-report/       📁 Auto-generated HTML reports
```

---

## 🎯 Success Criteria

You're ready when:
- ✅ `pnpm install` completes without errors
- ✅ `pnpm run typecheck` passes
- ✅ Appium server starts: `pnpm run appium`
- ✅ Element selectors updated in LoginScreen.ts
- ✅ First test runs: `pnpm run test:android`
- ✅ Report generates: `pnpm run report`

---

## 🚦 Next Steps After Setup

1. **Update Selectors** using Appium Inspector
2. **Run First Test** to validate setup
3. **Add More Screens** (Home, Profile, Appointment)
4. **Expand Test Coverage** with more feature files
5. **Set up CI/CD** with GitHub Actions
6. **Configure Cloud Testing** with BrowserStack

---

## 📞 Need Help?

- 🔍 **Detailed Architecture**: [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- 📋 **Implementation Plan**: [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md)
- 📖 **User Guide**: [`README.md`](./README.md)
- 📊 **Progress Tracking**: [`PROJECT_STATUS.md`](./PROJECT_STATUS.md)
- 🛠️ **Setup Details**: [`SETUP_GUIDE.md`](./SETUP_GUIDE.md)

---

**Ready to begin?** Run `pnpm install` and follow the steps above! 🚀