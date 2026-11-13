import { useState } from "react";
import { asset } from "../config";

// Barra superior: logo, menú, favoritos, administrador y carrito
export default function Header({ cantidadFavoritos, cantidadCarrito, abrirCarrito }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="top">
      <a className="logo" href="#inicio">
        <img src={asset("img/logo.png")} alt="" onError={(e) => e.currentTarget.remove()} />
        Sofía<b>Store</b>
      </a>

      <button
        className="burger"
        aria-label="Abrir menú"
        aria-expanded={menuAbierto}
        onClick={() => setMenuAbierto(!menuAbierto)}
      >
        Menú
      </button>

      <nav className={menuAbierto ? "open" : ""} onClick={() => setMenuAbierto(false)}>
        <a className="on" href="#inicio">Inicio</a>
        <a href="#catalogo">Tienda</a>
        <a href="#estilista">Asesor de estilo</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#contacto">Contacto</a>
      </nav>

      <div className="icons">
        <a href="#favoritos" id="favLink" aria-label="Ver mis favoritos">
          ♡<span id="favCount">{cantidadFavoritos}</span>
        </a>
        <a href={asset("admin.html")} aria-label="Administrador">👤</a>
        <button id="cartBtn" aria-label="Abrir carrito" onClick={abrirCarrito}>
          🛍️<span id="cartCount">{cantidadCarrito}</span>
        </button>
      </div>
    </header>
  );
}