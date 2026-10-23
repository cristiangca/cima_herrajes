// Automático: no dupliques proyectos aquí. Todo se edita en lista.js.
import { PROYECTOS } from './lista.js'

// Orden fijo: grande a la izquierda y dos pequeñas a la derecha.
export const PROYECTOS_DESTACADOS = [1, 2, 3]
  .map(posicion => PROYECTOS.find(proyecto => proyecto.destacado === posicion))
  .filter(Boolean)

export const PROYECTOS_RECIENTES = PROYECTOS.filter(proyecto => proyecto.mostrarEnRecientes)
