import { FiTool, FiShield, FiUsers, FiEdit3 } from 'react-icons/fi'
import Slide from './Slide'
import Reveal from './Reveal'

export default function ComoTrabajamos() {
  return (
<Slide id="como-trabajamos" className="slide-hacemos">
  <div className="split">
    <Reveal className="split-media" delay={280}>
      <img
        src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=80"
        alt="Taller Cima Herrajes"
      />
    </Reveal>

    <div className="split-text">
      <Reveal as="span" className="kicker" delay={80}>
        04- Cómo trabajamos
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
  )
}
