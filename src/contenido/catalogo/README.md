# Catálogo editable

Cada archivo de `categorias/` contiene una categoría y sus productos, en el orden visible. `productos.js` determina el orden de las categorías.

| Campo | Función |
| --- | --- |
| `TITULO` | Nombre que ve el cliente, tanto de la categoría como del producto |
| `id` | Enlace único al producto y referencia del carrusel |
| `slug` | Identificador utilizado por filtros y variantes de imágenes |
| `productos` | Lista de productos de la categoría |
| `img` | Imagen de la tarjeta |
| `imgDetalle` | Imagen de mayor tamaño, cuando existe |
| `luces` | Variantes de iluminación del espejo |

Para editar un nombre, cambia `TITULO`. Para cambiar su foto, reemplaza la imagen indicada por el `import` al principio de la categoría, o modifica esa ruta. Conserva `id` y `slug` de los productos existentes.

## Agregar un producto

1. Coloca su imagen en `src/assets/catalogo/<categoria>/`.
2. Importa la imagen al principio de la categoría.
3. Añade un objeto a `productos` con un `id` nuevo y único.

```js
import fotoMiPuerta from '../../../assets/catalogo/puertas/mi-puerta.webp'

// Dentro de productos, separado del elemento anterior por una coma:
{ id: 'p-mi-puerta', TITULO: 'Mi puerta', slug: 'mi-puerta', img: fotoMiPuerta }
```

Para agregar una categoría, crea su archivo y añádelo a `productos.js`. Las recomendaciones de servicios se configuran en `../servicios/categorias-relacionadas.js`.

## Variantes

`variantes/` contiene funciones de búsqueda por modelo, luz y acabado. No son listas de productos. Los nombres deben coincidir con las carpetas de assets:

- Ventanas y ventanales: `variantes/<acabado>/<slug>.png`.
- Barandales: `variantes/<plateado o negro>/<slug>.webp`.
- Espejos LED: `<luz>/<modelo>.jpg`.
- Canceles de baño: `<modelo>-tarjeta.webp` y `<modelo>-detalle.webp`.

`opciones.js` contiene las etiquetas visibles de luces y acabados. `textos/` contiene botones, ayudas y mensajes del catálogo.
