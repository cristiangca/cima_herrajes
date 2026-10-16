import { useState, useEffect, useRef } from 'react'
import { FiX, FiMenu, FiArrowUpRight, FiChevronDown } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { logo } from '../../../contenido/inicio'
import { abrirWhatsApp, mensajeGeneral } from '../utilidades/whatsapp'

export default function Encabezado() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const cerrarMenus = () => {
    setMenuOpen(false)
    setDropdownOpen(false)
  }

  const esPaginaServicios = location.pathname.startsWith('/servicios')

  return (
    <header className={`landing-header ${menuOpen ? 'open' : ''}`}>
      <Link to="/" className="landing-brand" onClick={cerrarMenus}>
        <img src={logo} alt="Cima Herrajes" />
        <span>CIMA HERRAJES</span>
      </Link>

      <button
        type="button"
        className="landing-burger"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      <nav className={`landing-nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={cerrarMenus}>
          Inicio
        </Link>
        
        {/* Cambiado "Nosotros" por "Especialidades" */}
        <a href="#soluciones" onClick={cerrarMenus}>
          Especialidades
        </a>

        {/* Dropdown "Qué hacemos" reestructurado */}
        <div
          className={`landing-nav-dropdown ${dropdownOpen ? 'active' : ''}`}
          ref={dropdownRef}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <Link
            to="/servicios"
            className={`landing-dropdown-trigger ${esPaginaServicios ? 'landing-nav-highlight' : ''}`}
            onClick={() => {
              if (window.innerWidth <= 768) {
                setDropdownOpen((v) => !v)
              } else {
                cerrarMenus()
              }
            }}
          >
            Qué hacemos <FiChevronDown className={`dropdown-icon ${dropdownOpen ? 'rotate' : ''}`} size={16} />
          </Link>

          <div className={`landing-dropdown-menu ${dropdownOpen ? 'show' : ''}`}>
            <a href="/servicios#catalogo" onClick={cerrarMenus}>
              Catálogo interactivo
            </a>
            <a href="/servicios#soluciones" onClick={cerrarMenus}>
              Tus soluciones
            </a>
            <a href="/servicios#proceso" onClick={cerrarMenus}>
              Proceso de trabajo
            </a>
            <a href="/servicios#como-trabajamos" onClick={cerrarMenus}>
              Cómo trabajamos
            </a>
            <a href="/servicios#valores" onClick={cerrarMenus}>
              Garantía y valores
            </a>
          </div>
        </div>

        <a href="#proyectos" onClick={cerrarMenus}>
          Proyectos
        </a>
        <a href="#referidos" onClick={cerrarMenus}>
          Testimonios
        </a>
        <a href="#contacto" onClick={cerrarMenus}>
          Contacto
        </a>

        <button
          type="button"
          className="landing-header-cta mobile-only"
          onClick={() => {
            cerrarMenus()
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