import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { registrarEvento, datosProducto, ID_ANALYTICS } from '../src/utilidades/analytics.js';

afterEach(() => { delete globalThis.window; });
test('no falla cuando Analytics está bloqueado o no hay navegador', () => {
  registrarEvento('prueba');
  globalThis.window = {};
  registrarEvento('prueba');
  globalThis.window.gtag = () => { throw new Error('bloqueado'); };
  assert.doesNotThrow(() => registrarEvento('prueba'));
});
test('envía una sola vez a la propiedad existente y excluye datos libres', () => {
  const llamadas = [];
  globalThis.window = { gtag: (...args) => llamadas.push(args) };
  registrarEvento('click_whatsapp', { origen: 'modal-producto', producto_id: 'b-anclas', acabado: 'negro', mensaje: 'Mi nombre y teléfono', correo: 'persona@example.com', search_term: 'texto privado', url: 'https://wa.me/?text=privado' });
  assert.equal(llamadas.length, 1);
  assert.deepEqual(llamadas[0], ['event', 'click_whatsapp', { send_to: ID_ANALYTICS, transport_type: 'beacon', origen: 'modal-producto', producto_id: 'b-anclas', acabado: 'negro' }]);
});
test('limita tamaño, conserva cero resultados y omite valores inválidos', () => {
  let evento;
  globalThis.window = { gtag: (...args) => { evento = args[2]; } };
  registrarEvento('busqueda_catalogo', { resultados: 0, longitud_busqueda: 12, origen: 'a'.repeat(200), acabado: undefined, nivel: NaN });
  assert.equal(evento.resultados, 0);
  assert.equal(evento.origen.length, 100);
  assert.equal('acabado' in evento, false);
  assert.equal('nivel' in evento, false);
});
test('extrae solamente metadatos públicos del producto', () => {
  assert.deepEqual(datosProducto({ id: 'b-anclas', TITULO: 'Con Anclas', categoriaSlug: 'barandales', img: '/imagen.webp' }, 'negro'), { producto_id: 'b-anclas', producto_nombre: 'Con Anclas', categoria: 'barandales', acabado: 'negro' });
});
