import { useState, useRef, useEffect } from "react";
import "./Chatbot.css";

// En tu computador habla con tu servidor local; publicada, con el de Render
const API = location.hostname === "localhost" ? "http://localhost:3000" : "https://sofiastorebq-api.onrender.com";
const SALUDO = "¡Hola! Soy el asistente de Sofía Store 💗 Pregúntame por prendas, zapatos, bolsos, envíos o pagos.";
const SUGERENCIAS = ["¿Hacen envíos?", "¿Cómo puedo pagar?", "Quiero un look para una fiesta"];

export default function Chatbot() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([{ role: "bot", text: SALUDO }]);
  const [texto, setTexto] = useState("");
  const [cargando, setCargando] = useState(false);
  const fin = useRef(null);

  // Cada vez que llega un mensaje, baja hasta el último
  useEffect(() => {
    fin.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, abierto, cargando]);

  async function enviar(contenido) {
    const msg = contenido.trim();
    if (!msg || cargando) return;
    const nuevos = [...mensajes, { role: "user", text: msg }];
    setMensajes(nuevos);
    setTexto("");
    setCargando(true);
    try {
      const r = await fetch(`${API}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: msg,
          history: mensajes.slice(1).map(m => ({ role: m.role, text: m.text }))
        })
      });
      const d = await r.json();
      setMensajes([...nuevos, { role: "bot", text: d.reply || "Ups, inténtalo de nuevo." }]);
    } catch {
      setMensajes([...nuevos, { role: "bot", text: "No pude responder ahora. Escríbenos por WhatsApp 💗" }]);
    } finally {
      setCargando(false);
    }
  }

  return (
    <>
      <button className="chat-fab" onClick={() => setAbierto(!abierto)} aria-label={abierto ? "Cerrar el chat" : "Abrir el chat"}>
        {abierto ? "✕" : "💬"}
      </button>

      {abierto && (
        <section className="chat-box" aria-label="Chat con el asistente de Sofía Store">
          <header className="chat-head">Asistente Sofía Store ✨</header>

          <div className="chat-msgs" aria-live="polite">
            {mensajes.map((m, i) => (
              <p key={i} className={m.role === "user" ? "msg yo" : "msg bot"}>{m.text}</p>
            ))}
            {cargando && <p className="msg bot">Escribiendo…</p>}
            {mensajes.length === 1 && (
              <div className="chat-sug">
                {SUGERENCIAS.map(s => (
                  <button key={s} onClick={() => enviar(s)}>{s}</button>
                ))}
              </div>
            )}
            <div ref={fin} />
          </div>

          <form className="chat-form" onSubmit={e => { e.preventDefault(); enviar(texto); }}>
            <input
              value={texto}
              onChange={e => setTexto(e.target.value)}
              placeholder="Escribe tu pregunta…"
              maxLength={500}
              aria-label="Tu mensaje"
            />
            <button type="submit" disabled={cargando}>Enviar</button>
          </form>
        </section>
      )}
    </>
  );
}
