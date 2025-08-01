// Base de datos local simulada
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
