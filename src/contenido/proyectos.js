import { FOTOS_PROYECTO } from './fotos-proyecto'
// Ejemplos visuales con imágenes genéricas; reemplazar por fotografías reales del mismo proyecto.
export const PROYECTOS_RECIENTES = [
  {
    id: 'residencial', nombre: 'Luz y amplitud en casa', tipo: 'Residencial',
    descripcion: 'Ventanales de aluminio y vidrio que conectan los espacios interiores con el exterior.',
    antes: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
    despues: FOTOS_PROYECTO.residencial,
    detalle: 'Ventanales · Aluminio · Cristal', ejemplo: true,
  },
  {
    id: 'barandales', nombre: 'Transparencia en cada nivel', tipo: 'Arquitectónico',
    descripcion: 'Barandales de cristal y perfiles de aluminio que dan continuidad y ligereza a escaleras y balcones.',
    antes: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    despues: FOTOS_PROYECTO.arquitectonico,
    detalle: 'Barandales · Aluminio · Cristal templado', ejemplo: true,
  },
  {
    id: 'fachada', nombre: 'Una nueva mirada al exterior', tipo: 'Comercial',
    descripcion: 'Fachadas y soluciones de vidrio para dar presencia, funcionalidad y una imagen contemporánea.',
    antes: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1000&q=80',
    despues: FOTOS_PROYECTO.comercial,
    detalle: 'Fachadas · Vidrio · Aluminio', ejemplo: true,
  },
]
