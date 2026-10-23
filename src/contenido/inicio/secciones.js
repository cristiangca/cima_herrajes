// EDITABLE: servicios, testimonios e imágenes de inicio.
// Los proyectos se editan solamente en ../proyectos/lista.js.
// Los títulos y textos de apoyo de cada sección están en textos/.
import fotoHogar from "../../assets/inicio/photo-1600585154340-be6161a56a0c-1000.jpg"
import fotoDomotica from '../../assets/catalogo/domotica/persianas-simulado.webp'
// Contenido editable de inicio.
import logo from "../../assets/marca/cima.jpg"
import banner from "../../assets/inicio/hero.png"
import canceleria from "../../assets/inicio/servicios/baño.png"
import barandales from "../../assets/inicio/servicios/barandal.png"
import ventanales from "../../assets/inicio/servicios/ventana.png"
import especiales from "../../assets/inicio/servicios/especiales.png"
import soporte from "../../assets/inicio/servicios/soporte.png"

export { logo, banner }
export const SERVICIOS = [
  {
    titulo: 'Cancelería de aluminio y cristal',
    texto: 'Diseño y ejecución de soluciones para proyectos residenciales, comerciales y de construcción.',
    slug: 'canceleria-aluminio',
    img: canceleria
  },
  {
    titulo: 'Ventanales, ventanas y puertas de aluminio',
    texto: 'Sistemas corredizos, abatibles y de proyección con perfiles de alta resistencia.',
    slug: 'ventanales-puertas-aluminio',
    img: ventanales
  },
  {
    titulo: 'Barandales',
    texto: 'Barandales personalizados en vidrio, acero inoxidable y aluminio.',
    slug: 'barandales',
    img: barandales
  },
  {
    titulo: 'Cristal templado y proyectos especiales',
    texto: 'Divisiones, cubiertas, domos, pérgolas y canceles de baño.',
    slug: 'cristal-templado',
    img: especiales
  },
  {
    titulo: 'Espejos, muebles y acabados arquitectónicos',
    texto: 'Soluciones de diseño y funcionalidad para hogares, baños, vestidores y exteriores.',
    slug: 'espejos-acabados',
    img: fotoHogar
  },
  {
    titulo: 'Domótica',
    texto: 'Automatización y control inteligente para espacios residenciales y comerciales.',
    slug: 'domotica',
    img: fotoDomotica
  }
]

export const SERVICIO_DESTACADO = {
   titulo: 'Asesoría, mantenimiento y adecuaciones',
    texto: 'Mantenimiento preventivo y correctivo, reparación y renovación de instalaciones existentes, diagnóstico y evaluación técnica de trabajos previos, y asesoría especializada para optimizar y resolver proyectos existentes.',
    slug: 'asesoria-mantenimiento',
 eyebrow: 'SOLUCIONES INTEGRALES',
 img: soporte
}

export const REFERIDOS = [
 {
 texto: 'Encontrar un proveedor que entienda tiempos de obra, acabados y presupuesto no es fácil. Con Cima Herrajes dejamos de preocuparnos por eso.',
 autor: 'Arq. Daniela Ríos',
 cargo: 'Estudio AV'
 },
 {
 texto: 'Nos surtieron cancelería para 40 departamentos en tiempo récord. La calidad fue consistente en cada entrega.',
 autor: 'Ing. Marco Salinas',
 cargo: 'Constructora Delta'
 },
 {
 texto: 'Pedí cotización por WhatsApp un lunes y el miércoles ya tenía mis ventanas instaladas. Servicio impecable.',
 autor: 'Laura Méndez',
 cargo: 'Cliente residencial'
 }
]
