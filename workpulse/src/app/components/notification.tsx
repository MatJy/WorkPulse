'use client';

export function requestPermission() {
    if (!('Notification' in window)) return;
    Notification.requestPermission();
}

export function showNotification(title: string) {
    if (
        Notification.permission === 'granted' ||
        Notification.permission === 'default'
    ) {
        new Notification(title);
    }
}
