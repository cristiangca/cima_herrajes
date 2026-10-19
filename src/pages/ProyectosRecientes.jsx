import { Link } from 'react-router-dom'
import { FiArrowUpRight, FiCheck, FiLayers, FiTool } from 'react-icons/fi'
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
      <Reveal as="span" className="kicker center">02- En cada detalle</Reveal>
      <Reveal as="h2" className="display center">De la primera idea a la instalación.</Reveal>
      <div className="recientes-beneficios">
        {[
          [FiLayers, 'Diseño para tu espacio', 'Elegimos sistemas, materiales y acabados según lo que necesitas.'],
          [FiTool, 'Fabricación a medida', 'Convertimos la propuesta en piezas con medidas y detalles definidos para tu proyecto.'],
          [FiCheck, 'Instalación y entrega', 'Cuidamos el montaje, el funcionamiento y los acabados del resultado final.'],
        ].map(([Icono, titulo, texto]) => <Reveal key={titulo} className="recientes-beneficio"><Icono size={25} /><h3>{titulo}</h3><p>{texto}</p></Reveal>)}
      </div>
    </Slide>
    <Testimonios etiqueta="03- Testimonios" />
    <Contacto etiqueta="04- Hablemos" />
    <PiePagina />
  </div>
}
