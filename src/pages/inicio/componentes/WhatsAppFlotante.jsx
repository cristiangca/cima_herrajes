import TEXTOS from '../../../contenido/general/textos/WhatsAppFlotante.json'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppFlotante({ whatsappOpen, setWhatsappOpen, mensajeWhatsapp, setMensajeWhatsapp, enviarWhatsApp, abrirBurbujaGeneral }) {
  return (
<div className={`whatsapp-float-container ${whatsappOpen ? 'open' : ''}`}>
 {/* Burbuja con input (solo visible cuando está abierta) */}
 {whatsappOpen && (
 <div className="whatsapp-bubble">
 <button
 type="button"
 className="whatsapp-close"
 onClick={() => setWhatsappOpen(false)}
 aria-label={TEXTOS.cerrar}
 >{TEXTOS.texto}</button>

 <p className="whatsapp-bubble-label">{TEXTOS.escribe_tu_mensaje}</p>

 <textarea
 value={mensajeWhatsapp}
 onChange={(e) => setMensajeWhatsapp(e.target.value)}
 rows={5}
 className="whatsapp-input"
 placeholder={TEXTOS.escribe_tu_mensaje_2}
 />

 <button
 type="button"
 className="whatsapp-send"
 onClick={() => enviarWhatsApp('bubble')}
 >
 <FaWhatsapp size={18} />{TEXTOS.enviar_por_whatsapp}</button>
 </div>
 )}

 {/* Icono flotante (siempre visible) */}
 <button
 type="button"
 className="whatsapp-float"
 onClick={() => {
 if (whatsappOpen) {
 setWhatsappOpen(false)
 } else {
 abrirBurbujaGeneral()
 }
 }}
 aria-label={TEXTOS.whatsapp}
 >
 <FaWhatsapp size={26} />
 </button>
 </div>
  )
}
