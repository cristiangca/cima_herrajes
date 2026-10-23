// EDITABLE: todos los proyectos se editan solamente en este archivo.
// Las imágenes de estos tres proyectos son simulaciones, no trabajos documentados.
import residencialAntes from '../../assets/proyectos/luz-y-amplitud/antes-simulado.webp'
import residencialDespues from '../../assets/proyectos/luz-y-amplitud/despues-simulado.webp'
import barandalesAntes from '../../assets/proyectos/transparencia/antes-simulado.webp'
import barandalesDespues from '../../assets/proyectos/transparencia/despues-simulado.webp'
import fachadaAntes from '../../assets/proyectos/nueva-mirada/antes-simulado.webp'
import fachadaDespues from '../../assets/proyectos/nueva-mirada/despues-simulado.webp'

// COLLAGE EN PC: 1 = grande a la izquierda; 2 = derecha arriba; 3 = derecha abajo.
// Conserva exactamente un proyecto por posición. Usa false si no debe destacarse.
// mostrarEnRecientes permite utilizar la misma ficha también en la página de proyectos.
// ejemplo: true muestra la etiqueta de proyecto simulado; mantenla para estas imágenes.
// Para reemplazar por un trabajo real, cambia los datos y fotografías de su carpeta.
export const PROYECTOS = [
  {
    id: 'residencial', nombre: 'Luz y amplitud en casa', tipo: 'Residencial',
    descripcion: 'Propuesta simulada de renovación con puertas corredizas de aluminio negro y vidrio para conectar la sala con el jardín.',
    detalle: 'Puertas corredizas · Aluminio negro · Vidrio',
    portada: residencialDespues, antes: residencialAntes, despues: residencialDespues,
    destacado: 2, mostrarEnRecientes: true, ejemplo: true,
  },
  {
    id: 'barandales', nombre: 'Transparencia en cada nivel', tipo: 'Arquitectónico',
    descripcion: 'Propuesta simulada de sustitución de un barandal antiguo por cristal templado con herrajes de acero inoxidable, respetando la escalera existente.',
    detalle: 'Barandales · Cristal templado · Acero inoxidable',
    portada: barandalesDespues, antes: barandalesAntes, despues: barandalesDespues,
    destacado: 3, mostrarEnRecientes: true, ejemplo: true,
  },
  {
    id: 'fachada', nombre: 'Una nueva mirada al exterior', tipo: 'Comercial',
    descripcion: 'Propuesta simulada para modernizar el acceso de una oficina con una fachada de vidrio y perfiles de aluminio negro.',
    detalle: 'Fachada · Acceso de vidrio · Aluminio negro',
    portada: fachadaDespues, antes: fachadaAntes, despues: fachadaDespues,
    destacado: 1, mostrarEnRecientes: true, ejemplo: true,
  },
]
