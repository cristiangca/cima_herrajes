import { FiPhone, FiMail, FiMapPin, FiArrowUpRight } from 'react-icons/fi'
import { CONTACTO } from '../../../contenido/sitio'
import { abrirWhatsApp, mensajeGeneral } from '../utilidades/whatsapp'
import Slide from './Slide'
import Reveal from './Reveal'

export default function Contacto() {
  return (
<Slide id="contacto" className="slide-cierre">
 <Reveal as="span" className="kicker center">10 — Hablemos</Reveal>
 <Reveal as="h2" className="display center" delay={80}>
 ¿Tienes un proyecto en mente?
 </Reveal>
 <Reveal as="p" className="lead center" delay={140}>
 Escríbenos y te asesoramos sin costo.
 </Reveal>

 <div className="cierre-contacto">
 <Reveal as="a" href={`tel:+${CONTACTO.whatsapp}`} className="cierre-item" delay={180}>
 <FiPhone size={18} />
 <div>
 <span>Teléfono</span>
 <strong>{CONTACTO.telefonoVisible}</strong>
 </div>
 </Reveal>
 <Reveal as="a" href={`mailto:${CONTACTO.correo}`} className="cierre-item" delay={240}>
 <FiMail size={18} />
 <div>
 <span>Correo</span>
 <strong>{CONTACTO.correo}</strong>
 </div>
 </Reveal>
 <Reveal className="cierre-item" delay={300}>
 <FiMapPin size={18} />
 <div>
 <span>Ubicación</span>
 <strong>{CONTACTO.ubicacion}</strong>
 </div>
 </Reveal>
 </div>

 <Reveal delay={360}>
 <button
 type="button"
 className="cierre-cta"
 onClick={() => abrirWhatsApp(mensajeGeneral(), 'cierre')}
 >
 Cotizar por WhatsApp <FiArrowUpRight size={18} />
 </button>
 </Reveal>
 </Slide>
  )
}
