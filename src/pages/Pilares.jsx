import { useRef, useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import "../styles/pilares.css"

export default function Pilares() {
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
  // DATOS
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
  // ESTADO
  // ============================================================
  const [[index, direction], setState] = useState([0, 1])
  const total = pilares.length

  const paginate = useCallback((dir) => {
    setState(([i]) => [(i + dir + total) % total, dir])
  }, [total])

  const goTo = useCallback((i) => {
    setState(([current]) => [i, i > current ? 1 : -1])
  }, [])

  // ============================================================
  // VARIANTS
  // ============================================================
  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.98,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 280, damping: 32 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.35 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: "spring", stiffness: 280, damping: 32 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.3 },
      },
    }),
  }

  const pilar = pilares[index]

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <Slide id="pilares" className="slide-pilares">
      <Reveal as="span" className="kicker center" delay={40}>
        Pilares que nos definen
      </Reveal>

      <Reveal as="h2" className="display center" delay={80}>
        Historia · Misión · Garantía
      </Reveal>

      <Reveal as="p" className="servicios-sub dysplay center" delay={140}>
        De dónde venimos → Qué nos mueve → Qué respaldamos
      </Reveal>

      <Reveal className="esencia-carrusel" delay={200}>
        {/* ---------- Controles flotantes (overlay) ---------- */}
        <div className="esencia-controls">
          <button
            type="button"
            className="esencia-arrow"
            onClick={() => paginate(-1)}
            aria-label="Anterior"
          >
            <FiArrowLeft size={16} />
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
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="esencia-arrow"
            onClick={() => paginate(1)}
            aria-label="Siguiente"
          >
            <FiArrowRight size={16} />
          </button>
        </div>

        {/* ---------- Stage ---------- */}
        <div className="esencia-stage">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.article
              key={pilar.id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(e, info) => {
                if (info.offset.x < -60) paginate(1)
                else if (info.offset.x > 60) paginate(-1)
              }}
              className={`esencia-card ${
                pilar.destacada ? 'esencia-card-destacada' : ''
              }`}
            >
              <div className="esencia-card-head">
                <div className="esencia-number">{pilar.numero}</div>

                {pilar.destacada && (
                  <div className="esencia-sello">
                    <div className="esencia-sello-inner">
                      <span className="esencia-sello-ch">CH</span>
                      <span className="esencia-sello-text">
                        SELLO DE<br />GARANTÍA
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <h3>{pilar.titulo}</h3>
              {/* <p className="esencia-lead">{pilar.lead}</p> */}

              {pilar.parrafos.map((txt, k) => (
                <p key={k}>{txt}</p>
              ))}

              {pilar.cierre && <p className="esencia-cierre">{pilar.cierre}</p>}
            </motion.article>
          </AnimatePresence>
        </div>

        {/* ---------- Progreso (debajo del stage) ---------- */}
        <div className="esencia-progreso">
          <motion.span
            className="esencia-progreso-bar"
            animate={{ width: `${((index + 1) / total) * 100}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </div>
      </Reveal>
    </Slide>
  )
}