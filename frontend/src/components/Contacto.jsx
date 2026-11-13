import { useState } from "react";
import { API_URL, WHATSAPP } from "../config";

// Formulario de contacto: el mensaje se guarda en MongoDB a través del servidor
export default function Contacto() {
  const [nombre, setNombre] = useState("");
  const [contacto, setContacto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState("");

  async function enviar(e) {
    e.preventDefault();
    const datos = { name: nombre.trim(), contact: contacto.trim(), msg: mensaje.trim() };
    if (datos.name.length < 2 || !datos.contact || datos.msg.length < 5) {
      setEstado("Completa nombre, contacto y un mensaje de al menos 5 letras.");
      return;
    }
    setEstado("Enviando...");
    try {
      const r = await fetch(API_URL + "/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      if (!r.ok) throw new Error();
      setEstado("¡Mensaje enviado! Te respondemos pronto.");
      setNombre("");
      setContacto("");
      setMensaje("");
    } catch {
      setEstado("No pudimos enviar el mensaje ahora. Escríbenos por WhatsApp.");
    }
  }

  const enlaceWhatsApp =
    `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=` +
    encodeURIComponent("Hola Sofía Store, quiero información");

  return (
    <section id="contacto" className="sec">
      <h2 className="ttl">Escríbenos</h2>
      <form className="stack" noValidate onSubmit={enviar}>
        <label>
          Nombre
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} autoComplete="name" required />
        </label>
        <label>
          Correo o WhatsApp
          <input value={contacto} onChange={(e) => setContacto(e.target.value)} autoComplete="email" required />
        </label>
        <label>
          Mensaje
          <textarea rows="4" value={mensaje} onChange={(e) => setMensaje(e.target.value)} required />
        </label>
        <button className="btn" type="submit">Enviar mensaje</button>
        <p role="status">{estado}</p>
      </form>
      <a className="btn ghost" href={enlaceWhatsApp} target="_blank" rel="noopener noreferrer">
        Escribir por WhatsApp
      </a>
    </section>
  );
}