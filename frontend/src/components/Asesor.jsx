import { useState } from "react";
import ProductCard from "./ProductCard";

// Cada opción de "¿Qué buscas?" corresponde a una categoría de los productos
const TIPOS = { prenda: "Ropa", bolso: "Bolsos", zapato: "Zapatos" };

// Asesor de estilo: recomienda productos según la ocasión y el tipo
export default function Asesor({ productos, favoritos, alternarFavorito, agregar }) {
  const [ocasion, setOcasion] = useState("playa");
  const [tipo, setTipo] = useState("prenda");
  const [resultados, setResultados] = useState(null);

  function recomendar(e) {
    e.preventDefault();
    setResultados(
      productos.filter((p) => (p.tags || []).includes(ocasion) && p.cat === TIPOS[tipo])
    );
  }

  return (
    <section id="estilista" className="sec">
      <h2 className="ttl">Asesor de estilo</h2>
      <p className="lead">Elige la ocasión y qué buscas, y te sugerimos opciones del catálogo.</p>
      <form className="row" onSubmit={recomendar}>
        <label>
          Ocasión
          <select value={ocasion} onChange={(e) => setOcasion(e.target.value)}>
            <option value="playa">Playa</option>
            <option value="casual">Casual</option>
            <option value="elegante">Elegante</option>
          </select>
        </label>
        <label>
          ¿Qué buscas?
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="prenda">Prenda</option>
            <option value="bolso">Bolso</option>
            <option value="zapato">Zapato</option>
          </select>
        </label>
        <button className="btn" type="submit">Recomiéndame</button>
      </form>

      <div className="grid" aria-live="polite">
        {resultados && resultados.length === 0 && (
          <p className="empty">
            Todavía no tenemos esa combinación en el catálogo. Prueba otra ocasión o escríbenos y te ayudamos.
          </p>
        )}
        {resultados &&
          resultados.map((p) => (
            <ProductCard
              key={p.id}
              producto={p}
              esFavorito={favoritos.includes(p.id)}
              alternarFavorito={alternarFavorito}
              agregar={agregar}
            />
          ))}
      </div>
    </section>
  );
}