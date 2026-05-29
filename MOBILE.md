# 📱 OctaFight Fantasy — Mobile (iOS & Android) Guide

This app ships as a **PWA** and as a **native iOS/Android app via Capacitor**, so it can be submitted to the **Apple App Store** and **Google Play**.

---

## How it works

The native shell (Capacitor) loads your **deployed web app**. This keeps all the
Next.js server features (API routes, live data, auth) working inside the native app.
You deploy the web app once (e.g. to Vercel), then point the native shell at that URL.

```
┌─────────────────────────┐
│  iOS / Android App       │   ← native shell (Capacitor)
│  ┌───────────────────┐   │      • splash screen
│  │  OctaFight web app │   │      • status bar styling
│  │  (your Vercel URL) │   │      • haptics
│  └───────────────────┘   │      • push notifications
└─────────────────────────┘
```

---

## Prerequisites

| To build for | You need |
|--------------|----------|
| **iOS** | A **Mac** with **Xcode** + an **Apple Developer account** ($99/yr) |
| **Android** | **Android Studio** (any OS) + a **Google Play Developer account** ($25 one-time) |

> iOS apps can **only** be built and submitted from a Mac. This is an Apple requirement, not ours.

---

## Step 1 — Deploy the web app

Deploy to Vercel (see README), then note your production URL, e.g.
`https://octafight.vercel.app`

---

## Step 2 — Point Capacitor at your deployed URL

```bash
# Mac/Linux:
export OCTAFIGHT_APP_URL="https://your-app.vercel.app"

# Windows (PowerShell):
$env:OCTAFIGHT_APP_URL="https://your-app.vercel.app"
```

Or edit `capacitor.config.ts` and hard-code `server.url`.

---

## Step 3 — Add the native platforms

```bash
npx cap add ios       # Mac only
npx cap add android
npx cap sync
```

This creates `/ios` and `/android` native project folders.

---

## Step 4 — App icons & splash screen

Put a 1024×1024 PNG icon at `resources/icon.png` and a 2732×2732 splash at
`resources/splash.png`, then:

```bash
npm install -g @capacitor/assets
npx @capacitor/assets generate --iconBackgroundColor '#080c12' --splashBackgroundColor '#080c12'
```

This generates every required icon/splash size for both platforms.

---

## Step 5 — Open & run

```bash
npx cap open ios       # opens Xcode
npx cap open android   # opens Android Studio
```

Press **Run** to test on a simulator/emulator or a connected device.

---

## Step 6 — Submit to the stores

### Apple App Store
1. In Xcode: set your **Team** (Apple Developer account) under *Signing & Capabilities*.
2. Set version + build number.
3. **Product → Archive**, then **Distribute App → App Store Connect**.
4. In [App Store Connect](https://appstoreconnect.apple.com): fill in app metadata,
   screenshots (6.7" + 5.5" required), privacy policy URL, then **Submit for Review**.

### Google Play
1. In Android Studio: **Build → Generate Signed Bundle / APK → Android App Bundle (.aab)**.
2. Create a signing key (keep it safe — you need it for every update).
3. In [Play Console](https://play.google.com/console): create the app, upload the `.aab`,
   fill in store listing + content rating + privacy policy, then **Roll out to Production**.

---

## App Store review tips (important)

Apple sometimes rejects apps that are "just a website." This app is built to pass because it includes **native capabilities**:

- ✅ Native splash screen + status bar (`capacitor.config.ts`)
- ✅ Haptic feedback (`lib/native.ts` — wire `hapticTap()` into buttons)
- ✅ Push notifications (`registerPush()` in `lib/native.ts`)
- ✅ Offline support (service worker)
- ✅ Native-feel bottom tab navigation

**Before submitting**, also make sure to:
- Add a real **Privacy Policy** URL (required by both stores).
- Because this is **fantasy sports** (not gambling), set the content rating accordingly. If you add real-money paid contests, you'll need to address Apple's rules on real-money gaming and may need geo-restrictions.
- Add **Sign in with Apple** if you offer any third-party social login (Apple requirement).

---

## Updating the app

For most changes you just **redeploy the web app** — the native shell loads the new
version automatically (no resubmission needed!). You only need to resubmit to the
stores when you change native config, icons, plugins, or permissions.

---

## Native helpers reference (`lib/native.ts`)

```typescript
import { hapticTap, hapticSuccess, hapticError, registerPush, isNative } from '@/lib/native';

await hapticTap();      // light tap on button press
await hapticSuccess();  // on lineup submitted / contest entered
await hapticError();    // on invalid action (over cap)
const token = await registerPush();  // get device push token
if (isNative()) { /* native-only UI */ }
```

All are safe to call on web — they no-op outside a native shell.
