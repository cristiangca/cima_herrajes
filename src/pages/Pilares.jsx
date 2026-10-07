import { useRef, useState, useEffect, useCallback } from "react"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import '../styles/pilares.css'
export default function Pilares() {
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
  // DATOS DEL CARRUSEL
  // ============================================================
  const pilares = [
    {
      id: 'historia',
      numero: '01',
      titulo: 'Nuestra historia',
      lead: 'De dónde venimos',
      parrafos: [
        'CH nace en Guadalajara con el propósito de elevar la calidad en los proyectos de construcción, ofreciendo soluciones funcionales, estéticas y hechas a la medida de cada espacio.',
        'Desde nuestros inicios hemos cuidado cada etapa del proyecto: desde la asesoría y toma de medidas hasta la fabricación e instalación final. Esta forma de trabajar nos ha permitido participar en proyectos residenciales, comerciales y arquitectónicos, manteniendo altos estándares de calidad, orden y compromiso.',
        'Nuestra trayectoria ha crecido junto con la confianza de nuestros clientes, respaldada por la precisión en cada ejecución.',
      ],
    },
    {
      id: 'mision',
      numero: '02',
      titulo: 'Nuestra misión',
      lead: 'Qué nos mueve',
      parrafos: [
        'Crear soluciones que aporten funcionalidad, seguridad y valor estético a cada proyecto, combinando diseño, precisión y una ejecución profesional.',
        'Nuestro compromiso está en cuidar cada detalle del proceso para entregar proyectos bien ejecutados, con orden, limpieza y calidad de principio a fin.',
        'Trabajamos de manera cercana y profesional, entendiendo cada proyecto y acompañando a nuestros clientes en cada etapa para convertirnos en un aliado confiable para arquitectos, constructoras, desarrolladores y clientes particulares.',
      ],
    },
    {
      id: 'garantia',
      numero: '03',
      titulo: 'Nuestro sello',
      lead: 'Qué respaldamos',
      destacada: true,
      parrafos: [
        'En CH sabemos que la calidad de un proyecto se demuestra en el resultado final. Por eso, cada solución que entregamos está respaldada por la calidad de nuestros materiales, la precisión en su ejecución y el cuidado de cada detalle.',
        'Nuestro sello representa una forma de hacer las cosas en la que el cliente puede confiar: lo que ofrecemos, lo cumplimos; lo que hacemos, lo respaldamos.',
      ],
      cierre: 'CH es sinónimo de calidad, cumplimiento y confianza en cada proyecto.',
    },
  ]

  // ============================================================
  // ESTADO DEL CARRUSEL
  // ============================================================
  const [index, setIndex] = useState(0)
  const total = pilares.length

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % total)
  }, [total])

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + total) % total)
  }, [total])

  // -------- Swipe táctil --------
  const touchStartX = useRef(null)
  const touchEndX = useRef(null)

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX
  }
  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX
    if (touchStartX.current === null) return
    const delta = touchStartX.current - touchEndX.current
    if (Math.abs(delta) > 50) {
      delta > 0 ? next() : prev()
    }
    touchStartX.current = null
    touchEndX.current = null
  }

  // -------- Teclado --------
  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  return (
    <Slide id="pilares" className="slide-pilares">
      <Reveal as="span" className="kicker center" delay={40}>
        Pilares que nos definen
      </Reveal>
      <Reveal as="h2" className="display center" delay={80}>
        Historia · Misión · Garantía
      </Reveal>
      <Reveal as="p" className="servicios-sub center" delay={140}>
        De dónde venimos → Qué nos mueve → Qué respaldamos
      </Reveal>

      <Reveal className="esencia-carrusel" delay={200}>
        {/* -------- Slides -------- */}
        <div
          className="esencia-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="region"
          aria-roledescription="carrusel"
          aria-label="Historia, misión y garantía"
        >
          {pilares.map((p) => (
            <article
              key={p.id}
              className={`esencia-card ${p.destacada ? 'esencia-card-destacada' : ''}`}
              aria-hidden={index !== pilares.indexOf(p)}
            >
              <div className="esencia-number">{p.numero}</div>

              {p.destacada && (
                <div className="esencia-sello">
                  <div className="esencia-sello-inner">
                    <span className="esencia-sello-ch">CH</span>
                    <span className="esencia-sello-text">
                      SELLO DE<br />GARANTÍA
                    </span>
                  </div>
                </div>
              )}

              <h3>{p.titulo}</h3>
              <p className="esencia-lead">{p.lead}</p>

              {p.parrafos.map((txt, i) => (
                <p key={i}>{txt}</p>
              ))}

              {p.cierre && (
                <p className="esencia-cierre">{p.cierre}</p>
              )}
            </article>
          ))}
        </div>

        {/* -------- Controles -------- */}
        <div className="esencia-controles">
          <button
            type="button"
            className="esencia-btn"
            onClick={prev}
            aria-label="Anterior"
          >
            <FiArrowLeft size={18} />
          </button>

          <div className="esencia-dots" role="tablist">
            {pilares.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Ir a ${p.titulo}`}
                className={`esencia-dot ${i === index ? 'active' : ''}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="esencia-btn"
            onClick={next}
            aria-label="Siguiente"
          >
            <FiArrowRight size={18} />
          </button>
        </div>

        {/* -------- Progreso -------- */}
        <div className="esencia-progreso">
          <span
            className="esencia-progreso-bar"
            style={{ width: `${((index + 1) / total) * 100}%` }}
          />
        </div>
      </Reveal>
    </Slide>
  )
}