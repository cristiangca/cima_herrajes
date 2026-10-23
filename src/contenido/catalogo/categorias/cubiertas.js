// EDITABLE: nombre, productos e imágenes de cubiertas.
// Conserva id y slug para mantener enlaces, variantes y filtros.
import foto_1_comedor from "../../../assets/catalogo/cubiertas/1-comedor.webp"
import foto_2_escritorio from "../../../assets/catalogo/cubiertas/2-escritorio.webp"
import foto_3_cuadrado from "../../../assets/catalogo/cubiertas/3-cuadrado.webp"
import foto_4_rectangular from "../../../assets/catalogo/cubiertas/4-rectangular.webp"
import foto_5_circular from "../../../assets/catalogo/cubiertas/5-circular.webp"
import foto_6_esmerilado from "../../../assets/catalogo/cubiertas/6-esmerilado.webp"
import foto_7_personalizada from "../../../assets/catalogo/cubiertas/7-personalizada.webp"
import foto_8_para_entrepano from "../../../assets/catalogo/cubiertas/8-para-entrepano.webp"

export default {
  "TITULO": "Cubiertas",
  "slug": "cubiertas",
  "productos": [
    { "id": "cub-vidrio", "TITULO": "Cubiertas de Vidrio", "slug": "vidrio", "img": foto_1_comedor },
    { "id": "cub-bano", "TITULO": "Cubiertas de Baño", "slug": "bano", "img": foto_2_escritorio },
    { "id": "cub-cocina", "TITULO": "Cubiertas de Cocina", "slug": "cocina", "img": foto_3_cuadrado },
    { "id": "cub-mesas", "TITULO": "Cubiertas para Mesas", "slug": "mesas", "img": foto_4_rectangular },
    { "id": "cub-templado", "TITULO": "Cubiertas de Vidrio Templado", "slug": "templado", "img": foto_5_circular },
    { "id": "cub-lacobel", "TITULO": "Cubiertas de Cristal Pintado", "slug": "cristal-pintado", "img": foto_6_esmerilado },
    { "id": "cub-repisas", "TITULO": "Cubiertas y Repisas", "slug": "repisas", "img": foto_7_personalizada },
    { "id": "cub-entrepano", "TITULO": "Cubiertas Para Entrepaño", "slug": "entrepano", "img": foto_8_para_entrepano }
  ]
};
