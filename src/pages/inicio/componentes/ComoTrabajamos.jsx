import TEXTOS from '../../../contenido/inicio/textos/ComoTrabajamos.json'
import { imagen_como_trabajamos_azul as fotoTrabajo } from '../../../contenido/imagenes/seleccion.js'
import { FiTool, FiShield, FiUsers, FiEdit3 } from 'react-icons/fi'
import Slide from './Slide'
import Reveal from './Reveal'

export default function ComoTrabajamos() {
  return (
<Slide id="como-trabajamos" className="slide-hacemos">
  <div className="split">
    <Reveal className="split-media" delay={280}>
      <img
        src={fotoTrabajo}
        alt={TEXTOS.toma_de_medidas_de_una_ventana_sobre}
      />
    </Reveal>

    <div className="split-text">
      <Reveal as="span" className="kicker" delay={80}>{TEXTOS["04_como_trabajamos"]}</Reveal>

      <Reveal as="h2" delay={140}>{TEXTOS.nuestra_forma_de_trabajar}</Reveal>

      <Reveal as="p" delay={200}>{TEXTOS.combinamos_conocimiento_tecnico_control_de_calidad_y}</Reveal>

      <div className="split-pilares">
        <Reveal className="split-pilar" delay={260}>
          <div className="split-pilar-head">
            <div className="split-pilar-icon">
              <FiTool size={18} />
            </div>
            <h4>{TEXTOS.experiencia}</h4>
          </div>
          <p>{TEXTOS.nuestro_conocimiento_tecnico_nos_permite_entender_las}</p>
        </Reveal>

        <Reveal className="split-pilar" delay={320}>
          <div className="split-pilar-head">
            <div className="split-pilar-icon">
              <FiShield size={18} />
            </div>
            <h4>{TEXTOS.calidad}</h4>
          </div>
          <p>{TEXTOS.cuidamos_cada_etapa_desde_los_materiales_y}</p>
        </Reveal>

        <Reveal className="split-pilar" delay={380}>
          <div className="split-pilar-head">
            <div className="split-pilar-icon">
              <FiUsers size={18} />
            </div>
            <h4>{TEXTOS.acompanamiento}</h4>
          </div>
          <p>{TEXTOS.acompanamos_al_cliente_durante_cada_etapa_con}</p>
        </Reveal>

        <Reveal className="split-pilar" delay={440}>
          <div className="split-pilar-head">
            <div className="split-pilar-icon">
              <FiEdit3 size={18} />
            </div>
            <h4>{TEXTOS.personalizacion}</h4>
          </div>
          <p>{TEXTOS.analizamos_las_necesidades_de_cada_proyecto_para}</p>
        </Reveal>
      </div>
    </div>
  </div>
</Slide>
  )
}
