// EDITABLE: nombre, productos e imágenes de domotica.
// Conserva id y slug para mantener enlaces, variantes y filtros.
// Imágenes ilustrativas generadas, una por producto; archivos locales en WebP.
import foto_persianas from '../../../assets/catalogo/domotica/persianas-simulado.webp'
import foto_puertas from '../../../assets/catalogo/domotica/puertas-simulado.webp'
import foto_vidrio from '../../../assets/catalogo/domotica/vidrio-simulado.webp'
import foto_cerradura from '../../../assets/catalogo/domotica/cerraduras-simulado.webp'
import foto_luces from '../../../assets/catalogo/domotica/iluminacion-simulado.webp'
import foto_motores from '../../../assets/catalogo/domotica/motores-simulado.webp'
import foto_sensores from '../../../assets/catalogo/domotica/sensores-simulado.webp'

export default {
    "TITULO": "Domótica",
    "slug": "domotica",
    "productos": [
      { "id": "dom-persianas", "TITULO": "Domótica para Persianas", "slug": "persianas", "img": foto_persianas },
      { "id": "dom-puertas", "TITULO": "Domótica para Puertas", "slug": "puertas", "img": foto_puertas },
      { "id": "dom-iluminacion", "TITULO": "Domótica para Iluminación", "slug": "iluminacion", "img": foto_luces },
      { "id": "dom-cerraduras", "TITULO": "Cerraduras Inteligentes", "slug": "cerraduras-inteligentes", "img": foto_cerradura },
      { "id": "dom-smart-glass", "TITULO": "Control para Vidrio Inteligente", "slug": "smart-glass", "img": foto_vidrio },
      { "id": "dom-motores", "TITULO": "Motores Automatizados", "slug": "motores-automatizados", "img": foto_motores },
      { "id": "dom-sensores", "TITULO": "Sensores y Control Inteligente", "slug": "sensores-control", "img": foto_sensores }
    ]
  };
