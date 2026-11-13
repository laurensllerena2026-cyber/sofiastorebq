import { useState } from "react";
import { asset } from "../config";
import { money } from "../data";

// Tarjeta de un producto: foto, corazón de favorito, nombre, precio y botón de carrito
export default function ProductCard({ producto, esFavorito, alternarFavorito, agregar }) {
  const [sinFoto, setSinFoto] = useState(false);
  const [anadido, setAnadido] = useState(false);

  function agregarYAvisar() {
    agregar(producto);
    setAnadido(true);
    setTimeout(() => setAnadido(false), 1200);
  }

  return (
    <article className="card">
      <div className="ph" data-i={producto.name[0]}>
        {!sinFoto && (
          <img
            src={asset(producto.img)}
            alt={producto.name}
            loading="lazy"
            onError={() => setSinFoto(true)}
          />
        )}
        <button
          className={"fav" + (esFavorito ? " on" : "")}
          aria-label="Me gusta"
          onClick={() => alternarFavorito(producto.id)}
        >
          {esFavorito ? "♥" : "♡"}
        </button>
      </div>
      <div className="info">
        <h3>{producto.name}</h3>
        <strong>{money(producto.price)}</strong>
        <button className="btn small" onClick={agregarYAvisar}>
          {anadido ? "¡Añadido!" : "Añadir al carrito"}
        </button>
      </div>
    </article>
  );
}