import TEXTOS from '../../../contenido/inicio/textos/Nosotros.json'
import Slide from './Slide'
import Reveal from './Reveal'

export default function Nosotros() {
  return (
<Slide id="nosotros" className="slide-sobre-nosotros">
  <div className="about-content">
    <Reveal as="span" className="about-label" delay={80}>{TEXTOS["01_sobre_nosotros"]}</Reveal>

    <Reveal as="h2" className="about-title" delay={160}>{TEXTOS.la_experiencia_nos_respalda}<br />
      <span>{TEXTOS.una_nueva_generacion_de_especialistas_nos_define}</span>
    </Reveal>

    <Reveal as="h2" className="about-intro" delay={240}>{TEXTOS.desarrollamos_soluciones_en_vidrio_aluminio_automatizacion_y}</Reveal>

    <Reveal as="h2" className="about-text " delay={320}>{TEXTOS.combinamos_experiencia_innovacion_y_una_vision_actual}</Reveal>

    <Reveal as="h2" className="about-text" delay={400}>{TEXTOS.nuestro_trabajo_va_mas_alla_de_la}</Reveal>

    <Reveal className="about-footer" delay={480}>
      <div className="about-line" />
      <span>{TEXTOS["30_anos_de_experiencia"]}</span>
    </Reveal>
  </div>
</Slide>
  )
}
