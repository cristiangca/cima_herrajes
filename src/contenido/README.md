# Empieza aquí: contenido editable

También puedes consultar el [manual completo ilustrado](../../docs/MANUAL_COMPLETO.html), que reúne esta guía y las demás instrucciones del proyecto en un solo archivo.

Los textos, productos, imágenes seleccionadas y ajustes de contenido están organizados por sección. Los JSON se leen directamente desde la página.

| Quiero cambiar | Archivo dentro de esta carpeta |
| --- | --- |
| WhatsApp, teléfono, correo y dirección | general/sitio.js → CONTACTO |
| Título y descripción principal de portada | general/sitio.js → PORTADA |
| Servicios y testimonios de inicio | inicio/secciones.js |
| Historia, misión y garantía | inicio/pilares.js |
| Portada, nosotros, proceso, valores y contacto | inicio/textos/ — un JSON por sección |
| Cuatro tarjetas de soluciones y productos de sus fotos | servicios/soluciones.js |
| Velocidad y frecuencia de cambio de fotos | servicios/carrusel.json |
| Título, etiquetas y botones del carrusel | servicios/textos/SolucionesCarrusel.json |
| Productos, nombres e imágenes | catalogo/categorias/ — un archivo por categoría |
| Orden de las categorías | catalogo/productos.js |
| Etiquetas de colores LED y acabados | catalogo/opciones.js |
| Categorías recomendadas por cada servicio | servicios/categorias-relacionadas.js |
| Todos los proyectos, destacados y antes/después | proyectos/lista.js |
| Textos, condiciones y mensaje de afiliados | afiliados/textos/Afiliados.json |
| Opciones del formulario de afiliados | afiliados/servicios.js |
| Menú, pies de página y burbuja de WhatsApp | general/textos/ |
| Mensaje general y de cotización de proyectos | general/textos/whatsapp.json |
| Otras plantillas de consulta | JSON de la sección que las utiliza |
| Imágenes importadas directamente por las páginas | imagenes/seleccion.js |
| Dónde está cada imagen y qué archivo la utiliza | imagenes/INVENTARIO.md |

## Editar un texto

Busca el texto actual en el JSON de la sección. Cambia solo el valor de la derecha, conservando el nombre de la izquierda, las comas y las llaves.

```json
"disenamos_espacios_funcionales_y_modernos": "Creamos espacios a tu medida"
```

Los archivos JSON no admiten comentarios. Las instrucciones están en los README de cada carpeta. Usa `\n` para un salto de línea y `\"` para comillas dentro de un texto.

Las claves que empiezan por `plantilla_` pueden contener `{dato1}`, `{dato2}`, etc. Son valores automáticos como el nombre del producto o los datos de un formulario. Puedes moverlos dentro de la frase, pero conserva su escritura.

## Editar imágenes y productos

Consulta [la guía del catálogo](catalogo/README.md), [la guía de imágenes](../assets/README.md) y [el inventario](imagenes/INVENTARIO.md).

Reemplazar una fotografía conservando nombre, extensión y carpeta mantiene sus referencias. Si cambias la ruta, actualiza su importación en el archivo de contenido indicado por el inventario.

Edita TITULO para cambiar el nombre de un producto. Conserva id y slug de los productos existentes: conectan sus enlaces, filtros y variantes.

## Comprobar y publicar

Desde la raíz del proyecto:

```sh
npm run dev
npm run validar:contenido
npm run lint
npm run build
```

Revisa el cambio en la dirección que muestra dev. La validación revisa JSON, referencias locales, IDs de productos y productos del carrusel. build genera dist, que es la carpeta que se publica. Guardar el JSON no actualiza por sí solo el sitio publicado.

## Contenido y funcionamiento

Los .js de contenido permiten importar imágenes y llevan comentarios explicativos. catalogo/variantes contiene funciones que relacionan productos con sus fotos de acabados, luces y herrajes. El diseño y la lógica de formularios permanecen en pages, styles y utilidades. La analítica y los metadatos iniciales del documento HTML se configuran en index.html.
