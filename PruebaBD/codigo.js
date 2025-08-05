// Simulación de base de datos de invitados
const invitadosDB = {
  "FAMRANGEL": {
    nombreFamilia: "Familia Rangel",
    mensaje: "Familia Rangel, nos encantaría contar con su presencia en este día tan especial.",
    invitados: ["Carlos Rangel", "Marcela Rangel"]
  },
  "FAMALBARRAN": {
    nombreFamilia: "Familia Albarrán",
    mensaje: "Querida Familia Albarrán, es un honor invitarlos a celebrar junto a Ximena sus XV Años.",
    invitados: ["Mario Albarrán", "Lupita Albarrán", "Ana Sofía Albarrán"]
  }
  // Agrega más familias aquí
};

const codigoModal = document.getElementById('codigo-modal');
const codigoInput = document.getElementById('codigo-input');
const codigoBtn = document.getElementById('codigo-btn');
const codigoError = document.getElementById('codigo-error');
const msgPersonalizado = document.getElementById('mensaje-personalizado');
const familiaNombre = document.getElementById('familia-nombre');
const familiaMensaje = document.getElementById('familia-mensaje');
const familiaInvitados = document.getElementById('familia-invitados');

function mostrarPersonalizado(data) {
  familiaNombre.textContent = data.nombreFamilia;
  familiaMensaje.textContent = data.mensaje;
  familiaInvitados.innerHTML = data.invitados.map(nombre => `<li>${nombre}</li>`).join("");
  msgPersonalizado.classList.remove('hidden');
}

function validarCodigo() {
  const code = codigoInput.value.trim().toUpperCase();
  if (invitadosDB[code]) {
    codigoModal.classList.add('hidden');
    mostrarPersonalizado(invitadosDB[code]);
  } else {
    codigoError.classList.remove('hidden');
  }
}

codigoBtn.addEventListener('click', validarCodigo);
codigoInput.addEventListener('keyup', function (e) {
  if (e.key === 'Enter') validarCodigo();
  if (!codigoError.classList.contains('hidden')) codigoError.classList.add('hidden');
});

//Bloquear/desbloquear el scroll del body
function toggleBodyScroll(disable) {
    if (disable) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Cuando el modal aparece
codigoModal.classList.remove('hidden');
toggleBodyScroll(true);

// Cuando el modal desaparece tras login
codigoModal.classList.add('hidden');
toggleBodyScroll(false);
