# Imágenes de la página

Las carpetas siguen las secciones del contenido. Para reemplazar una imagen conserva nombre, extensión y carpeta. Si cambias su ruta, actualiza también el archivo indicado por el [inventario de imágenes](../contenido/imagenes/INVENTARIO.md).

| Carpeta | Contiene | Dónde se elige |
| --- | --- | --- |
| marca/ | Logotipo | contenido/inicio/secciones.js e imagenes/seleccion.js |
| inicio/ | Portadas y fotografías de inicio | contenido/inicio/ e imagenes/seleccion.js |
| inicio/servicios/ | Miniaturas de especialidades | contenido/inicio/secciones.js |
| catalogo/categoria/ | Fotografías de productos | contenido/catalogo/categorias/categoria.js |
| catalogo/ventanas/variantes/ | Ventanas por acabado | contenido/catalogo/variantes/ventanas.js |
| catalogo/ventanales/variantes/ | Ventanales por acabado | El mismo archivo de variantes de ventanas |
| catalogo/barandales/variantes/ | Herrajes plateados y negros | contenido/catalogo/variantes/barandales.js |
| catalogo/espejos-led-touch/ | Modelos por luz | contenido/catalogo/variantes/espejos.js |
| catalogo/canceles-de-bano/ | Imágenes para tarjeta y detalle | contenido/catalogo/variantes/canceles-bano.js |
| proyectos/ | Fotografías de proyectos | contenido/proyectos/lista.js |
| proyectos/referencias/ | Escenas ilustrativas | contenido/proyectos/fotografias.js (solo referencias compartidas) |
| documentacion/referencias/ | Material de referencia conservado | No se selecciona automáticamente para publicar |

## Reemplazar una foto

1. Busca la sección o producto en contenido.
2. Identifica el archivo de imagen en su importación o en el inventario.
3. Prepara la nueva imagen con la misma extensión real. Renombrar .jpg a .webp no convierte el formato.
4. Reemplaza el archivo y revisa la página con npm run dev.
5. Ejecuta npm run validar:contenido y npm run build antes de publicar.

Como referencia, las tarjetas suelen necesitar de 640 a 1000 píxeles de ancho; las portadas requieren más resolución. Usa WebP para fotografías nuevas cuando sea posible y conserva la proporción.

## Variantes y nombres

Las carpetas variantes se buscan por modelo y acabado. Conserva esos nombres para que coincidan con el slug del producto. Las luces de espejo siguen luz/modelo.jpg; los canceles de baño utilizan modelo-tarjeta.webp y modelo-detalle.webp.

Los ventanales están en catalogo/ventanales, separados de los canceles de baño en catalogo/canceles-de-bano. Cada categoría tiene un README.
