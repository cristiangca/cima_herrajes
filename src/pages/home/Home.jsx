import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
 FiArrowRight, FiArrowUpRight,
 FiShield, FiTool, FiClock,
 FiCheck, FiPhone, FiMail, FiMapPin,
 FiGrid, FiMaximize2, FiSun, FiZap,
 FiEdit3, FiUsers, FiShoppingBag, FiLayers,
 FiMenu,
 FiX,
 FiTarget
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'
import '../../styles/home.css'
import logo from '../../assets/cima.jpg'
import banner from '../../assets/hero-2.png'
import canceleria from '../../assets/baño.png'
import barandales from '../../assets/barandal.png'
import ventanales from '../../assets/ventana.png'
import especiales from '../../assets/especiales.png'
import Catalogo from '../Catalogo'
import soporte from '../../assets/soporte.png'
import Pilares from '../Pilares'
import { ServicioActivoProvider } from '../catalago/ServicioActivoContext'

// ============================================================
// UTILIDAD WHATSAPP
// ============================================================
const WHATSAPP_NUMBER = '3315342519' // ⚠️ Reemplazar con el real

function abrirWhatsApp(mensaje = '', origen = 'general') {
 if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
 window.gtag('event', 'click_whatsapp', {
 origen,
 mensaje: mensaje.slice(0, 100)
 })
 }
 const base = `https://wa.me/${WHATSAPP_NUMBER}`
 const url = mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base
 window.open(url, '_blank', 'noopener,noreferrer')
}

function mensajeServicio(servicio) {
 return `Hola, me interesa su servicio de ${servicio} y me gustaría recibir una propuesta para mi proyecto.

Les comparto algunos detalles para que puedan orientarme sobre la mejor opción:

Tipo de proyecto:
Medidas aproximadas:
Material o acabado de interés:
Fotografías o referencia:
Fecha estimada para realizarlo:
Ubicación:

Si necesitan algún dato adicional para recomendar la solución más adecuada, con gusto se los comparto.

Quedo pendiente de su propuesta y opciones para mi proyecto.`
}

function mensajeProyecto(tipo, nombre) {
 return `Hola, vi el proyecto "${nombre}" (${tipo}) y me gustaría cotizar algo similar.

Tipo de proyecto:
Medidas aproximadas:
Material o acabado de interés:
Fotografías o referencia:
Fecha estimada:
Ubicación:

Quedo pendiente de su propuesta.`
}

function mensajeGeneral() {
 return `Hola Cima Herrajes, me gustaría cotizar un proyecto. ¿Me pueden asesorar?`
}

// ============================================================
// HOOK REVEAL
// ============================================================
function useReveal(threshold = 0.12) {
 const ref = useRef(null)
 const [visible, setVisible] = useState(false)

 useEffect(() => {
 const el = ref.current
 if (!el || visible) return

 if (typeof IntersectionObserver === 'undefined') {
 setVisible(true)
 return
 }

 const io = new IntersectionObserver(
 ([entry]) => {
 if (entry.isIntersecting) {
 setVisible(true)
 io.disconnect()
 }
 },
 { threshold, rootMargin: '0px 0px -60px 0px' }
 )
 io.observe(el)
 return () => io.disconnect()
 }, [threshold, visible])

 return [ref, visible]
}

// ============================================================
// COMPONENTES BASE
// ============================================================
function Slide({ id, className = '', children }) {
 return (
 <section id={id} className={`slide ${className}`}>
 <div className="slide-inner">{children}</div>
 </section>
 )
}

function Reveal({ children, delay = 0, as: Tag = 'div', className = '', ...rest }) {
 const [ref, visible] = useReveal()
 return (
 <Tag
 ref={ref}
 className={`reveal ${visible ? 'in' : ''} ${className}`.trim()}
 style={{ transitionDelay: `${delay}ms` }}
 {...rest}
 >
 {children}
 </Tag>
 )
}

// ============================================================
// INDICADOR DE SCROLL
// ============================================================
function ScrollIndicator() {
 const [progress, setProgress] = useState(0)
 const [completado, setCompletado] = useState(false)

 useEffect(() => {
 let raf = 0

 const update = () => {
 cancelAnimationFrame(raf)
 raf = requestAnimationFrame(() => {
 const max = document.documentElement.scrollHeight - window.innerHeight
 const value = max > 0 ? window.scrollY / max : 0
 setProgress(Math.min(1, Math.max(0, value)))

 const contacto = document.getElementById('contacto')
 if (contacto) {
 const rect = contacto.getBoundingClientRect()
 setCompletado(rect.top <= window.innerHeight * 0.4)
 }
 })
 }

 update()
 window.addEventListener('scroll', update, { passive: true })
 window.addEventListener('resize', update)

 return () => {
 cancelAnimationFrame(raf)
 window.removeEventListener('scroll', update)
 window.removeEventListener('resize', update)
 }
 }, [])

 const sideWidth = `${Math.max(0, (1 - progress) * 50)}%`

 return (
 <div className={`scroll-indicator ${completado ? 'done' : ''}`} aria-hidden="true">
 <span
 className="scroll-indicator-line scroll-indicator-line-left"
 style={{ width: sideWidth }}
 />
 <span className="scroll-indicator-center" />
 <span
 className="scroll-indicator-line scroll-indicator-line-right"
 style={{ width: sideWidth }}
 />
 </div>
 )
}

// ============================================================
// SCROLL CINEMÁTICO
// ============================================================
function useCinematicScroll() {
 const lockedRef = useRef(false)
 const wheelAccumulatorRef = useRef(0)
 const unlockTimerRef = useRef(null)
 const lastWheelTsRef = useRef(0)
 const wheelStartTsRef = useRef(0)

 useEffect(() => {
 const isDesktopPointer = () =>
 window.matchMedia('(pointer: fine)').matches &&
 !window.matchMedia('(prefers-reduced-motion: reduce)').matches

 const GESTURE_THRESHOLD = 220
 const GESTURE_MAX_MS = 260
 const SNAP_COOLDOWN_MS = 260

 const getSlides = () =>
 Array.from(document.querySelectorAll('.landing .slide'))

 const animateTo = (targetY) => {
 if (lockedRef.current) return
 lockedRef.current = true

 const startY = window.scrollY
 const distance = targetY - startY
 const duration = 900
 const startTime = performance.now()
 const ease = (t) => 1 - Math.pow(1 - t, 4)

 const frame = (now) => {
 const elapsed = now - startTime
 const t = Math.min(1, elapsed / duration)
 window.scrollTo(0, startY + distance * ease(t))

 if (t < 1) {
 requestAnimationFrame(frame)
 return
 }

 clearTimeout(unlockTimerRef.current)
 unlockTimerRef.current = setTimeout(() => {
 lockedRef.current = false
 wheelAccumulatorRef.current = 0
 }, SNAP_COOLDOWN_MS)
 }
 requestAnimationFrame(frame)
 }

 const findTarget = (direction) => {
 const slides = getSlides()
 if (!slides.length) return null

 const currentY = window.scrollY
 const anchor = currentY + window.innerHeight * 0.4

 const positions = slides.map((slide) => ({
 element: slide,
 top: slide.getBoundingClientRect().top + currentY,
 }))

 if (direction > 0) {
 const next = positions.find((item) => item.top > anchor + 20)
 return next ? next.top : positions[positions.length - 1].top
 }

 const previous = [...positions]
 .reverse()
 .find((item) => item.top < anchor - 20)

 return previous ? previous.top : 0
 }

 const onWheel = (event) => {
 if (!isDesktopPointer()) return
 if (event.ctrlKey || event.metaKey) return

 if (lockedRef.current) {
 event.preventDefault()
 return
 }

 const delta = event.deltaY
 if (Math.abs(delta) < 2) return

 const now = performance.now()

 if (now - lastWheelTsRef.current > 180) {
 wheelAccumulatorRef.current = 0
 wheelStartTsRef.current = now
 }

 lastWheelTsRef.current = now
 wheelAccumulatorRef.current += delta

 const gestureDuration = now - wheelStartTsRef.current
 const accumulated = Math.abs(wheelAccumulatorRef.current)

 if (accumulated < GESTURE_THRESHOLD || gestureDuration > GESTURE_MAX_MS) {
 return
 }

 const direction = wheelAccumulatorRef.current > 0 ? 1 : -1
 const targetY = findTarget(direction)
 wheelAccumulatorRef.current = 0

 if (targetY !== null) {
 event.preventDefault()
 animateTo(targetY)
 }
 }

 const onKeyDown = (event) => {
 if (!isDesktopPointer() || lockedRef.current) return
 if (['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target?.tagName)) return

 if (!['PageDown', 'PageUp', ' '].includes(event.key)) return

 event.preventDefault()
 const direction = event.key === 'PageUp' ? -1 : 1
 const targetY = findTarget(direction)
 if (targetY !== null) animateTo(targetY)
 }

 window.addEventListener('wheel', onWheel, { passive: false })
 window.addEventListener('keydown', onKeyDown)

 return () => {
 window.removeEventListener('wheel', onWheel)
 window.removeEventListener('keydown', onKeyDown)
 clearTimeout(unlockTimerRef.current)
 }
 }, [])
}

// ============================================================
// IMAGEN EN RANURA
// ============================================================
function SlotImage({ src, alt = '', eyebrow = 'Detalle', title = '' }) {
 return (
 <section className="slot-image-section" aria-label={title || 'Detalle visual'}>
 <div className="slot-image-copy">
 <span className="kicker">{eyebrow}</span>
 {title && <h2 className="display">{title}</h2>}
 </div>

 <div className="slot-image-window" role="img" aria-label={alt}>
 <div
 className="slot-image-fixed"
 style={{ backgroundImage: `url(${src})` }}
 />
 </div>

 <div className="slot-image-frame" aria-hidden="true">
 <span className="slot-image-frame-top" />
 <span className="slot-image-frame-bottom" />
 </div>
 </section>
 )
}

// ============================================================
// DATA
// ============================================================
const SERVICIOS = [
  {
    titulo: 'Cancelería de aluminio y cristal',
    texto: 'Diseño y ejecución de soluciones para proyectos residenciales, comerciales y de construcción.',
    slug: 'canceleria-aluminio',
    img: canceleria
  },
  {
    titulo: 'Ventanales, ventanas y puertas de aluminio',
    texto: 'Sistemas corredizos, abatibles y de proyección con perfiles de alta resistencia.',
    slug: 'ventanales-puertas-aluminio',
    img: ventanales
  },
  {
    titulo: 'Barandales',
    texto: 'Barandales personalizados en vidrio, acero inoxidable y aluminio.',
    slug: 'barandales',
    img: barandales
  },
  {
    titulo: 'Cristal templado y proyectos especiales',
    texto: 'Divisiones, cubiertas, domos, pérgolas y canceles de baño.',
    slug: 'cristal-templado',
    img: especiales
  },
  {
    titulo: 'Espejos, muebles y acabados arquitectónicos',
    texto: 'Soluciones de diseño y funcionalidad para hogares, baños, vestidores y exteriores.',
    slug: 'espejos-acabados',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=75'
  },
  {
    titulo: 'Domótica',
    texto: 'Automatización y control inteligente para espacios residenciales y comerciales.',
    slug: 'domotica',
    img: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1000&q=75'
  }
]

const SERVICIO_DESTACADO = {
   titulo: 'Asesoría, mantenimiento y adecuaciones',
    texto: 'Mantenimiento preventivo y correctivo, reparación y renovación de instalaciones existentes, diagnóstico y evaluación técnica de trabajos previos, y asesoría especializada para optimizar y resolver proyectos existentes.',
    slug: 'asesoria-mantenimiento',
 eyebrow: 'SOLUCIONES INTEGRALES',
 img: soporte
}

const PROYECTOS = [
 {
 tipo: 'Residencial',
 nombre: 'Torre Alameda',
 img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
 large: true
 },
 {
 tipo: 'Comercial',
 nombre: 'Plaza Norte',
 img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=900&q=80'
 },
 {
 tipo: 'Corporativo',
 nombre: 'Oficinas Vertex',
 img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80'
 }
]

const REFERIDOS = [
 {
 texto: 'Encontrar un proveedor que entienda tiempos de obra, acabados y presupuesto no es fácil. Con Cima Herrajes dejamos de preocuparnos por eso.',
 autor: 'Arq. Daniela Ríos',
 cargo: 'Estudio AV'
 },
 {
 texto: 'Nos surtieron cancelería para 40 departamentos en tiempo récord. La calidad fue consistente en cada entrega.',
 autor: 'Ing. Marco Salinas',
 cargo: 'Constructora Delta'
 },
 {
 texto: 'Pedí cotización por WhatsApp un lunes y el miércoles ya tenía mis ventanas instaladas. Servicio impecable.',
 autor: 'Laura Méndez',
 cargo: 'Cliente residencial'
 }
]

// ============================================================
// HOME
// ============================================================
export default function Home() {
 // Estado de la burbuja de WhatsApp
 const [whatsappOpen, setWhatsappOpen] = useState(false)
 const [mensajeWhatsapp, setMensajeWhatsapp] = useState('')

 // Abrir burbuja con mensaje de un servicio
 const abrirBurbujaServicio = (servicioTitulo) => {
 setMensajeWhatsapp(mensajeServicio(servicioTitulo))
 setWhatsappOpen(true)
 }

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
const [menuOpen, setMenuOpen] = useState(false)

// Cierra el menú al hacer click en un link
const cerrarMenu = () => setMenuOpen(false)
 return (
    <ServicioActivoProvider>
 <div className="landing">
 <ScrollIndicator />
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

  {/* ⚠️ Asegúrate de que el className dinámico esté aquí */}
  <nav className={`landing-nav ${menuOpen ? 'open' : ''}`}>
    <a href="#inicio"    onClick={() => setMenuOpen(false)}>Inicio</a>
    <a href="#nosotros"  onClick={() => setMenuOpen(false)}>Nosotros</a>
    <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
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

 {/* ============ 1. HERO CON POST-IT ============ */}
 <section id="inicio" className="slide slide-hero">
  <div className="slide-inner hero-inner">


 <div className="hero-veil" />
<img className="hero-bg" src={banner} alt="" />   
    <div className="hero-body">
      <Reveal as="span" className="hero-eyebrow" delay={100}>
        CIMA HERRAJES · SOLUCIONES ARQUITECTÓNICAS
      </Reveal>

      <Reveal as="h1" delay={200}>
        Soluciones para proyectos<br />
        arquitectónicos de alto nivel.
      </Reveal>

      <Reveal as="p" delay={320}>
        Diseñamos, fabricamos e instalamos cancelería, aluminio,
        cristal templado, barandales y automatización para proyectos
        residenciales, comerciales y de construcción.
      </Reveal>


      <Reveal className="hero-actions" delay={520}>
        <a href="#servicios" className="hero-cta">
          Ver servicios <FiArrowRight size={18} />
        </a>
        <a href="#nosotros" className="hero-cta hero-cta-ghost">
          Conoce la empresa
        </a>
      </Reveal>
    </div>
{/* 
    <Reveal className="hero-postit" delay={600}>
      <span className="hero-postit-tag">CONTACTO RÁPIDO</span>
      <h3>¿Tienes un proyecto en mente?</h3>
      <p>Te asesoramos sin costo.</p>
      <button
        type="button"
        className="hero-postit-btn"
        onClick={() => abrirWhatsApp(mensajeGeneral(), 'hero-postit')}
      >
        Contáctanos <FiArrowUpRight size={16} />
      </button>
      <div className="hero-postit-contact">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FiPhone size={14} /> +52 000 000 0000
        </a>
        <a href="mailto:hola@cimaherrajes.mx">
          <FiMail size={14} /> hola@cimaherrajes.mx
        </a>
      </div>
    </Reveal> */}

    <div className="hero-scroll">
      <span>Desliza</span>
      <div className="hero-scroll-line" />
    </div>
  </div>
</section>
 {/* ============ 2. SOBRE NOSOTROS ============ */}

<Slide id="nosotros" className="slide-sobre-nosotros">
  <div className="about-content">
    <Reveal as="span" className="about-label" delay={80}>
      Sobre nosotros
    </Reveal>

    <Reveal as="h2" className="about-title" delay={160}>
      La experiencia nos respalda.
      <br />
      <span>Una nueva generación de especialistas nos define.</span>
    </Reveal>

    <Reveal as="h2" className="about-intro" delay={240}>
      Desarrollamos soluciones en vidrio, aluminio, automatización y
      acabados, adaptándonos a las necesidades de cada proyecto.
    </Reveal>

    <Reveal as="h2" className="about-text " delay={320}>
      Combinamos experiencia, innovación y una visión
      actual para crear, transformar y mantener espacios funcionales,
      estéticos e inteligentes.
    </Reveal>

    <Reveal as="h2" className="about-text" delay={400}>
      Nuestro trabajo va más allá de la fabricación e instalación.
      Acompañamos cada proyecto desde la asesoría y medición hasta su
      ejecución, cuidando la precisión, los acabados y cada detalle
      para entregar soluciones bien realizadas, funcionales y pensadas
      para durar.
    </Reveal>

    <Reveal className="about-footer" delay={480}>
      <div className="about-line" />
      <span>30+ AÑOS DE EXPERIENCIA</span>
    </Reveal>
  </div>
</Slide>
{/* ============ 3. SERVICIOS ============ */}
<Slide id="servicios" className="slide-servicios">
  <Reveal as="span" className="kicker center">NUESTROS SERVICIOS</Reveal>
  <Reveal as="h2" className="display center" delay={80}>
    Especialidades
  </Reveal>
  <Reveal as="p" className="servicios-sub" delay={140}>
    Soluciones integrales en aluminio, cristal templado y automatización
    para proyectos residenciales y comerciales.
  </Reveal>

  <div className="servicios-grid">
    {SERVICIOS.map((s, i) => {
      const delay = 120 + Math.floor(i / 3) * 120 + (i % 3) * 80;
      return (
        <Reveal key={s.slug} className="servicio-card" delay={delay}>
      <a
        href="#que-hacemos"
        className="servicio-card-link"
        onClick={() => setServicioActivo(s.slug)}
      >
      
            <div className="servicio-card-media">
              <img src={s.img} alt={s.titulo} loading="lazy" />
            </div>
            <div className="servicio-card-body">
              <div className="servicio-card-head">
                <span className="servicio-card-title">{s.titulo}</span>
                <span className="servicio-card-arrow" aria-hidden="true">
                  <FiArrowRight size={18} />
                </span>
              </div>
              <p>{s.texto}</p>
            </div>
          </a>
        </Reveal>
      );
    })}
  </div>

  {/* Card horizontal destacada */}
  <Reveal className="servicio-destacado" delay={200}>
    <div className="servicio-destacado-media">
      <img src={SERVICIO_DESTACADO.img} alt={SERVICIO_DESTACADO.titulo} loading="lazy" />
    </div>
    <div className="servicio-destacado-body">
      <span className="servicio-destacado-tag">{SERVICIO_DESTACADO.eyebrow}</span>
      <h3>{SERVICIO_DESTACADO.titulo}</h3>
      <p>{SERVICIO_DESTACADO.texto}</p>
    </div>
    <Link
      to={`/servicios/${SERVICIO_DESTACADO.slug}`}
      className="servicio-destacado-arrow"
      aria-label={SERVICIO_DESTACADO.titulo}
    >
      <FiArrowRight size={22} />
    </Link>
  </Reveal>

  {/* CTA final oscuro */}
  <Reveal delay={280}>
    <button
      type="button"
      className="servicios-cta-final"
      onClick={() => abrirBurbujaGeneral()}
    >
      <strong>¿Tienes un proyecto en mente?</strong>
      <span>
        Cotizar proyecto personalizado <FiArrowUpRight size={14} />
      </span>
    </button>
  </Reveal>
</Slide>
{/* ============ 4. HISTORIA · MISIÓN · GARANTÍA ============ */}
<Pilares />
{/* ============ 5. CÓMO TRABAJAMOS ============ */}
<Slide id="como-trabajamos" className="slide-hacemos">
  <div className="split">
    <Reveal className="split-media">
      <img
        src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80"
        alt="Taller Cima Herrajes"
      />
    </Reveal>

    <div className="split-text">
      <Reveal as="span" className="kicker" delay={80}>
        04 — Cómo trabajamos
      </Reveal>

      <Reveal as="h2" delay={140}>
        Nuestra forma de trabajar
      </Reveal>

      <Reveal as="p" delay={200}>
        Combinamos conocimiento técnico, control de calidad y
        acompañamiento cercano para llevar cada proyecto a una
        ejecución precisa, funcional y bien resuelta.
      </Reveal>

      <div className="split-pilares">
        <Reveal className="split-pilar" delay={260}>
          <div className="split-pilar-head">
            <div className="split-pilar-icon">
              <FiTool size={18} />
            </div>
            <h4>Experiencia</h4>
          </div>
          <p>
            Nuestro conocimiento técnico nos permite entender las
            necesidades de cada proyecto y ejecutarlas con precisión.
          </p>
        </Reveal>

        <Reveal className="split-pilar" delay={320}>
          <div className="split-pilar-head">
            <div className="split-pilar-icon">
              <FiShield size={18} />
            </div>
            <h4>Calidad</h4>
          </div>
          <p>
            Cuidamos cada etapa, desde los materiales y la fabricación
            hasta la instalación y los acabados.
          </p>
        </Reveal>

        <Reveal className="split-pilar" delay={380}>
          <div className="split-pilar-head">
            <div className="split-pilar-icon">
              <FiUsers size={18} />
            </div>
            <h4>Acompañamiento</h4>
          </div>
          <p>
            Acompañamos al cliente durante cada etapa, con comunicación
            cercana y seguimiento continuo.
          </p>
        </Reveal>

        <Reveal className="split-pilar" delay={440}>
          <div className="split-pilar-head">
            <div className="split-pilar-icon">
              <FiEdit3 size={18} />
            </div>
            <h4>Personalización</h4>
          </div>
          <p>
            Analizamos las necesidades de cada proyecto para encontrar
            la solución más adecuada.
          </p>
        </Reveal>
      </div>
    </div>
  </div>
</Slide>
 {/* ============ 6. IMAGEN EN RANURA ============ */}
 <section id="que-hacemos" className="titulo-seccion" aria-label="Especialidades">
 <span className="kicker">Que hacemos </span>
<h1 className="di">
  Soluciones diseñadas para adaptarse  <br /> a
  cada espacio y necesidad
</h1> <Catalogo interactivo={false} />
</section>
 

{/* ============ 7. PROCESO ============ */}
<Slide id="proceso" className="slide-proceso">
  <Reveal as="span" className="kicker">06 — Nuestro proceso</Reveal>
  <Reveal as="h2" className="display" delay={80}>
    Cuatro pasos simples, un resultado impecable.
  </Reveal>

  <div className="pasos">
    <div className="paso">
      <Reveal as="span" className="paso-num" delay={120}>01</Reveal>
      <Reveal as="h3" delay={160}>Asesoría y planeación</Reveal>
      <Reveal as="p" delay={200}>
        Cuéntanos tu proyecto. Revisamos tus necesidades, medidas, ubicación y características para definir la solución adecuada, y realizamos la medición en sitio.
      </Reveal>
    </div>

    <div className="paso">
      <Reveal as="span" className="paso-num" delay={200}>02</Reveal>
      <Reveal as="h3" delay={240}>Cotización</Reveal>
      <Reveal as="p" delay={280}>
        Preparamos la cotización de acuerdo con el proyecto.
      </Reveal>
    </div>

    <div className="paso">
      <Reveal as="span" className="paso-num" delay={280}>03</Reveal>
      <Reveal as="h3" delay={320}>Fabricación a medida</Reveal>
      <Reveal as="p" delay={360}>
        Fabricamos cada proyecto de acuerdo con las especificaciones definidas, cuidando funcionalidad, estética y calidad.
      </Reveal>
    </div>

    <div className="paso">
      <Reveal as="span" className="paso-num" delay={360}>04</Reveal>
      <Reveal as="h3" delay={400}>Instalación profesional</Reveal>
      <Reveal as="p" delay={440}>
        Instalamos con orden, limpieza y atención al detalle para entregar resultados funcionales, duraderos y con acabados impecables.
      </Reveal>
    </div>
  </div>
</Slide>
{/* ============ 8. VALORES ============ */}
<Slide id="valores" className="slide-valores">
  <Reveal as="span" className="kicker center">07 — Lo que nos define</Reveal>
  <Reveal as="h2" className="display center" delay={80}>
    Nuestros valores
  </Reveal>

  <div className="valores-grid">
    <Reveal className="valor" delay={120}>
      <div className="valor-icon"><FiShield size={22} /></div>
      <h3>Calidad</h3>
      <p>En cada solución, material y detalle.</p>
    </Reveal>
    <Reveal className="valor" delay={200}>
      <div className="valor-icon"><FiTool size={22} /></div>
      <h3>Compromiso</h3>
      <p>Cumplir lo que ofrecemos y responder por cada proyecto.</p>
    </Reveal>
    <Reveal className="valor" delay={280}>
      <div className="valor-icon"><FiClock size={22} /></div>
      <h3>Confianza</h3>
      <p>Construir relaciones duraderas a través de resultados y respaldo.</p>
    </Reveal>
  </div>
</Slide>
 {/* ============ 9. PROYECTOS ============ */}
 <Slide id="proyectos" className="slide-proyectos">
 <Reveal as="span" className="kicker">08 — Proyectos</Reveal>
 <Reveal as="h2" className="display" delay={80}>Trabajos destacados</Reveal>

 <div className="proyectos-grid">
 {PROYECTOS.map((p, i) => (
 <Reveal
 key={p.nombre}
 className={`proyecto ${ p.large ? 'large' : ''}`}
 delay={120 + i * 80}
 >
 <img src={p.img} alt={p.nombre} />
 <div className="proyecto-info">
 <span>{p.tipo}</span>
 <h3>{p.nombre}</h3>
 <button
 type="button"
 className="proyecto-cta"
 onClick={() => abrirWhatsApp(mensajeProyecto(p.tipo, p.nombre), `proyecto-${p.nombre}`)}
 >
 Cotizar algo similar <FiArrowUpRight size={14} />
 </button>
 </div>
 </Reveal>
 ))}
 </div>
 </Slide>

 {/* ============ 10. REFERIDOS ============ */}
 <Slide id="referidos" className="slide-referidos">
 <Reveal as="span" className="kicker center">09 — Referidos</Reveal>
 <Reveal as="h2" className="display center" delay={80}>
 Clientes que ya confían en nosotros
 </Reveal>

 <div className="referidos-grid">
 {REFERIDOS.map((r, i) => (
 <Reveal key={i} className="referido" delay={120 + i * 100}>
 <span className="referido-quote">"</span>
 <p>{r.texto}</p>
 <div className="referido-author">
 <strong>{r.autor}</strong>
 <span>{r.cargo}</span>
 </div>
 </Reveal>
 ))}
 </div>
 </Slide>

 {/* ============ 11. CIERRE / CONTACTO ============ */}
 <Slide id="contacto" className="slide-cierre">
 <Reveal as="span" className="kicker center">10 — Hablemos</Reveal>
 <Reveal as="h2" className="display center" delay={80}>
 ¿Tienes un proyecto en mente?
 </Reveal>
 <Reveal as="p" className="lead center" delay={140}>
 Escríbenos y te asesoramos sin costo.
 </Reveal>

 <div className="cierre-contacto">
 <Reveal as="a" href={`tel:+${WHATSAPP_NUMBER}`} className="cierre-item" delay={180}>
 <FiPhone size={18} />
 <div>
 <span>Teléfono</span>
 <strong>+52 000 000 0000</strong>
 </div>
 </Reveal>
 <Reveal as="a" href="mailto:hola@cimaherrajes.mx" className="cierre-item" delay={240}>
 <FiMail size={18} />
 <div>
 <span>Correo</span>
 <strong>hola@cimaherrajes.mx</strong>
 </div>
 </Reveal>
 <Reveal className="cierre-item" delay={300}>
 <FiMapPin size={18} />
 <div>
 <span>Ubicación</span>
 <strong>Tu ciudad, México</strong>
 </div>
 </Reveal>
 </div>

 <Reveal delay={360}>
 <button
 type="button"
 className="cierre-cta"
 onClick={() => abrirWhatsApp(mensajeGeneral(), 'cierre')}
 >
 Cotizar por WhatsApp <FiArrowUpRight size={18} />
 </button>
 </Reveal>
 </Slide>

 <footer className="landing-footer">
 <img src={logo} alt="Cima Herrajes" />
 <p>© {new Date().getFullYear()} Cima Herrajes. Todos los derechos reservados.</p>
 </footer>

 {/* ============ WHATSAPP FLOTANTE + BURBUJA ============ */}
 <div className={`whatsapp-float-container ${whatsappOpen ? 'open' : ''}`}>
 {/* Burbuja con input (solo visible cuando está abierta) */}
 {whatsappOpen && (
 <div className="whatsapp-bubble">
 <button
 type="button"
 className="whatsapp-close"
 onClick={() => setWhatsappOpen(false)}
 aria-label="Cerrar"
 >
 ×
 </button>

 <p className="whatsapp-bubble-label">Escribe tu mensaje:</p>

 <textarea
 value={mensajeWhatsapp}
 onChange={(e) => setMensajeWhatsapp(e.target.value)}
 rows={5}
 className="whatsapp-input"
 placeholder="Escribe tu mensaje..."
 />

 <button
 type="button"
 className="whatsapp-send"
 onClick={() => enviarWhatsApp('bubble')}
 >
 <FaWhatsapp size={18} />
 Enviar por WhatsApp
 </button>
 </div>
 )}

 {/* Icono flotante (siempre visible) */}
 <button
 type="button"
 className="whatsapp-float"
 onClick={() => {
 if (whatsappOpen) {
 setWhatsappOpen(false)
 } else {
 abrirBurbujaGeneral()
 }
 }}
 aria-label="WhatsApp"
 >
 <FaWhatsapp size={26} />
 </button>
 </div>

 {/* ============ BARRA STICKY (móvil) ============ */}
 <div className="mobile-cta-bar">
 <button
 type="button"
 onClick={() => abrirWhatsApp(mensajeGeneral(), 'sticky-mobile')}
 className="mobile-cta-btn"
 >
 <FaWhatsapp size={20} /> Cotizar por WhatsApp
 </button>
 </div>
 </div>
 </ServicioActivoProvider>
 )
}