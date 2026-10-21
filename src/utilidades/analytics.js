export const ID_ANALYTICS = 'G-QEEDJ58YGH';

// Lista cerrada: nunca enviar mensajes, búsquedas libres, teléfonos ni URLs completas.
const campos = new Set(['origen', 'categoria', 'producto_id', 'producto_nombre', 'acabado', 'tipo', 'metodo', 'seccion', 'ruta', 'resultados', 'longitud_busqueda', 'nivel', 'porcentaje', 'item_id', 'content_type', 'method']);

export function registrarEvento(nombre, datos = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  const parametros = { send_to: ID_ANALYTICS, transport_type: 'beacon' };
  for (const [clave, valor] of Object.entries(datos)) {
    if (!campos.has(clave) || valor === undefined || valor === null) continue;
    if (typeof valor === 'number' && Number.isFinite(valor)) parametros[clave] = valor;
    else if (typeof valor === 'string') parametros[clave] = valor.slice(0, 100);
  }
  try { window.gtag('event', nombre, parametros); } catch { /* La medición nunca interrumpe una acción. */ }
}

export function datosProducto(producto, acabado) {
  return { producto_id: producto.id, producto_nombre: producto.TITULO, categoria: producto.categoriaSlug, acabado };
}
