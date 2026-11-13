import { SITE } from "../data";

// Banner principal de la tienda
export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero-text">
        <p className="s1">{SITE.heroArriba}</p>
        <h1>{SITE.heroTitulo}</h1>
        <p className="tag">{SITE.heroFrase}</p>
        <a className="btn" href="#catalogo">{SITE.heroBoton}</a>
      </div>
    </section>
  );
}