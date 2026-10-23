import TEXTOS from '../../../contenido/inicio/textos/Proyectos.json'
import { FiArrowUpRight } from 'react-icons/fi'
import { PROYECTOS_DESTACADOS } from '../../../contenido/proyectos/seleccion.js'
import { abrirWhatsApp, mensajeProyecto } from '../utilidades/whatsapp'
import Slide from './Slide'
import Reveal from './Reveal'
import './proyectosCollage.css'

export default function Proyectos() {
  return (
<Slide id="proyectos" className="slide-proyectos">
 <Reveal as="span" className="kicker">{TEXTOS["04_proyectos"]}</Reveal>
 <Reveal as="h2" className="display" delay={80}>{TEXTOS.trabajos_destacados}</Reveal>

 {/* Collage fijo: 1 grande a la izquierda, 2 pequeñas a la derecha. */}
 <div className="proyectos-grid proyectos-collage">
 {PROYECTOS_DESTACADOS.map((p, i) => (
 <Reveal
 key={p.id}
 className={`proyecto ${p.destacado === 1 ? 'large' : ''}`}
 delay={120 + i * 80}
 >
 <img src={p.portada} alt={p.nombre} loading="lazy" decoding="async" />
 <div className="proyecto-info">
 <span>{p.tipo}{p.ejemplo && <> · {TEXTOS.proyecto_simulado}</>}</span>
 <h3>{p.nombre}</h3>
 <button
 type="button"
 className="proyecto-cta"
 onClick={() => abrirWhatsApp(mensajeProyecto(p.tipo, p.nombre), `proyecto-${p.nombre}`)}
 >{TEXTOS.cotizar_algo_similar}<FiArrowUpRight size={14} />
 </button>
 </div>
 </Reveal>
 ))}
 </div>
 </Slide>
  )
}
