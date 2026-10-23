import TEXTOS from '../../contenido/general/textos/FooterServicios.json'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import { imagen_cima as logo } from '../../contenido/imagenes/seleccion.js' // Ajusta la ruta de tu logo si es necesario
import { abrirWhatsApp, mensajeGeneral } from '../inicio/utilidades/whatsapp'
import './footerservicios.css'
import { CONTACTO } from "../../contenido/general/sitio.js"

export default function FooterServicios() {
  return (
    <footer className="footer-servicios-container">
      <div className="footer-servicios-content">
        
        {/* Columna 1: Marca y Descripción */}
        <div className="footer-col footer-brand-col">
          <div className="footer-brand">
            <img src={logo} alt={TEXTOS.cima_herrajes} />
            <span>{TEXTOS.cima_herrajes_2}</span>
          </div>
          <p>{TEXTOS.fabricacion_e_instalacion_profesional_de_canceleria_aluminio}</p>
          <div className="footer-socials">
            <button 
              type="button" 
              onClick={() => abrirWhatsApp(mensajeGeneral(), 'footer-social')}
              aria-label={TEXTOS.whatsapp}
            >
              <FaWhatsapp size={18} />
            </button>
          </div>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div className="footer-col">
          <h3>{TEXTOS.navegacion}</h3>
          <ul>
            <li><Link to="/">{TEXTOS.inicio}</Link></li>
            <li><a href="/servicios#catalogo">{TEXTOS.catalogo_interactivo}</a></li>
            <li><a href="/servicios#soluciones">{TEXTOS.tus_soluciones}</a></li>
            <li><a href="/servicios#proceso">{TEXTOS.proceso_de_trabajo}</a></li>
            <li><a href="/servicios#valores">{TEXTOS.garantia_y_valores}</a></li>
          </ul>
        </div>

        {/* Columna 3: Soluciones Especializadas */}
        <div className="footer-col">
          <h3>{TEXTOS.especialidades}</h3>
          <ul>
            <li><a href="/servicios#soluciones">{TEXTOS.soluciones_residenciales}</a></li>
            <li><a href="/servicios#soluciones">{TEXTOS.soluciones_comerciales}</a></li>
            <li><a href="/servicios#soluciones">{TEXTOS.proyectos_arquitectonicos}</a></li>
            <li><a href="/servicios#soluciones">{TEXTOS.automatizacion_y_domotica}</a></li>
          </ul>
        </div>

        {/* Columna 4: Contacto directo */}
        <div className="footer-col footer-contact-col">
          <h3>{TEXTOS.contacto_directo}</h3>
          <p><FiMapPin size={16} /> {CONTACTO.direccion}{TEXTOS.texto}{CONTACTO.ubicacion}</p>
          <p><FiPhone size={16} /> <a href={`tel:+${CONTACTO.whatsapp}`}>{CONTACTO.telefonoVisible}</a></p>
          <p><FiMail size={16} /> <a href={`mailto:${CONTACTO.correo}`}>{CONTACTO.correo}</a></p>
          
          <button 
            type="button" 
            className="footer-cta-btn"
            onClick={() => abrirWhatsApp(mensajeGeneral(), 'footer-cta')}
          >{TEXTOS.cotizar_por_whatsapp}<FiArrowUpRight size={16} />
          </button>
        </div>

      </div>

      {/* Barra inferior de Copyright */}
      <div className="footer-bottom">
        <p>{TEXTOS.texto_2}{new Date().getFullYear()}{TEXTOS.cima_herrajes_todos_los_derechos_reservados}</p>
        <div className="footer-bottom-links">
  
        </div>
      </div>
    </footer>
  )
}
