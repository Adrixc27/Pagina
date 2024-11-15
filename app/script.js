let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Previene que el navegador muestre su propio banner de instalación
    e.preventDefault();
    deferredPrompt = e;

    // Muestra el botón de instalación
    const installButton = document.getElementById('install-button');
    installButton.style.display = 'block'; // Muestra el botón

    installButton.addEventListener('click', () => {
        // Si deferredPrompt no es nulo, muestra el prompt de instalación
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Muestra el diálogo de instalación

            // Responde a la acción del usuario
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('El usuario aceptó la instalación');
                } else {
                    console.log('El usuario rechazó la instalación');
                }
                deferredPrompt = null; // Limpia el prompt después de que el usuario haga su elección
            });
        }
    });
});

// Registra el Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js').then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
        }).catch((error) => {
            console.log('Registro de Service Worker fallido:', error);
        });
    });
}
