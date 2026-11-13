import { CATEGORIAS } from "../data";

// Botones redondos para filtrar por Ropa, Zapatos o Bolsos
export default function Categorias({ actual, cambiar }) {
  return (
    <section className="sec">
      <h2 className="ttl">Nuestras Categorías</h2>
      <div className="cats">
        {CATEGORIAS.map(([nombre, icono]) => (
          <button
            key={nombre}
            className={"cat" + (nombre === actual ? " on" : "")}
            onClick={() => cambiar(nombre)}
          >
            <span>{icono}</span>
            {nombre}
          </button>
        ))}
      </div>
    </section>
  );
}