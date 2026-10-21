import { useState } from 'react'
import { FiArrowUpRight, FiUsers, FiGift, FiCheckCircle, FiLock } from 'react-icons/fi'
import Encabezado from './inicio/componentes/Encabezado'
import PiePagina from './inicio/componentes/PiePagina'
import { abrirWhatsApp } from './inicio/utilidades/whatsapp'
import fotoTrabajo from '../assets/inicio/como-trabajamos-azul.png'
import { FOTOS_PROYECTO } from '../contenido/fotos-proyecto'
import { CONTACTO } from '../contenido/sitio'
import '../styles/home.css'
import '../styles/afiliados.css'

const SERVICIOS = ['Ventanas y ventanales', 'Puertas de aluminio y cristal', 'Canceles de baño', 'Barandales', 'Espejos', 'Domótica y automatización', 'Muebles y acabados', 'Mantenimiento y adecuaciones', 'Otro / necesito asesoría']

const CLAVE_CONTACTO = 'cima-afiliado-contacto'
function leerContacto() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_CONTACTO) || '{}')
    return Object.fromEntries(['nombre', 'telefono', 'correo'].map(campo => [campo, typeof datos?.[campo] === 'string' ? datos[campo].slice(0, 150) : '']))
  } catch { return { nombre: '', telefono: '', correo: '' } }
}

export default function Afiliados() {
  const [contacto, setContacto] = useState(leerContacto)
  const [guardarContacto, setGuardarContacto] = useState(() => Boolean(leerContacto().nombre))
  const [avisoGuardado, setAvisoGuardado] = useState('')
  function cambiarContacto(campo, valor) {
    setContacto(actual => ({ ...actual, [campo]: valor }))
  }
  function cambiarGuardado(event) {
    setGuardarContacto(event.target.checked)
    setAvisoGuardado('')
    if (!event.target.checked) {
      try { localStorage.removeItem(CLAVE_CONTACTO) } catch { /* Almacenamiento no disponible. */ }
    }
  }
  function olvidarContacto() {
    try { localStorage.removeItem(CLAVE_CONTACTO) } catch { /* Almacenamiento no disponible. */ }
    setContacto({ nombre: '', telefono: '', correo: '' })
    setGuardarContacto(false)
    setAvisoGuardado('Tus datos ya no se recordarán en este dispositivo.')
  }
  const [resumen, setResumen] = useState(null)
  const [abierto, setAbierto] = useState(false)

  function revisar(event) {
    event.preventDefault()
    const form = event.currentTarget
    for (const nombre of ['telefonoAfiliado', 'telefonoReferido']) {
      const input = form.elements.namedItem(nombre)
      const longitud = input.value.replace(/\D/g, '').length
      if (longitud < 10 || longitud > 15) {
        input.setCustomValidity('Escribe un teléfono válido de 10 a 15 dígitos, incluyendo la lada si corresponde.')
        input.reportValidity()
        return
      }
    }
    setResumen(Object.fromEntries(new FormData(form)))
    setAbierto(false)
  }

  function continuar() {
    const r = resumen
    try {
      if (guardarContacto) localStorage.setItem(CLAVE_CONTACTO, JSON.stringify({ nombre: r.nombreAfiliado, telefono: r.telefonoAfiliado, correo: r.correo }))
      else localStorage.removeItem(CLAVE_CONTACTO)
      setAvisoGuardado(guardarContacto ? 'Recordaremos solo tus datos en este dispositivo.' : '')
    } catch { setAvisoGuardado('No se pudieron recordar tus datos en este navegador. Puedes continuar por WhatsApp.') }
    abrirWhatsApp(`Hola Cima Herrajes, quiero participar en el programa de afiliados y compartir este referido.

QUIEN REFIERE
Nombre: ${r.nombreAfiliado}
Teléfono: ${r.telefonoAfiliado}
Correo: ${r.correo || 'No indicado'}

PERSONA INTERESADA
Nombre: ${r.nombreReferido}
Teléfono: ${r.telefonoReferido}
Ciudad / colonia: ${r.zona}
Servicio: ${r.servicio}
Necesidad: ${r.descripcion}
Medidas aproximadas: ${r.medidas || 'Por confirmar'}
Fecha estimada: ${r.fecha || 'Por definir'}

Acepto las condiciones y el uso de estos datos para atender el referido. Comparto este contacto con su permiso. Quiero confirmar la recompensa en dinero y las condiciones aplicables.`, 'afiliados')
    setAbierto(true)
  }

  return <div className="landing pagina-afiliados">
    <Encabezado />
    <section className="afiliados-portada">
      <div>
        <span className="kicker">01- Programa de afiliados</span>
        <h1>Recomienda a alguien.<br />Gana dinero extra.</h1>
        <p>¿Alguien que conoces necesita ventanas, canceles o un proyecto en vidrio y aluminio? Conéctalo con Cima Herrajes. Si el proyecto se contrata y cumple las condiciones del programa, tu recomendación puede convertirse en dinero extra.</p>
        <a href="#referir" className="reciente-cotizar">Quiero referir a alguien <FiArrowUpRight /></a>
      </div>
      <aside className="afiliados-beneficio afiliados-beneficio-visual">
        <img className="afiliados-foto-trabajo" src={fotoTrabajo} alt="Preparación de medidas de una ventana con herramientas de trabajo" />
        <div className="afiliados-beneficio-contenido">
          <FiGift size={26} aria-hidden="true" />
          <span>Tu recomendación vale</span>
          <h2>Un proyecto para nosotros.<br />Dinero extra para ti.</h2>
          <p>Te confirmaremos la cantidad o el porcentaje de tu recompensa y cuándo puedes recibirla, antes de concretar tu participación.</p>
          <small>La recompensa se acuerda con el equipo y depende de la validación del referido y de la contratación del proyecto. No hay un monto fijo publicado.</small>
        </div>
      </aside>
    </section>

    <section className="afiliados-pasos" aria-label="Cómo funciona el programa">
      {[
        ['01', 'Piensa en alguien que lo necesite', 'Un familiar, amigo o conocido que esté buscando renovar su espacio y quiera recibir asesoría.'],
        ['02', 'Nosotros damos seguimiento', 'Compártenos el contacto y qué necesita. Revisamos la oportunidad y acordamos contigo la recompensa.'],
        ['03', 'Gana por tu recomendación', 'Si el proyecto se contrata y se cumplen las condiciones acordadas, recibes tu recompensa en dinero.'],
      ].map(([numero, titulo, texto]) => <article key={numero}><span>{numero}</span><h2>{titulo}</h2><p>{texto}</p></article>)}
    </section>

    <section id="referir" className="afiliados-registro">
      <div className="afiliados-intro">
        <span className="kicker">02- Comparte tu referido</span>
        <h2>Tú haces la conexión.<br />Nosotros nos encargamos de asesorar.</h2>
        <p>Cuéntanos lo que sepas del proyecto. Los campos con * son obligatorios y podrás revisar todo antes de enviarlo por WhatsApp.</p>
        <div className="afiliados-ayuda"><FiUsers size={24} /><p>No necesitas conocer todas las medidas. Una descripción del proyecto y una forma de contactar a la persona son suficientes para empezar.</p></div>
        <div className="afiliados-inspiracion">
          <img src={FOTOS_PROYECTO.residencial} alt="Referencia de instalación de ventanas y puertas de aluminio" loading="lazy" />
          <img src={FOTOS_PROYECTO.comercial} alt="Referencia de fachada comercial en vidrio y aluminio" loading="lazy" />
          <span>Ventanas, canceles, barandales y más: una necesidad cercana puede ser una oportunidad.</span>
        </div>
        <div className="afiliados-confianza"><FiLock size={19} aria-hidden="true" /><div><strong>Un contacto, un propósito.</strong><p>La información es para atender este proyecto y dar seguimiento a tu recomendación. No se publica en la página.</p></div></div>

      </div>
      <div>
        <form className="afiliados-formulario" onSubmit={revisar} hidden={Boolean(resumen)}>
          <fieldset><legend>Tus datos · quien refiere</legend>
            <label>Tu nombre *<input name="nombreAfiliado" value={contacto.nombre} onChange={e => cambiarContacto('nombre', e.target.value)} autoComplete="name" required maxLength={100} /></label>
            <label>Tu teléfono / WhatsApp *<input name="telefonoAfiliado" value={contacto.telefono} onChange={e => cambiarContacto('telefono', e.target.value)} type="tel" autoComplete="tel" required minLength={10} maxLength={22} onInput={e => e.currentTarget.setCustomValidity('')} /></label>
            <label>Tu correo (opcional)<input name="correo" value={contacto.correo} onChange={e => cambiarContacto('correo', e.target.value)} type="email" autoComplete="email" maxLength={150} /></label>
          </fieldset>
          <fieldset><legend>La persona que recomiendas</legend>
            <label>Su nombre *<input name="nombreReferido" autoComplete="off" required maxLength={100} /></label>
            <label>Su teléfono / WhatsApp *<input name="telefonoReferido" type="tel" autoComplete="off" required minLength={10} maxLength={22} onInput={e => e.currentTarget.setCustomValidity('')} /></label>
            <label>Ciudad y colonia del proyecto *<input name="zona" required maxLength={150} placeholder="Ej. Guadalajara, colonia Centro" /></label>
            <label>¿Qué servicio necesita? *<select name="servicio" required defaultValue=""><option value="" disabled>Selecciona un servicio</option>{SERVICIOS.map(servicio => <option key={servicio}>{servicio}</option>)}</select></label>
            <label>Cuéntanos qué necesita *<textarea name="descripcion" required rows={4} maxLength={1000} placeholder="Qué quiere instalar, renovar o reparar y en qué tipo de espacio." /></label>
            <div className="afiliados-dos-campos">
              <label>Medidas aproximadas (opcional)<input name="medidas" maxLength={150} placeholder="Si las conoces" /></label>
              <label>¿Para cuándo lo necesita? (opcional)<input name="fecha" maxLength={100} placeholder="Ej. El próximo mes" /></label>
            </div>
          </fieldset>
          <div className="afiliados-preferencias">
            <label className="afiliados-consentimiento"><input name="recordar" type="checkbox" checked={guardarContacto} onChange={cambiarGuardado} /><span>Recordar mis datos para la próxima vez <small>Solo tu nombre, teléfono y correo en este dispositivo. Los datos del referido no se guardan aquí.</small></span></label>
            {guardarContacto && <button type="button" className="afiliados-olvidar" onClick={olvidarContacto}>Olvidar mis datos</button>}
            <details className="afiliados-condiciones" id="condiciones-afiliados">
              <summary>Condiciones del programa y privacidad</summary>
              <ul>
                <li>Tu recompensa es en dinero. El monto o porcentaje, los requisitos y el momento de pago se confirman con Cima Herrajes antes de concretar la participación.</li>
                <li>Compartir un contacto no genera una recompensa automática: el referido debe validarse y el proyecto debe contratarse bajo las condiciones acordadas.</li>
                <li>Comparte únicamente contactos que estén de acuerdo en recibir información de Cima Herrajes sobre este proyecto.</li>
                <li>Los datos se usarán para atender la solicitud, contactar a la persona interesada y dar seguimiento al referido. No se publicarán ni se compartirán con otros negocios para publicidad.</li>
                <li>Al continuar, los datos se preparan en WhatsApp. Solo se envían a Cima Herrajes cuando tú confirmas el envío en esa aplicación, que tiene sus propias condiciones de privacidad.</li>
                <li>La opción de recordar guarda solo tus datos de contacto en este navegador. Es opcional y puedes eliminarlos con “Olvidar mis datos”. Los datos de la persona referida no se conservan en este dispositivo al cerrar o recargar la página.</li>
                <li>Para solicitar una corrección o eliminación de información enviada al equipo, escríbenos a <a href={`mailto:${CONTACTO.correo}`}>{CONTACTO.correo}</a>.</li>
              </ul>
            </details>
            <label className="afiliados-consentimiento"><input name="condiciones" type="checkbox" required /><span>Acepto las condiciones del programa y el uso de los datos para atender este referido. *</span></label>
          </div>
          <p className="afiliados-recordatorio">Comparte el contacto de alguien que esté de acuerdo en recibir nuestra asesoría.</p>
          {avisoGuardado && <p className="afiliados-recordatorio" role="status">{avisoGuardado}</p>}
          <button className="reciente-cotizar" type="submit">Revisar y continuar <FiArrowUpRight size={16} /></button>
        </form>
        {resumen && <div className="afiliados-resumen" aria-live="polite">
          <FiCheckCircle size={28} aria-hidden="true" /><h3>Revisa antes de enviar</h3>
          <dl>{[
            ['Quien refiere', resumen.nombreAfiliado], ['Tu teléfono', resumen.telefonoAfiliado], ['Tu correo', resumen.correo || 'No indicado'],
            ['Persona interesada', resumen.nombreReferido], ['Su teléfono', resumen.telefonoReferido], ['Zona del proyecto', resumen.zona],
            ['Servicio', resumen.servicio], ['Necesidad', resumen.descripcion], ['Medidas', resumen.medidas || 'Por confirmar'], ['Fecha estimada', resumen.fecha || 'Por definir'],
          ].map(([titulo, valor]) => <div key={titulo}><dt>{titulo}</dt><dd>{valor}</dd></div>)}</dl>
          <div className="afiliados-resumen-acciones"><button type="button" className="reciente-cotizar" onClick={continuar}>Continuar en WhatsApp <FiArrowUpRight size={16} /></button><button type="button" className="afiliados-editar" onClick={() => { setResumen(null); setAbierto(false) }}>Editar datos</button></div>
          {avisoGuardado && <p role="status">{avisoGuardado}</p>}
          {abierto && <p role="status">Completa el envío en WhatsApp para que el equipo reciba tu referido. El formulario no se registra automáticamente.</p>}
        </div>}
      </div>
    </section>
    <PiePagina />
  </div>
}
