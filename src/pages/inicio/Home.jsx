import { useEffect, useState } from 'react'
import '../../styles/home.css'

import Pilares from '../Pilares'
import { abrirWhatsApp, mensajeGeneral } from './utilidades/whatsapp'
import Encabezado from './componentes/Encabezado'
import IndicadorScroll from './componentes/IndicadorScroll'
import Portada from './componentes/Portada'
import Nosotros from './componentes/Nosotros'
import ServiciosInicio from './componentes/ServiciosInicio'
import ComoTrabajamos from './componentes/ComoTrabajamos'
import CatalogoInicio from './componentes/CatalogoInicio'
import Proceso from './componentes/Proceso'
import Valores from './componentes/Valores'
import Proyectos from './componentes/Proyectos'
import Testimonios from './componentes/Testimonios'
import Contacto from './componentes/Contacto'
import PiePagina from './componentes/PiePagina'
import WhatsAppFlotante from './componentes/WhatsAppFlotante'
import BarraMovil from './componentes/BarraMovil'

export default function Home() {
  return <HomeContenido />
}

function HomeContenido() {
 // Estado de la burbuja de WhatsApp
 const [whatsappOpen, setWhatsappOpen] = useState(false)
 const [mensajeWhatsapp, setMensajeWhatsapp] = useState('')


 // Abrir burbuja con mensaje general
 const abrirBurbujaGeneral = () => {
 setMensajeWhatsapp(mensajeGeneral())
 setWhatsappOpen(true)
 }

 // Enviar mensaje y cerrar burbuja
 const enviarWhatsApp = (origen = 'bubble') => {
 abrirWhatsApp(mensajeWhatsapp, origen)
 setWhatsappOpen(false)
 }

 // SEO dinámico
 useEffect(() => {
 document.title = 'Cima Herrajes | Cancelería, aluminio, vidrio y barandales'
 const meta = document.querySelector('meta[name="description"]')
 if (meta) {
 meta.setAttribute(
 'content',
 'Fabricación e instalación de cancelería, ventanas, puertas de aluminio, barandales, cristal templado y domótica. Cotiza por WhatsApp.'
 )
 }
 }, [])

 // Cerrar burbuja al hacer click fuera
 useEffect(() => {
 if (!whatsappOpen) return

 const handleClickOutside = (e) => {
 const container = document.querySelector('.whatsapp-float-container')
 if (container && !container.contains(e.target)) {
 setWhatsappOpen(false)
 }
 }

 document.addEventListener('mousedown', handleClickOutside)
 return () => document.removeEventListener('mousedown', handleClickOutside)
 }, [whatsappOpen])

  return (
    <div className="landing">
      <IndicadorScroll />
      <Encabezado />
      <Portada />
      <Nosotros />
      <ServiciosInicio abrirBurbujaGeneral={abrirBurbujaGeneral} />
      <Pilares />
    {/*  <ComoTrabajamos /> */}
 {/* <CatalogoInicio />   // Componente que muestra el catálogo inicial */}
      {/* <Proceso />          // Componente que describe el proceso de trabajo */}
      {/* <Valores />          // Componente que presenta los valores de la empresa */}
    
      <Proyectos />
      <Testimonios />
      <Contacto />
      <PiePagina />
      <WhatsAppFlotante
        whatsappOpen={whatsappOpen}
        setWhatsappOpen={setWhatsappOpen}
        mensajeWhatsapp={mensajeWhatsapp}
        setMensajeWhatsapp={setMensajeWhatsapp}
        enviarWhatsApp={enviarWhatsApp}
        abrirBurbujaGeneral={abrirBurbujaGeneral}
      />
      <BarraMovil />
    </div>
  )
}
