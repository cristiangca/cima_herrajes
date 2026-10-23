// EDITABLE: nombre, productos e imágenes de acabados-arquitectonicos.
// Conserva id y slug para mantener enlaces, variantes y filtros.
import foto_acabados_aluminio from "../../../assets/catalogo/acabados-arquitectonicos/acabados_aluminio.jpg";
import foto_acabados_vidrio from "../../../assets/catalogo/acabados-arquitectonicos/acabados_vidrio.jpg";
import foto_celosias_louvers_aluminio from "../../../assets/catalogo/acabados-arquitectonicos/celosias_louvers_aluminio.jpg";
import foto_lambrines_decorativos from "../../../assets/catalogo/acabados-arquitectonicos/lambrines_decorativos.jpg";
import foto_paneles_acm from "../../../assets/catalogo/acabados-arquitectonicos/paneles_acm.jpg";
import foto_revestimientos from "../../../assets/catalogo/acabados-arquitectonicos/revestimientos.jpg";
import foto_vidrio_pintado from "../../../assets/catalogo/acabados-arquitectonicos/vidrio_pintado.jpg";

export default {
  "TITULO": "Acabados Arquitectónicos",
  "slug": "acabados-arquitectonicos",
  "productos": [
    { "id": "acab-aluminio", "TITULO": "Acabados en Aluminio", "slug": "aluminio", "img": foto_acabados_aluminio },
    { "id": "acab-vidrio", "TITULO": "Acabados en Vidrio", "slug": "vidrio", "img": foto_acabados_vidrio },
    { "id": "acab-revestimientos", "TITULO": "Revestimientos", "slug": "revestimientos", "img": foto_revestimientos },
    { "id": "acab-acm", "TITULO": "Paneles Compuestos de Aluminio (ACM)", "slug": "paneles-acm", "img": foto_paneles_acm },
    { "id": "acab-vidrio-lacado", "TITULO": "Revestimientos en Vidrio Pintado", "slug": "vidrio-lacado", "img": foto_vidrio_pintado },
    { "id": "acab-celosias", "TITULO": "Celosías y Louvers de Aluminio", "slug": "celosias-louvers", "img": foto_celosias_louvers_aluminio },
    { "id": "acab-lambrines", "TITULO": "Lambrines Decorativos", "slug": "lambrines-decorativos", "img": foto_lambrines_decorativos }
  ]
};
