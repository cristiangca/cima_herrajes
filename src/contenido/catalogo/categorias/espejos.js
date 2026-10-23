// EDITABLE: nombre, productos e imágenes de espejos.
// Conserva id y slug para mantener enlaces, variantes y filtros.
import foto_1_personalizado from "../../../assets/catalogo/espejos/1-personalizado.webp"
import foto_2_circular from "../../../assets/catalogo/espejos/2-circular.webp"
import foto_3_decorativo from "../../../assets/catalogo/espejos/3-decorativo.webp"
import foto_4_biselado from "../../../assets/catalogo/espejos/4-biselado.webp"
import foto_5_media_luna from "../../../assets/catalogo/espejos/5-media-luna.webp"
import foto_6_ovalado_biselado from "../../../assets/catalogo/espejos/6-ovalado-biselado.webp"
import foto_7_ovo from "../../../assets/catalogo/espejos/7-ovo.webp"
import foto_8_asimetrico from "../../../assets/catalogo/espejos/8-asimetrico.webp"
import foto_9_con_marco_de_aluminio from "../../../assets/catalogo/espejos/9-con-marco-de-aluminio.webp"

export default {
  TITULO: "Espejos",
  slug: "espejos",
  productos: [
    { id: "e-personalizado", TITULO: "Personalizado", slug: "personalizado", img: foto_1_personalizado },
    { id: "e-circular", TITULO: "Circular", slug: "circular", img: foto_2_circular },
    { id: "e-decorativo", TITULO: "Decorativo", slug: "decorativo", img: foto_3_decorativo },
    { id: "e-biselado", TITULO: "Biselado", slug: "biselado", img: foto_4_biselado },
    { id: "e-media-luna", TITULO: "Media Luna", slug: "media-luna", img: foto_5_media_luna },
    { id: "e-ovalado-biselado", TITULO: "Ovalado Biselado", slug: "ovalado-biselado", img: foto_6_ovalado_biselado },
    { id: "e-ovo", TITULO: "Ovo", slug: "ovo", img: foto_7_ovo },
    { id: "e-asimetrico", TITULO: "Asimétrico", slug: "asimetrico", img: foto_8_asimetrico },
    { id: "e-con-marco-de-aluminio", TITULO: "Con Marco de Aluminio", slug: "con-marco-de-aluminio", img: foto_9_con_marco_de_aluminio }
  ]
};
