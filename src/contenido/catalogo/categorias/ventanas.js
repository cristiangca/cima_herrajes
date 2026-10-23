// EDITABLE: nombre, productos e imágenes de ventanas.
// Conserva id y slug para mantener enlaces, variantes y filtros.
import foto_1_doble_corrediza from "../../../assets/catalogo/ventanas/1-doble-corrediza.webp"
import foto_2_fija_corrediza from "../../../assets/catalogo/ventanas/2-fija-corrediza.webp"
import foto_3_fija from "../../../assets/catalogo/ventanas/3-fija.webp"
import foto_4_proyectable from "../../../assets/catalogo/ventanas/4-proyectable.webp"
import foto_5_vasista from "../../../assets/catalogo/ventanas/5-vasista.webp"
import foto_6_batiente from "../../../assets/catalogo/ventanas/6-batiente.webp"
import foto_7_combinada from "../../../assets/catalogo/ventanas/7-combinada.webp"
import foto_9_oscilobatiente from "../../../assets/catalogo/ventanas/9-oscilobatiente.webp"
import foto_10_pivotante from "../../../assets/catalogo/ventanas/10-pivotante.webp"
import foto_11_plegable from "../../../assets/catalogo/ventanas/11-plegable.webp"
import foto_12_louver from "../../../assets/catalogo/ventanas/12-louver.webp"
import foto_sifon from "../../../assets/catalogo/ventanas/sifon.jpg";

export default {
  TITULO: "Ventanas",
  slug: "ventanas",
  productos: [
    { id: "v-corredizas", TITULO: "Corredizas", slug: "corredizas", img: foto_1_doble_corrediza },
    { id: "v-doble-corrediza", TITULO: "Doble Corrediza", slug: "doble-corrediza", img: foto_2_fija_corrediza },
    { id: "v-fija-corrediza", TITULO: "Fija Corrediza", slug: "fija-corrediza", img: foto_2_fija_corrediza },
    { id: "v-fijas", TITULO: "Fijas", slug: "fijas", img: foto_3_fija },
    { id: "v-proyectable", TITULO: "Proyectable", slug: "proyectable", img: foto_4_proyectable },
    { id: "v-vasista", TITULO: "Vasista", slug: "vasista", img: foto_5_vasista },
    { id: "v-batiente", TITULO: "Batiente", slug: "batiente", img: foto_6_batiente },
    { id: "v-combinada", TITULO: "Combinada", slug: "combinada", img: foto_7_combinada },
    { id: "v-sifon", TITULO: "Sifón", slug: "sifon", img: foto_sifon },
    { id: "v-oscilobatiente", TITULO: "Oscilobatiente", slug: "oscilobatiente", img: foto_9_oscilobatiente },
    { id: "v-pivotante", TITULO: "Pivotante", slug: "pivotante", img: foto_10_pivotante },
    { id: "v-plegable", TITULO: "Plegable", slug: "plegable", img: foto_11_plegable },
    { id: "v-louver", TITULO: "Louver", slug: "louver", img: foto_12_louver }
  ]
};
