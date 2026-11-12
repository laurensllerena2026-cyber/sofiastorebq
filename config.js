// Dirección del servidor (backend).
// En tu computador es localhost. Cuando publiquemos el servidor en internet,
// pega su dirección en la línea de abajo (reemplaza el texto entre comillas).
const API_URL = (location.protocol === "file:" || location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "http://localhost:3000"
  : "https://PEGA-AQUI-LA-URL-DE-TU-SERVIDOR";
