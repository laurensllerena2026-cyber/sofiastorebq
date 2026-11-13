// Pie de página
export default function Footer() {
  return (
    <footer className="foot">
      <div>
        <div className="flogo">Sofía<b>Store</b></div>
        <p>Donde la tendencia cobra vida</p>
      </div>
      <div>
        <h4>Enlaces útiles</h4>
        <a href="#inicio">Inicio</a>
        <a href="#catalogo">Tienda</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#contacto">Contacto</a>
      </div>
      <div>
        <h4>Síguenos en</h4>
        <a href="https://instagram.com/sofiastore_bq" target="_blank" rel="noopener noreferrer">
          Instagram @sofiastore_bq
        </a>
      </div>
      <p className="copy">© {new Date().getFullYear()} Sofía Store. Todos los derechos reservados.</p>
    </footer>
  );
}