document.addEventListener("DOMContentLoaded", () => {
    const menu = document.querySelector('.hamburguesa');
    const navegacion = document.querySelector('.navegacion');
    const imagenes = document.querySelectorAll('img[data-src]');
    const btnTodos = document.querySelector('.todos');
    const btnEnsaladas = document.querySelector('.ensaladas');
    const btnPastas = document.querySelector('.pasta');
    const btnPizzas = document.querySelector('.pizza');
    const btnPostres = document.querySelector('.postres');
    const contenedorPlatillos = document.querySelector('.platillos');

    // Función para cerrar el menú
    const btnClose = () => {
        const closeItem = document.createElement('p');
        const overlay = document.createElement('div');
        overlay.classList.add('pantalla-completa');
        const body = document.body;

        if (document.querySelectorAll('.pantalla-completa').length > 0) return;

        body.appendChild(overlay);
        closeItem.textContent = 'x';
        closeItem.classList.add('btn-cerrar');

        navegacion.appendChild(closeItem);
        closeMenu(closeItem, overlay);
    }

    // Evento para abrir el menú
    menu.addEventListener('click', () => {
        navegacion.classList.remove('ocultar');
        btnClose();
    });

    // Función para cerrar el menú
    const closeMenu = (boton, overlay) => {
        const closeAction = () => {
            navegacion.classList.add('ocultar');
            overlay.remove();
            boton.remove();
        }

        boton.addEventListener('click', closeAction);
        overlay.addEventListener('click', closeAction);
    }

    // IntersectionObserver para cargar imágenes
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
        });
    });

    imagenes.forEach(img => observer.observe(img));

    // Función para manejar los platillos
    const platillos = () => {
        const platillosElementos = document.querySelectorAll('.platillo');
        const platillosArreglo = Array.from(platillosElementos);

        const ensaladas = platillosArreglo.filter(platillo => platillo.dataset.platillo === 'ensalada');
        const pastas = platillosArreglo.filter(platillo => platillo.dataset.platillo === 'pasta');
        const pizzas = platillosArreglo.filter(platillo => platillo.dataset.platillo === 'pizza');
        const postres = platillosArreglo.filter(platillo => platillo.dataset.platillo === 'postre');

        mostrarPlatillos(ensaladas, pastas, pizzas, postres, platillosArreglo);
    }

    // Función para mostrar platillos según el botón presionado
    const mostrarPlatillos = (ensaladas, pastas, pizzas, postres, todos) => {
        const btnHandlers = [
            { btn: btnEnsaladas, items: ensaladas },
            { btn: btnPastas, items: pastas },
            { btn: btnPizzas, items: pizzas },
            { btn: btnPostres, items: postres },
            { btn: btnTodos, items: todos }
        ];

        btnHandlers.forEach(handler => {
            handler.btn.addEventListener('click', () => {
                limpiarHtml(contenedorPlatillos);
                handler.items.forEach(item => contenedorPlatillos.appendChild(item));
            });
        });
    }

    // Función para limpiar el contenido HTML
    const limpiarHtml = (contenedor) => {
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild);
        }
    }

    // Inicializa la lógica de filtrado de platillos
    platillos();
});
