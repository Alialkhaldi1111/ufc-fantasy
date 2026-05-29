import { NextRequest, NextResponse } from 'next/server';
import { mockNotifications } from '@/data/mockUser';
import { Notification } from '@/types';

// In-memory store (dev mock)
const notifications: Notification[] = [...mockNotifications];

export async function GET(_request: NextRequest) {
  try {
    const unreadCount = notifications.filter((n) => !n.read).length;
    return NextResponse.json({ notifications, unreadCount });
  } catch (error) {
    console.error('[GET /api/notifications]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { ids?: string[]; all?: boolean };

    if (body.all) {
      notifications.forEach((n) => {
        n.read = true;
      });
    } else if (body.ids?.length) {
      const idSet = new Set(body.ids);
      notifications.forEach((n) => {
        if (idSet.has(n.id)) n.read = true;
      });
    } else {
      return NextResponse.json(
        { error: 'Provide ids array or all: true' },
        { status: 400 }
      );
    }

    const unreadCount = notifications.filter((n) => !n.read).length;
    return NextResponse.json({ success: true, unreadCount });
  } catch (error) {
    console.error('[POST /api/notifications]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest) {
  try {
    notifications.length = 0;
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[DELETE /api/notifications]', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
