import { formatearTexto } from '../../utilidades/plantillas.js'
import TEXTOS from '../../contenido/servicios/textos/SolucionesCarrusel.json'
import { SOLUCIONES } from '../../contenido/servicios/soluciones.js'
import AJUSTES from '../../contenido/servicios/carrusel.json'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPause, FiPlay, FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import './solucionesCarrusel.css'


export default function SolucionesCarrusel({ verSolucion }) {
  const viewport = useRef(null)
  const track = useRef(null)
  const direction = useRef(1)
  const [paused, setPaused] = useState(false)
  const [interacting, setInteracting] = useState(false)
  const [visible, setVisible] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [photos, setPhotos] = useState([0, 0, 0, 0])
  const phase = useRef(0)
  const pending = useRef(0)
  const photoClock = useRef({ elapsed: 0, nextCard: 0 })
  const [navigation, setNavigation] = useState(0)
  const [pageActive, setPageActive] = useState(!document.hidden)

  const desplazar = sentido => {
    if (reduced || interacting) {
      viewport.current.scrollBy({ left: -sentido * (track.current.children[0].offsetWidth + 20), behavior: reduced ? 'instant' : 'smooth' })
      return
    }
    direction.current = sentido
    pending.current += sentido * (track.current.children[0].offsetWidth + 20)
    setNavigation(value => value + 1)
  }

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(preference.matches)
    sync()
    preference.addEventListener('change', sync)
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    observer.observe(viewport.current)
    let lastY = window.scrollY
    const onScroll = () => {
      const delta = window.scrollY - lastY
      if (Math.abs(delta) > 2) {
        direction.current = delta > 0 ? -1 : 1
        lastY = window.scrollY
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    const onVisibility = () => setPageActive(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      preference.removeEventListener('change', sync)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  useEffect(() => {
    if (!visible || !pageActive || interacting || reduced || (paused && Math.abs(pending.current) < .1)) return
    const rail = track.current
    const cards = Array.from(rail.children)
    let stride = rail.children[0].getBoundingClientRect().width + 20
    const observer = new ResizeObserver(() => { stride = rail.children[0].getBoundingClientRect().width + 20 })
    observer.observe(rail.children[0])
    let frame, previous, velocity = direction.current * AJUSTES.velocidadPixelesSegundo
    const animate = time => {
      const dt = previous ? Math.min((time - previous) / 1000, .05) : 0
      previous = time
      if (!document.hidden && stride > 0) {
        velocity += (direction.current * AJUSTES.velocidadPixelesSegundo - velocity) * (1 - Math.exp(-dt * 5))
        const cycle = stride * SOLUCIONES.length
        const movement = pending.current * (1 - Math.exp(-dt * 8))
        pending.current -= movement
        phase.current = ((phase.current + (paused ? 0 : velocity * dt) + movement) % cycle + cycle) % cycle
        // Recycle each of the four cards only after it has fully left the viewport.
        cards.forEach((card, i) => {
          const x = ((i * stride + phase.current + stride) % cycle) - stride
          card.style.transform = `translate3d(${x}px, 0, 0)`
        })
        if (!paused) photoClock.current.elapsed += dt
        if (photoClock.current.elapsed > AJUSTES.cambioImagenSegundos) {
          const index = photoClock.current.nextCard++ % SOLUCIONES.length
          setPhotos(current => current.map((value, i) => i === index ? (value + 1) % SOLUCIONES[i].fotos.length : value))
          photoClock.current.elapsed = 0
        }
      }
      if (paused && Math.abs(pending.current) < .1) { pending.current = 0; return }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [visible, pageActive, paused, interacting, reduced, navigation])

  return (
    <section id="soluciones" className="servicios-especialidades soluciones-continuas">
      <div className="servicios-especialidades-header">
        <span>{TEXTOS["02_nuestras_soluciones"]}</span>
        <h2>{TEXTOS.disenamos_espacios_funcionales_y_modernos}</h2>
      </div>
      <div className="soluciones-toolbar">
        <p>{TEXTOS.una_solucion_para_cada_espacio}</p>
        {!reduced && <button type="button" onClick={() => setPaused(value => !value)} aria-label={paused ? TEXTOS.reanudar_carrusel : TEXTOS.pausar_carrusel}>{paused ? <FiPlay /> : <FiPause />}{paused ? TEXTOS["reanudar"] : TEXTOS["pausar"]}</button>}
      </div>
      <div className="soluciones-marco">
      <button type="button" className="soluciones-lateral soluciones-anterior" onClick={() => desplazar(1)} aria-label={TEXTOS.ver_solucion_anterior} aria-controls="soluciones-carrusel"><FiArrowLeft aria-hidden="true" /></button>
      <div id="soluciones-carrusel" className="soluciones-ventana" ref={viewport} role="region" aria-label={TEXTOS.cuatro_soluciones_y_productos_del_catalogo} tabIndex={0}
        onFocusCapture={event => { if (event.target.matches(':focus-visible')) setInteracting(true) }} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setInteracting(false) }}>
        <div className={`soluciones-pista${reduced || interacting ? ' soluciones-estaticas' : ''}`} ref={track}>
              {SOLUCIONES.map((solucion, i) => (
                <article className="especialidad-card" key={solucion.slug} style={{ '--indice': i }} aria-label={formatearTexto(TEXTOS["plantilla_solucion_dato1_de_4_dato2"], { dato1: (i + 1), dato2: (solucion.titulo) })}>
                  <div className="solucion-numero"><strong>{TEXTOS["0"]}{i + 1}</strong><small>{TEXTOS.solucion}{i + 1}{TEXTOS.de_4}</small></div>
                  <Link className="especialidad-img-container" to={`/servicios/${solucion.fotos[photos[i]][2]}`} aria-label={formatearTexto(TEXTOS["plantilla_ver_producto_dato1"], { dato1: (solucion.fotos[photos[i]][1]) })}>
                    {solucion.fotos.map(([src, alt], j) => <img key={src} src={src} alt={alt} loading="lazy" decoding="async" className={photos[i] === j ? 'foto-activa' : ''} aria-hidden={photos[i] !== j} />)}
                    <div className="solucion-foto-nombre">{solucion.fotos[photos[i]][1]} <FiArrowRight aria-hidden="true" /></div>
                  </Link>
                  <h3>{solucion.titulo}</h3>
                  <p>{solucion.texto}</p>
                  <button type="button" className="especialidad-cta" onClick={() => verSolucion(solucion.slug, solucion.titulo)}>{TEXTOS.explorar_solucion}<FiArrowRight aria-hidden="true" /></button>
                </article>
              ))}
        </div>
      </div>
      <button type="button" className="soluciones-lateral soluciones-siguiente" onClick={() => desplazar(-1)} aria-label={TEXTOS.ver_siguiente_solucion} aria-controls="soluciones-carrusel"><FiArrowRight aria-hidden="true" /></button>
      </div>
    </section>
  )
}
