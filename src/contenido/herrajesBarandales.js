const imagenes = import.meta.glob('../assets/barandales-herrajes/*/*.webp', { eager: true, query: '?url', import: 'default' });

export const HERRAJES_BARANDALES = [
  { id: 'plateado', nombre: 'Plateado', hex: '#b9bec4' },
  { id: 'negro', nombre: 'Negro', hex: '#202020' },
];

export function tieneHerrajesBarandal(producto) {
  return producto.categoriaSlug === 'barandales' && Boolean(imagenes[`../assets/barandales-herrajes/negro/${producto.slug}.webp`]);
}

export function imagenHerrajesBarandal(producto, acabado, original = producto.img) {
  if (!tieneHerrajesBarandal(producto)) return original;
  return imagenes[`../assets/barandales-herrajes/${acabado || 'plateado'}/${producto.slug}.webp`] || original;
}
