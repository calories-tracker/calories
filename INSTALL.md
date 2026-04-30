# Installing on your iPhone

## Quick start (see it running)

```bash
cd CalorieTracker
npm install
npx expo start
```

Scan the QR code with the **Expo Go** app on your iPhone to instantly preview the app. No build needed.

---

## Build a real IPA (install directly on your phone)

### 1. Install EAS CLI
```bash
npm install -g eas-cli
```

### 2. Log in to Expo
```bash
eas login
```

### 3. Link your Apple Developer account
You need an [Apple Developer account](https://developer.apple.com/account/) ($99/year).
EAS will prompt you to connect it during the build.

### 4. Build the IPA
```bash
eas build --platform ios --profile preview
```

EAS builds in the cloud. When done (~10–15 min), you get a download link for the `.ipa` file.

### 5. Install on your phone
- **With a paid developer account**: EAS can distribute via TestFlight. Run `eas submit --platform ios` after building.
- **With AltStore** (free, no paid account needed): Download the `.ipa`, open [AltStore](https://altstore.io) on your Mac, and sideload it. Re-sign every 7 days.
- **With Sideloadly** (free alternative to AltStore): Similar process.

---

## Customising before you build

| File | What to change |
|------|---------------|
| `app.json` | `bundleIdentifier` — set to something unique like `com.yourname.calorietracker` |
| `assets/icon.png` | Replace with your app icon (1024×1024 px) |
| `assets/splash.png` | Replace with your splash screen image |
| `src/data.js` | Adjust mock calorie/meal/activity data |
| `src/AppContext.js` | Change default name, accent colour, goal |

---

## Apple Health integration

The Activities card currently shows mock data. To wire up real HealthKit data, install [`react-native-health`](https://github.com/agencyenterprise/react-native-health) and follow their setup guide — it requires a paid Apple Developer account for the HealthKit entitlement.
