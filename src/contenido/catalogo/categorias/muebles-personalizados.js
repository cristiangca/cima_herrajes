// EDITABLE: nombre, productos e imágenes de muebles-personalizados.
// Conserva id y slug para mantener enlaces, variantes y filtros.
import foto_botiquines_espejo from "../../../assets/catalogo/muebles-personalizados/botiquines_espejo.jpg";
import foto_closet from "../../../assets/catalogo/muebles-personalizados/closet.jpg";
import foto_muebles_aluminio from "../../../assets/catalogo/muebles-personalizados/muebles_aluminio.jpg";
import foto_muebles_bano from "../../../assets/catalogo/muebles-personalizados/muebles_bano.jpg";
import foto_muebles_cocina from "../../../assets/catalogo/muebles-personalizados/muebles_cocina.jpg";
import foto_repisas_libreros_vidrio from "../../../assets/catalogo/muebles-personalizados/repisas_libreros_vidrio.jpg";
import foto_vestidores_integrales from "../../../assets/catalogo/muebles-personalizados/vestidores_integrales.jpg";

export default {
  "TITULO": "Muebles Personalizados",
  "slug": "muebles-personalizados",
  "productos": [
    { "id": "mue-bano", "TITULO": "Muebles de Baño", "slug": "muebles-bano", "img": foto_muebles_bano },
    { "id": "mue-cocina", "TITULO": "Muebles de Cocina", "slug": "muebles-cocina", "img": foto_muebles_cocina },
    { "id": "mue-closets", "TITULO": "Closets", "slug": "closets", "img": foto_closet },
    { "id": "mue-aluminio", "TITULO": "Muebles de Aluminio", "slug": "muebles-aluminio", "img": foto_muebles_aluminio },
    { "id": "mue-repisas", "TITULO": "Repisas y Libreros de Vidrio", "slug": "repisas-libreros", "img": foto_repisas_libreros_vidrio },
    { "id": "mue-vestidores", "TITULO": "Vestidores Integrales", "slug": "vestidores", "img": foto_vestidores_integrales },
    { "id": "mue-botiquines", "TITULO": "Botiquines con Espejo", "slug": "botiquines", "img": foto_botiquines_espejo }
  ]
};
