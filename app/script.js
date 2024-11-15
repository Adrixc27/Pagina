let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Previene que el navegador muestre su propio banner de instalación
    e.preventDefault();
    deferredPrompt = e;

    // Muestra el botón de instalación
    const installButton = document.getElementById('install-button');
    installButton.style.display = 'block'; // Muestra el botón

    installButton.addEventListener('click', () => {
        // Muestra el prompt de instalación
        deferredPrompt.prompt();

        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('El usuario aceptó la instalación');
            } else {
                console.log('El usuario rechazó la instalación');
            }
            deferredPrompt = null; // Limpia el prompt
        });
    });
});

// Registra el service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
        }).catch((error) => {
            console.log('Registro de Service Worker fallido:', error);
        });
    });
}
