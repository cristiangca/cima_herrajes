import { formatearTexto } from '../utilidades/plantillas.js'
import TEXTOS from '../contenido/afiliados/textos/Afiliados.json'
import { SERVICIOS_AFILIADOS } from '../contenido/afiliados/servicios.js'
import { useState } from 'react'
import { FiArrowUpRight, FiUsers, FiGift, FiCheckCircle, FiLock } from 'react-icons/fi'
import Encabezado from './inicio/componentes/Encabezado'
import PiePagina from './inicio/componentes/PiePagina'
import { abrirWhatsApp } from './inicio/utilidades/whatsapp'
import { imagen_como_trabajamos_azul as fotoTrabajo } from '../contenido/imagenes/seleccion.js'
import { FOTOS_PROYECTO } from "../contenido/proyectos/fotografias.js"
import { CONTACTO } from "../contenido/general/sitio.js"
import '../styles/home.css'
import '../styles/afiliados.css'

const SERVICIOS = SERVICIOS_AFILIADOS

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
    setAvisoGuardado(TEXTOS.tus_datos_ya_no_se_recordaran_en)
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
        input.setCustomValidity(TEXTOS.escribe_un_telefono_valido_de_10_a)
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
      setAvisoGuardado(guardarContacto ? TEXTOS.recordaremos_solo_tus_datos_en_este_dispositivo : '')
    } catch { setAvisoGuardado(TEXTOS.no_se_pudieron_recordar_tus_datos_en) }
    abrirWhatsApp(formatearTexto(TEXTOS["plantilla_hola_cima_herrajes_quiero_participar_en"], { dato1: (r.nombreAfiliado), dato2: (r.telefonoAfiliado), dato3: (r.correo || TEXTOS.no_indicado), dato4: (r.nombreReferido), dato5: (r.telefonoReferido), dato6: (r.zona), dato7: (r.servicio), dato8: (r.descripcion), dato9: (r.medidas || TEXTOS.por_confirmar), dato10: (r.fecha || TEXTOS.por_definir) }), 'afiliados')
    setAbierto(true)
  }

  return <div className="landing pagina-afiliados">
    <Encabezado />
    <section className="afiliados-portada">
      <div>
        <span className="kicker">{TEXTOS["01_programa_de_afiliados"]}</span>
        <h1>{TEXTOS.recomienda_a_alguien}<br />{TEXTOS.gana_dinero_extra}</h1>
        <p>{TEXTOS.alguien_que_conoces_necesita_ventanas_canceles_o}</p>
        <a href="#referir" className="reciente-cotizar">{TEXTOS.quiero_referir_a_alguien}<FiArrowUpRight /></a>
      </div>
      <aside className="afiliados-beneficio afiliados-beneficio-visual">
        <img className="afiliados-foto-trabajo" src={fotoTrabajo} alt={TEXTOS.preparacion_de_medidas_de_una_ventana_con} />
        <div className="afiliados-beneficio-contenido">
          <FiGift size={26} aria-hidden="true" />
          <span>{TEXTOS.tu_recomendacion_vale}</span>
          <h2>{TEXTOS.un_proyecto_para_nosotros}<br />{TEXTOS.dinero_extra_para_ti}</h2>
          <p>{TEXTOS.te_confirmaremos_la_cantidad_o_el_porcentaje}</p>
          <small>{TEXTOS.la_recompensa_se_acuerda_con_el_equipo}</small>
        </div>
      </aside>
    </section>

    <section className="afiliados-pasos" aria-label={TEXTOS.como_funciona_el_programa}>
      {[
        ['01', TEXTOS.piensa_en_alguien_que_lo_necesite, TEXTOS.un_familiar_amigo_o_conocido_que_este],
        ['02', TEXTOS.nosotros_damos_seguimiento, TEXTOS.compartenos_el_contacto_y_que_necesita_revisamos],
        ['03', TEXTOS.gana_por_tu_recomendacion, TEXTOS.si_el_proyecto_se_contrata_y_se],
      ].map(([numero, titulo, texto]) => <article key={numero}><span>{numero}</span><h2>{titulo}</h2><p>{texto}</p></article>)}
    </section>

    <section id="referir" className="afiliados-registro">
      <div className="afiliados-intro">
        <span className="kicker">{TEXTOS["02_comparte_tu_referido"]}</span>
        <h2>{TEXTOS.tu_haces_la_conexion}<br />{TEXTOS.nosotros_nos_encargamos_de_asesorar}</h2>
        <p>{TEXTOS.cuentanos_lo_que_sepas_del_proyecto_los}</p>
        <div className="afiliados-ayuda"><FiUsers size={24} /><p>{TEXTOS.no_necesitas_conocer_todas_las_medidas_una}</p></div>
        <div className="afiliados-inspiracion">
          <img src={FOTOS_PROYECTO.residencial} alt={TEXTOS.referencia_de_instalacion_de_ventanas_y_puertas} loading="lazy" />
          <img src={FOTOS_PROYECTO.comercial} alt={TEXTOS.referencia_de_fachada_comercial_en_vidrio_y} loading="lazy" />
          <span>{TEXTOS.ventanas_canceles_barandales_y_mas_una_necesidad}</span>
        </div>
        <div className="afiliados-confianza"><FiLock size={19} aria-hidden="true" /><div><strong>{TEXTOS.un_contacto_un_proposito}</strong><p>{TEXTOS.la_informacion_es_para_atender_este_proyecto}</p></div></div>

      </div>
      <div>
        <form className="afiliados-formulario" onSubmit={revisar} hidden={Boolean(resumen)}>
          <fieldset><legend>{TEXTOS.tus_datos_quien_refiere}</legend>
            <label>{TEXTOS.tu_nombre}<input name="nombreAfiliado" value={contacto.nombre} onChange={e => cambiarContacto('nombre', e.target.value)} autoComplete="name" required maxLength={100} /></label>
            <label>{TEXTOS.tu_telefono_whatsapp}<input name="telefonoAfiliado" value={contacto.telefono} onChange={e => cambiarContacto('telefono', e.target.value)} type="tel" autoComplete="tel" required minLength={10} maxLength={22} onInput={e => e.currentTarget.setCustomValidity('')} /></label>
            <label>{TEXTOS.tu_correo_opcional}<input name="correo" value={contacto.correo} onChange={e => cambiarContacto('correo', e.target.value)} type="email" autoComplete="email" maxLength={150} /></label>
          </fieldset>
          <fieldset><legend>{TEXTOS.la_persona_que_recomiendas}</legend>
            <label>{TEXTOS.su_nombre}<input name="nombreReferido" autoComplete="off" required maxLength={100} /></label>
            <label>{TEXTOS.su_telefono_whatsapp}<input name="telefonoReferido" type="tel" autoComplete="off" required minLength={10} maxLength={22} onInput={e => e.currentTarget.setCustomValidity('')} /></label>
            <label>{TEXTOS.ciudad_y_colonia_del_proyecto}<input name="zona" required maxLength={150} placeholder={TEXTOS.ej_guadalajara_colonia_centro} /></label>
            <label>{TEXTOS.que_servicio_necesita}<select name="servicio" required defaultValue=""><option value="" disabled>{TEXTOS.selecciona_un_servicio}</option>{SERVICIOS.map(servicio => <option key={servicio}>{servicio}</option>)}</select></label>
            <label>{TEXTOS.cuentanos_que_necesita}<textarea name="descripcion" required rows={4} maxLength={1000} placeholder={TEXTOS.que_quiere_instalar_renovar_o_reparar_y} /></label>
            <div className="afiliados-dos-campos">
              <label>{TEXTOS.medidas_aproximadas_opcional}<input name="medidas" maxLength={150} placeholder={TEXTOS.si_las_conoces} /></label>
              <label>{TEXTOS.para_cuando_lo_necesita_opcional}<input name="fecha" maxLength={100} placeholder={TEXTOS.ej_el_proximo_mes} /></label>
            </div>
          </fieldset>
          <div className="afiliados-preferencias">
            <label className="afiliados-consentimiento"><input name="recordar" type="checkbox" checked={guardarContacto} onChange={cambiarGuardado} /><span>{TEXTOS.recordar_mis_datos_para_la_proxima_vez}<small>{TEXTOS.solo_tu_nombre_telefono_y_correo_en}</small></span></label>
            {guardarContacto && <button type="button" className="afiliados-olvidar" onClick={olvidarContacto}>{TEXTOS.olvidar_mis_datos}</button>}
            <details className="afiliados-condiciones" id="condiciones-afiliados">
              <summary>{TEXTOS.condiciones_del_programa_y_privacidad}</summary>
              <ul>
                <li>{TEXTOS.tu_recompensa_es_en_dinero_el_monto}</li>
                <li>{TEXTOS.compartir_un_contacto_no_genera_una_recompensa}</li>
                <li>{TEXTOS.comparte_unicamente_contactos_que_esten_de_acuerdo}</li>
                <li>{TEXTOS.los_datos_se_usaran_para_atender_la}</li>
                <li>{TEXTOS.al_continuar_los_datos_se_preparan_en}</li>
                <li>{TEXTOS.la_opcion_de_recordar_guarda_solo_tus}</li>
                <li>{TEXTOS.para_solicitar_una_correccion_o_eliminacion_de}<a href={`mailto:${CONTACTO.correo}`}>{CONTACTO.correo}</a>{TEXTOS.texto}</li>
              </ul>
            </details>
            <label className="afiliados-consentimiento"><input name="condiciones" type="checkbox" required /><span>{TEXTOS.acepto_las_condiciones_del_programa_y_el}</span></label>
          </div>
          <p className="afiliados-recordatorio">{TEXTOS.comparte_el_contacto_de_alguien_que_este}</p>
          {avisoGuardado && <p className="afiliados-recordatorio" role="status">{avisoGuardado}</p>}
          <button className="reciente-cotizar" type="submit">{TEXTOS.revisar_y_continuar}<FiArrowUpRight size={16} /></button>
        </form>
        {resumen && <div className="afiliados-resumen" aria-live="polite">
          <FiCheckCircle size={28} aria-hidden="true" /><h3>{TEXTOS.revisa_antes_de_enviar}</h3>
          <dl>{[
            [TEXTOS.quien_refiere, resumen.nombreAfiliado], [TEXTOS.tu_telefono, resumen.telefonoAfiliado], [TEXTOS.tu_correo, resumen.correo || TEXTOS.no_indicado],
            [TEXTOS.persona_interesada, resumen.nombreReferido], [TEXTOS.su_telefono, resumen.telefonoReferido], [TEXTOS.zona_del_proyecto, resumen.zona],
            [TEXTOS.servicio, resumen.servicio], [TEXTOS.necesidad, resumen.descripcion], [TEXTOS.medidas, resumen.medidas || TEXTOS.por_confirmar], [TEXTOS.fecha_estimada, resumen.fecha || TEXTOS.por_definir],
          ].map(([titulo, valor]) => <div key={titulo}><dt>{titulo}</dt><dd>{valor}</dd></div>)}</dl>
          <div className="afiliados-resumen-acciones"><button type="button" className="reciente-cotizar" onClick={continuar}>{TEXTOS.continuar_en_whatsapp}<FiArrowUpRight size={16} /></button><button type="button" className="afiliados-editar" onClick={() => { setResumen(null); setAbierto(false) }}>{TEXTOS.editar_datos}</button></div>
          {avisoGuardado && <p role="status">{avisoGuardado}</p>}
          {abierto && <p role="status">{TEXTOS.completa_el_envio_en_whatsapp_para_que}</p>}
        </div>}
      </div>
    </section>
    <PiePagina />
  </div>
}
