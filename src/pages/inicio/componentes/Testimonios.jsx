import TEXTOS from '../../../contenido/inicio/textos/Testimonios.json'
import { REFERIDOS } from "../../../contenido/inicio/secciones.js"
import Slide from './Slide'
import Reveal from './Reveal'

export default function Testimonios({ etiqueta = TEXTOS["05_testimonios"] }) {
  return (
<Slide id="referidos" className="slide-referidos">
 <Reveal as="span" className="kicker center">{etiqueta}</Reveal>
 <Reveal as="h2" className="display center" delay={80}>{TEXTOS.clientes_que_ya_confian_en_nosotros}</Reveal>

 <div className="referidos-grid">
 {REFERIDOS.map((r, i) => (
 <Reveal key={i} className="referido" delay={120 + i * 100}>
 <span className="referido-quote">{TEXTOS.texto}</span>
 <p>{r.texto}</p>
 <div className="referido-author">
 <strong>{r.autor}</strong>
 <span>{r.cargo}</span>
 </div>
 </Reveal>
 ))}
 </div>
 </Slide>
  )
}
