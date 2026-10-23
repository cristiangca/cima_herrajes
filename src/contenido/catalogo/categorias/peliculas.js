// EDITABLE: nombre, productos e imágenes de peliculas.
// Conserva id y slug para mantener enlaces, variantes y filtros.
import foto_1_polarizada from "../../../assets/catalogo/peliculas/1-polarizada.webp"
import foto_2_esmerilada from "../../../assets/catalogo/peliculas/2-esmerilada.webp"
import foto_3_de_seguridad from "../../../assets/catalogo/peliculas/3-de-seguridad.webp"
import foto_4_reflectiva from "../../../assets/catalogo/peliculas/4-reflectiva.webp"
import foto_5_para_oficina from "../../../assets/catalogo/peliculas/5-para-oficina.webp"
import foto_6_decorativa from "../../../assets/catalogo/peliculas/6-decorativa.webp"
import foto_7_control_solar from "../../../assets/catalogo/peliculas/7-control-solar.webp"
import foto_inteligente from "../../../assets/catalogo/peliculas/inteligente.png";

export default {
  TITULO: "Películas",
  slug: "peliculas",
  productos: [
    { id: "p-polarizada", TITULO: "Polarizada", slug: "polarizada", img: foto_1_polarizada },
    { id: "p-esmerilada", TITULO: "Esmerilada", slug: "esmerilada", img: foto_2_esmerilada },
    { id: "p-de-seguridad", TITULO: "De Seguridad", slug: "de-seguridad", img: foto_3_de_seguridad },
    { id: "p-reflectiva", TITULO: "Reflectiva", slug: "reflectiva", img: foto_4_reflectiva },
    { id: "p-para-oficina", TITULO: "Para Oficina", slug: "para-oficina", img: foto_5_para_oficina },
    {id: "p-inteligente", TITULO: "Inteligente", slug: "inteligente", img: foto_inteligente},
    { id: "p-decorativa", TITULO: "Decorativa", slug: "decorativa", img: foto_6_decorativa },
    { id: "p-control-solar", TITULO: "Control Solar", slug: "control-solar", img: foto_7_control_solar }
  ]
};
