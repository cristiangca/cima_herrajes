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
 aria-label="Cerrar"
 >
 ×
 </button>

 <p className="whatsapp-bubble-label">Escribe tu mensaje:</p>

 <textarea
 value={mensajeWhatsapp}
 onChange={(e) => setMensajeWhatsapp(e.target.value)}
 rows={5}
 className="whatsapp-input"
 placeholder="Escribe tu mensaje..."
 />

 <button
 type="button"
 className="whatsapp-send"
 onClick={() => enviarWhatsApp('bubble')}
 >
 <FaWhatsapp size={18} />
 Enviar por WhatsApp
 </button>
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
 aria-label="WhatsApp"
 >
 <FaWhatsapp size={26} />
 </button>
 </div>
  )
}
