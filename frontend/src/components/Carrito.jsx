import { useEffect, useRef } from "react";
import { WHATSAPP } from "../config";
import { money } from "../data";

// Ventana del carrito: lista lo elegido y arma el pedido por WhatsApp
export default function Carrito({ abierto, cerrar, carrito, quitar }) {
  const ventana = useRef(null);

  // Abre o cierra la ventana cuando cambia "abierto"
  useEffect(() => {
    const d = ventana.current;
    if (abierto && !d.open) d.showModal();
    if (!abierto && d.open) d.close();
  }, [abierto]);

  const total = carrito.reduce((suma, p) => suma + p.price, 0);
  const texto =
    "Hola Sofía Store ✨\nQuiero hacer este pedido 🛍️:\n\n" +
    carrito.map((p) => "💗 " + p.name + " - " + money(p.price)).join("\n") +
    "\n\nTotal: " + money(total) +
    " 💳\n¿Me confirman disponibilidad y envío? 🚚 ¡Gracias! 🙏";
  const enlace = `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent(texto)}`;

  return (
    <dialog ref={ventana} onClose={cerrar}>
      <h3>Tu carrito</h3>
      <div>
        {carrito.length === 0 && <p>Tu carrito está vacío. Añade prendas del catálogo.</p>}
        {carrito.map((p, i) => (
          <div className="note" key={i}>
            <span>{p.name} · {money(p.price)}</span>
            <button className="btn small ghost" onClick={() => quitar(i)}>Quitar</button>
          </div>
        ))}
      </div>
      {carrito.length > 0 && <p>Total: {money(total)}</p>}
      {carrito.length > 0 && (
        <a className="btn" href={enlace} target="_blank" rel="noopener noreferrer">
          Pedir por WhatsApp
        </a>
      )}
      <button className="btn ghost" onClick={cerrar}>Cerrar</button>
    </dialog>
  );
}