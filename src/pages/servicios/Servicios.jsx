import TEXTOS from '../../contenido/servicios/textos/Servicios.json'
import { useParams, useNavigate } from 'react-router-dom'
import '../../styles/home.css'
import './servicios.css'
import DetalleProducto from './DetalleProducto'
import Catalogo from '../Catalogo'
import ComoTrabajamos from '../inicio/componentes/ComoTrabajamos'
import Proceso from '../inicio/componentes/Proceso.jsx'
import Valores from '../inicio/componentes/Valores.jsx'
import IndicadorScroll from '../inicio/componentes/IndicadorScroll.jsx'
import { useEffect, useState } from 'react'
import SolucionesCarrusel from './SolucionesCarrusel'
import Encabezado from '../inicio/componentes/EncabezadoServ.jsx'
import WhatsAppFlotante from '../inicio/componentes/WhatsAppFlotante.jsx'
import FooterServicios from './FooterServicios.jsx'
import { abrirWhatsApp } from '../inicio/utilidades/whatsapp'
import { useServicioActivo } from '../catalogo/ServicioActivoContext'


export default function Servicios() {
  const { idproductos } = useParams()
  const navigate = useNavigate()
  const { activarServicio } = useServicioActivo()
  const [whatsappOpen, setWhatsappOpen] = useState(false)
  const [mensajeWhatsapp, setMensajeWhatsapp] = useState('')
  const abrirBurbujaGeneral = () => {
    setMensajeWhatsapp(TEXTOS.hola_me_interesa_solicitar_una_cotizacion_general)
    setWhatsappOpen(true)
  }

  const verSolucion = (slug, titulo) => {
    activarServicio(slug, titulo)
    navigate('/servicios#catalogo')
  }

  // Enviar mensaje y cerrar burbuja
  const enviarWhatsApp = (origen = 'bubble') => {
    abrirWhatsApp(mensajeWhatsapp, origen)
    setWhatsappOpen(false)
  }

  // SEO dinámico
  useEffect(() => {
    document.title = TEXTOS.cima_herrajes_canceleria_aluminio_vidrio_y_barandales
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        TEXTOS.fabricacion_e_instalacion_de_canceleria_ventanas_puertas
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

  // Si no hay parámetro → mostramos el catálogo completo junto con los componentes
  if (!idproductos) {
    return (
      <div>
        <Encabezado />

        {/* Sección: Catálogo interactivo */}
       <div id="catalogo">
  <div className="servicios-especialidades-header">
    <span>{TEXTOS["01_especialidades"]}</span>
    <h2>{TEXTOS.disenamos_fabricamos_e_instalamos_soluciones_a_medida}</h2>
  </div>
  <Catalogo interactivo={false} />
</div>

        {/* Sección: Tus soluciones / Especialidades */}
        <SolucionesCarrusel verSolucion={verSolucion} />

        {/* Sección: Proceso de trabajo */}
        <div>
          <Proceso /> 
        </div>

        {/* Sección: Cómo trabajamos */}
        <div>
          <ComoTrabajamos /> 
        </div>

        {/* Sección: Garantía y valores */}
        <div className="servicios-valores-wrapper">
          <Valores />
        </div>

        <WhatsAppFlotante
          whatsappOpen={whatsappOpen}
          setWhatsappOpen={setWhatsappOpen}
          mensajeWhatsapp={mensajeWhatsapp}
          setMensajeWhatsapp={setMensajeWhatsapp}
          enviarWhatsApp={enviarWhatsApp}
          abrirBurbujaGeneral={abrirBurbujaGeneral}
        />
        <IndicadorScroll />
                <FooterServicios />

      </div>
    )
  }

  // Si hay parámetro → mostramos el detalle del producto
  return <DetalleProducto idproductos={idproductos} />
}
