# Servicios y carrusel

- `soluciones.js`: títulos y descripciones de las cuatro tarjetas. En `productos` se eligen, en orden, IDs existentes del catálogo. La fotografía, nombre y enlace se obtienen del producto automáticamente. Puedes agregar más IDs para alternar más fotos.
- `carrusel.json`: velocidad y frecuencia. `velocidadPixelesSegundo` controla el movimiento continuo; `cambioImagenSegundos` indica cuándo cambia una foto del conjunto. Usa números positivos. Con cuatro tarjetas y 2.5 segundos, cada tarjeta cambia aproximadamente cada diez segundos.
- `categorias-relacionadas.js`: categorías recomendadas para cada servicio. Conserva las claves de servicio.
- `textos/Servicios.json`: encabezados y mensajes de la página de servicios.
- `textos/SolucionesCarrusel.json`: título, botones y etiquetas del carrusel.

El carrusel mantiene cuatro tarjetas. Para reemplazar una foto, cambia su ID de producto: no hace falta editar el componente ni repetir la imagen aquí.
