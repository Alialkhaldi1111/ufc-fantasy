import { create } from 'zustand';
import { User, Notification } from '@/types';

interface UserStore {
  user: User | null;
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  addNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  fetchNotifications: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,

  setUser: (user: User | null) => set({ user }),

  addNotification: (notification: Notification) => {
    const { notifications } = get();
    const updated = [notification, ...notifications];
    const unreadCount = updated.filter((n) => !n.read).length;
    set({ notifications: updated, unreadCount });
  },

  markAsRead: (id: string) => {
    const { notifications } = get();
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    const unreadCount = updated.filter((n) => !n.read).length;
    set({ notifications: updated, unreadCount });

    // Sync with server
    fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: [id] }),
    }).catch(console.error);
  },

  markAllAsRead: () => {
    const { notifications } = get();
    const updated = notifications.map((n) => ({ ...n, read: true }));
    set({ notifications: updated, unreadCount: 0 });

    // Sync with server
    fetch('/api/notifications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ all: true }),
    }).catch(console.error);
  },

  clearNotifications: () => {
    set({ notifications: [], unreadCount: 0 });
    fetch('/api/notifications', { method: 'DELETE' }).catch(console.error);
  },

  fetchNotifications: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch('/api/notifications');
      if (!response.ok) throw new Error('Failed to fetch notifications');

      const data = await response.json() as {
        notifications: Notification[];
        unreadCount: number;
      };
      set({
        notifications: data.notifications,
        unreadCount: data.unreadCount,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },
}));
