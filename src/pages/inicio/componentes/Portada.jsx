import { formatearTexto } from '../../../utilidades/plantillas.js'
import TEXTOS from '../../../contenido/inicio/textos/Portada.json'
import { useState } from 'react'
import { imagen_hero_2 as heroAlternativo } from '../../../contenido/imagenes/seleccion.js'
import { FiArrowRight, FiRefreshCw } from 'react-icons/fi'
import { banner } from "../../../contenido/inicio/secciones.js"
import { PORTADA } from "../../../contenido/general/sitio.js"
import Reveal from './Reveal'
import '../../../styles/portada.css'

export default function Portada() {
  const [imagenAlternativa, setImagenAlternativa] = useState(false)
return (
<section id="inicio" className="slide slide-hero">
  <div className="slide-inner hero-inner">


 <div className="hero-veil" />
<div className="hero-visual">
<img className={`hero-bg hero-imagen-comparable ${imagenAlternativa ? 'hero-imagen-oculta' : ''}`} src={banner} alt="" />
<img className={`hero-bg hero-imagen-comparable ${imagenAlternativa ? '' : 'hero-imagen-oculta'}`} src={heroAlternativo} alt="" />
</div>
    <div className="hero-body">
      <Reveal as="span" className="hero-eyebrow" delay={100}>{TEXTOS.cima_herrajes_soluciones_arquitectonicas}</Reveal>

      <Reveal as="h1" delay={200}>
        {PORTADA.titulo}
      </Reveal>

      <Reveal as="p" delay={320}>
        {PORTADA.descripcion}
      </Reveal>


      <Reveal className="hero-actions" delay={520}>
        <a href="#servicios" className="hero-cta">{TEXTOS.ver_servicios}<FiArrowRight size={18} />
        </a>
        <a href="#nosotros" className="hero-cta hero-cta-ghost">{TEXTOS.conoce_la_empresa}</a>
      </Reveal>
      <button type="button" className="hero-cambiar-imagen" onClick={() => setImagenAlternativa(actual => !actual)}
        aria-label={formatearTexto(TEXTOS["plantilla_cambiar_a_imagen_de_portada_dato1"], { dato1: (imagenAlternativa ? '1' : '2') })}>
        <FiRefreshCw size={14} aria-hidden="true" />{TEXTOS.cambiar_imagen}<span aria-live="polite">{imagenAlternativa ? '2 / 2' : '1 / 2'}</span>
      </button>
    </div>


    <div className="hero-scroll">
      <span>{TEXTOS.desliza}</span>
      <div className="hero-scroll-line" />
    </div>
  </div>
</section>
  )
}
