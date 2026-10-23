import { formatearTexto } from '../../../utilidades/plantillas.js'
import TEXTOS from '../../../contenido/general/textos/Encabezado.json'
import { useState, useEffect, useRef } from 'react'
import { FiX, FiMenu, FiArrowUpRight, FiChevronDown } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import { logo } from "../../../contenido/inicio/secciones.js"
import { abrirWhatsApp, mensajeGeneral } from '../utilidades/whatsapp'
import '../../../styles/navigation.css'

export default function Encabezado() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(null)
  const dropdownRef = useRef(null)
  const headerRef = useRef(null)
  const burgerRef = useRef(null)
  const [esMovil, setEsMovil] = useState(() => window.matchMedia('(max-width: 1024px)').matches)
  const location = useLocation()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const cerrarMenus = () => {
    setMenuOpen(false)
    setDropdownOpen(null)
  }

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1024px)');
    const actualizar = () => {
      setEsMovil(media.matches);
      setMenuOpen(false);
      setDropdownOpen(null);
    };
    media.addEventListener('change', actualizar);
    return () => media.removeEventListener('change', actualizar);
  }, []);

  useEffect(() => {
    if (!esMovil || !menuOpen) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const teclado = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setDropdownOpen(null);
        burgerRef.current?.focus();
      }
      if (event.key === 'Tab') {
        const elementos = [...headerRef.current.querySelectorAll('a[href], button')]
          .filter(elemento => elemento.getClientRects().length && getComputedStyle(elemento).visibility !== 'hidden');
        const primero = elementos[0];
        const ultimo = elementos[elementos.length - 1];
        if (event.shiftKey && document.activeElement === primero) { event.preventDefault(); ultimo?.focus(); }
        else if (!event.shiftKey && document.activeElement === ultimo) { event.preventDefault(); primero?.focus(); }
      }
    };
    document.addEventListener('keydown', teclado);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', teclado);
    };
  }, [esMovil, menuOpen]);

  const esPaginaServicios = location.pathname.startsWith('/servicios')

  return (
    <header ref={headerRef} className={`landing-header ${menuOpen ? 'open' : ''}`}>
      <Link to="/" className="landing-brand" onClick={cerrarMenus}>
        <img src={logo} alt={TEXTOS.cima_herrajes} />
        <span>{TEXTOS.cima_herrajes_2}</span>
      </Link>

      <button
        type="button"
        className="landing-burger"
        ref={burgerRef}
        aria-controls="navegacion-principal"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label={menuOpen ? TEXTOS.cerrar_menu : TEXTOS.abrir_menu}
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
      </button>

      <nav id="navegacion-principal" aria-label={TEXTOS.navegacion_principal} inert={esMovil && !menuOpen ? true : undefined} className={`landing-nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={cerrarMenus}>{TEXTOS.inicio}</Link>
        
        {/* Cambiado "Nosotros" por "Especialidades" */}
        <Link to="/servicios#catalogo" onClick={cerrarMenus}>{TEXTOS.especialidades}</Link>

        <div ref={dropdownRef} className="landing-nav-submenus">
          {[
            { id: 'servicios', titulo: TEXTOS.que_hacemos, enlaces: [
              ['/servicios#catalogo', TEXTOS.especialidades],
              ['/servicios#soluciones', TEXTOS.nuestras_soluciones],
              ['/servicios#proceso', TEXTOS.proceso_de_trabajo],
              ['/servicios#como-trabajamos', TEXTOS.como_trabajamos],
              ['/servicios#valores', TEXTOS["garantia_y_valores"]],

            ] },
            { id: 'proyectos', titulo: TEXTOS.proyectos, enlaces: [
              ['/#proyectos', TEXTOS.proyectos_destacados],
              ['/proyectos#recientes', TEXTOS.proyectos_recientes],
            ] },
          ].map(({ id, titulo, enlaces }) => (
            <div key={id} className={`landing-nav-dropdown ${dropdownOpen === id ? 'active' : ''}`}
              onMouseEnter={() => { if (window.matchMedia('(min-width: 1025px)').matches) setDropdownOpen(id) }}
              onMouseLeave={() => { if (!esMovil) setDropdownOpen(null) }}
              onKeyDown={(event) => { if (event.key === 'Escape') setDropdownOpen(null) }}>
              <div className="landing-dropdown-heading">
                <Link to={id === 'servicios' ? '/servicios' : '/proyectos'}
                  className={`landing-dropdown-trigger ${id === 'servicios' && esPaginaServicios ? 'landing-nav-highlight' : ''}`}
                  onClick={cerrarMenus}>{titulo}</Link>
                <button type="button" className="landing-dropdown-toggle"
                  aria-label={formatearTexto(TEXTOS["plantilla_dato1_submenu_de_dato2"], { dato1: (dropdownOpen === id ? TEXTOS["cerrar"] : TEXTOS["abrir"]), dato2: (titulo) })}
                  aria-expanded={dropdownOpen === id} aria-controls={`submenu-${id}`}
                  onClick={() => setDropdownOpen(dropdownOpen === id ? null : id)}>
                  <FiChevronDown className={`dropdown-icon ${dropdownOpen === id ? 'rotate' : ''}`} size={16} />
                </button>
              </div>
              <div id={`submenu-${id}`} inert={dropdownOpen !== id ? true : undefined} className={`landing-dropdown-menu ${dropdownOpen === id ? 'show' : ''}`}>
                {enlaces.map(([to, texto]) => <Link key={to} to={to} onClick={cerrarMenus}>{texto}</Link>)}
              </div>
            </div>
          ))}
        </div>
         <Link to="/afiliado" onClick={cerrarMenus}>{TEXTOS.afiliados}</Link>
        <Link to={location.pathname === '/proyectos' ? '/proyectos#referidos' : '/#referidos'} onClick={cerrarMenus}>{TEXTOS.testimonios}</Link>
        <Link to={location.pathname === '/proyectos' ? '/proyectos#contacto' : '/#contacto'} onClick={cerrarMenus}>{TEXTOS.contacto}</Link>

        <button
          type="button"
          className="landing-header-cta mobile-only"
          onClick={() => {
            cerrarMenus()
            abrirWhatsApp(mensajeGeneral(), 'header-mobile')
          }}
        >{TEXTOS.cotizar}<FiArrowUpRight size={16} />
        </button>
      </nav>

      <button
        type="button"
        className="landing-header-cta desktop-only"
        onClick={() => abrirWhatsApp(mensajeGeneral(), 'header')}
      >{TEXTOS.cotizar}<FiArrowUpRight size={16} />
      </button>
    </header>
  )
}
