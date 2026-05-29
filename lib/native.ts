/**
 * Native bridge helpers (Capacitor).
 *
 * All functions are SAFE to call on the web — they no-op when not running
 * inside a native shell, so the same components work in browser and on device.
 */
import { Capacitor } from '@capacitor/core';

export const isNative = (): boolean => {
  try {
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
};

export const getPlatform = (): 'ios' | 'android' | 'web' => {
  try {
    return Capacitor.getPlatform() as 'ios' | 'android' | 'web';
  } catch {
    return 'web';
  }
};

/** Light haptic tap — use on button presses, tab switches, add-to-lineup. */
export async function hapticTap(): Promise<void> {
  if (!isNative()) return;
  try {
    const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
    await Haptics.impact({ style: ImpactStyle.Light });
  } catch {
    /* no-op */
  }
}

/** Medium haptic — use on confirmations (lineup submitted, contest entered). */
export async function hapticSuccess(): Promise<void> {
  if (!isNative()) return;
  try {
    const { Haptics, NotificationType } = await import('@capacitor/haptics');
    await Haptics.notification({ type: NotificationType.Success });
  } catch {
    /* no-op */
  }
}

/** Error haptic — use on invalid actions (over salary cap, etc.). */
export async function hapticError(): Promise<void> {
  if (!isNative()) return;
  try {
    const { Haptics, NotificationType } = await import('@capacitor/haptics');
    await Haptics.notification({ type: NotificationType.Error });
  } catch {
    /* no-op */
  }
}

/** Initialize native chrome (status bar, splash hide). Call once on app mount. */
export async function initNative(): Promise<void> {
  if (!isNative()) return;
  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    await StatusBar.setStyle({ style: Style.Dark });
    if (getPlatform() === 'android') {
      await StatusBar.setBackgroundColor({ color: '#080c12' });
    }
  } catch {
    /* no-op */
  }
  try {
    const { SplashScreen } = await import('@capacitor/splash-screen');
    await SplashScreen.hide();
  } catch {
    /* no-op */
  }
}

/** Register for push notifications. Returns the device token, or null. */
export async function registerPush(): Promise<string | null> {
  if (!isNative()) return null;
  try {
    const { PushNotifications } = await import('@capacitor/push-notifications');
    const perm = await PushNotifications.requestPermissions();
    if (perm.receive !== 'granted') return null;
    await PushNotifications.register();
    return new Promise((resolve) => {
      PushNotifications.addListener('registration', (token) => resolve(token.value));
      setTimeout(() => resolve(null), 5000);
    });
  } catch {
    return null;
  }
}
