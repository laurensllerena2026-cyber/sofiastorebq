# Sofía Store 💗

Tienda online de ropa, zapatos y bolsos de Barranquilla (Instagram: @sofiastore_bq). Proyecto final de **Jóvenes Creativos, Ruta básica: "Mi emprendimiento digital"**.

- Página publicada: https://laurensllerena2026-cyber.github.io/sofiastorebq/
- API (backend): https://sofiastorebq-api.onrender.com

> Nota: el servidor gratuito de Render se duerme cuando no se usa. La primera carga puede tardar cerca de un minuto.

## ¿Qué incluye?

- Landing page con categorías y sección "Nosotros".
- Catálogo de productos con favoritos y carrito.
- Asesor de estilo.
- Formulario de contacto real: los mensajes se guardan en la base de datos.
- Panel de administración con login: ver mensajes y gestionar productos.
- Chatbot con IA (Gemini): responde sobre prendas, zapatos, bolsos, envíos y pagos usando el catálogo real.
- Diseño responsive (se adapta a celular y computador).

## Tecnologías

- **Frontend:** React con Vite.
- **Panel admin:** HTML y JavaScript.
- **Backend:** Node.js, Express y Mongoose.
- **Base de datos:** MongoDB Atlas.
- **Seguridad:** JWT para el login y bcrypt para cifrar contraseñas.
- **IA:** API de Gemini (Google).
- **Publicación:** GitHub Pages con GitHub Actions (frontend) y Render (backend).

## Estructura del proyecto

- `frontend/`: la tienda en React y el panel admin (`public/`).
- `backend/`: el servidor, los modelos, el chatbot y los scripts de datos.
- `.github/workflows/deploy.yml`: publica la página automáticamente con cada push a `main`.

## Cómo correrlo en tu computador

1. Backend: entra a la carpeta `backend`, ejecuta `npm install` y luego `node server.js`.
2. Frontend: entra a la carpeta `frontend`, ejecuta `npm install` y luego `npm run dev`.
3. Abre http://localhost:5173/sofiastorebq/

El backend necesita un archivo `.env` (no se sube a GitHub por seguridad) con la conexión a MongoDB, el secreto del JWT y la clave de Gemini.

## Cómo funciona la publicación

Cada vez que se hace `git push` a la rama `main`, GitHub Actions construye el frontend y lo publica en GitHub Pages automáticamente.