# Manual de actualización

La versión unificada con imágenes, índice y buscador está en [MANUAL_COMPLETO.html](MANUAL_COMPLETO.html). Incluye todos los README y los documentos de entrega y analítica. Se regenera desde la raíz con `npm run manual`.

Empieza por [la guía de contenido](../src/contenido/README.md), que relaciona cada sección con su archivo editable.

## Cambiar textos y contacto

Contacto y título principal de portada: src/contenido/general/sitio.js. Los demás textos están en los JSON de textos/, dentro de cada sección. Busca la frase y cambia el valor, conservando la clave y la sintaxis. Las plantillas con {dato1} reciben valores automáticos: conserva sus marcadores.

## Cambiar productos

Abre src/contenido/catalogo/categorias/ y elige la categoría. Edita TITULO para el nombre visible. Las fotografías se importan al principio. Conserva id y slug de los productos existentes. Consulta [la guía del catálogo](../src/contenido/catalogo/README.md) para agregar productos.

## Cambiar fotografías

Consulta [el mapa de assets](../src/assets/README.md) y [el inventario](../src/contenido/imagenes/INVENTARIO.md). Reemplazar una imagen conservando nombre y extensión mantiene sus referencias. Si cambias su ruta, actualiza el archivo de contenido correspondiente.

## Cambiar el carrusel

src/contenido/servicios/soluciones.js contiene las cuatro tarjetas y los IDs de productos cuyas fotos se alternan. carrusel.json configura velocidad y frecuencia. Título y botones: servicios/textos/SolucionesCarrusel.json.

## Revisar y publicar

```sh
npm run dev
npm run validar:contenido
npm run lint
npm run build
npm run preview
```

Revisa PC, móvil, enlaces de productos y WhatsApp. Publica dist siguiendo las instrucciones del alojamiento. No edites dist directamente: se regenera al compilar. Los cambios en el código fuente requieren volver a compilar y publicar.

npm run inventario:imagenes actualiza la lista de imágenes después de agregar o mover archivos. La configuración de analítica y los metadatos iniciales del documento están en index.html.
