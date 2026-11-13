import ProductCard from "./ProductCard";

// Lista de productos, filtrada por la categoría elegida
export default function Catalogo({ productos, categoria, favoritos, alternarFavorito, agregar }) {
  const visibles = productos.filter((p) => categoria === "Todos" || p.cat === categoria);

  return (
    <section id="catalogo" className="sec">
      <h2 className="ttl">Productos Destacados</h2>
      <div className="grid">
        {visibles.length === 0 && <p>Pronto tendremos prendas en esta categoría.</p>}
        {visibles.map((p) => (
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