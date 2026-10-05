import { useState, useMemo } from 'react';
import '../styles/catalogo.css';
import imagen from '../assets/ventana.png';
import imagen2 from '../assets/barandal.png';
import imagen3 from '../assets/baño.png';
import { FaWhatsapp, FaSearch, FaTimes } from 'react-icons/fa';

const NUMERO_WHATSAPP = "521234567890"; // Reemplaza con tu número de WhatsApp

// ===== CATEGORÍAS COMPLETAS =====
const CATEGORIAS = [
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
    { id: "v-corredizas", TITULO: "Corredizas", slug: "corredizas", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
    { id: "v-doble-corrediza", TITULO: "Doble Corrediza", slug: "doble-corrediza", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/2-doble-corrediza.webp" },
    { id: "v-fija-corrediza", TITULO: "Fija Corrediza", slug: "fija-corrediza", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/3-fija-corrediza.webp" },
    { id: "v-fijas", TITULO: "Fijas", slug: "fijas", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/3-fija.webp" },
    { id: "v-proyectable", TITULO: "Proyectable", slug: "proyectable", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/4-proyectable.webp" },
    { id: "v-vasista", TITULO: "Vasista", slug: "vasista", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/5-vasista.webp" },
    { id: "v-batiente", TITULO: "Batiente", slug: "batiente", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/6-batiente.webp" },
    { id: "v-combinada", TITULO: "Combinada", slug: "combinada", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/7-combinada.webp" },
    { id: "v-guillotina", TITULO: "Guillotina", slug: "guillotina", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/8-guillotina.webp" },
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
    { id: "b-anclas", TITULO: "Con Anclas", slug: "con-anclas", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
    { id: "b-chapetones", TITULO: "Con Chapetones", slug: "con-chapetones", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/2-chapetones.webp" },
    { id: "b-herraje-pasamanos", TITULO: "Con Herraje y Pasamanos", slug: "herraje-pasamanos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/3-herraje-pasamanos.webp" },
    { id: "b-minipostes-pasamanos", TITULO: "Con Minipostes y Pasamanos", slug: "minipostes-pasamanos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/4-minipostes-pasamanos.webp" },
    { id: "b-pasamanos", TITULO: "Con Pasamanos", slug: "con-pasamanos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/5-pasamanos.webp" },
    { id: "b-pinzas-pasamanos", TITULO: "Con Pinzas y Pasamanos", slug: "pinzas-pasamanos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/6-pinzas-pasamanos.webp" },
    { id: "b-postes-pasamanos", TITULO: "Con Postes y Pasamanos", slug: "postes-pasamanos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/7-postes-pasamanos.webp" },
    { id: "b-acero-inoxidable", TITULO: "De Acero Inoxidable", slug: "acero-inoxidable", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/8-acero-inoxidable.webp" },
    { id: "b-empotrado", TITULO: "Empotrado", slug: "empotrado", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/9-empotrado.webp" },
    { id: "b-empotrado-pasamanos", TITULO: "Empotrado con Pasamanos", slug: "empotrado-pasamanos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/10-empotrado-pasamanos.webp" },
    { id: "b-cierre-pasamanos", TITULO: "Cierre con Pasamanos", slug: "cierre-pasamanos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/11-cierre-pasamanos.webp" },
    { id: "b-doble-empotrado", TITULO: "Doble Barandal Empotrado", slug: "doble-empotrado", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/12-doble-empotrado.webp" },
    { id: "b-alberca", TITULO: "De Alberca", slug: "alberca", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/13-alberca.webp" },
    { id: "b-balcon", TITULO: "De Balcón", slug: "balcon", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/14-balcon.webp" },
    { id: "b-hotel-pasamanos", TITULO: "De Hotel con Pasamanos", slug: "hotel-pasamanos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/15-hotel-pasamanos.webp" },
    { id: "b-perimetral", TITULO: "Perimetral", slug: "perimetral", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/16-perimetral.webp" }
  ]
}
,

  {
    TITULO: "Espejos",
    slug: "espejos",
    productos: [
      { id: "e-bano", TITULO: "Espejos de Baño", slug: "espejos-bano", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "e-decorativos", TITULO: "Espejos Decorativos", slug: "espejos-decorativos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "e-medida", TITULO: "Espejos a Medida", slug: "espejos-medida", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "e-biselados", TITULO: "Espejos Biselados", slug: "espejos-biselados", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "e-flotados", TITULO: "Espejos Flotados", slug: "espejos-flotados", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "e-marco-aluminio", TITULO: "Espejos con Marco de Aluminio", slug: "marco-aluminio", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "e-cuerpo-completo", TITULO: "Espejos de Cuerpo Completo", slug: "cuerpo-completo", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" }
    ]
  },
  {
    TITULO: "Canceles",
    slug: "canceles",
    productos: [
      { id: "c-corredizos", TITULO: "Corredizos", slug: "corredizos", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "c-abatibles", TITULO: "Abatibles", slug: "abatibles", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "c-doble-corredizo", TITULO: "Doble Corredizo", slug: "doble-corredizo", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "c-escuadra", TITULO: "En Escuadra", slug: "escuadra", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "c-fijo-puerta", TITULO: "Cancel Fijo con Puerta", slug: "fijo-puerta", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "c-plegables", TITULO: "Canceles Plegables", slug: "plegables", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "c-acero-inoxidable", TITULO: "Canceles en Acero Inoxidable", slug: "acero-inoxidable", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "c-cristal-templado", TITULO: "Canceles de Cristal Templado", slug: "cristal-templado", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" }
    ]
  },
  {
    TITULO: "Mamparas",
    slug: "mamparas",
    productos: [
      { id: "m-bano", TITULO: "Mamparas de Baño", slug: "mamparas-bano", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "m-regadera", TITULO: "Mamparas para Regadera", slug: "mamparas-regadera", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "m-walk-in", TITULO: "Walk-in", slug: "walk-in", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "m-fijas", TITULO: "Mamparas Fijas", slug: "mamparas-fijas", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "m-plegables", TITULO: "Mamparas Plegables", slug: "mamparas-plegables", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "m-divisiones-cristal", TITULO: "Divisiones de Cristal", slug: "divisiones-cristal", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" }
    ]
  },
  {
    TITULO: "Espejos LED Touch",
    slug: "espejos-led-touch",
    productos: [
      { id: "led-touch", TITULO: "Espejo LED Touch", slug: "led-touch", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "led-antivaho", TITULO: "Espejo LED con Antivaho", slug: "led-antivaho", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "led-hora", TITULO: "Espejo LED con Hora", slug: "led-hora", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "led-tricolor", TITULO: "Espejo LED Tricolor", slug: "led-tricolor", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "led-bluetooth", TITULO: "Espejo LED con Bluetooth", slug: "led-bluetooth", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "led-redondo", TITULO: "Espejo LED Redondo", slug: "led-redondo", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "led-retroiluminado", TITULO: "Espejo LED Retroiluminado", slug: "led-retroiluminado", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "led-sensor", TITULO: "Espejo LED con Sensor", slug: "led-sensor", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" }
    ]
  },
  {
    TITULO: "Películas",
    slug: "peliculas",
    productos: [
      { id: "p-control-solar", TITULO: "Película Control Solar", slug: "control-solar", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "p-seguridad", TITULO: "Película de Seguridad", slug: "seguridad", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "p-decorativa", TITULO: "Película Decorativa", slug: "decorativa", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "p-esmerilada", TITULO: "Película Esmerilada", slug: "esmerilada", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "p-polarizada", TITULO: "Película Polarizada", slug: "polarizada", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "p-inteligente", TITULO: "Película Inteligente (Smart Film)", slug: "inteligente", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "p-anti-uv", TITULO: "Película Filtro UV", slug: "filtro-uv", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" }
    ]
  },
  {
    TITULO: "Mamparas Sanitarias",
    slug: "mamparas-sanitarias",
    productos: [
      { id: "ms-sanitarias", TITULO: "Mamparas Sanitarias", slug: "mamparas-sanitarias", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "ms-divisiones-bano", TITULO: "Divisiones de Baño", slug: "divisiones-bano", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "ms-oficina", TITULO: "Mamparas para Oficina", slug: "mamparas-oficina", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "ms-acero-inoxidable", TITULO: "Mamparas Sanitarias de Acero Inoxidable", slug: "acero-inoxidable", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "ms-fenolico", TITULO: "Mamparas Sanitarias Fenólicas (HPL)", slug: "fenolico", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "ms-plastilite", TITULO: "Mamparas Sanitarias Plastilite", slug: "plastilite", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "ms-cristal", TITULO: "Mamparas Sanitarias de Cristal", slug: "cristal", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" }
    ]
  },
  {
    TITULO: "Puertas Sanitarias",
    slug: "puertas-sanitarias",
    productos: [
      { id: "ps-sanitarias", TITULO: "Puertas Sanitarias", slug: "puertas-sanitarias", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/1-batiente.webp" },
      { id: "ps-vaiven", TITULO: "Puertas de Vaivén", slug: "vaiven", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/1-batiente.webp" },
      { id: "ps-hospital", TITULO: "Puertas para Hospital", slug: "hospital", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/1-batiente.webp" },
      { id: "ps-acero-inoxidable", TITULO: "Puertas Sanitarias de Acero Inoxidable", slug: "acero-inoxidable", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/1-batiente.webp" },
      { id: "ps-alto-trafico", TITULO: "Puertas de Alto Tráfico", slug: "alto-trafico", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/1-batiente.webp" },
      { id: "ps-mirilla", TITULO: "Puertas Sanitarias con Mirilla", slug: "mirilla", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/1-batiente.webp" },
      { id: "ps-automaticas", TITULO: "Puertas Automáticas Sanitarias", slug: "automaticas", img: "https://blir.com.mx/assets/img/shop/individuales/puertas/1-batiente.webp" }
    ]
  },
  {
    TITULO: "Cubiertas",
    slug: "cubiertas",
    productos: [
      { id: "cub-vidrio", TITULO: "Cubiertas de Vidrio", slug: "vidrio", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "cub-bano", TITULO: "Cubiertas de Baño", slug: "bano", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "cub-cocina", TITULO: "Cubiertas de Cocina", slug: "cocina", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "cub-mesas", TITULO: "Cubiertas para Mesas", slug: "mesas", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "cub-templado", TITULO: "Cubiertas de Vidrio Templado", slug: "templado", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "cub-lacobel", TITULO: "Cubiertas de Cristal Pintado", slug: "cristal-pintado", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "cub-repisas", TITULO: "Cubiertas y Repisas", slug: "repisas", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" }
    ]
  },
  {
    TITULO: "Estructuras",
    slug: "estructuras",
    productos: [
      { id: "est-aluminio", TITULO: "Estructuras de Aluminio", slug: "aluminio", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "est-vidrio", TITULO: "Estructuras de Vidrio", slug: "vidrio", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "est-techos-domos", TITULO: "Techos y Domos", slug: "techos-domos", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "est-pergolas", TITULO: "Pérgolas de Aluminio y Vidrio", slug: "pergolas", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "est-tragaluces", TITULO: "Tragaluces y Marquesinas", slug: "tragaluces", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "est-fachadas", TITULO: "Fachadas Integrales", slug: "fachadas", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "est-solarios", TITULO: "Solarios de Vidrio", slug: "solarios", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" }
    ]
  },
  {
    TITULO: "Muebles Personalizados",
    slug: "muebles-personalizados",
    productos: [
      { id: "mue-bano", TITULO: "Muebles de Baño", slug: "muebles-bano", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "mue-cocina", TITULO: "Muebles de Cocina", slug: "muebles-cocina", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "mue-closets", TITULO: "Closets", slug: "closets", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "mue-aluminio", TITULO: "Muebles de Aluminio", slug: "muebles-aluminio", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "mue-repisas", TITULO: "Repisas y Libreros de Vidrio", slug: "repisas-libreros", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "mue-vestidores", TITULO: "Vestidores Integrales", slug: "vestidores", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" },
      { id: "mue-botiquines", TITULO: "Botiquines con Espejo", slug: "botiquines", img: "https://blir.com.mx/assets/img/shop/individuales/barandales/1-anclas.webp" }
    ]
  },
  {
    TITULO: "Domótica",
    slug: "domotica",
    productos: [
      { id: "dom-persianas", TITULO: "Domótica para Persianas", slug: "persianas", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "dom-puertas", TITULO: "Domótica para Puertas", slug: "puertas", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "dom-iluminacion", TITULO: "Domótica para Iluminación", slug: "iluminacion", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "dom-cerraduras", TITULO: "Cerraduras Inteligentes", slug: "cerraduras-inteligentes", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "dom-smart-glass", TITULO: "Control para Vidrio Inteligente", slug: "smart-glass", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "dom-motores", TITULO: "Motores Automatizados", slug: "motores-automatizados", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "dom-sensores", TITULO: "Sensores y Control Inteligente", slug: "sensores-control", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" }
    ]
  },
  {
    TITULO: "Acabados Arquitectónicos",
    slug: "acabados-arquitectonicos",
    productos: [
      { id: "acab-aluminio", TITULO: "Acabados en Aluminio", slug: "aluminio", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "acab-vidrio", TITULO: "Acabados en Vidrio", slug: "vidrio", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "acab-revestimientos", TITULO: "Revestimientos", slug: "revestimientos", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "acab-acm", TITULO: "Paneles Compuestos de Aluminio (ACM)", slug: "paneles-acm", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "acab-vidrio-lacado", TITULO: "Revestimientos en Vidrio Pintado", slug: "vidrio-lacado", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "acab-celosias", TITULO: "Celosías y Louvers de Aluminio", slug: "celosias-louvers", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" },
      { id: "acab-lambrines", TITULO: "Lambrines Decorativos", slug: "lambrines-decorativos", img: "https://blir.com.mx/assets/img/shop/individuales/ventanas/1-corrediza.webp" }
    ]
  }
];

export default function Catalogo() {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('puertas');
  const [busqueda, setBusqueda] = useState('');
  const [productoModal, setProductoModal] = useState(null);

  // Obtener productos de la categoría activa sin necesidad de un useState duplicado
  const productosCategoria = useMemo(() => {
    const cat = CATEGORIAS.find((c) => c.slug === categoriaSeleccionada);
    return cat ? cat.productos : [];
  }, [categoriaSeleccionada]);

  // Si hay texto en el buscador, busca en TODAS las categorías simultáneamente
  const productosVisibles = useMemo(() => {
    if (!busqueda.trim()) return productosCategoria;

    const query = busqueda.toLowerCase();
    return CATEGORIAS.flatMap((cat) =>
      cat.productos.map((prod) => ({ ...prod, categoriaPadre: cat.TITULO }))
    ).filter((prod) => prod.TITULO.toLowerCase().includes(query));
  }, [busqueda, productosCategoria]);

  const obtenerEnlaceWhatsApp = (nombreProducto) => {
    const mensaje = encodeURIComponent(`Hola, me interesa cotizar el producto: ${nombreProducto}`);
    return `https://wa.me/${NUMERO_WHATSAPP}?text=${mensaje}`;
  };
return (
  <div className="catalogo-container">
    <h1>Soluciones diseñadas para adaptarse a cada espacio y necesidad</h1>
    {!busqueda && (
      <div className="catalogo-filtros">
        {CATEGORIAS.map((categoria) => (
          <button
            key={categoria.slug}
            className={`catalogo-filtro ${categoriaSeleccionada === categoria.slug ? 'active' : ''}`}
            onClick={() => setCategoriaSeleccionada(categoria.slug)}
          >
            {categoria.TITULO}
          </button>
        ))}
      </div>
    )}
    <div className="catalogo-grid">
      {productosVisibles.map((producto) => (
        <div key={producto.id} className="catalogo-item">
          <div className="catalogo-img-wrapper" onClick={() => setProductoModal(producto)}>
            <img src={producto.img} alt={producto.TITULO} loading="lazy" />
          </div>
          <h2>{producto.TITULO}</h2>
          {producto.categoriaPadre && (
            <span className="categoria-tag">{producto.categoriaPadre}</span>
          )}
        </div>
      ))}
    </div>
  </div>
);
}