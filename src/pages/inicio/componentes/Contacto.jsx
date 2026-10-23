import TEXTOS from '../../../contenido/inicio/textos/Contacto.json'
import { FiPhone, FiMail, FiMapPin, FiArrowUpRight } from 'react-icons/fi'
import { CONTACTO } from "../../../contenido/general/sitio.js"
import { abrirWhatsApp, mensajeGeneral } from '../utilidades/whatsapp'
import Slide from './Slide'
import Reveal from './Reveal'

export default function Contacto({ etiqueta = TEXTOS["06_hablemos"] }) {
  return (
<Slide id="contacto" className="slide-cierre">
 <Reveal as="span" className="kicker center">{etiqueta}</Reveal>
 <Reveal as="h2" className="display center" delay={80}>{TEXTOS.tienes_un_proyecto_en_mente}</Reveal>
 <Reveal as="p" className="lead center" delay={140}>{TEXTOS.escribenos_y_te_asesoramos_sin_costo}</Reveal>

 <div className="cierre-contacto">
 <Reveal as="a" href={`tel:+${CONTACTO.whatsapp}`} className="cierre-item" delay={180}>
 <FiPhone size={18} />
 <div>
 <span>{TEXTOS.telefono}</span>
 <strong>{CONTACTO.telefonoVisible}</strong>
 </div>
 </Reveal>
 <Reveal as="a" href={`mailto:${CONTACTO.correo}`} className="cierre-item" delay={240}>
 <FiMail size={18} />
 <div>
 <span>{TEXTOS.correo}</span>
 <strong>{CONTACTO.correo}</strong>
 </div>
 </Reveal>
 <Reveal className="cierre-item" delay={300}>
 <FiMapPin size={18} />
 <div>
 <span>{TEXTOS.ubicacion}</span>
 <strong>{CONTACTO.direccion}{TEXTOS.texto}{CONTACTO.ubicacion}</strong>
 </div>
 </Reveal>
 </div>

 <Reveal delay={360}>
 <button
 type="button"
 className="cierre-cta"
 onClick={() => abrirWhatsApp(mensajeGeneral(), 'cierre')}
 >{TEXTOS.cotizar_por_whatsapp}<FiArrowUpRight size={18} />
 </button>
 </Reveal>
 </Slide>
  )
}
