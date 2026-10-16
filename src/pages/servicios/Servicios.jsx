import { useParams } from 'react-router-dom'
import '../../styles/home.css'
import './servicios.css'
import DetalleProducto from './DetalleProducto'
import Catalogo from '../Catalogo'
import ComoTrabajamos from '../inicio/componentes/ComoTrabajamos'
import Proceso from '../inicio/componentes/Proceso.jsx'
import Valores from '../inicio/componentes/Valores.jsx'
import IndicadorScroll from '../inicio/componentes/IndicadorScroll.jsx'
import { useEffect, useState } from 'react'
import Encabezado from '../inicio/componentes/EncabezadoServ.jsx'
import WhatsAppFlotante from '../inicio/componentes/WhatsAppFlotante.jsx'
import FooterServicios from './FooterServicios.jsx'
import { abrirWhatsApp, mensajeGeneral } from '../inicio/utilidades/whatsapp'

export default function Servicios() {
  const { idproductos } = useParams()
  const [whatsappOpen, setWhatsappOpen] = useState(false)
  const [mensajeWhatsapp, setMensajeWhatsapp] = useState('')

  const abrirBurbujaGeneral = () => {
    setMensajeWhatsapp('Hola, me interesa solicitar una cotización general de sus servicios y productos.')
    setWhatsappOpen(true)
  }

  // Función para cotizar una solución específica por WhatsApp al hacer clic en las tarjetas
  const cotizarSolucion = (nombreSolucion) => {
    const mensaje = `Hola, me interesa obtener más información y cotizar sobre sus *${nombreSolucion}*.`
    setMensajeWhatsapp(mensaje)
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

  // Si no hay parámetro → mostramos el catálogo completo junto con los componentes
  if (!idproductos) {
    return (
      <div>
        <Encabezado />

        {/* Sección: Catálogo interactivo */}
       <div id="catalogo">
        <br/>
         <br/>
          <br/>
           <br/>
            <br/>
  <div className="servicios-especialidades-header">
    <span>ESPECIALIDADES Y HERRAJES</span>
    <h2>Soluciones en vidrio, aluminio y acero</h2>
  </div>
  <Catalogo interactivo={false} />
</div>

        {/* Sección: Tus soluciones / Especialidades */}
        <section id="soluciones" className="servicios-especialidades">
          <div className="servicios-especialidades-header">
            <span>NUESTRAS SOLUCIONES</span>
            <h2>Diseñamos espacios funcionales y modernos</h2>
          </div>

          <div className="servicios-especialidades-grid">

            <article className="especialidad-card" onClick={() => cotizarSolucion('Soluciones Residenciales')}>
              <div className="especialidad-img-container">
                <img 
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" 
                  alt="Soluciones residenciales - Ventanas y Canceles" 
                />
              </div>
              <span>01</span>
              <h3>Soluciones residenciales</h3>
              <p>
                Ventanas, puertas, canceles y barandales diseñados para elevar la
                estética y funcionalidad de tu hogar.
              </p>
              <div className="especialidad-cta">
                Cotizar proyecto &rarr;
              </div>
            </article>

            <article className="especialidad-card" onClick={() => cotizarSolucion('Soluciones Comerciales')}>
              <div className="especialidad-img-container">
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80" 
                  alt="Soluciones comerciales - Fachadas y accesos" 
                />
              </div>
              <span>02</span>
              <h3>Soluciones comerciales</h3>
              <p>
                Fachadas, accesos, divisiones y sistemas de aluminio para oficinas,
                locales y espacios corporativos.
              </p>
              <div className="especialidad-cta">
                Cotizar proyecto &rarr;
              </div>
            </article>

            <article className="especialidad-card" onClick={() => cotizarSolucion('Proyectos Arquitectónicos')}>
              <div className="especialidad-img-container">
                <img 
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80" 
                  alt="Proyectos arquitectónicos a medida" 
                />
              </div>
              <span>03</span>
              <h3>Proyectos arquitectónicos</h3>
              <p>
                Colaboramos con arquitectos y desarrolladores para crear proyectos a
                medida con acabados premium.
              </p>
              <div className="especialidad-cta">
                Cotizar proyecto &rarr;
              </div>
            </article>

            <article className="especialidad-card" onClick={() => cotizarSolucion('Sistemas de Automatización')}>
              <div className="especialidad-img-container">
                <img 
                  src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=800&q=80" 
                  alt="Automatización y sistemas de domótica" 
                />
              </div>
              <span>04</span>
              <h3>Automatización</h3>
              <p>
                Integración de sistemas automatizados para accesos, puertas, cortinas y
                soluciones inteligentes.
              </p>
              <div className="especialidad-cta">
                Cotizar proyecto &rarr;
              </div>
            </article>

          </div>
        </section>

        {/* Sección: Proceso de trabajo */}
        <div id="proceso">
          <Proceso /> 
        </div>

        {/* Sección: Cómo trabajamos */}
        <div id="como-trabajamos">
          <ComoTrabajamos /> 
        </div>

        {/* Sección: Garantía y valores */}
        <div id="valores" className="servicios-valores-wrapper">
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