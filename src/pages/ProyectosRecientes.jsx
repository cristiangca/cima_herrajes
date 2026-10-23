import { formatearTexto } from '../utilidades/plantillas.js'
import TEXTOS from '../contenido/proyectos/textos/ProyectosRecientes.json'
import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiPlus } from 'react-icons/fi'
import Encabezado from './inicio/componentes/Encabezado'
import PiePagina from './inicio/componentes/PiePagina'
import Testimonios from './inicio/componentes/Testimonios'
import Contacto from './inicio/componentes/Contacto'
import Reveal from './inicio/componentes/Reveal'
import Slide from './inicio/componentes/Slide'
import { abrirWhatsApp, mensajeProyecto } from './inicio/utilidades/whatsapp'
import { PROYECTOS_RECIENTES } from '../contenido/proyectos/seleccion.js'
import '../styles/home.css'

function TarjetaReciente({ proyecto, indice }) {
  return <Reveal as="article" className="reciente-tarjeta" delay={indice * 70}>
    <div className="reciente-resultado">
      <img src={proyecto.despues} alt={formatearTexto(TEXTOS["plantilla_resultado_de_referencia_dato1"], { dato1: (proyecto.nombre) })} loading="lazy" />
      <span className="reciente-etiqueta">{TEXTOS.despues}</span>
      <div className="reciente-titulo"><span>{proyecto.tipo}</span><h2>{proyecto.nombre}</h2></div>
    </div>
    <div className="reciente-cuerpo">
      <span className="reciente-materiales">{proyecto.detalle}</span>
      <p>{proyecto.descripcion}</p>
      {proyecto.antes && <div className="reciente-origen">
        <img src={proyecto.antes} alt={formatearTexto(TEXTOS["plantilla_antes_imagen_de_referencia_para_dato1"], { dato1: (proyecto.nombre) })} loading="lazy" />
        <div><span className="kicker">{TEXTOS.antes}</span><p>{TEXTOS.el_punto_de_partida_para_imaginar_un}</p></div>
      </div>}
      {proyecto.ejemplo && <small className="reciente-referencia">{TEXTOS.imagenes_genericas_de_referencia}</small>}
      <button type="button" className="reciente-cotizar" onClick={() => abrirWhatsApp(mensajeProyecto(proyecto.tipo, proyecto.nombre), 'recientes')}>{TEXTOS.quiero_algo_similar}<FiArrowUpRight size={16} />
      </button>
    </div>
  </Reveal>
}

export default function ProyectosRecientes() {
  return <div className="landing pagina-recientes">
    <Encabezado />
    <section id="recientes" className="recientes-portada">
      <div className="recientes-portada-texto">
        <span className="kicker">{TEXTOS["01_proyectos_recientes"]}</span>
        <h1>{TEXTOS.una_idea}<br />{TEXTOS.un_espacio_que_cambia}</h1>
        <p>{TEXTOS.explora_soluciones_en_aluminio_y_cristal_para}</p>
        <a href="#trabajos-recientes" className="reciente-cotizar">{TEXTOS.explorar_proyectos}<FiArrowUpRight /></a>
      </div>
      <div className="recientes-portada-imagen">
        {PROYECTOS_RECIENTES[0] && <img src={PROYECTOS_RECIENTES[0].despues} alt={TEXTOS.inspiracion_residencial_con_grandes_ventanales} />}
        <span>{TEXTOS.vidrio_aluminio_diseno_a_medida}</span>
      </div>
    </section>
    <section id="trabajos-recientes" className="recientes-galeria">
      <div className="recientes-galeria-encabezado"><div><span className="kicker">{TEXTOS.transformaciones_que_inspiran}</span><h2>{TEXTOS.del_punto_de_partida_al_resultado}</h2></div>
      </div>
      <div className="recientes-tarjetas">{PROYECTOS_RECIENTES.map((proyecto, indice) => <TarjetaReciente key={proyecto.id} proyecto={proyecto} indice={indice} />)}</div>
      <Link className="recientes-ver-destacados" to="/#proyectos">{TEXTOS.ver_proyectos_destacados}<FiArrowUpRight /></Link>
    </section>
    <Slide id="detalle-recientes" className="recientes-detalles">
      <Reveal as="span" className="kicker center">{TEXTOS["02_preguntas_frecuentes"]}</Reveal>
      <Reveal as="h2" className="display center">{TEXTOS.resolvemos_tus_dudas_antes_de_empezar}</Reveal>
      <div className="recientes-preguntas">
        {[
          [TEXTOS.que_necesito_para_solicitar_una_cotizacion, TEXTOS.cuentanos_que_quieres_instalar_o_renovar_comparte],
          [TEXTOS.puedo_cotizar_si_todavia_no_tengo_las, TEXTOS.si_puedes_empezar_con_fotografias_y_una],
          [TEXTOS.me_ayudan_a_elegir_el_material_y, TEXTOS.si_te_asesoramos_sobre_opciones_de_aluminio],
          [TEXTOS.tambien_realizan_la_instalacion, TEXTOS.si_cima_herrajes_disena_fabrica_e_instala],
          [TEXTOS.cuanto_tarda_un_proyecto_y_que_garantia, TEXTOS.el_plazo_depende_de_las_medidas_los],
          [TEXTOS.atienden_en_mi_zona, TEXTOS.compartenos_tu_ciudad_y_colonia_por_whatsapp],
        ].map(([pregunta, respuesta]) => <details key={pregunta} className="recientes-pregunta">
          <summary>{pregunta}<FiPlus size={20} aria-hidden="true" /></summary>
          <p>{respuesta}</p>
        </details>)}
      </div>
      <div className="recientes-preguntas-contacto">
        <p>{TEXTOS.tu_proyecto_necesita_una_respuesta_mas_especifica}</p>
        <button type="button" className="reciente-cotizar" onClick={() => abrirWhatsApp(TEXTOS.hola_cima_herrajes_tengo_una_duda_sobre, 'preguntas-recientes')}>{TEXTOS.resolver_mi_duda_por_whatsapp}<FiArrowUpRight size={16} />
        </button>
      </div>
    </Slide>
    <Testimonios etiqueta="03- Testimonios" />
    <Contacto etiqueta="04- Hablemos" />
    <PiePagina />
  </div>
}
