import { FiShield, FiTool, FiClock } from 'react-icons/fi'
import Slide from './Slide'
import Reveal from './Reveal'

export default function Valores() {
  return (
<Slide id="valores" className="slide-valores">
  <Reveal as="span" className="kicker center">07 — Lo que nos define</Reveal>
  <Reveal as="h2" className="display center" delay={80}>
    Nuestros valores
  </Reveal>

  <div className="valores-grid">
    <Reveal className="valor" delay={120}>
      <div className="valor-icon"><FiShield size={22} /></div>
      <h3>Calidad</h3>
      <p>En cada solución, material y detalle.</p>
    </Reveal>
    <Reveal className="valor" delay={200}>
      <div className="valor-icon"><FiTool size={22} /></div>
      <h3>Compromiso</h3>
      <p>Cumplir lo que ofrecemos y responder por cada proyecto.</p>
    </Reveal>
    <Reveal className="valor" delay={280}>
      <div className="valor-icon"><FiClock size={22} /></div>
      <h3>Confianza</h3>
      <p>Construir relaciones duraderas a través de resultados y respaldo.</p>
    </Reveal>
  </div>
</Slide>
  )
}
