import { FiArrowUpRight } from 'react-icons/fi'
import { PROYECTOS } from '../../../contenido/inicio'
import { abrirWhatsApp, mensajeProyecto } from '../utilidades/whatsapp'
import Slide from './Slide'
import Reveal from './Reveal'

export default function Proyectos() {
  return (
<Slide id="proyectos" className="slide-proyectos">
 <Reveal as="span" className="kicker">04- Proyectos</Reveal>
 <Reveal as="h2" className="display" delay={80}>Trabajos destacados</Reveal>

 <div className="proyectos-grid">
 {PROYECTOS.map((p, i) => (
 <Reveal
 key={p.nombre}
 className={`proyecto ${ p.large ? 'large' : ''}`}
 delay={120 + i * 80}
 >
 <img src={p.img} alt={p.nombre} />
 <div className="proyecto-info">
 <span>{p.tipo}</span>
 <h3>{p.nombre}</h3>
 <button
 type="button"
 className="proyecto-cta"
 onClick={() => abrirWhatsApp(mensajeProyecto(p.tipo, p.nombre), `proyecto-${p.nombre}`)}
 >
 Cotizar algo similar <FiArrowUpRight size={14} />
 </button>
 </div>
 </Reveal>
 ))}
 </div>
 </Slide>
  )
}
