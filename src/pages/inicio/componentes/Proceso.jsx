import TEXTOS from '../../../contenido/inicio/textos/Proceso.json'
import Slide from './Slide'
import Reveal from './Reveal'

export default function Proceso() {
  return (
<Slide id="proceso" className="slide-proceso">
  <Reveal as="span" className="kicker">{TEXTOS["03_proceso_de_trabajo"]}</Reveal>
  <Reveal as="h2" className="display" delay={80}>{TEXTOS.cuatro_pasos_simples_un_resultado_impecable}</Reveal>

  <div className="pasos">
    <div className="paso">
      <Reveal as="span" className="paso-num" delay={120}>{TEXTOS["01"]}</Reveal>
      <Reveal as="h3" delay={160}>{TEXTOS.asesoria_y_medicion}</Reveal>
      <Reveal as="p" delay={200}>{TEXTOS.conocemos_tu_proyecto_revisamos_tus_requerimientos_y}</Reveal>
    </div>

    <div className="paso">
      <Reveal as="span" className="paso-num" delay={200}>{TEXTOS["02"]}</Reveal>
      <Reveal as="h3" delay={240}>{TEXTOS.cotizacion_y_propuesta}</Reveal>
      <Reveal as="p" delay={280}>{TEXTOS.preparamos_una_cotizacion_detallada_de_acuerdo_con}</Reveal>
    </div>

    <div className="paso">
      <Reveal as="span" className="paso-num" delay={280}>{TEXTOS["03"]}</Reveal>
      <Reveal as="h3" delay={320}>{TEXTOS.fabricacion_a_medida}</Reveal>
      <Reveal as="p" delay={360}>{TEXTOS.fabricamos_cada_proyecto_con_materiales_de_calidad}</Reveal>
    </div>

    <div className="paso">
      <Reveal as="span" className="paso-num" delay={360}>{TEXTOS["04"]}</Reveal>
      <Reveal as="h3" delay={400}>{TEXTOS.instalacion_y_entrega}</Reveal>
      <Reveal as="p" delay={440}>{TEXTOS.realizamos_la_instalacion_con_profesionalismo_y_cuidado}</Reveal>
    </div>
  </div>
</Slide>
  )
}
