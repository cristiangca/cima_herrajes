// EDITABLE: nombre, productos e imágenes de canceles-de-bano.
// Conserva id y slug para mantener enlaces, variantes y filtros.
import { imagenCancelBano } from "../variantes/canceles-bano.js"

export default {
  TITULO: "Canceles de Baño",
  slug: "canceles-de-bano",
  productos: [
    { id: "m-frontal", TITULO: "Frontal", slug: "frontal", img: imagenCancelBano("1-frontal"), imgDetalle: imagenCancelBano("1-frontal", "detalle") },
    { id: "m-rectangular", TITULO: "Rectangular", slug: "rectangular", img: imagenCancelBano("2-rectangular"), imgDetalle: imagenCancelBano("2-rectangular", "detalle") },
    { id: "m-cuadrada", TITULO: "Cuadrada", slug: "cuadrada", img: imagenCancelBano("3-cuadrada"), imgDetalle: imagenCancelBano("3-cuadrada", "detalle") },
    { id: "m-escuadra", TITULO: "Escuadra", slug: "escuadra", img: imagenCancelBano("4-escuadra"), imgDetalle: imagenCancelBano("4-escuadra", "detalle") },
    { id: "m-curva", TITULO: "Curva", slug: "curva", img: imagenCancelBano("5-curva"), imgDetalle: imagenCancelBano("5-curva", "detalle") },
    { id: "m-de-lujo", TITULO: "De Lujo", slug: "de-lujo", img: imagenCancelBano("6-de-lujo"), imgDetalle: imagenCancelBano("6-de-lujo", "detalle") },
    { id: "m-para-banera", TITULO: "Para Bañera", slug: "para-banera", img: imagenCancelBano("7-para-banera"), imgDetalle: imagenCancelBano("7-para-banera", "detalle") },
    { id: "m-panel-fijo", TITULO: "Panel Fijo", slug: "panel-fijo", img: imagenCancelBano("8-panel-fijo"), imgDetalle: imagenCancelBano("8-panel-fijo", "detalle") },
    { id: "m-abatible", TITULO: "Abatible", slug: "abatible", img: imagenCancelBano("9-abatible"), imgDetalle: imagenCancelBano("9-abatible", "detalle") },
    { id: "m-corrediza", TITULO: "Corrediza", slug: "corrediza", img: imagenCancelBano("10-corrediza"), imgDetalle: imagenCancelBano("10-corrediza", "detalle") },
    { id: "m-con-aluminio", TITULO: "Con Aluminio", slug: "con-aluminio", img: imagenCancelBano("11-con-aluminio"), imgDetalle: imagenCancelBano("11-con-aluminio", "detalle") },
    { id: "m-tradicionales", TITULO: "Tradicionales", slug: "tradicionales", img: imagenCancelBano("12-tradicionales"), imgDetalle: imagenCancelBano("12-tradicionales", "detalle") }
  ]
};
