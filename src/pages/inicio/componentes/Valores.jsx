import TEXTOS from '../../../contenido/inicio/textos/Valores.json'
import { FiShield, FiTool, FiClock } from 'react-icons/fi'
import Slide from './Slide'
import Reveal from './Reveal'

export default function Valores() {
  return (
<Slide id="valores" className="slide-valores">
  <Reveal as="span" className="kicker center">{TEXTOS["05_garantia_y_valores"]}</Reveal>
  <Reveal as="h2" className="display center" delay={80}>{TEXTOS.nuestros_valores}</Reveal>

  <div className="valores-grid">
    <Reveal className="valor" delay={120}>
      <div className="valor-icon"><FiShield size={22} /></div>
      <h3>{TEXTOS.calidad}</h3>
      <p>{TEXTOS.en_cada_solucion_material_y_detalle}</p>
    </Reveal>
    <Reveal className="valor" delay={200}>
      <div className="valor-icon"><FiTool size={22} /></div>
      <h3>{TEXTOS.compromiso}</h3>
      <p>{TEXTOS.cumplir_lo_que_ofrecemos_y_responder_por}</p>
    </Reveal>
    <Reveal className="valor" delay={280}>
      <div className="valor-icon"><FiClock size={22} /></div>
      <h3>{TEXTOS.confianza}</h3>
      <p>{TEXTOS.construir_relaciones_duraderas_a_traves_de_resultados}</p>
    </Reveal>
  </div>
</Slide>
  )
}
