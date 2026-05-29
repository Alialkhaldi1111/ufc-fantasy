import type { CapacitorConfig } from '@capacitor/cli';

/**
 * OctaFight Fantasy — Capacitor (iOS + Android) configuration.
 *
 * This wraps the Next.js web app into native iOS/Android shells for the
 * App Store and Google Play.
 *
 * APPROACH: Because the app uses Next.js server features (API routes, server
 * components), the native shell loads the LIVE deployed web app via `server.url`.
 * Set OCTAFIGHT_APP_URL to your production URL (e.g. your Vercel deployment)
 * before running `npx cap sync`.
 *
 *   export OCTAFIGHT_APP_URL="https://your-app.vercel.app"
 *
 * For a fully offline/static bundle instead, run `next build` with
 * `output: 'export'` and point `webDir` at the `out/` folder (remove server.url).
 */
const config: CapacitorConfig = {
  appId: 'gg.octafight.fantasy',
  appName: 'OctaFight Fantasy',
  webDir: 'public',
  server: {
    // Native shell loads the deployed app. Falls back to localhost for dev.
    url: process.env.OCTAFIGHT_APP_URL || undefined,
    cleartext: true,
    androidScheme: 'https',
  },
  backgroundColor: '#080c12',
  ios: {
    contentInset: 'always',
    backgroundColor: '#080c12',
  },
  android: {
    backgroundColor: '#080c12',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#080c12',
      androidSplashResourceName: 'splash',
      showSpinner: true,
      spinnerColor: '#39FF14',
      splashFullScreen: true,
      splashImmersive: true,
    },
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#080c12',
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    Keyboard: {
      resize: 'native',
    },
  },
};

export default config;
