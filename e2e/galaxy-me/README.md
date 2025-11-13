# Galaxy Me - Mobile E2E Testing Framework

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Appium](https://img.shields.io/badge/Appium-2.x-green.svg)](https://appium.io/)
[![WebdriverIO](https://img.shields.io/badge/WebdriverIO-9.x-orange.svg)](https://webdriver.io/)
[![Cucumber](https://img.shields.io/badge/Cucumber-11.x-brightgreen.svg)](https://cucumber.io/)

Enterprise-grade end-to-end mobile testing framework for the **Galaxy Me** native application using Appium, WebdriverIO, and Cucumber BDD.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Reporting](#reporting)
- [CI/CD](#cicd)
- [Documentation](#documentation)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

## 🎯 Overview

This framework provides comprehensive mobile testing capabilities for both iOS and Android platforms with:

- **BDD Approach**: Cucumber feature files with Gherkin syntax
- **Page Object Model**: Maintainable screen object architecture  
- **Cross-Platform Support**: Unified API for Android and iOS
- **Enterprise Logging**: Winston-based structured logging
- **Rich Reporting**: Allure reports with screenshots and logs
- **CI/CD Ready**: GitHub Actions and cloud testing support

## ✨ Features

### Core Capabilities

- ✅ **Dual Platform Support**: iOS and Android with platform abstraction
- ✅ **BDD Testing**: Cucumber integration with reusable step definitions
- ✅ **Page Object Model**: Clean separation of test logic and UI interactions
- ✅ **Type Safety**: Full TypeScript implementation with strict typing
- ✅ **Smart Waiting**: Intelligent element and state waiting strategies
- ✅ **Error Handling**: Comprehensive error capture with screenshots
- ✅ **Test Isolation**: Independent test execution with setup/teardown
- ✅ **Data-Driven Testing**: JSON-based test data management

### Advanced Features

- 🎨 **Visual Testing**: Automatic screenshot capture on failure
- 📊 **Rich Reports**: Allure reports with detailed test analytics
- ☁️ **Cloud Testing**: BrowserStack and Sauce Labs integration
- 🚀 **Parallel Execution**: Run tests concurrently for speed
- 🔍 **Accessibility Testing**: WCAG compliance validation
- 📝 **Detailed Logging**: Winston logger with multiple transports
- 🔄 **CI/CD Integration**: GitHub Actions workflow included

## 📦 Prerequisites

### Required Software

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | v20 or v22 | Runtime environment |
| pnpm | v9 or v10 | Package manager |
| Java JDK | 17+ | Android testing |
| Android Studio | Latest | Android SDK & emulators |
| Xcode | Latest (macOS) | iOS simulators |
| Appium | 2.x | Mobile automation server |

### System Requirements

**For Android Testing:**
- Android SDK >= API 29 (Android 10)
- At least one Android emulator configured
- USB debugging enabled (for physical devices)

**For iOS Testing (macOS only):**
- macOS 12+ (Monterey or later)
- Xcode Command Line Tools
- At least one iOS simulator configured

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository (if not already cloned)
cd e2e/galaxy-me

# Install dependencies
pnpm install

# Install Appium globally (if not installed)
pnpm add -g appium

# Install Appium drivers
appium driver install uiautomator2  # For Android
appium driver install xcuitest      # For iOS

# Verify installations
appium driver list
node --version
pnpm --version
```

### 2. Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
# Required variables:
# - APP_PACKAGE_ANDROID
# - APP_ACTIVITY_ANDROID
# - APP_BUNDLE_IOS
# - TEST_USER_EMAIL
# - TEST_USER_PASSWORD
```

### 3. Prepare Application Files

```bash
# Place your app files in the apps directory
mkdir -p apps/android apps/ios

# Copy APK file for Android
cp /path/to/GalaxyMe.apk apps/android/

# Copy IPA file for iOS (macOS only)
cp /path/to/GalaxyMe.ipa apps/ios/
```

### 4. Start Appium Server

```bash
# In a separate terminal window
appium

# Or use npm script
pnpm run appium
```

### 5. Run Your First Test

```bash
# Run Android tests
pnpm run test:android

# Run iOS tests (macOS only)
pnpm run test:ios

# Run specific feature
pnpm run test:android -- --spec=src/features/auth/login.feature

# Run with specific tag
pnpm run test:android -- --cucumberOpts.tagExpression='@smoke'
```

## 📁 Project Structure

```
e2e/galaxy-me/
├── src/
│   ├── config/              # Configuration files
│   ├── screens/             # Page Object Model
│   │   ├── base/           # Base screen classes
│   │   ├── auth/           # Authentication screens
│   │   ├── profile/        # Profile screens
│   │   └── appointment/    # Appointment screens
│   ├── steps/              # Cucumber step definitions
│   ├── features/           # Cucumber feature files
│   ├── utils/              # Utility functions
│   ├── data/               # Test data files
│   ├── types/              # TypeScript definitions
│   ├── constants/          # Constants and enums
│   └── helpers/            # Helper classes
├── apps/                   # Application binaries
├── test-artifacts/         # Test execution artifacts
├── allure-results/         # Allure test results
├── allure-report/          # Generated reports
├── wdio.config.ts         # WebdriverIO configuration
├── tsconfig.json          # TypeScript configuration
├── package.json           # Dependencies & scripts
└── README.md              # This file
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Application Identifiers
APP_PACKAGE_ANDROID=com.xsofts.galaxyme
APP_ACTIVITY_ANDROID=.MainActivity
APP_BUNDLE_IOS=com.xsofts.galaxyme

# Test Environment
TEST_ENV=dev
BASE_URL=https://dev-api.galaxyme.com

# Test Credentials
TEST_USER_EMAIL=test.customer@galaxyme.com
TEST_USER_PASSWORD=Test@1234
ADMIN_EMAIL=admin@galaxyme.com
ADMIN_PASSWORD=Admin@1234

# Appium Server
APPIUM_HOST=localhost
APPIUM_PORT=4723

# Test Configuration
TEST_TIMEOUT=30000
PAGE_LOAD_TIMEOUT=60000
IMPLICIT_WAIT=5000

# Reporting
SCREENSHOT_ON_FAILURE=true
ALLURE_RESULTS_DIR=./allure-results

# CI/CD
CI=false
PARALLEL_TESTS=1
```

### Device Configuration

Edit `src/config/devices.config.ts` to add or modify device configurations:

```typescript
export const DEVICE_CONFIGS = {
  'pixel-7': {
    name: 'Pixel 7',
    platform: 'android',
    version: '13',
    resolution: { width: 1080, height: 2400 },
  },
  'iphone-15': {
    name: 'iPhone 15',
    platform: 'ios',
    version: '17.0',
    resolution: { width: 1179, height: 2556 },
  },
};
```

## 🧪 Running Tests

### Local Execution

```bash
# Run all Android tests
pnpm run test:android

# Run all iOS tests
pnpm run test:ios

# Run specific feature file
pnpm run test:android -- --spec=src/features/auth/login.feature

# Run tests with specific tag
pnpm run test:android -- --cucumberOpts.tagExpression='@smoke'
pnpm run test:android -- --cucumberOpts.tagExpression='@regression and not @skip'

# Run in debug mode
pnpm run test:debug

# Run with custom capabilities
ANDROID_VERSION=14 pnpm run test:android
```

### Cloud Execution (BrowserStack)

```bash
# Set BrowserStack credentials in .env
BROWSERSTACK_USERNAME=your_username
BROWSERSTACK_ACCESS_KEY=your_access_key

# Run on BrowserStack
pnpm run test:android:browserstack
pnpm run test:ios:browserstack
```

### Parallel Execution

```bash
# Run with 5 parallel workers
PARALLEL_TESTS=5 pnpm run test:android

# Or modify wdio.config.ts
// maxInstances: 5
```

## ✍️ Writing Tests

### Creating a Feature File

```gherkin
# src/features/auth/login.feature
@regression @android @ios
Feature: User Authentication

  Background:
    Given the Galaxy Me app is launched
    And I am on the login screen

  @smoke @happy-path
  Scenario: Successful login with valid credentials
    When I enter username "test.customer@galaxyme.com"
    And I enter password "Test@1234"
    And I tap the login button
    Then I should see the home screen
    And I should see welcome message "Welcome back!"

  @negative
  Scenario: Failed login with invalid password
    When I enter username "test.customer@galaxyme.com"
    And I enter password "wrongpassword"
    And I tap the login button
    Then I should see error message "Invalid credentials"
```

### Implementing Step Definitions

```typescript
// src/steps/auth.steps.ts
import { Given, When, Then } from '@cucumber/cucumber';
import { getLoginScreen } from '@/screens/auth/LoginScreen';
import { getHomeScreen } from '@/screens/home/HomeScreen';

When('I enter username {string}', async (username: string) => {
  const loginScreen = getLoginScreen();
  await loginScreen.enterUsername(username);
});

When('I tap the login button', async () => {
  const loginScreen = getLoginScreen();
  await loginScreen.tapLoginButton();
});

Then('I should see the home screen', async () => {
  const homeScreen = getHomeScreen();
  await homeScreen.waitForLoad();
  expect(await homeScreen.isDisplayed()).toBe(true);
});
```

### Creating Screen Objects

```typescript
// src/screens/auth/LoginScreen.ts
import { AndroidScreen } from '@/screens/base/AndroidScreen';

export class LoginScreenAndroid extends AndroidScreen {
  private selectors = {
    usernameInput: this.getSelector('username_input'),
    passwordInput: this.getSelector('password_input'),
    loginButton: this.getSelector('login_button'),
  };

  async enterUsername(username: string): Promise<void> {
    await this.enterText(this.selectors.usernameInput, username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.enterText(this.selectors.passwordInput, password);
  }

  async tapLoginButton(): Promise<void> {
    await this.tap(this.selectors.loginButton);
  }

  async waitForLoad(): Promise<void> {
    await this.wait.forElement(this.selectors.usernameInput);
  }
}
```

## 📊 Reporting

### Allure Reports

Generate and view Allure reports:

```bash
# Generate report after test execution
pnpm run report

# View report in browser
pnpm run report:allure

# Clean previous results
pnpm run clean
```

### Report Features

- ✅ Test execution summary with pass/fail statistics
- ✅ Timeline view of test execution
- ✅ Screenshots attached to failed tests
- ✅ Device logs and stack traces
- ✅ Historical trend analysis
- ✅ Test categorization by features and tags
- ✅ Environment information

### Custom Reports

Custom JSON reports are generated automatically in `test-artifacts/custom-report.json`.

## 🔄 CI/CD

### GitHub Actions

Tests run automatically on:
- Push to `main` or `develop` branches
- Pull requests
- Daily schedule (2 AM UTC)

View the workflow: [`.github/workflows/mobile-tests.yml`](../../.github/workflows/mobile-tests.yml)

### Manual Workflow Trigger

```bash
# Via GitHub UI: Actions > Mobile E2E Tests > Run workflow
# Or via CLI:
gh workflow run mobile-tests.yml
```

### CI Environment Variables

Set these secrets in GitHub repository settings:
- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`
- `TEST_USER_EMAIL`
- `TEST_USER_PASSWORD`

## 📚 Documentation

### Available Documentation

| Document | Description |
|----------|-------------|
| [README.md](./README.md) | This file - Getting started guide |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Complete framework architecture |
| [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) | Step-by-step implementation guide |

### Key Concepts

- **Page Object Model**: UI abstraction pattern
- **BDD**: Behavior-Driven Development with Gherkin
- **Test Fixtures**: Setup and teardown procedures
- **Wait Strategies**: Explicit and implicit waiting
- **Cross-Platform**: Android and iOS abstraction

## 🔧 Troubleshooting

### Common Issues

#### Appium Server Connection Failed

```bash
# Check if Appium is running
lsof -i :4723

# Start Appium
appium

# Check Appium version
appium --version
```

#### Element Not Found

```typescript
// Add explicit wait
await element.waitForDisplayed({ timeout: 30000 });

// Increase global timeout in .env
TEST_TIMEOUT=60000
```

#### Android Emulator Issues

```bash
# List available emulators
emulator -list-avds

# Start emulator
emulator -avd <avd_name>

# Verify ADB connection
adb devices
```

#### iOS Simulator Issues

```bash
# List available simulators
xcrun simctl list devices available

# Boot simulator
xcrun simctl boot <device_id>

# Check simulator status
xcrun simctl list | grep Booted
```

### Debug Mode

```bash
# Enable debug logging
LOG_LEVEL=debug pnpm run test:android

# Use debug script
pnpm run test:debug
```

### Getting Help

1. Check [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed documentation
2. Review existing tests in `src/features/` for examples
3. Check logs in `test-artifacts/logs/`
4. Review Allure reports for test details
5. Contact the QA team for assistance

## 🤝 Contributing

### Development Workflow

1. Create a feature branch
2. Write tests following BDD principles
3. Ensure tests pass locally
4. Run linting: `pnpm run lint`
5. Run type checking: `pnpm run typecheck`
6. Submit pull request
7. Wait for CI/CD checks to pass
8. Get code review approval

### Coding Standards

- Use TypeScript strict mode
- Follow ESLint rules
- Write descriptive test names
- Add JSDoc comments for public methods
- Keep screen objects focused and cohesive
- Use async/await consistently
- Handle errors gracefully

### Pull Request Checklist

- [ ] Tests pass on both Android and iOS
- [ ] No linting errors
- [ ] TypeScript compiles without errors
- [ ] Documentation updated if needed
- [ ] All tests have clear descriptions
- [ ] Screenshots captured on failures
- [ ] Code reviewed by peer

## 📝 Available Scripts

```json
{
  "clean": "Remove artifacts and reports",
  "typecheck": "Run TypeScript type checking",
  "lint": "Run ESLint",
  "test:android": "Run Android tests",
  "test:ios": "Run iOS tests",
  "test:android:browserstack": "Run on BrowserStack Android",
  "test:ios:browserstack": "Run on BrowserStack iOS",
  "test:debug": "Run in debug mode",
  "report": "Generate and open Allure report",
  "appium": "Start Appium server",
  "appium:install": "Install Appium drivers"
}
```

## 📄 License

This project is part of the X-Test monorepo.

## 📞 Support

For questions or issues:
- Create an issue in the repository
- Contact the QA team
- Review documentation in `ARCHITECTURE.md`
- Check troubleshooting section above

---

**Version:** 1.0.0  
**Last Updated:** 2025-11-10  
**Status:** Ready for Implementation

🚀 **Ready to start testing? Follow the [Quick Start](#quick-start) guide above!**