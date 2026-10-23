# Imágenes

- `seleccion.js`: imágenes importadas directamente por las páginas.
- `INVENTARIO.md`: archivos de imágenes, su peso y el contenido que los utiliza. Se regenera con `npm run inventario:imagenes`.
- `origenes.json`: registro de fuentes originales y sus archivos locales; sirve para recuperación, no para seleccionar fotos de la página.

Las demás imágenes se eligen junto con su contenido: inicio en `../inicio/secciones.js`, productos en `../catalogo/categorias/` y proyectos en `../proyectos/`.

Puedes reemplazar una foto conservando nombre, extensión y carpeta. Consulta también `src/assets/README.md`.

- generadas.json documenta las imágenes creadas mediante la herramienta integrada de generación, sus prompts y su ruta final en assets. Es un registro; las selecciones siguen junto a su contenido.
