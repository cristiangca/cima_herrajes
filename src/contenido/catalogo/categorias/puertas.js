// EDITABLE: nombre, productos e imágenes de puertas.
// Conserva id y slug para mantener enlaces, variantes y filtros.
import foto_1_batiente from "../../../assets/catalogo/puertas/1-batiente.webp"
import foto_2_variante_pivotante from "../../../assets/catalogo/puertas/2-variante-pivotante.webp"
import foto_3_doble_templada from "../../../assets/catalogo/puertas/3-doble-templada.webp"
import foto_4_corrediza from "../../../assets/catalogo/puertas/4-corrediza.webp"
import foto_5_pivotante from "../../../assets/catalogo/puertas/5-pivotante.webp"
import foto_6_templada from "../../../assets/catalogo/puertas/6-templada.webp"
import foto_7_corrediza_aerea_aluminio from "../../../assets/catalogo/puertas/7-corrediza-aerea-aluminio.webp"
import foto_8_corrediza_aerea_cuadricula from "../../../assets/catalogo/puertas/8-corrediza-aerea-cuadricula.webp"
import foto_9_corrediza_aerea_templada from "../../../assets/catalogo/puertas/9-corrediza-aerea-templada.webp"
import foto_10_plegable from "../../../assets/catalogo/puertas/10-plegable.webp"
import foto_11_louver from "../../../assets/catalogo/puertas/11-louver.webp"

export default {
  TITULO: "Puertas",
  slug: "puertas",
  productos: [
    { id: "p-batiente", TITULO: "Batiente", slug: "batiente", img: foto_1_batiente },
    { id: "p-variante-pivotante", TITULO: "Variante Pivotante", slug: "variante-pivotante", img: foto_2_variante_pivotante },
    { id: "p-doble-templada", TITULO: "Doble Templada", slug: "doble-templada", img: foto_3_doble_templada },
    { id: "p-corrediza", TITULO: "Corrediza", slug: "corrediza", img: foto_4_corrediza },
    { id: "p-pivotante", TITULO: "Pivotante", slug: "pivotante", img: foto_5_pivotante },
    { id: "p-templada", TITULO: "Templada", slug: "templada", img: foto_6_templada },
    { id: "p-corrediza-aerea-aluminio", TITULO: "Corrediza Aérea Aluminio", slug: "corrediza-aerea-aluminio", img: foto_7_corrediza_aerea_aluminio },
    { id: "p-corrediza-aerea-cuadricula", TITULO: "Corrediza Aérea Cuadrícula", slug: "corrediza-aerea-cuadricula", img: foto_8_corrediza_aerea_cuadricula },
    { id: "p-corrediza-aerea-templada", TITULO: "Corrediza Aérea Templada", slug: "corrediza-aerea-templada", img: foto_9_corrediza_aerea_templada },
    { id: "p-plegable", TITULO: "Plegable", slug: "plegable", img: foto_10_plegable },
    { id: "p-louver", TITULO: "Louver", slug: "louver", img: foto_11_louver }
  ]
};
