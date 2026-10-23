import TEXTOS from '../../../contenido/general/textos/BarraMovil.json'
import { FaWhatsapp } from 'react-icons/fa'
import { abrirWhatsApp, mensajeGeneral } from '../utilidades/whatsapp'

export default function BarraMovil() {
  return (
<div className="mobile-cta-bar">
 <button
 type="button"
 onClick={() => abrirWhatsApp(mensajeGeneral(), 'sticky-mobile')}
 className="mobile-cta-btn"
 >
 <FaWhatsapp size={20} />{TEXTOS.cotizar_por_whatsapp}</button>
 </div>
  )
}
