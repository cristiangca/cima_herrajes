const fotos = import.meta.glob('../assets/canceles-bano/*.webp', { eager: true, query: '?url', import: 'default' })
export function imagenCancelBano(nombre, version = 'tarjeta') {
  return fotos[`../assets/canceles-bano/${nombre}-${version}.webp`]
}
