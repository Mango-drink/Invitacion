document.addEventListener('DOMContentLoaded', () => {
  // --- INICIALIZACIONES DE LIBRERÍAS ---
  AOS.init({ duration: 800, once: false, offset: 50 });

  // --- CUENTA REGRESIVA ---
  function iniciarCuentaRegresiva() {
    const countdownDate = new Date("Oct 25, 2025 18:00:00").getTime();
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;
    const dias = document.getElementById('days');
    const horas = document.getElementById('hours');
    const minutos = document.getElementById('minutes');
    const segundos = document.getElementById('seconds');

    function actualizar() {
      const now = Date.now();
      const distance = countdownDate - now;
      if (distance < 0) {
        clearInterval(interval);
        countdownElement.innerHTML = '<div class="text-2xl font-semibold">¡El gran día ha llegado!</div>';
        return;
      }
      dias.textContent = String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0');
      horas.textContent = String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
      minutos.textContent = String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      segundos.textContent = String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0');
    }
    actualizar();
    const interval = setInterval(actualizar, 1000);
  }

  // --- MODAL VESTIMENTA ---
  function configurarModalVestimenta() {
    const btn = document.getElementById('dress-code-btn');
    if (btn) btn.addEventListener('click', () => openModal('dress-code-modal'));
  }

  // --- GALERÍA DE RECUERDOS (CARRUSEL + MODAL) ---
  function configurarGaleria() {
    const galleryContainer = document.getElementById('gallery-container');
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModalButton = document.getElementById('modal-close');
    if (!(galleryContainer && modal && modalImage && closeModalButton)) return;
    // Duplicar para scroll infinito
    Array.from(galleryContainer.children).forEach(item => {
      galleryContainer.appendChild(item.cloneNode(true));
    });

    let isScrolling = true;
    function continuousScroll() {
      if (isScrolling) {
        galleryContainer.scrollLeft += 1;
        if (galleryContainer.scrollLeft >= galleryContainer.scrollWidth / 2) {
          galleryContainer.scrollLeft = 0;
        }
      }
      requestAnimationFrame(continuousScroll);
    }
    galleryContainer.addEventListener('mouseenter', () => { isScrolling = false; });
    galleryContainer.addEventListener('mouseleave', () => { isScrolling = true; });
    galleryContainer.addEventListener('click', (event) => {
      const thumb = event.target.closest('.gallery-thumb');
      if (thumb) {
        modalImage.src = thumb.querySelector('img').src;
        openModal('gallery-modal');
        isScrolling = false;
      }
    });
    closeModalButton.addEventListener('click', () => {
      closeModal('gallery-modal');
      modalImage.src = "";
      isScrolling = true;
    });
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        closeModal('gallery-modal');
        modalImage.src = "";
        isScrolling = true;
      }
    });
    isScrolling = true;
    continuousScroll();
  }

  // --- MÚSICA DE FONDO ---
  function configurarMusica() {
    const musicToggle = document.getElementById('music-toggle');
    const bgMusic = document.getElementById('bg-music');
    const playIcon = document.getElementById('play-icon');
    const pauseIcon = document.getElementById('pause-icon');
    if (!(musicToggle && bgMusic && playIcon && pauseIcon)) return;
    let musicStarted = false;
    function tryPlayMusic() {
      if (!musicStarted) {
        bgMusic.play().then(() => {
          playIcon.classList.add('hidden');
          pauseIcon.classList.remove('hidden');
          musicStarted = true;
        }).catch(() => { });
      }
    }
    ['click', 'touchstart', 'keydown', 'scroll'].forEach(evt => {
      window.addEventListener(evt, tryPlayMusic, { once: true });
    });
    musicToggle.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.play();
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
      } else {
        bgMusic.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
      }
    });
  }

  // --- ENLACES DE CALENDARIO ---
  function agregarEnlacesCalendario() {
    function formatDateICS(dateStr) {
      // Devuelve YYYYMMDDTHHMMSS (hora local, sin Z)
      const d = new Date(dateStr);
      return (
        d.getFullYear().toString() +
        String(d.getMonth() + 1).padStart(2, "0") +
        String(d.getDate()).padStart(2, "0") +
        "T" +
        String(d.getHours()).padStart(2, "0") +
        String(d.getMinutes()).padStart(2, "0") +
        "00"
      );
    }
    function generateCalendarLinks(id, title, desc, loc, startISO, endISO) {
      const start = formatDateICS(startISO);
      const end = formatDateICS(endISO);
      const gcalUrl = new URL('https://www.google.com/calendar/render');
      gcalUrl.searchParams.append('action', 'TEMPLATE');
      gcalUrl.searchParams.append('text', title);
      gcalUrl.searchParams.append('dates', `${start}/${end}`);
      gcalUrl.searchParams.append('details', desc);
      gcalUrl.searchParams.append('location', loc);
      document.getElementById(`gcal-${id}`).href = gcalUrl.toString();
      const ical = [
        'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
        `URL:${document.location.href}`,
        `DTSTART:${start}`, `DTEND:${end}`,
        `SUMMARY:${title}`, `DESCRIPTION:${desc}`, `LOCATION:${loc}`,
        'END:VEVENT', 'END:VCALENDAR'
      ].join('\n');
      document.getElementById(`ical-${id}`).href = `data:text/calendar;charset=utf8,${encodeURIComponent(ical)}`;
      document.getElementById(`ical-${id}`).download = `${id}.ics`;
    }
    generateCalendarLinks(
      'ceremonia',
      'XV Años de Ximena - Ceremonia',
      'Ceremonia religiosa por los XV Años de Ximena. ¡Acompáñanos!',
      'Parroquia de San Francisco de Asís, Miguel Hidalgo Manzana 031, Coacalco de Berriozabal, Méx.',
      '2025-10-25T18:00:00',
      '2025-10-25T19:00:00'
    );
    generateCalendarLinks(
      'recepcion',
      'XV Años de Ximena - Recepción',
      '¡A celebrar en la fiesta de XV Años de Ximena!',
      'Salón "Fiesta Colonial", C. Cenzontles 66, Parque Residencial Coacalco, Mex.',
      '2025-10-25T19:30:00',
      '2025-10-26T03:00:00'
    );
  }



  // --- MODALES GENERALES ---
  window.openModal = function (id) {
    document.getElementById(id).classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };
  window.closeModal = function (id) {
    document.getElementById(id).classList.add('hidden');
    document.body.style.overflow = 'auto';
  };

  // --- MODAL DE CÓDIGO PERSONALIZADO ---
  function configurarAccesoCodigo() {
    const modal = document.getElementById('codigo-modal');
    const input = document.getElementById('codigo-input');
    const btn = document.getElementById('codigo-btn');
    const errorMsg = document.getElementById('codigo-error');
    const mensajeContainer = document.getElementById('mensaje-personalizado');
    const nombreFamilia = document.getElementById('familia-nombre');
    const cantidadInvitados = document.getElementById('familia-cantidad');
    const mensajeFamilia = document.getElementById('familia-mensaje');
    // ... agrega si quieres los de mesa, ciudad, lista de invitados, etc.

    // Ejemplo "base de datos" local
    const codigosInvitacion = {
      "FAMLOPEZ": {
        nombre: "Familia López",
        mensaje: "Querida familia López, me emociona profundamente contar con su presencia en este día tan especial. ¡Gracias por acompañarme!",
        invitados: ["Jorge López", "Martha González", "Andrea López", "Gabriel López"],
        ciudad: "Coacalco, Estado de México",
        mesa: 5
      },
      // ... más familias ...
    };

    // Mostrar el modal siempre al inicio
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Función que muestra los datos de la familia
    function mostrarDatosFamilia(datos) {
      nombreFamilia.textContent = datos.nombre;
      cantidadInvitados.textContent = `${datos.invitados.length} invitado${datos.invitados.length !== 1 ? 's' : ''}`;
      mensajeFamilia.textContent = datos.mensaje;
      // ... aquí puedes agregar los demás campos si quieres
      mensajeContainer.classList.remove('hidden');
      modal.classList.add('hidden');
      errorMsg.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }

    // Verificar código
    function verificarCodigo() {
      const codigo = input.value.trim().toUpperCase();
      const datos = codigosInvitacion[codigo];
      if (datos) {
        mostrarDatosFamilia(datos);
      } else {
        errorMsg.classList.remove('hidden');
      }
    }
    btn.addEventListener('click', verificarCodigo);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') verificarCodigo();
    });
  }

  // --- LLAMADA A TODAS LAS FUNCIONES ---
  iniciarCuentaRegresiva();
  configurarModalVestimenta();
  configurarGaleria();
  configurarMusica();
  agregarEnlacesCalendario();
  configurarAccesoCodigo();
});
