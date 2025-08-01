document.addEventListener('DOMContentLoaded', function () {
    // Inicializa la librería Animate On Scroll (AOS)
    AOS.init({ once: true, duration: 1000 });

    // --- Funcionalidad de la Cuenta Regresiva ---
    const countdown = () => {
        // La fecha del evento (25 de Octubre de 2025, 6:00 PM - Hora de la Ciudad de México)
        const countDate = new Date("October 25, 2025 18:00:00 GMT-0600").getTime(); // GMT-0600 para la CDMX
        const now = new Date().getTime();
        const gap = countDate - now;

        const countdownEl = document.getElementById('countdown');
        if (gap < 0) {
            if (countdownEl) countdownEl.innerHTML = '<h3 class="text-3xl font-semibold">¡El gran día ha llegado!</h3>';
            clearInterval(countdownInterval); // Detener el intervalo una vez que la fecha ha pasado
            return;
        }

        // Calcula tiempo en días, horas, minutos y segundos
        const textDay = Math.floor(gap / (1000 * 60 * 60 * 24));
        const textHour = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const textMinute = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
        const textSecond = Math.floor((gap % (1000 * 60)) / 1000);

        // Actualiza los elementos HTML con el tiempo restante
        document.getElementById('days').innerText = textDay < 10 ? '0' + textDay : textDay;
        document.getElementById('hours').innerText = textHour < 10 ? '0' + textHour : textHour;
        document.getElementById('minutes').innerText = textMinute < 10 ? '0' + textMinute : textMinute;
        document.getElementById('seconds').innerText = textSecond < 10 ? '0' + textSecond : textSecond;
    };

    // Actualiza la cuenta regresiva cada segundo
    const countdownInterval = setInterval(countdown, 1000);
    // Llama a la función una vez al cargar para evitar un retraso inicial
    countdown();

    // --- Funcionalidad General de Modales (para ambos modales) ---
    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            // Agrega una pequeña demora para que la animación CSS se active
            setTimeout(() => {
                modal.style.opacity = '1';
                modal.style.visibility = 'visible';
            }, 10);
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.opacity = '0';
            modal.style.visibility = 'hidden';
            // Espera a que la transición termine antes de añadir 'hidden'
            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300); // Coincide con la duración de la transición en CSS
        }
    }

    // --- Modal de Vestimenta ---
    const dressCodeBtn = document.getElementById('dress-code-btn');
    if (dressCodeBtn) {
        dressCodeBtn.addEventListener('click', () => {
            openModal('dress-code-modal');
        });
    }

    // Asegurarse de que los botones de cerrar modales funcionen
    document.querySelectorAll('.modal-container').forEach(modalElement => {
        modalElement.addEventListener('click', (event) => {
            if (event.target === modalElement) { // Cierra si se hace clic fuera del contenido
                closeModal(modalElement.id);
            }
        });
    });


    // --- Control de la Música de Fondo ---
    const music = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    let isPlaying = false;

    if (musicToggle && playIcon && pauseIcon) {
        musicToggle.addEventListener('click', () => {
            isPlaying = !isPlaying;
            if (isPlaying) {
                music.play().catch(e => console.error("Error al reproducir audio:", e)); // Añadir catch para evitar errores de Promise
                playIcon.classList.add('hidden');
                pauseIcon.classList.remove('hidden');
            } else {
                music.pause();
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
            }
        });
    }

    // --- Generación de Enlaces de Calendario ---
    function generateCalendarLinks() {
        // La zona horaria es crucial para los eventos de calendario
        const timeZone = 'America/Mexico_City'; // Considera la zona horaria de México

        // Google Calendar - Ceremonia
        const gcalCeremonia = new URL('https://www.google.com/calendar/render');
        gcalCeremonia.searchParams.append('action', 'TEMPLATE');
        gcalCeremonia.searchParams.append('text', 'XV Años de Ximena - Ceremonia');
        gcalCeremonia.searchParams.append('dates', `20251025T180000/20251025T190000`); // YYYYMMDDTHHMMSS
        gcalCeremonia.searchParams.append('details', 'Ceremonia religiosa por los XV Años de Ximena.');
        gcalCeremonia.searchParams.append('location', 'Parroquia de San Francisco de Asís, Miguel Hidalgo Mz 031, Coacalco, Méx.');
        const gcalCeremoniaLink = document.getElementById('gcal-ceremonia-map'); // Se enlaza al botón "Ver en Mapa" de ceremonia
        if (gcalCeremoniaLink) gcalCeremoniaLink.href = gcalCeremonia.href;


        // Google Calendar - Recepción
        const gcalRecepcion = new URL('https://www.google.com/calendar/render');
        gcalRecepcion.searchParams.append('action', 'TEMPLATE');
        gcalRecepcion.searchParams.append('text', 'XV Años de Ximena - Recepción');
        gcalRecepcion.searchParams.append('dates', `20251025T193000/20251026T020000`); // Noche del 25 al 26
        gcalRecepcion.searchParams.append('details', 'Fiesta de celebración por los XV Años de Ximena.');
        gcalRecepcion.searchParams.append('location', 'Salón "Fiesta Colonial", C. Cenzontles 66, Parque Residencial Coacalco, Mex.');
        const gcalRecepcionLink = document.getElementById('gcal-recepcion');
        if (gcalRecepcionLink) gcalRecepcionLink.href = gcalRecepcion.href;

        // iCal/Outlook - Recepción
        const icsRecepcion = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:${document.location.href}\nDTSTART;TZID=America/Mexico_City:20251025T193000\nDTEND;TZID=America/Mexico_City:20251026T020000\nSUMMARY:XV Años de Ximena - Recepción\nDESCRIPTION:Fiesta de celebración por los XV Años de Ximena.\nLOCATION:Salón "Fiesta Colonial", C. Cenzontles 66, Parque Residencial Coacalco, Mex.\nEND:VEVENT\nEND:VCALENDAR`;
        document.getElementById('ical-recepcion').href = `data:text/calendar;charset=utf8,${encodeURIComponent(icsRecepcion)}`;
        document.getElementById('ical-recepcion').download = 'recepcion-xv-Ximena.ics';

        // iCal/Outlook - Ceremonia
        const icsCeremonia = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:${document.location.href}\nDTSTART;TZID=America/Mexico_City:20251025T180000\nDTEND;TZID=America/Mexico_City:20251025T190000\nSUMMARY:XV Años de Ximena - Ceremonia\nDESCRIPTION:Ceremonia religiosa por los XV Años de Ximena.\nLOCATION:Parroquia de San Francisco de Asís Coacalco - Miguel Hidalgo Manzana 031, Coacalco de Berriozabal, Méx.\nEND:VEVENT\nEND:VCALENDAR`;
        document.getElementById('ical-ceremonia').href = `data:text/calendar;charset=utf8,${encodeURIComponent(icsCeremonia)}`;
        document.getElementById('ical-ceremonia').download = 'ceremonia-xv-Ximena.ics';

    }


    // Llama a la función para que los enlaces se generen al cargar la página
    generateCalendarLinks();


    // --- Script para la funcionalidad del carrusel y el modal de la galería ---
    const galleryContainer = document.getElementById('gallery-container');
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModalButton = document.getElementById('modal-close');
    let isScrolling = true;
    let animationFrameId;

    if (galleryContainer && modal && modalImage && closeModalButton) {
        // --- Duplicar contenido para bucle infinito ---
        const originalItems = Array.from(galleryContainer.children);
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            galleryContainer.appendChild(clone);
        });

        // --- Funcionalidad de Movimiento Continuo ---
        const continuousScroll = () => {
            if (isScrolling) {
                galleryContainer.scrollLeft += 1; // Ajusta este valor para cambiar la velocidad

                // Si el scroll llega a la mitad (al final del contenido original), se resetea al inicio
                if (galleryContainer.scrollLeft >= galleryContainer.scrollWidth / 2) {
                    galleryContainer.scrollLeft = 0;
                }
            }
            animationFrameId = requestAnimationFrame(continuousScroll);
        };

        const startAutoScroll = () => { isScrolling = true; };
        const stopAutoScroll = () => { isScrolling = false; };

        // Pausar al pasar el mouse por encima, reanudar al quitarlo
        galleryContainer.addEventListener('mouseenter', stopAutoScroll);
        galleryContainer.addEventListener('mouseleave', startAutoScroll);

        // --- Funcionalidad del Modal de Galería ---
        // Delegación de eventos para manejar clics en las imágenes
        galleryContainer.addEventListener('click', (event) => {
            const thumb = event.target.closest('.gallery-thumb');
            if (thumb) {
                const imgSrc = thumb.querySelector('img').src;
                openGalleryModal(imgSrc);
            }
        });

        function openGalleryModal(src) {
            stopAutoScroll(); // Pausar el carrusel al abrir una foto
            modalImage.src = src;
            openModal('gallery-modal');
        }

        // Cierra el modal de la galería
        closeModalButton.addEventListener('click', () => {
            closeModal('gallery-modal');
            startAutoScroll(); // Reanudar el carrusel al cerrar la foto
        });

        // Cierra el modal al hacer clic fuera de la imagen (en el overlay)
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal('gallery-modal');
                startAutoScroll();
            }
        });

        // Inicia el desplazamiento automático al cargar la página
        startAutoScroll();
        continuousScroll(); // Iniciar la animación
    } else {
        console.error("No se encontraron todos los elementos necesarios para la galería o el modal.");
    }



    // BASE DE DATOS LOCAL SIMULADA
    const invitados = {
        "FAMGARCIA": {
            nombres: ["Juan García", "María Torres", "Lucía García"],
            cantidad: 3,
            mensaje: "¡Qué emoción contar con ustedes en este día tan especial!"
        },
        "FAMPEREZ": {
            nombres: ["Luis Pérez", "Andrea Mendoza"],
            cantidad: 2,
            mensaje: "Gracias por ser parte de este momento inolvidable."
        },
        "FAMLOPEZ": {
            nombres: ["Carlos López"],
            cantidad: 1,
            mensaje: "Nos alegra mucho que puedas acompañarnos."
        }
    };

    // Función que verifica el código y muestra la invitación
    function verificarCodigo() {
        const input = document.getElementById("code-input").value.trim().toUpperCase();
        const datos = invitados[input];

        if (datos) {
            // Oculta pantalla de acceso
            document.getElementById("access-screen").classList.add("hidden");

            // Muestra la invitación con datos personalizados
            document.getElementById("invitacion").classList.remove("hidden");
            document.getElementById("nombres").innerText = datos.nombres.join(", ");
            document.getElementById("cantidad").innerText = datos.cantidad;
            document.getElementById("mensaje").innerText = datos.mensaje;
        } else {
            alert("Código Familiar no válido. Intenta de nuevo.");
        }
    }

});