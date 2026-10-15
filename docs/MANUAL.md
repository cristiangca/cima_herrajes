# Manual de mantenimiento para CIMA Herrajes

## Antes de editar

Guardar una copia del proyecto o registrar los cambios con Git. Abrirlo en Visual Studio Code u otro editor. Cambiar el contenido entre comillas conservando comas, llaves y comillas. Guardar como UTF-8 para mantener acentos.

## Cambiar un texto

En `src/contenido/sitio.js`, cambiar `PORTADA.titulo` y `PORTADA.descripcion`. Ejemplo:

```js
titulo: 'Cancelería y cristal para tu proyecto.',
```

En `src/contenido/inicio.js` están los textos de servicios, proyectos y testimonios. En `src/contenido/catalogo.js`, editar `TITULO` para cambiar nombres de productos. Otros textos de inicio están en los componentes de `src/pages/inicio/componentes/`; los pilares están en `src/pages/Pilares.jsx`.

## Cambiar una imagen

Reemplazar el archivo en `src/assets/` conservando exactamente nombre y extensión. Por ejemplo, `hero.png` es la portada. El logotipo de inicio es `src/assets/cima.jpg`; el icono del navegador usa otra copia en `public/cima.jpg`.

Si cambia el nombre, actualizar su importación al principio de `src/contenido/inicio.js` o `src/contenido/catalogo.js`:

```js
import banner from '../assets/nueva-portada.jpg'
```

Usar imágenes autorizadas, sin deformarlas. Procurar menos de 500 KB por producto y menos de 1 MB en portada. Algunas imágenes son enlaces externos: para usar una fotografía propia, importarla y asignar esa variable en `img`, siguiendo los ejemplos de imágenes locales.

## Cambiar contacto

En `src/contenido/sitio.js`, `whatsapp` lleva país y número sin espacios ni signo +; `telefonoVisible` es el texto mostrado. Actualizar ambos, además de `correo` y `ubicacion`. El número actual se tomó de inicio y debe confirmarse con la empresa.

## Agregar un producto

En `src/contenido/catalogo.js`, agregar un elemento a `productos` de la categoría, separado por una coma:

```js
{ id: 'producto-nuevo', TITULO: 'Nombre del producto', slug: 'producto-nuevo', img: miImagen }
```

Importar `miImagen` al principio del archivo. Cada id debe ser único. Conservar los id y slug existentes para mantener los enlaces compartidos. Si se agregan categorías, revisar también `src/pages/catalogo/map-servicios-categorias.jsx` para las recomendaciones.

## Cambiar estilos

En `src/styles/tema.css`, `--accent` es el azul principal de inicio, `--accent-hover` su tono al pasar el cursor, `--ink` el texto oscuro y `--bg-soft` el fondo suave. Conservar nombres de variables y buen contraste.

El diseño completo está en `src/styles/home.css`, `catalogo.css` y `pilares.css`. Algunos colores están escritos directamente en esos archivos. Las reglas `@media` ajustan la vista de celular. Cambiar una propiedad a la vez y revisar computadora y celular.

## Revisar y publicar

1. Ejecutar `npm run dev` y revisar texto, imágenes, menú y catálogo.
2. Probar búsqueda, ampliación de imágenes y enlaces de productos.
3. Comprobar que los botones de WhatsApp abren el número correcto, sin necesidad de enviar mensajes.
4. Ejecutar `npm run lint` y `npm run build`.
5. Revisar la versión final con `npm run preview`.
6. Publicar el contenido de `dist` mediante el proveedor de alojamiento de la empresa.

El alojamiento debe servir index.html al abrir una ruta como /servicios/p-batiente. `public/_redirects` incluye una regla para proveedores compatibles; otros necesitan configurar su equivalente. Conservar la versión publicada anterior para restaurarla si hace falta.

Si aparece una pantalla en blanco, revisar la terminal y deshacer el último cambio. Si no carga una imagen, comprobar ruta, mayúsculas y extensión. Si el sitio publicado no cambia, verificar que se publicó una compilación nueva y recargar sin caché.
