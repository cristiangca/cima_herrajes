// EDITABLE: nombre, productos e imágenes de estructuras.
// Conserva id y slug para mantener enlaces, variantes y filtros.
import foto_1_domo from "../../../assets/catalogo/estructuras/1-domo.webp"
import foto_2_pergola from "../../../assets/catalogo/estructuras/2-pergola.webp"
import foto_3_techo from "../../../assets/catalogo/estructuras/3-techo.webp"
import foto_4_cerramiento from "../../../assets/catalogo/estructuras/4-cerramiento.webp"
import foto_5_de_policarbonato from "../../../assets/catalogo/estructuras/5-de-policarbonato.webp"

export default {
    "TITULO": "Estructuras",
    "slug": "estructuras",
    "productos": [
      { "id": "est-domo", "TITULO": "Domo", "slug": "domo", "img": foto_1_domo },
      { "id": "est-pergola", "TITULO": "Pérgola", "slug": "pergola", "img": foto_2_pergola },
      { "id": "est-techo", "TITULO": "Techo", "slug": "techo", "img": foto_3_techo },
      { "id": "est-cerramiento", "TITULO": "Cerramiento", "slug": "cerramiento", "img": foto_4_cerramiento },
      { "id": "est-policarbonato", "TITULO": "De Policarbonato", "slug": "de-policarbonato", "img": foto_5_de_policarbonato }
    ]
};
