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
import Encabezado from '../inicio/componentes/EncabezadoServ.jsx'
import WhatsAppFlotante from '../inicio/componentes/WhatsAppFlotante.jsx'
import FooterServicios from './FooterServicios.jsx'
import { abrirWhatsApp } from '../inicio/utilidades/whatsapp'
import { useServicioActivo } from '../catalogo/ServicioActivoContext'
import { FOTOS_PROYECTO } from '../../contenido/fotos-proyecto'

export default function Servicios() {
  const { idproductos } = useParams()
  const navigate = useNavigate()
  const { activarServicio } = useServicioActivo()
  const [whatsappOpen, setWhatsappOpen] = useState(false)
  const [mensajeWhatsapp, setMensajeWhatsapp] = useState('')

  const abrirBurbujaGeneral = () => {
    setMensajeWhatsapp('Hola, me interesa solicitar una cotización general de sus servicios y productos.')
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
  <div className="servicios-especialidades-header">
    <span>01- ESPECIALIDADES</span>
    <h2>Diseñamos, fabricamos e instalamos soluciones a medida para cada proyecto. </h2>
  </div>
  <Catalogo interactivo={false} />
</div>

        {/* Sección: Tus soluciones / Especialidades */}
        <section id="soluciones" className="servicios-especialidades">
          <div className="servicios-especialidades-header">
            <span>02- NUESTRAS SOLUCIONES</span>
            <h2>Diseñamos espacios funcionales y modernos</h2>
          </div>

          <div className="servicios-especialidades-grid">

            <article className="especialidad-card">
              <div className="especialidad-img-container">
                <img 
                  src={FOTOS_PROYECTO.residencial}
                  alt="Soluciones residenciales - Ventanas y Canceles" 
                />
              </div>
              <span>01</span>
              <h3>Soluciones residenciales</h3>
              <p>
                Ventanas, puertas, canceles y barandales diseñados para elevar la
                estética y funcionalidad de tu hogar.
              </p>
              <button type="button" className="especialidad-cta" onClick={() => verSolucion('residencial', 'Soluciones residenciales')} aria-label="Ver productos relacionados: Soluciones residenciales">
                Ver productos relacionados &rarr;
              </button>
            </article>

            <article className="especialidad-card">
              <div className="especialidad-img-container">
                <img 
                  src={FOTOS_PROYECTO.comercial}
                  alt="Soluciones comerciales - Fachadas y accesos" 
                />
              </div>
              <span>02</span>
              <h3>Soluciones comerciales</h3>
              <p>
                Fachadas, accesos, divisiones y sistemas de aluminio para oficinas,
                locales y espacios corporativos.
              </p>
              <button type="button" className="especialidad-cta" onClick={() => verSolucion('comercial', 'Soluciones comerciales')} aria-label="Ver productos relacionados: Soluciones comerciales">
                Ver productos relacionados &rarr;
              </button>
            </article>

            <article className="especialidad-card">
              <div className="especialidad-img-container">
                <img 
                  src={FOTOS_PROYECTO.arquitectonico}
                  alt="Proyectos arquitectónicos a medida" 
                />
              </div>
              <span>03</span>
              <h3>Proyectos arquitectónicos</h3>
              <p>
                Colaboramos con arquitectos y desarrolladores para crear proyectos a
                medida con acabados premium.
              </p>
              <button type="button" className="especialidad-cta" onClick={() => verSolucion('arquitectonico', 'Proyectos arquitectónicos')} aria-label="Ver productos relacionados: Proyectos arquitectónicos">
                Ver productos relacionados &rarr;
              </button>
            </article>

            <article className="especialidad-card">
              <div className="especialidad-img-container">
                <img 
                  src={FOTOS_PROYECTO.automatizacion}
                  alt="Automatización y sistemas de domótica" 
                />
              </div>
              <span>04</span>
              <h3>Automatización</h3>
              <p>
                Integración de sistemas automatizados para accesos, puertas, cortinas y
                soluciones inteligentes.
              </p>
              <button type="button" className="especialidad-cta" onClick={() => verSolucion('domotica', 'Automatización')} aria-label="Ver productos relacionados: Automatización">
                Ver productos relacionados &rarr;
              </button>
            </article>

          </div>
        </section>

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