import { formatearTexto } from '../../../utilidades/plantillas.js'
import TEXTOS from '../../../contenido/inicio/textos/ServiciosInicio.json'
import { FiArrowRight, FiArrowUpRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { SERVICIOS, SERVICIO_DESTACADO } from "../../../contenido/inicio/secciones.js"
import Slide from './Slide'
import Reveal from './Reveal'
import { useServicioActivo } from '../../catalogo/ServicioActivoContext'

export default function ServiciosInicio({ abrirBurbujaGeneral }) {
  const { activarServicio } = useServicioActivo()
  return (
    <Slide id="servicios" className="slide-servicios">
      <Reveal as="span" className="kicker center">{TEXTOS["02_nuestros_servicios"]}</Reveal>
      <Reveal as="h2" className="display center" delay={80}>{TEXTOS.especialidades}</Reveal>
      <Reveal as="p" className="servicios-sub" delay={140}>{TEXTOS.soluciones_integrales_en_aluminio_cristal_templado_y}</Reveal>

      <div className="servicios-grid">
        {SERVICIOS.map((s, i) => {
          const delay = 120 + Math.floor(i / 3) * 120 + (i % 3) * 80;
          return (
            <Reveal key={s.slug} className="servicio-card" delay={delay}>
              <Link
                to="/servicios#catalogo"
                className="servicio-card-link"
                onClick={() => {
                  activarServicio(s.slug, s.titulo)
                }}
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
              </Link>
            </Reveal>
          );
        })}
      </div>

      {/* Card horizontal destacada */}
      <Reveal className="servicio-destacado" delay={200}>
        <button
          type="button"
          className="servicio-destacado-trigger"
          onClick={() => abrirBurbujaGeneral()}
          aria-label={formatearTexto(TEXTOS["plantilla_cotizar_dato1"], { dato1: (SERVICIO_DESTACADO.titulo) })}
        >
          <div className="servicio-destacado-media">
            <img src={SERVICIO_DESTACADO.img} alt={SERVICIO_DESTACADO.titulo} loading="lazy" />
          </div>
          <div className="servicio-destacado-body">
            <span className="servicio-destacado-tag">{SERVICIO_DESTACADO.eyebrow}</span>
            <h3>{SERVICIO_DESTACADO.titulo}</h3>
            <p>{SERVICIO_DESTACADO.texto}</p>
          </div>
          <span className="servicio-destacado-arrow" aria-hidden="true">
            <FiArrowRight size={22} />
          </span>
        </button>
      </Reveal>

      {/* CTA final oscuro */}
      <Reveal delay={280}>
        <button
          type="button"
          className="servicios-cta-final"
          onClick={() => abrirBurbujaGeneral()}
        >
          <strong>{TEXTOS.tienes_un_proyecto_en_mente}</strong>
          <span>{TEXTOS.cotizar_proyecto_personalizado}<FiArrowUpRight size={14} />
          </span>
        </button>
      </Reveal>
    </Slide>
  )
}
