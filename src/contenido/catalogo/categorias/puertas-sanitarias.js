// EDITABLE: nombre, productos e imágenes de puertas-sanitarias.
// Conserva id y slug para mantener enlaces, variantes y filtros.
import foto_clasica from "../../../assets/catalogo/puertas-sanitarias/tradicional/clasica.webp"
import foto_fijo_lateral from "../../../assets/catalogo/puertas-sanitarias/tradicional/fijo-lateral.webp"
import foto_antepecho from "../../../assets/catalogo/puertas-sanitarias/tradicional/antepecho.webp"
import foto_rejilla from "../../../assets/catalogo/puertas-sanitarias/tradicional/rejilla.webp"
import foto_mirilla from "../../../assets/catalogo/puertas-sanitarias/tradicional/mirilla.webp"
import foto_holandesa from "../../../assets/catalogo/puertas-sanitarias/tradicional/holandesa.webp"
import foto_doble from "../../../assets/catalogo/puertas-sanitarias/tradicional/doble.webp"
import foto_ultra from "../../../assets/catalogo/puertas-sanitarias/ultra.webp"

export default {
  TITULO: "Puertas Sanitarias",
  slug: "puertas-sanitarias",
  productos: [
    { id: "ps-clasica", TITULO: "Clásica", slug: "clasica", img: foto_clasica },
    { id: "ps-con-fijo-lateral", TITULO: "Con Fijo Lateral", slug: "con-fijo-lateral", img: foto_fijo_lateral },
    { id: "ps-con-antepecho", TITULO: "Con Antepecho", slug: "con-antepecho", img: foto_antepecho },
    { id: "ps-con-rejilla", TITULO: "Con Rejilla", slug: "con-rejilla", img: foto_rejilla },
    { id: "ps-con-mirilla", TITULO: "Con Mirilla", slug: "con-mirilla", img: foto_mirilla },
    { id: "ps-holandesa", TITULO: "Holandesa", slug: "holandesa", img: foto_holandesa },
    { id: "ps-doble", TITULO: "Doble", slug: "doble", img: foto_doble },
    { id: "ps-ultra", TITULO: "Ultra", slug: "ultra", img: foto_ultra }
  ]
};
