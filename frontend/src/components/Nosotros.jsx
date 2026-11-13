import { asset } from "../config";

// Quiénes somos: texto a la izquierda y video a la derecha
export default function Nosotros() {
  return (
    <section id="nosotros" className="about">
      <div className="about-inner">
        <div className="about-text">
          <h2 className="ttl">Nosotros</h2>
          <p className="lead">
            Somos Sofía Store, una marca de Barranquilla que lleva moda con color y actitud a toda
            Colombia. Atendemos tus pedidos y te asesoramos para que encuentres tu look.
          </p>
          <ul className="about-points">
            <li>♡ Moda con color y actitud</li>
            <li>♡ Envíos a toda Colombia</li>
            <li>♡ Asesoría para encontrar tu look</li>
          </ul>
        </div>
        <div className="about-img">
          <video autoPlay muted loop playsInline preload="metadata" poster={asset("img/banner.jpeg")}>
            <source src={asset("video/nosotros.mp4")} type="video/mp4" />
            Tu navegador no puede reproducir este video.
          </video>
        </div>
      </div>
    </section>
  );
}