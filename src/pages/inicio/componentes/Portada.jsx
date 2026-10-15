import { FiArrowRight } from 'react-icons/fi'
import { banner } from '../../../contenido/inicio'
import { PORTADA } from '../../../contenido/sitio'
import Reveal from './Reveal'

export default function Portada() {
  return (
<section id="inicio" className="slide slide-hero">
  <div className="slide-inner hero-inner">


 <div className="hero-veil" />
<img className="hero-bg" src={banner} alt="" />   
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
    </div>


    <div className="hero-scroll">
      <span>Desliza</span>
      <div className="hero-scroll-line" />
    </div>
  </div>
</section>
  )
}
