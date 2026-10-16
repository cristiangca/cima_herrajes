import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiPhone, FiMail, FiMapPin } from 'react-icons/fi'
import { FaWhatsapp, FaInstagram, FaFacebookF } from 'react-icons/fa'
import  logo  from '../../assets/cima.jpg' // Ajusta la ruta de tu logo si es necesario
import { abrirWhatsApp, mensajeGeneral } from '../inicio/utilidades/whatsapp'
import './footerservicios.css'

export default function FooterServicios() {
  return (
    <footer className="footer-servicios-container">
      <div className="footer-servicios-content">
        
        {/* Columna 1: Marca y Descripción */}
        <div className="footer-col footer-brand-col">
          <div className="footer-brand">
            <img src={logo} alt="Cima Herrajes" />
            <span>CIMA HERRAJES</span>
          </div>
          <p>
            Fabricación e instalación profesional de cancelería, aluminio, cristal templado y sistemas inteligentes para transformar tus espacios con elegancia y seguridad.
          </p>
          <div className="footer-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF size={18} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
            <button 
              type="button" 
              onClick={() => abrirWhatsApp(mensajeGeneral(), 'footer-social')}
              aria-label="WhatsApp"
            >
              <FaWhatsapp size={18} />
            </button>
          </div>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div className="footer-col">
          <h3>Navegación</h3>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><a href="/servicios#catalogo">Catálogo interactivo</a></li>
            <li><a href="/servicios#soluciones">Tus soluciones</a></li>
            <li><a href="/servicios#proceso">Proceso de trabajo</a></li>
            <li><a href="/servicios#valores">Garantía y valores</a></li>
          </ul>
        </div>

        {/* Columna 3: Soluciones Especializadas */}
        <div className="footer-col">
          <h3>Especialidades</h3>
          <ul>
            <li><a href="/servicios#soluciones">Soluciones Residenciales</a></li>
            <li><a href="/servicios#soluciones">Soluciones Comerciales</a></li>
            <li><a href="/servicios#soluciones">Proyectos Arquitectónicos</a></li>
            <li><a href="/servicios#soluciones">Automatización y Domótica</a></li>
          </ul>
        </div>

        {/* Columna 4: Contacto directo */}
        <div className="footer-col footer-contact-col">
          <h3>Contacto Directo</h3>
          <p><FiMapPin size={16} /> Jalisco, México</p>
          <p><FiPhone size={16} /> Cotizaciones y Asesoría</p>
          
          <button 
            type="button" 
            className="footer-cta-btn"
            onClick={() => abrirWhatsApp(mensajeGeneral(), 'footer-cta')}
          >
            Cotizar por WhatsApp <FiArrowUpRight size={16} />
          </button>
        </div>

      </div>

      {/* Barra inferior de Copyright */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Cima Herrajes. Todos los derechos reservados.</p>
        <div className="footer-bottom-links">
  
        </div>
      </div>
    </footer>
  )
}