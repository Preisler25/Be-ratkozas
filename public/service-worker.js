self.addEventListener('push', event => {
    const data = event.data.json();
    const title = data.title;
    const message = data.message;
    const options = {
        body: message,
        icon: 'path/to/notification-icon.png', // A saját értesítési ikonod elérési útvonala
    };

    event.waitUntil(
        self.registration.showNotification(title, options)
    );
});

self.addEventListener('notificationclick', event => {
    event.notification.close();

    // Ide írd a kívánt műveleteket, amikor az értesítésre kattintanak

    // Példa: Átirányítás egy adott oldalra
    event.waitUntil(
        clients.openWindow('https://www.example.com')
    );
});
