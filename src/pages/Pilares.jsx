import { formatearTexto } from '../utilidades/plantillas.js'
import TEXTOS from '../contenido/inicio/textos/Pilares.json'
import { PILARES } from '../contenido/inicio/pilares.js'
import { useRef, useState, useEffect, useCallback } from "react"
import { motion as Motion, AnimatePresence } from "framer-motion"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import "../styles/pilares.css"

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

  const pilares = PILARES

  const [[index, direction], setState] = useState([0, 1])
  const total = pilares.length

  const paginate = useCallback((dir) => {
    setState(([i]) => [(i + dir + total) % total, dir])
  }, [total])

  const goTo = useCallback((i) => {
    setState(([current]) => [i, i > current ? 1 : -1])
  }, [])

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

  return (
    <Slide id="pilares" className="slide-pilares">
      <Reveal as="span" className="kicker center" delay={190}>{TEXTOS["03_pilares_que_nos_definen"]}</Reveal>

      <Reveal as="h2" className="display center" delay={0}>{TEXTOS.historia_mision_garantia}</Reveal>

      <Reveal as="p" className="servicios-sub dysplay center" delay={0}>{TEXTOS.de_donde_venimos_que_nos_mueve_que}</Reveal>

      <Reveal className="esencia-carrusel" delay={200}>
        <div className="esencia-controls">
          <button
            type="button"
            className="esencia-arrow"
            onClick={() => paginate(-1)}
            aria-label={TEXTOS.anterior}
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
                aria-label={formatearTexto(TEXTOS["plantilla_ir_a_dato1"], { dato1: (p.titulo) })}
                className={`esencia-dot ${i === index ? 'active' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="esencia-arrow"
            onClick={() => paginate(1)}
            aria-label={TEXTOS.siguiente}
          >
            <FiArrowRight size={16} />
          </button>
        </div>

        <div className="esencia-stage">
          <AnimatePresence mode="wait" custom={direction}>
            <Motion.article
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
                      <span className="esencia-sello-ch esencia-sello-marca">{TEXTOS.cima_herrajes}</span>
                      <span className="esencia-sello-text">{TEXTOS.sello_de}<br />{TEXTOS.garantia}</span>
                    </div>
                  </div>
                )}
              </div>

              <h3>{pilar.titulo}</h3>

              {pilar.parrafos.map((txt, k) => (
                <p key={k}>{txt}</p>
              ))}

              {pilar.cierre && <p className="esencia-cierre">{pilar.cierre}</p>}
            </Motion.article>
          </AnimatePresence>
        </div>

        <div className="esencia-progreso">
          <Motion.span
            className="esencia-progreso-bar"
            animate={{ width: `${((index + 1) / total) * 100}%` }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </div>
      </Reveal>
    </Slide>
  )
}
