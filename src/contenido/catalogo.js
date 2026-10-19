import { imagenesEspejo } from './espejos'
// Productos y categorías. Conservar id y slug para mantener los enlaces.
import inteligente from '../assets/inteligente.png';
import sifon from '../assets/sifon.jpg';
import d_ventana from '../assets/domotica/vidrio.png';
import d_cerradura from '../assets/domotica/cerradura.png';
import d_perciana from '../assets/domotica/percianas.png';
import d_luces from '../assets/domotica/luces.png';
// muebles
import m_botiquines from '../assets/muebles/botiquines_espejo.jpg';
import m_closet from '../assets/muebles/closet.jpg';
import m_aluminio from '../assets/muebles/muebles_aluminio.jpg';
import m_bano from '../assets/muebles/muebles_bano.jpg';
import m_cocina from '../assets/muebles/muebles_cocina.jpg';
import m_repisas from '../assets/muebles/repisas_libreros_vidrio.jpg';
import m_vestidores from '../assets/muebles/vestidores_integrales.jpg';
// acabados
import acab_aluminio from '../assets/acabados/acabados_aluminio.jpg';
import acab_vidrio from '../assets/acabados/acabados_vidrio.jpg';
import celosias from '../assets/acabados/celosias_louvers_aluminio.jpg';
import lambrines from '../assets/acabados/lambrines_decorativos.jpg';
import acm from '../assets/acabados/paneles_acm.jpg';
import revestimientos from '../assets/acabados/revestimientos.jpg';
import vidrio_pintado from '../assets/acabados/vidrio_pintado.jpg';


// ===== CATEGORÍAS =====
export const CATEGORIAS = [
{
  TITULO: "Puertas",
  slug: "puertas",
  productos: [
    { id: "p-batiente", TITULO: "Batiente", slug: "batiente", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/1-batiente.webp" },
    { id: "p-variante-pivotante", TITULO: "Variante Pivotante", slug: "variante-pivotante", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/2-variante-pivotante.webp" },
    { id: "p-doble-templada", TITULO: "Doble Templada", slug: "doble-templada", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/3-doble-templada.webp" },
    { id: "p-corrediza", TITULO: "Corrediza", slug: "corrediza", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/4-corrediza.webp" },
    { id: "p-pivotante", TITULO: "Pivotante", slug: "pivotante", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/5-pivotante.webp" },
    { id: "p-templada", TITULO: "Templada", slug: "templada", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/6-templada.webp" },
    { id: "p-corrediza-aerea-aluminio", TITULO: "Corrediza Aérea Aluminio", slug: "corrediza-aerea-aluminio", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/7-corrediza-aerea-aluminio.webp" },
    { id: "p-corrediza-aerea-cuadricula", TITULO: "Corrediza Aérea Cuadrícula", slug: "corrediza-aerea-cuadricula", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/8-corrediza-aerea-cuadricula.webp" },
    { id: "p-corrediza-aerea-templada", TITULO: "Corrediza Aérea Templada", slug: "corrediza-aerea-templada", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/9-corrediza-aerea-templada.webp" },
    { id: "p-plegable", TITULO: "Plegable", slug: "plegable", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/10-plegable.webp" },
    { id: "p-louver", TITULO: "Louver", slug: "louver", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/11-louver.webp" }
  ]
}


,
 {
  TITULO: "Ventanas",
  slug: "ventanas",
  productos: [
    { id: "v-corredizas", TITULO: "Corredizas", slug: "corredizas", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-doble-corrediza.webp" },
    { id: "v-doble-corrediza", TITULO: "Doble Corrediza", slug: "doble-corrediza", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/2-fija-corrediza.webp" },
    { id: "v-fija-corrediza", TITULO: "Fija Corrediza", slug: "fija-corrediza", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/2-fija-corrediza.webp" },
    { id: "v-fijas", TITULO: "Fijas", slug: "fijas", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/3-fija.webp" },
    { id: "v-proyectable", TITULO: "Proyectable", slug: "proyectable", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/4-proyectable.webp" },
    { id: "v-vasista", TITULO: "Vasista", slug: "vasista", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/5-vasista.webp" },
    { id: "v-batiente", TITULO: "Batiente", slug: "batiente", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/6-batiente.webp" },
    { id: "v-combinada", TITULO: "Combinada", slug: "combinada", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/7-combinada.webp" },
    { id: "v-sifon", TITULO: "Sifón", slug: "sifon", img: sifon },
    { id: "v-oscilobatiente", TITULO: "Oscilobatiente", slug: "oscilobatiente", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/9-oscilobatiente.webp" },
    { id: "v-pivotante", TITULO: "Pivotante", slug: "pivotante", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/10-pivotante.webp" },
    { id: "v-plegable", TITULO: "Plegable", slug: "plegable", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/11-plegable.webp" },
    { id: "v-louver", TITULO: "Louver", slug: "louver", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/12-louver.webp" }
  ]
}
,

 {
  TITULO: "Barandales",
  slug: "barandales",
  productos: [
    { id: "b-anclas", TITULO: "Con Anclas", slug: "con-anclas", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-con-anclas.webp" },
    { id: "b-chapetones", TITULO: "Con Chapetones", slug: "con-chapetones", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/2-con-chapetones.webp" },
    { id: "b-herraje-pasamanos", TITULO: "Con Herraje y Pasamanos", slug: "herraje-pasamanos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/3-con-herraje-y-pasamanos.webp" },
    { id: "b-minipostes-pasamanos", TITULO: "Con Minipostes y Pasamanos", slug: "minipostes-pasamanos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/4-con-minipostes-y-pasamanos.webp" },
    { id: "b-pasamanos", TITULO: "Con Pasamanos", slug: "con-pasamanos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/5-con-pasamanos.webp" },
    { id: "b-pinzas-pasamanos", TITULO: "Con Pinzas y Pasamanos", slug: "pinzas-pasamanos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/6-con-pinzas-y-pasamanos.webp" },
    { id: "b-postes-pasamanos", TITULO: "Con Postes y Pasamanos", slug: "postes-pasamanos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/7-con-postes-y-pasamanos.webp" },
    { id: "b-acero-inoxidable", TITULO: "De Acero Inoxidable", slug: "acero-inoxidable", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/8-de-acero-inoxidable.webp" },
    { id: "b-empotrado", TITULO: "Empotrado", slug: "empotrado", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/9-empotrado.webp" },
    { id: "b-empotrado-pasamanos", TITULO: "Empotrado con Pasamanos", slug: "empotrado-pasamanos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/10-empotrado-con-pasamanos.webp" },
    { id: "b-cierre-pasamanos", TITULO: "Cierre con Pasamanos", slug: "cierre-pasamanos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/11-cierre-con-pasamanos.webp" },
    { id: "b-doble-empotrado", TITULO: "Doble Barandal Empotrado", slug: "doble-empotrado", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/12-doble-barandal-empotrado.webp" },
    { id: "b-alberca", TITULO: "De Alberca", slug: "alberca", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/13-de-alberca.webp" },
    { id: "b-balcon", TITULO: "De Balcón", slug: "balcon", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/14-de-balcon.webp" },
    { id: "b-hotel-pasamanos", TITULO: "De Hotel con Pasamanos", slug: "hotel-pasamanos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/15-de-hotel-con-pasamanos.webp" },
    { id: "b-perimetral", TITULO: "Perimetral", slug: "perimetral", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/16-perimetral.webp" }
  ]
}


,

 {
  TITULO: "Espejos",
  slug: "espejos",
  productos: [
    { id: "e-personalizado", TITULO: "Personalizado", slug: "personalizado", img: "https://blir.com.mx/assets/img/shop/individuales/espejos/1-personalizado.webp" },
    { id: "e-circular", TITULO: "Circular", slug: "circular", img: "https://blir.com.mx/assets/img/shop/individuales/espejos/2-circular.webp" },
    { id: "e-decorativo", TITULO: "Decorativo", slug: "decorativo", img: "https://blir.com.mx/assets/img/shop/individuales/espejos/3-decorativo.webp" },
    { id: "e-biselado", TITULO: "Biselado", slug: "biselado", img: "https://blir.com.mx/assets/img/shop/individuales/espejos/4-biselado.webp" },
    { id: "e-media-luna", TITULO: "Media Luna", slug: "media-luna", img: "https://blir.com.mx/assets/img/shop/individuales/espejos/5-media-luna.webp" },
    { id: "e-ovalado-biselado", TITULO: "Ovalado Biselado", slug: "ovalado-biselado", img: "https://blir.com.mx/assets/img/shop/individuales/espejos/6-ovalado-biselado.webp" },
    { id: "e-ovo", TITULO: "Ovo", slug: "ovo", img: "https://blir.com.mx/assets/img/shop/individuales/espejos/7-ovo.webp" },
    { id: "e-asimetrico", TITULO: "Asimétrico", slug: "asimetrico", img: "https://blir.com.mx/assets/img/shop/individuales/espejos/8-asimetrico.webp" },
    { id: "e-con-marco-de-aluminio", TITULO: "Con Marco de Aluminio", slug: "con-marco-de-aluminio", img: "https://blir.com.mx/assets/img/shop/individuales/espejos/9-con-marco-de-aluminio.webp" }
  ]
}
  ,
 {
  TITULO: "Ventanales",
  slug: "ventanales",
  productos: [
    { id: "c-fijo", TITULO: "Fijo", slug: "fijo", img: "https://blir.com.mx/assets/img/shop/individuales/canceles/1-fijo.webp" },
    { id: "c-fijo-corredizo", TITULO: "Fijo Corredizo", slug: "fijo-corredizo", img: "https://blir.com.mx/assets/img/shop/individuales/canceles/2-fijo-corredizo.webp" },
    { id: "c-doble-corredizo", TITULO: "Doble Corredizo", slug: "doble-corredizo", img: "https://blir.com.mx/assets/img/shop/individuales/canceles/3-doble-corredizo.webp" },
    { id: "c-plegable", TITULO: "Plegable", slug: "plegable", img: "https://blir.com.mx/assets/img/shop/individuales/canceles/4-plegable.webp" },
    { id: "c-combinado", TITULO: "Combinado", slug: "combinado", img: "https://blir.com.mx/assets/img/shop/individuales/canceles/5-combinado.webp" },
    { id: "c-personalizado", TITULO: "Personalizado", slug: "personalizado", img: "https://blir.com.mx/assets/img/shop/individuales/canceles/6-personalizado.webp" },
    { id: "c-moderno", TITULO: "Moderno", slug: "moderno", img: "https://blir.com.mx/assets/img/shop/individuales/canceles/7-moderno.webp" },
    { id: "c-moderno-triple-hoja", TITULO: "Moderno Triple Hoja", slug: "moderno-triple-hoja", img: "https://blir.com.mx/assets/img/shop/individuales/canceles/8-moderno-triple-hoja.webp" },
    { id: "c-mixtos", TITULO: "Mixtos", slug: "mixtos", img: "https://blir.com.mx/assets/img/shop/individuales/canceles/9-mixtos.webp" }
  ]
},
{
  TITULO: "Canceles de Baño",
  slug: "canceles-de-bano",
  productos: [
    { id: "m-frontal", TITULO: "Frontal", slug: "frontal", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas/1-frontal.webp" },
    { id: "m-rectangular", TITULO: "Rectangular", slug: "rectangular", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas/2-rectangular.webp" },
    { id: "m-cuadrada", TITULO: "Cuadrada", slug: "cuadrada", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas/3-cuadrada.webp" },
    { id: "m-escuadra", TITULO: "Escuadra", slug: "escuadra", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas/4-escuadra.webp" },
    { id: "m-curva", TITULO: "Curva", slug: "curva", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas/5-curva.webp" },
    { id: "m-de-lujo", TITULO: "De Lujo", slug: "de-lujo", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas/6-de-lujo.webp" },
    { id: "m-para-banera", TITULO: "Para Bañera", slug: "para-banera", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas/7-para-banera.webp" },
    { id: "m-panel-fijo", TITULO: "Panel Fijo", slug: "panel-fijo", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas/8-panel-fijo.webp" },
    { id: "m-abatible", TITULO: "Abatible", slug: "abatible", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas/9-abatible.webp" },
    { id: "m-corrediza", TITULO: "Corrediza", slug: "corrediza", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas/10-corrediza.webp" },
    { id: "m-con-aluminio", TITULO: "Con Aluminio", slug: "con-aluminio", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas/11-con-aluminio.webp" },
    { id: "m-tradicionales", TITULO: "Tradicionales", slug: "tradicionales", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas/12-tradicionales.webp" }
  ]
}
  ,
{
  TITULO: "Espejos LED Touch",
  slug: "espejos-led-touch",
  productos: [
    { id: "elt-allegro", TITULO: "Allegro", slug: "allegro", img: imagenesEspejo("allegro")["blanco-calido"], luces: imagenesEspejo("allegro") },
    { id: "elt-halo", TITULO: "Halo", slug: "halo", img: imagenesEspejo("halo")["blanco-calido"], luces: imagenesEspejo("halo") },
    { id: "elt-resplandor", TITULO: "Resplandor", slug: "resplandor", img: imagenesEspejo("resplandor")["blanco-calido"], luces: imagenesEspejo("resplandor") },
    { id: "elt-lumin", TITULO: "Lumin", slug: "lumin", img: imagenesEspejo("lumin")["blanco-calido"], luces: imagenesEspejo("lumin") },
    { id: "elt-allegro-circular", TITULO: "Allegro Circular", slug: "allegro-circular", img: imagenesEspejo("allegro-circular")["blanco-calido"], luces: imagenesEspejo("allegro-circular") },
    { id: "elt-ovalado-halo", TITULO: "Ovalado Halo", slug: "ovalado-halo", img: imagenesEspejo("ovalado-halo")["blanco-calido"], luces: imagenesEspejo("ovalado-halo") },
    { id: "elt-ovalado-resplandor", TITULO: "Ovalado Resplandor", slug: "ovalado-resplandor", img: imagenesEspejo("ovalado-resplandor")["blanco-calido"], luces: imagenesEspejo("ovalado-resplandor") },
    { id: "elt-ovalado-allegro", TITULO: "Ovalado Allegro", slug: "ovalado-allegro", img: imagenesEspejo("ovalado-allegro")["blanco-calido"], luces: imagenesEspejo("ovalado-allegro") },
    { id: "elt-halo-circular", TITULO: "Halo Circular", slug: "halo-circular", img: imagenesEspejo("halo-circular")["blanco-calido"], luces: imagenesEspejo("halo-circular") },
    { id: "elt-resplandor-circular", TITULO: "Resplandor Circular", slug: "resplandor-circular", img: imagenesEspejo("resplandor-circular")["blanco-calido"], luces: imagenesEspejo("resplandor-circular") }
  ]
},
 {
  TITULO: "Películas",
  slug: "peliculas",
  productos: [
    { id: "p-polarizada", TITULO: "Polarizada", slug: "polarizada", img: "https://blir.com.mx/assets/img/shop/individuales/peliculas/1-polarizada.webp" },
    { id: "p-esmerilada", TITULO: "Esmerilada", slug: "esmerilada", img: "https://blir.com.mx/assets/img/shop/individuales/peliculas/2-esmerilada.webp" },
    { id: "p-de-seguridad", TITULO: "De Seguridad", slug: "de-seguridad", img: "https://blir.com.mx/assets/img/shop/individuales/peliculas/3-de-seguridad.webp" },
    { id: "p-reflectiva", TITULO: "Reflectiva", slug: "reflectiva", img: "https://blir.com.mx/assets/img/shop/individuales/peliculas/4-reflectiva.webp" },
    { id: "p-para-oficina", TITULO: "Para Oficina", slug: "para-oficina", img: "https://blir.com.mx/assets/img/shop/individuales/peliculas/5-para-oficina.webp" },
    {id: "p-inteligente", TITULO: "Inteligente", slug: "inteligente", img: inteligente},
    { id: "p-decorativa", TITULO: "Decorativa", slug: "decorativa", img: "https://blir.com.mx/assets/img/shop/individuales/peliculas/6-decorativa.webp" },
    { id: "p-control-solar", TITULO: "Control Solar", slug: "control-solar", img: "https://blir.com.mx/assets/img/shop/individuales/peliculas/7-control-solar.webp" }
  ]
},
 {
  TITULO: "Mamparas Sanitarias",
  slug: "mamparas-sanitarias",
  productos: [
    { id: "ms-leeder-m1", TITULO: "Leeder M1", slug: "leeder-m1", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/modumex/leeder-m1.webp" },
    { id: "ms-leeder-m2", TITULO: "Leeder M2", slug: "leeder-m2", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/modumex/leeder-m2.webp" },
    { id: "ms-leeder-lux", TITULO: "Leeder LUX", slug: "leeder-lux", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/modumex/leeder-lux.webp" },
    { id: "ms-leeder-arte", TITULO: "Leeder Arte", slug: "leeder-arte", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/modumex/leeder-arte.webp" },
    { id: "ms-leeder-kids", TITULO: "Leeder Kids", slug: "leeder-kids", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/modumex/leeder-kids.webp" },
    { id: "ms-leeder-scudo", TITULO: "Leeder Scudo", slug: "leeder-scudo", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/modumex/leeder-scudo.webp" },
    { id: "ms-leeder-curvas", TITULO: "Leeder Curvas", slug: "leeder-curvas", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/modumex/leeder-curvas.webp" },
    { id: "ms-superior-e", TITULO: "Superior E", slug: "superior-e", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/modumex/superior-e.webp" },
    { id: "ms-superior-lite", TITULO: "Superior Lite", slug: "superior-lite", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/modumex/superior-lite.webp" },
    { id: "ms-touchless-one", TITULO: "Touchless One", slug: "touchless-one", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/modumex/touchless-one.webp" },
    { id: "ms-touch-less-s1", TITULO: "Touch-Less S1", slug: "touch-less-s1", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/modumex/touch-less-s1.webp" },
    { id: "ms-touch-less-s2", TITULO: "Touch-Less S2", slug: "touch-less-s2", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/modumex/touch-less-s2.webp" },
    { id: "ms-clasica", TITULO: "Clásica", slug: "clasica", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/hegor/clasica.webp" },
    { id: "ms-acero-inoxidable", TITULO: "Acero Inoxidable", slug: "acero-inoxidable", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/hegor/inoxidable.webp" },
    { id: "ms-eleganza", TITULO: "Eleganza", slug: "eleganza", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/hegor/eleganza.webp" },
    { id: "ms-premier", TITULO: "Premier", slug: "premier", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/hegor/premier.webp" },
    { id: "ms-imperio", TITULO: "Imperio", slug: "imperio", img: "https://blir.com.mx/assets/img/shop/individuales/mamparas-sanitarias/hegor/imperio.webp" }
  ]
},
 {
  TITULO: "Puertas Sanitarias",
  slug: "puertas-sanitarias",
  productos: [
    { id: "ps-clasica", TITULO: "Clásica", slug: "clasica", img: "https://blir.com.mx/assets/img/shop/individuales/puertas-sanitarias/tradicional/clasica.webp" },
    { id: "ps-con-fijo-lateral", TITULO: "Con Fijo Lateral", slug: "con-fijo-lateral", img: "https://blir.com.mx/assets/img/shop/individuales/puertas-sanitarias/tradicional/fijo-lateral.webp" },
    { id: "ps-con-antepecho", TITULO: "Con Antepecho", slug: "con-antepecho", img: "https://blir.com.mx/assets/img/shop/individuales/puertas-sanitarias/tradicional/antepecho.webp" },
    { id: "ps-con-rejilla", TITULO: "Con Rejilla", slug: "con-rejilla", img: "https://blir.com.mx/assets/img/shop/individuales/puertas-sanitarias/tradicional/rejilla.webp" },
    { id: "ps-con-mirilla", TITULO: "Con Mirilla", slug: "con-mirilla", img: "https://blir.com.mx/assets/img/shop/individuales/puertas-sanitarias/tradicional/mirilla.webp" },
    { id: "ps-holandesa", TITULO: "Holandesa", slug: "holandesa", img: "https://blir.com.mx/assets/img/shop/individuales/puertas-sanitarias/tradicional/holandesa.webp" },
    { id: "ps-doble", TITULO: "Doble", slug: "doble", img: "https://blir.com.mx/assets/img/shop/individuales/puertas-sanitarias/tradicional/doble.webp" },
    { id: "ps-ultra", TITULO: "Ultra", slug: "ultra", img: "https://blir.com.mx/assets/img/shop/individuales/puertas-sanitarias/ultra.webp" }
  ]
},
{
  "TITULO": "Cubiertas",
  "slug": "cubiertas",
  "productos": [
    { "id": "cub-vidrio", "TITULO": "Cubiertas de Vidrio", "slug": "vidrio", "img": "https://blir.com.mx/assets/img/shop/individuales/cubiertas/1-comedor.webp" },
    { "id": "cub-bano", "TITULO": "Cubiertas de Baño", "slug": "bano", "img": "https://blir.com.mx/assets/img/shop/individuales/cubiertas/2-escritorio.webp" },
    { "id": "cub-cocina", "TITULO": "Cubiertas de Cocina", "slug": "cocina", "img": "https://blir.com.mx/assets/img/shop/individuales/cubiertas/3-cuadrado.webp" },
    { "id": "cub-mesas", "TITULO": "Cubiertas para Mesas", "slug": "mesas", "img": "https://blir.com.mx/assets/img/shop/individuales/cubiertas/4-rectangular.webp" },
    { "id": "cub-templado", "TITULO": "Cubiertas de Vidrio Templado", "slug": "templado", "img": "https://blir.com.mx/assets/img/shop/individuales/cubiertas/5-circular.webp" },
    { "id": "cub-lacobel", "TITULO": "Cubiertas de Cristal Pintado", "slug": "cristal-pintado", "img": "https://blir.com.mx/assets/img/shop/individuales/cubiertas/6-esmerilado.webp" },
    { "id": "cub-repisas", "TITULO": "Cubiertas y Repisas", "slug": "repisas", "img": "https://blir.com.mx/assets/img/shop/individuales/cubiertas/7-personalizada.webp" },
    { "id": "cub-entrepano", "TITULO": "Cubiertas Para Entrepaño", "slug": "entrepano", "img": "https://blir.com.mx/assets/img/shop/individuales/cubiertas/8-para-entrepano.webp" }
  ]
},
  {
    "TITULO": "Estructuras",
    "slug": "estructuras",
    "productos": [
      { "id": "est-domo", "TITULO": "Domo", "slug": "domo", "img": "https://blir.com.mx/assets/img/shop/individuales/estructuras/1-domo.webp" },
      { "id": "est-pergola", "TITULO": "Pérgola", "slug": "pergola", "img": "https://blir.com.mx/assets/img/shop/individuales/estructuras/2-pergola.webp" },
      { "id": "est-techo", "TITULO": "Techo", "slug": "techo", "img": "https://blir.com.mx/assets/img/shop/individuales/estructuras/3-techo.webp" },
      { "id": "est-cerramiento", "TITULO": "Cerramiento", "slug": "cerramiento", "img": "https://blir.com.mx/assets/img/shop/individuales/estructuras/4-cerramiento.webp" },
      { "id": "est-policarbonato", "TITULO": "De Policarbonato", "slug": "de-policarbonato", "img": "https://blir.com.mx/assets/img/shop/individuales/estructuras/5-de-policarbonato.webp" }
    ]
},
  {
  "TITULO": "Muebles Personalizados",
  "slug": "muebles-personalizados",
  "productos": [
    { "id": "mue-bano", "TITULO": "Muebles de Baño", "slug": "muebles-bano", "img": m_bano },
    { "id": "mue-cocina", "TITULO": "Muebles de Cocina", "slug": "muebles-cocina", "img": m_cocina },
    { "id": "mue-closets", "TITULO": "Closets", "slug": "closets", "img": m_closet },
    { "id": "mue-aluminio", "TITULO": "Muebles de Aluminio", "slug": "muebles-aluminio", "img": m_aluminio },
    { "id": "mue-repisas", "TITULO": "Repisas y Libreros de Vidrio", "slug": "repisas-libreros", "img": m_repisas },
    { "id": "mue-vestidores", "TITULO": "Vestidores Integrales", "slug": "vestidores", "img": m_vestidores },
    { "id": "mue-botiquines", "TITULO": "Botiquines con Espejo", "slug": "botiquines", "img": m_botiquines }
  ]
},
  {
    "TITULO": "Domótica",
    "slug": "domotica",
    "productos": [
      { "id": "dom-persianas", "TITULO": "Domótica para Persianas", "slug": "persianas", "img": "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { "id": "dom-puertas", "TITULO": "Domótica para Puertas", "slug": "puertas", "img": "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { "id": "dom-iluminacion", "TITULO": "Domótica para Iluminación", "slug": "iluminacion", "img": d_luces },
      { "id": "dom-cerraduras", "TITULO": "Cerraduras Inteligentes", "slug": "cerraduras-inteligentes", "img": d_cerradura },
      { "id": "dom-smart-glass", "TITULO": "Control para Vidrio Inteligente", "slug": "smart-glass", "img": d_ventana },
      { "id": "dom-motores", "TITULO": "Motores Automatizados", "slug": "motores-automatizados", "img": "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { "id": "dom-sensores", "TITULO": "Sensores y Control Inteligente", "slug": "sensores-control", "img": d_perciana }
    ]
  },
 {
  "TITULO": "Acabados Arquitectónicos",
  "slug": "acabados-arquitectonicos",
  "productos": [
    { "id": "acab-aluminio", "TITULO": "Acabados en Aluminio", "slug": "aluminio", "img": acab_aluminio },
    { "id": "acab-vidrio", "TITULO": "Acabados en Vidrio", "slug": "vidrio", "img": acab_vidrio },
    { "id": "acab-revestimientos", "TITULO": "Revestimientos", "slug": "revestimientos", "img": revestimientos },
    { "id": "acab-acm", "TITULO": "Paneles Compuestos de Aluminio (ACM)", "slug": "paneles-acm", "img": acm },
    { "id": "acab-vidrio-lacado", "TITULO": "Revestimientos en Vidrio Pintado", "slug": "vidrio-lacado", "img": vidrio_pintado },
    { "id": "acab-celosias", "TITULO": "Celosías y Louvers de Aluminio", "slug": "celosias-louvers", "img": celosias },
    { "id": "acab-lambrines", "TITULO": "Lambrines Decorativos", "slug": "lambrines-decorativos", "img": lambrines }
  ]
}
];
