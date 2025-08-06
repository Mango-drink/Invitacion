document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('codigo-modal');
  const input = document.getElementById('codigo-input');
  const btn = document.getElementById('codigo-btn');
  const errorMsg = document.getElementById('codigo-error');
  const mensajeContainer = document.getElementById('mensaje-personalizado');
  const nombreFamilia = document.getElementById('familia-nombre');
  const cantidadInvitados = document.getElementById('familia-cantidad');
  const mensajeFamilia = document.getElementById('familia-mensaje');
  const listaInvitados = document.getElementById('familia-invitados');
  const ciudadDiv = document.getElementById('familia-ciudad');

  // Mostrar siempre el modal al inicio
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  // Base de datos local de códigos
  const codigosInvitacion = {
    "FAMLOPEZ": {
      nombre: "Familia López",
      mensaje: "Querida familia López, me emociona profundamente contar con su presencia en este día tan especial. ¡Gracias por acompañarme!",
      invitados: ["Jorge López", "Martha González", "Andrea López", "Gabriel López"],
      ciudad: "Coacalco, Estado de México",
      mesa: 5
    },
    "FAMMARTINEZ": {
      nombre: "Familia Martínez",
      mensaje: "Su cariño ha sido parte de mi historia. Hoy es un honor celebrar con ustedes este momento inolvidable.",
      invitados: ["Luis Martínez", "Elena Ríos"],
      ciudad: "CDMX",
      mesa: 7
    },
    "FAMRAMIREZ": {
      nombre: "Familia Ramírez",
      mensaje: "Gracias por estar aquí en este capítulo tan soñado. ¡Su presencia hace mi celebración aún más especial!",
      invitados: ["Daniel Ramírez", "Lucía Torres", "Camila Ramírez"],
      mesa: 3
    }
  };

  btn.addEventListener('click', () => {
    const codigo = input.value.trim().toUpperCase();
    const datos = codigosInvitacion[codigo];

    if (datos) {
      // Mostrar nombre en caligráfico
      nombreFamilia.textContent = datos.nombre;

      // Mostrar número de invitados
      const total = datos.invitados.length;
      cantidadInvitados.textContent = `(${total} invitado${total !== 1 ? 's' : ''})`;

      // Mostrar mensaje emocional
      mensajeFamilia.textContent = datos.mensaje;

      // Lista de invitados
      listaInvitados.innerHTML = '';
      datos.invitados.forEach(nombre => {
        const li = document.createElement('li');
        li.textContent = `• ${nombre}`;
        listaInvitados.appendChild(li);
      });

      // Ciudad opcional
      if (datos.ciudad) {
        ciudadDiv.classList.remove('hidden');
        ciudadDiv.querySelector('span').textContent = datos.ciudad;
      } else {
        ciudadDiv.classList.add('hidden');
      }

      // Mostrar Mesa
      const mesaSpan = document.getElementById('familia-mesa');
      if (datos.mesa) {
        mesaSpan.innerHTML = `Mesa N.º ${datos.mesa}`;
        mesaSpan.classList.remove('hidden');
      } else {
        mesaSpan.classList.add('hidden');
      }

      // Mostrar mensaje y cerrar modal
      mensajeContainer.classList.remove('hidden');
      modal.classList.add('hidden');
      errorMsg.classList.add('hidden');
      document.body.style.overflow = 'auto';

    } else {
      errorMsg.classList.remove('hidden');
    }

  });
});
