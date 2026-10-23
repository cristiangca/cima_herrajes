// Sustituye marcadores del contenido sin interpretar HTML ni ejecutar código.
// Los marcadores {dato1}, {dato2}, etc. corresponden a los valores del componente.
export function formatearTexto(plantilla, datos) {
  return plantilla.replace(/\{dato\d+\}/g, marcador => String(datos[marcador.slice(1, -1)]))
}
