// serviceWorkerRegistration.js

// Register function to enable the service worker
export function register() {
    if ('serviceWorker' in navigator) {
        // Wait until the page has fully loaded
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/service-worker.js')  // Path to generated service worker in production build
                .then((registration) => {
                    console.log('Service Worker registered with scope:', registration.scope);
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        });
    }
}

// Unregister function to disable the service worker
export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then((registration) => {
            registration.unregister();
        });
    }
}
