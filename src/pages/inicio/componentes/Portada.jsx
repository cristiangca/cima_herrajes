import { useState } from 'react'
import heroAlternativo from '../../../assets/hero-2.png'
import { FiArrowRight, FiRefreshCw } from 'react-icons/fi'
import { banner } from '../../../contenido/inicio'
import { PORTADA } from '../../../contenido/sitio'
import Reveal from './Reveal'

export default function Portada() {
  const [imagenAlternativa, setImagenAlternativa] = useState(false)
  return (
<section id="inicio" className="slide slide-hero">
  <div className="slide-inner hero-inner">


 <div className="hero-veil" />
<img className={`hero-bg hero-imagen-comparable ${imagenAlternativa ? 'hero-imagen-oculta' : ''}`} src={banner} alt="" />
<img className={`hero-bg hero-imagen-comparable ${imagenAlternativa ? '' : 'hero-imagen-oculta'}`} src={heroAlternativo} alt="" />   
    <div className="hero-body">
      <Reveal as="span" className="hero-eyebrow" delay={100}>
        CIMA HERRAJES · SOLUCIONES ARQUITECTÓNICAS
      </Reveal>

      <Reveal as="h1" delay={200}>
        {PORTADA.titulo}
      </Reveal>

      <Reveal as="p" delay={320}>
        {PORTADA.descripcion}
      </Reveal>


      <Reveal className="hero-actions" delay={520}>
        <a href="#servicios" className="hero-cta">
          Ver servicios <FiArrowRight size={18} />
        </a>
        <a href="#nosotros" className="hero-cta hero-cta-ghost">
          Conoce la empresa
        </a>
      </Reveal>
      <button type="button" className="hero-cambiar-imagen" onClick={() => setImagenAlternativa(actual => !actual)}
        aria-label={`Cambiar a imagen de portada ${imagenAlternativa ? '1' : '2'}`}>
        <FiRefreshCw size={14} aria-hidden="true" /> Cambiar imagen
        <span aria-live="polite">{imagenAlternativa ? '2 / 2' : '1 / 2'}</span>
      </button>
    </div>


    <div className="hero-scroll">
      <span>Desliza</span>
      <div className="hero-scroll-line" />
    </div>
  </div>
</section>
  )
}
