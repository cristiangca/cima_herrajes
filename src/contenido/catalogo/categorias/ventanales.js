// EDITABLE: nombre, productos e imágenes de ventanales.
// Conserva id y slug para mantener enlaces, variantes y filtros.
import foto_1_fijo from "../../../assets/catalogo/ventanales/1-fijo.webp"
import foto_2_fijo_corredizo from "../../../assets/catalogo/ventanales/2-fijo-corredizo.webp"
import foto_3_doble_corredizo from "../../../assets/catalogo/ventanales/3-doble-corredizo.webp"
import foto_4_plegable from "../../../assets/catalogo/ventanales/4-plegable.webp"
import foto_5_combinado from "../../../assets/catalogo/ventanales/5-combinado.webp"
import foto_6_personalizado from "../../../assets/catalogo/ventanales/6-personalizado.webp"
import foto_7_moderno from "../../../assets/catalogo/ventanales/7-moderno.webp"
import foto_8_moderno_triple_hoja from "../../../assets/catalogo/ventanales/8-moderno-triple-hoja.webp"
import foto_9_mixtos from "../../../assets/catalogo/ventanales/9-mixtos.webp"

export default {
  TITULO: "Ventanales",
  slug: "ventanales",
  productos: [
    { id: "c-fijo", TITULO: "Fijo", slug: "fijo", img: foto_1_fijo },
    { id: "c-fijo-corredizo", TITULO: "Fijo Corredizo", slug: "fijo-corredizo", img: foto_2_fijo_corredizo },
    { id: "c-doble-corredizo", TITULO: "Doble Corredizo", slug: "doble-corredizo", img: foto_3_doble_corredizo },
    { id: "c-plegable", TITULO: "Plegable", slug: "plegable", img: foto_4_plegable },
    { id: "c-combinado", TITULO: "Combinado", slug: "combinado", img: foto_5_combinado },
    { id: "c-personalizado", TITULO: "Personalizado", slug: "personalizado", img: foto_6_personalizado },
    { id: "c-moderno", TITULO: "Moderno", slug: "moderno", img: foto_7_moderno },
    { id: "c-moderno-triple-hoja", TITULO: "Moderno Triple Hoja", slug: "moderno-triple-hoja", img: foto_8_moderno_triple_hoja },
    { id: "c-mixtos", TITULO: "Mixtos", slug: "mixtos", img: foto_9_mixtos }
  ]
};
