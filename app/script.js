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

function organizarNumeros() {
    // Obtener los números del input
    let input = document.getElementById("numeros").value;
    let numeros = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));

    // Verificar que haya números válidos
    if (numeros.length === 0) {
        alert("Por favor ingresa números válidos.");
        return;
    }

    // Obtener la opción de orden
    let orden = document.getElementById("orden").value;

    // Ordenar los números
    if (orden === 'asc') {
        numeros.sort((a, b) => a - b); // Ordenar de menor a mayor
    } else {
        numeros.sort((a, b) => b - a); // Ordenar de mayor a menor
    }

    // Funciones para calcular moda, media y mediana
    let moda = calcularModa(numeros);
    let media = calcularMedia(numeros);
    let mediana = calcularMediana(numeros);

    // Mostrar resultados
    document.getElementById("resultado").innerHTML = `
        Números ordenados: ${numeros.join(', ')}<br>
        Moda: ${moda}<br>
        Media: ${media}<br>
        Mediana: ${mediana}
    `;
}

// Función para calcular la moda
function calcularModa(arr) {
    const frecuencia = {};
    let maxFrecuencia = 0;
    let moda = [];
    for (let num of arr) {
        frecuencia[num] = (frecuencia[num] || 0) + 1;
        if (frecuencia[num] > maxFrecuencia) {
            maxFrecuencia = frecuencia[num];
            moda = [num];
        } else if (frecuencia[num] === maxFrecuencia) {
            moda.push(num);
        }
    }
    return moda.length === arr.length ? "No hay moda única" : moda.join(', ');
}

// Función para calcular la media
function calcularMedia(arr) {
    let suma = arr.reduce((acc, num) => acc + num, 0);
    return (suma / arr.length).toFixed(2);
}

// Función para calcular la mediana
function calcularMediana(arr) {
    arr.sort((a, b) => a - b);
    const mitad = Math.floor(arr.length / 2);
    if (arr.length % 2 === 0) {
        return ((arr[mitad - 1] + arr[mitad]) / 2).toFixed(2);
    } else {
        return arr[mitad];
    }
}
