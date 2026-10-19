import { REFERIDOS } from '../../../contenido/inicio'
import Slide from './Slide'
import Reveal from './Reveal'

export default function Testimonios({ etiqueta = '05- Referidos' }) {
  return (
<Slide id="referidos" className="slide-referidos">
 <Reveal as="span" className="kicker center">{etiqueta}</Reveal>
 <Reveal as="h2" className="display center" delay={80}>
 Clientes que ya confían en nosotros
 </Reveal>

 <div className="referidos-grid">
 {REFERIDOS.map((r, i) => (
 <Reveal key={i} className="referido" delay={120 + i * 100}>
 <span className="referido-quote">"</span>
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
