import { formatearTexto } from '../../../utilidades/plantillas.js'
import TEXTOS from '../../../contenido/general/textos/whatsapp.json'
import { CONTACTO } from "../../../contenido/general/sitio.js"
import { registrarEvento } from '../../../utilidades/analytics'

const WHATSAPP_NUMBER = CONTACTO.whatsapp

export function abrirWhatsApp(mensaje = '', origen = 'general', datos = {}) {
 registrarEvento('click_whatsapp', { ...datos, origen })
 const base = `https://wa.me/${WHATSAPP_NUMBER}`
 const url = mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base
 window.open(url, '_blank', 'noopener,noreferrer')
}

export function mensajeProyecto(tipo, nombre) {
 return formatearTexto(TEXTOS["plantilla_hola_vi_el_proyecto_dato1_dato2"], { dato1: (nombre), dato2: (tipo) })
}

export function mensajeGeneral() {
 return TEXTOS["plantilla_hola_cima_herrajes_me_gustaria_cotizar"]
}
