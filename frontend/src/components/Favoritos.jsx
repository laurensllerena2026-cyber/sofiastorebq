import ProductCard from "./ProductCard";

// Productos a los que la persona les dio corazón
export default function Favoritos({ productos, favoritos, alternarFavorito, agregar }) {
  const guardados = productos.filter((p) => favoritos.includes(p.id));

  return (
    <section id="favoritos" className="sec">
      <h2 className="ttl">Tus favoritos</h2>
      <p className="lead">Toca el ♡ de cualquier producto para guardarlo aquí y pedirlo cuando quieras.</p>
      <div className="grid">
        {guardados.length === 0 && (
          <p className="empty">Aún no tienes favoritos. Toca el ♡ de cualquier producto y quedará guardado aquí.</p>
        )}
        {guardados.map((p) => (
          <ProductCard
            key={p.id}
            producto={p}
            esFavorito={true}
            alternarFavorito={alternarFavorito}
            agregar={agregar}
          />
        ))}
      </div>
    </section>
  );
}