import { CONTACTO } from '../../../contenido/sitio'
import { registrarEvento } from '../../../utilidades/analytics'

const WHATSAPP_NUMBER = CONTACTO.whatsapp

export function abrirWhatsApp(mensaje = '', origen = 'general', datos = {}) {
 registrarEvento('click_whatsapp', { ...datos, origen })
 const base = `https://wa.me/${WHATSAPP_NUMBER}`
 const url = mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base
 window.open(url, '_blank', 'noopener,noreferrer')
}

export function mensajeProyecto(tipo, nombre) {
 return `Hola, vi el proyecto "${nombre}" (${tipo}) y me gustaría cotizar algo similar.

Tipo de proyecto:
Medidas aproximadas:
Material o acabado de interés:
Fotografías o referencia:
Fecha estimada:
Ubicación:

Quedo pendiente de su propuesta.`
}

export function mensajeGeneral() {
 return `Hola Cima Herrajes, me gustaría cotizar un proyecto. ¿Me pueden asesorar?`
}
