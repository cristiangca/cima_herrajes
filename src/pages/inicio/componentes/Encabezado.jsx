import { FiX, FiMenu, FiArrowUpRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { logo } from '../../../contenido/inicio'
import { abrirWhatsApp, mensajeGeneral } from '../utilidades/whatsapp'
import { useState } from 'react'

export default function Encabezado() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
<header className={`landing-header ${menuOpen ? 'open' : ''}`}>
  <Link
    to="/"
    className="landing-brand"
    onClick={() => setMenuOpen(false)}
  >
    <img src={logo} alt="Cima Herrajes" />
    <span>CIMA HERRAJES</span>
  </Link>

  <button
    type="button"
    className="landing-burger"
    onClick={() => setMenuOpen(v => !v)}
    aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
    aria-expanded={menuOpen}
  >
    {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
  </button>

  
  <nav className={`landing-nav ${menuOpen ? 'open' : ''}`}>
    <a href="#inicio"    onClick={() => setMenuOpen(false)}>Inicio</a>
    <a href="#nosotros"  onClick={() => setMenuOpen(false)}>Nosotros</a>
   <a
  href="/servicios"
  className="landing-nav-highlight-inactivo"
  onClick={() => setMenuOpen(false)}>Que hacemos</a>
    <a href="#proyectos" onClick={() => setMenuOpen(false)}>Proyectos</a>
    <a href="#referidos" onClick={() => setMenuOpen(false)}>Testimonios</a>
    <a href="#contacto"  onClick={() => setMenuOpen(false)}>Contacto</a>

    <button
      type="button"
      className="landing-header-cta mobile-only"
      onClick={() => {
        setMenuOpen(false)
        abrirWhatsApp(mensajeGeneral(), 'header-mobile')
      }}
    >
      Cotizar <FiArrowUpRight size={16} />
    </button>
  </nav>

  <button
    type="button"
    className="landing-header-cta desktop-only"
    onClick={() => abrirWhatsApp(mensajeGeneral(), 'header')}
  >
    Cotizar <FiArrowUpRight size={16} />
  </button>
</header>
  )
}
