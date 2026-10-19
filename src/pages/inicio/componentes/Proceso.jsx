import Slide from './Slide'
import Reveal from './Reveal'

export default function Proceso() {
  return (
<Slide id="proceso" className="slide-proceso">
  <Reveal as="span" className="kicker">03- Proceso de trabajo</Reveal>
  <Reveal as="h2" className="display" delay={80}>
    Cuatro pasos simples, un resultado impecable.
  </Reveal>

  <div className="pasos">
    <div className="paso">
      <Reveal as="span" className="paso-num" delay={120}>01</Reveal>
      <Reveal as="h3" delay={160}>Asesoría y medición</Reveal>
      <Reveal as="p" delay={200}>
        Conocemos tu proyecto, revisamos tus requerimientos y realizamos las mediciones en sitio para definir la mejor solución.
      </Reveal>
    </div>

    <div className="paso">
      <Reveal as="span" className="paso-num" delay={200}>02</Reveal>
      <Reveal as="h3" delay={240}>Cotización y propuesta</Reveal>
      <Reveal as="p" delay={280}>
        Preparamos una cotización detallada de acuerdo con las medidas, especificaciones y características de tu proyecto.
      </Reveal>
    </div>

    <div className="paso">
      <Reveal as="span" className="paso-num" delay={280}>03</Reveal>
      <Reveal as="h3" delay={320}>Fabricación a medida</Reveal>
      <Reveal as="p" delay={360}>
        Fabricamos cada proyecto con materiales de calidad, precisión y atención a cada detalle.
      </Reveal>
    </div>

    <div className="paso">
      <Reveal as="span" className="paso-num" delay={360}>04</Reveal>
      <Reveal as="h3" delay={400}>Instalación y entrega</Reveal>
      <Reveal as="p" delay={440}>
        Realizamos la instalación con profesionalismo y cuidado, garantizando un resultado funcional, limpio y con excelentes acabados.
      </Reveal>
    </div>
  </div>
</Slide>
  )
}
