// Dirección del servidor (backend).
// En tu computador es localhost. Cuando la página está publicada,
// usa la dirección del servidor en Render.
const API_URL = (location.protocol === "file:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "http://localhost:3000"
  : "https://sofiastorebq-api.onrender.com";