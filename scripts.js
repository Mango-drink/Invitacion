// Inicializa la librería Animate On Scroll (AOS)
AOS.init({ once: true, duration: 1000 });

// Función para la cuenta regresiva
const countdown = () => {
    const countDate = new Date("October 25, 2025 18:00:00").getTime();
    const now = new Date().getTime();
    const gap = countDate - now;

    if (gap < 0) {
        document.getElementById('countdown').innerHTML = '<h3 class="text-3xl font-semibold">¡El gran día ha llegado!</h3>';
        return;
    }

    const textDay = Math.floor(gap / (1000 * 60 * 60 * 24));
    const textHour = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const textMinute = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const textSecond = Math.floor((gap % (1000 * 60)) / 1000);

    document.getElementById('days').innerText = textDay < 10 ? '0' + textDay : textDay;
    document.getElementById('hours').innerText = textHour < 10 ? '0' + textHour : textHour;
    document.getElementById('minutes').innerText = textMinute < 10 ? '0' + textMinute : textMinute;
    document.getElementById('seconds').innerText = textSecond < 10 ? '0' + textSecond : textSecond;
};
setInterval(countdown, 1000);

// Funcionalidad para el modal de la galería de fotos
const modal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-img');

function openModal(src) {
    modal.classList.remove('hidden');
    modalImg.src = src;
}

function closeModal() {
    modal.classList.add('hidden');
}

// Control de la música de fondo
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const playIcon = document.getElementById('play-icon');
const pauseIcon = document.getElementById('pause-icon');
let isPlaying = false;

musicToggle.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
        music.play();
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
    } else {
        music.pause();
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
    }
});

// Generación de enlaces para calendarios
function generateCalendarLinks() {
    // Google Calendar - Ceremonia
    const gcalCeremonia = new URL('https://www.google.com/calendar/render');
    gcalCeremonia.searchParams.append('action', 'TEMPLATE');
    gcalCeremonia.searchParams.append('text', 'XV Años de Ximena - Ceremonia');
    gcalCeremonia.searchParams.append('dates', `20251025T180000/20251025T190000`);
    gcalCeremonia.searchParams.append('details', 'Ceremonia religiosa por los XV Años de Ximena.');
    gcalCeremonia.searchParams.append('location', 'Parroquia de San Francisco de Asís Coacalco - Miguel Hidalgo Manzana 031, Coacalco de Berriozabal, Méx.');
    document.getElementById('gcal-ceremonia').href = gcalCeremonia.href;

    // Google Calendar - Recepción
    const gcalRecepcion = new URL('https://www.google.com/calendar/render');
    gcalRecepcion.searchParams.append('action', 'TEMPLATE');
    gcalRecepcion.searchParams.append('text', 'XV Años de Ximena - Recepción');
    gcalRecepcion.searchParams.append('dates', `20251025T193000/20251026T020000`);
    gcalRecepcion.searchParams.append('details', 'Fiesta de celebración por los XV Años de Ximena.');
    gcalRecepcion.searchParams.append('location', 'Salón "Fiesta Colonial", C. Cenzontles 66, Parque Residencial Coacalco, Mex.');
    document.getElementById('gcal-recepcion').href = gcalRecepcion.href;

    // iCal/Outlook - Ceremonia
    const icsCeremonia = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:${document.location.href}\nDTSTART;TZID=America/Mexico_City:20251025T180000\nDTEND;TZID=America/Mexico_City:20251025T190000\nSUMMARY:XV Años de Ximena - Ceremonia\nDESCRIPTION:Ceremonia religiosa por los XV Años de Ximena.\nLOCATION:Parroquia de San Francisco de Asís Coacalco - Miguel Hidalgo Manzana 031, Coacalco de Berriozabal, Méx.\nEND:VEVENT\nEND:VCALENDAR`;
    document.getElementById('ical-ceremonia').href = `data:text/calendar;charset=utf8,${encodeURIComponent(icsCeremonia)}`;
    document.getElementById('ical-ceremonia').download = 'ceremonia-xv-Ximena.ics';

    // iCal/Outlook - Recepción
    const icsRecepcion = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nURL:${document.location.href}\nDTSTART;TZID=America/Mexico_City:20251025T193000\nDTEND;TZID=America/Mexico_City:20251026T020000\nSUMMARY:XV Años de Ximena - Recepción\nDESCRIPTION:Fiesta de celebración por los XV Años de Ximena.\nLOCATION:Salón "Fiesta Colonial", C. Cenzontles 66, Parque Residencial Coacalco, Mex.\nEND:VEVENT\nEND:VCALENDAR`;
    document.getElementById('ical-recepcion').href = `data:text/calendar;charset=utf8,${encodeURIComponent(icsRecepcion)}`;
    document.getElementById('ical-recepcion').download = 'recepcion-xv-Ximena.ics';
}

// Llama a la función para que los enlaces se generen al cargar la página
generateCalendarLinks();