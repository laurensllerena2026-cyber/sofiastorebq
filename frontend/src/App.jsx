import { useEffect, useState } from "react";
import { API_URL } from "./config";
import { PRODUCTOS_RESPALDO, SITE } from "./data";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Categorias from "./components/Categorias";
import Catalogo from "./components/Catalogo";
import Favoritos from "./components/Favoritos";
import Asesor from "./components/Asesor";
import Nosotros from "./components/Nosotros";
import Contacto from "./components/Contacto";
import Footer from "./components/Footer";
import Carrito from "./components/Carrito";
import Chatbot from "./components/Chatbot";
import "./components/Chatbot.css";

// Lee una lista guardada en el navegador (si no hay nada, devuelve lista vacía)
function leer(clave) {
  try {
    const v = JSON.parse(localStorage.getItem(clave));
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [productos, setProductos] = useState(PRODUCTOS_RESPALDO);
  const [categoria, setCategoria] = useState("Todos");
  const [favoritos, setFavoritos] = useState(() => leer("ss_favs").map(String));
  const [carrito, setCarrito] = useState(() => leer("ss_cart"));
  const [carritoAbierto, setCarritoAbierto] = useState(false);

  // Al abrir la página, pide los productos al servidor (MongoDB)
  useEffect(() => {
    fetch(API_URL + "/api/products")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((datos) => {
        if (Array.isArray(datos) && datos.length) {
          setProductos(datos.map((p) => ({ ...p, id: String(p._id) })));
        }
      })
      .catch(() => {}); // sin servidor: se quedan los productos de respaldo
  }, []);

  // Guarda favoritos y carrito en el navegador cada vez que cambian
  useEffect(() => {
    localStorage.setItem("ss_favs", JSON.stringify(favoritos));
  }, [favoritos]);
  useEffect(() => {
    localStorage.setItem("ss_cart", JSON.stringify(carrito));
  }, [carrito]);

  function alternarFavorito(id) {
    setFavoritos((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  }

  function agregarAlCarrito(producto) {
    setCarrito((c) => [...c, producto]);
  }

  function quitarDelCarrito(indice) {
    setCarrito((c) => c.filter((_, i) => i !== indice));
  }

  function cambiarCategoria(nombre) {
    setCategoria(nombre);
    document.getElementById("catalogo")?.scrollIntoView();
  }

  return (
    <>
      <div className="bar">{SITE.barra}</div>
      <Header
        cantidadFavoritos={favoritos.length}
        cantidadCarrito={carrito.length}
        abrirCarrito={() => setCarritoAbierto(true)}
      />
      <main>
        <Hero />
        <Categorias actual={categoria} cambiar={cambiarCategoria} />
        <Catalogo
          productos={productos}
          categoria={categoria}
          favoritos={favoritos}
          alternarFavorito={alternarFavorito}
          agregar={agregarAlCarrito}
        />
        <Favoritos
          productos={productos}
          favoritos={favoritos}
          alternarFavorito={alternarFavorito}
          agregar={agregarAlCarrito}
        />
        <div className="perks">
          <span>🚚 Envíos nacionales y seguros</span>
          <span>✅ Compra segura</span>
          <span>💳 Paga contra entrega</span>
          <span>💗 Atención personalizada</span>
        </div>
        <Asesor
          productos={productos}
          favoritos={favoritos}
          alternarFavorito={alternarFavorito}
          agregar={agregarAlCarrito}
        />
        <Nosotros />
        <Contacto />
      </main>
      <Footer />
      <Chatbot />
      <Carrito
        abierto={carritoAbierto}
        cerrar={() => setCarritoAbierto(false)}
        carrito={carrito}
        quitar={quitarDelCarrito}
      />
    </>
  );
}