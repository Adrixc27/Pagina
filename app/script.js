if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("Pagina/app/sw.js").then((registration) => {
            console.log("Service Worker registrado con éxito:", registration);
        }).catch((error) => {
            console.log("Registro de Service Worker fallido:", error);
        });
    });
}
