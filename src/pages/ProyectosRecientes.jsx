import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiPlus } from 'react-icons/fi'
import Encabezado from './inicio/componentes/Encabezado'
import PiePagina from './inicio/componentes/PiePagina'
import Testimonios from './inicio/componentes/Testimonios'
import Contacto from './inicio/componentes/Contacto'
import Reveal from './inicio/componentes/Reveal'
import Slide from './inicio/componentes/Slide'
import { abrirWhatsApp, mensajeProyecto } from './inicio/utilidades/whatsapp'
import { PROYECTOS_RECIENTES } from '../contenido/proyectos'
import '../styles/home.css'

function TarjetaReciente({ proyecto, indice }) {
  return <Reveal as="article" className="reciente-tarjeta" delay={indice * 70}>
    <div className="reciente-resultado">
      <img src={proyecto.despues} alt={`Resultado de referencia: ${proyecto.nombre}`} loading="lazy" />
      <span className="reciente-etiqueta">Después</span>
      <div className="reciente-titulo"><span>{proyecto.tipo}</span><h2>{proyecto.nombre}</h2></div>
    </div>
    <div className="reciente-cuerpo">
      <span className="reciente-materiales">{proyecto.detalle}</span>
      <p>{proyecto.descripcion}</p>
      <div className="reciente-origen">
        <img src={proyecto.antes} alt={`Antes, imagen de referencia para ${proyecto.nombre}`} loading="lazy" />
        <div><span className="kicker">Antes</span><p>El punto de partida para imaginar un nuevo espacio.</p></div>
      </div>
      {proyecto.ejemplo && <small className="reciente-referencia">Imágenes genéricas de referencia.</small>}
      <button type="button" className="reciente-cotizar" onClick={() => abrirWhatsApp(mensajeProyecto(proyecto.tipo, proyecto.nombre), 'recientes')}>
        Quiero algo similar <FiArrowUpRight size={16} />
      </button>
    </div>
  </Reveal>
}

export default function ProyectosRecientes() {
  return <div className="landing pagina-recientes">
    <Encabezado />
    <section id="recientes" className="recientes-portada">
      <div className="recientes-portada-texto">
        <span className="kicker">01- Proyectos recientes</span>
        <h1>Una idea.<br />Un espacio que cambia.</h1>
        <p>Explora soluciones en aluminio y cristal para renovar la forma de vivir y trabajar en cada espacio.</p>
        <a href="#trabajos-recientes" className="reciente-cotizar">Explorar proyectos <FiArrowUpRight /></a>
      </div>
      <div className="recientes-portada-imagen">
        <img src={PROYECTOS_RECIENTES[0].despues} alt="Inspiración residencial con grandes ventanales" />
        <span>Vidrio · Aluminio · Diseño a medida</span>
      </div>
    </section>
    <section id="trabajos-recientes" className="recientes-galeria">
      <div className="recientes-galeria-encabezado"><div><span className="kicker">Transformaciones que inspiran</span><h2>Del punto de partida al resultado.</h2></div>
        <p>Ejemplos visuales con fotografías genéricas para explorar las posibilidades de tu próximo proyecto.</p>
      </div>
      <div className="recientes-tarjetas">{PROYECTOS_RECIENTES.map((proyecto, indice) => <TarjetaReciente key={proyecto.id} proyecto={proyecto} indice={indice} />)}</div>
      <Link className="recientes-ver-destacados" to="/#proyectos">Ver proyectos destacados <FiArrowUpRight /></Link>
    </section>
    <Slide id="detalle-recientes" className="recientes-detalles">
      <Reveal as="span" className="kicker center">02- Preguntas frecuentes</Reveal>
      <Reveal as="h2" className="display center">Resolvemos tus dudas antes de empezar.</Reveal>
      <div className="recientes-preguntas">
        {[
          ['¿Qué necesito para solicitar una cotización?', 'Cuéntanos qué quieres instalar o renovar, comparte tu ubicación, medidas aproximadas y, si tienes, fotografías del espacio o una referencia. Con esa información podemos orientarte sobre el siguiente paso.'],
          ['¿Puedo cotizar si todavía no tengo las medidas?', 'Sí. Puedes empezar con fotografías y una descripción de lo que necesitas. Para definir la fabricación, revisaremos contigo las medidas y los detalles del espacio.'],
          ['¿Me ayudan a elegir el material y el acabado?', 'Sí. Te asesoramos sobre opciones de aluminio, vidrio, sistemas de apertura y acabados según el uso, el espacio y lo que buscas para tu proyecto.'],
          ['¿También realizan la instalación?', 'Sí, Cima Herrajes diseña, fabrica e instala. Al solicitar tu propuesta, revisamos el alcance del trabajo y los detalles necesarios para el montaje.'],
          ['¿Cuánto tarda un proyecto y qué garantía tiene?', 'El plazo depende de las medidas, los materiales y el tipo de instalación. Antes de aprobar tu propuesta, solicita el tiempo estimado y las condiciones de garantía que correspondan a tu proyecto.'],
          ['¿Atienden en mi zona?', 'Compártenos tu ciudad y colonia por WhatsApp para confirmar la cobertura y la disponibilidad para tu ubicación.'],
        ].map(([pregunta, respuesta]) => <details key={pregunta} className="recientes-pregunta">
          <summary>{pregunta}<FiPlus size={20} aria-hidden="true" /></summary>
          <p>{respuesta}</p>
        </details>)}
      </div>
      <div className="recientes-preguntas-contacto">
        <p>¿Tu proyecto necesita una respuesta más específica?</p>
        <button type="button" className="reciente-cotizar" onClick={() => abrirWhatsApp('Hola Cima Herrajes, tengo una duda sobre mi proyecto. ¿Me pueden asesorar?', 'preguntas-recientes')}>
          Resolver mi duda por WhatsApp <FiArrowUpRight size={16} />
        </button>
      </div>
    </Slide>
    <Testimonios etiqueta="03- Testimonios" />
    <Contacto etiqueta="04- Hablemos" />
    <PiePagina />
  </div>
}
