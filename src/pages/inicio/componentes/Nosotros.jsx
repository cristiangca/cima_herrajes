import Slide from './Slide'
import Reveal from './Reveal'

export default function Nosotros() {
  return (
<Slide id="nosotros" className="slide-sobre-nosotros">
  <div className="about-content">
    <Reveal as="span" className="about-label" delay={80}>
      01- Sobre nosotros
    </Reveal>

    <Reveal as="h2" className="about-title" delay={160}>
      La experiencia nos respalda.
      <br />
      <span>Una nueva generación de especialistas nos define.</span>
    </Reveal>

    <Reveal as="h2" className="about-intro" delay={240}>
      Desarrollamos soluciones en vidrio, aluminio, automatización y
      acabados, adaptándonos a las necesidades de cada proyecto.
    </Reveal>

    <Reveal as="h2" className="about-text " delay={320}>
      Combinamos experiencia, innovación y una visión
      actual para crear, transformar y mantener espacios funcionales,
      estéticos e inteligentes.
    </Reveal>

    <Reveal as="h2" className="about-text" delay={400}>
      Nuestro trabajo va más allá de la fabricación e instalación.
      Acompañamos cada proyecto desde la asesoría y medición hasta su
      ejecución, cuidando la precisión, los acabados y cada detalle
      para entregar soluciones bien realizadas, funcionales y pensadas
      para durar.
    </Reveal>

    <Reveal className="about-footer" delay={480}>
      <div className="about-line" />
      <span>30+ AÑOS DE EXPERIENCIA</span>
    </Reveal>
  </div>
</Slide>
  )
}
