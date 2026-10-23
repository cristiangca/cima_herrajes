# Proyectos: un solo archivo editable

Edita todos los proyectos en **lista.js**. Cada proyecto se escribe una sola vez y puede aparecer en el inicio, en la página de proyectos, o en ambos lugares.

## Collage de destacados: conservar este estilo

En PC el collage mantiene su diseño actual:

```text
┌───────────────────────┬──────────────────┐
│                       │  2 · Derecha     │
│  1 · Grande           │      arriba      │
│      izquierda        ├──────────────────┤
│                       │  3 · Derecha     │
│                       │      abajo       │
└───────────────────────┴──────────────────┘
```

- `destacado: 1`: proyecto grande a la izquierda.
- `destacado: 2`: proyecto de arriba a la derecha.
- `destacado: 3`: proyecto de abajo a la derecha.
- `destacado: false`: no se muestra en el collage.

Debe existir exactamente un proyecto por posición 1, 2 y 3. Para sustituir uno, cambia la posición del anterior a false y asigna su número al nuevo. El orden de lista.js no cambia estas posiciones. El estilo está declarado en src/pages/inicio/componentes/proyectosCollage.css; en celular se conserva la distribución vertical existente.

## Campos de cada proyecto

| Campo | Qué editar |
| --- | --- |
| id | Identificador único; conserva los existentes |
| nombre | Nombre visible |
| tipo | Residencial, comercial, arquitectónico, etc. |
| descripcion | Explicación del trabajo realizado |
| detalle | Materiales o elementos del proyecto |
| portada | Foto del collage de inicio |
| antes | Foto del estado inicial; null si no hay foto |
| despues | Foto del resultado; obligatoria si aparece en recientes |
| destacado | 1, 2, 3 o false, según su posición en el collage |
| mostrarEnRecientes | true para aparecer en la página de proyectos |
| ejemplo | true para conservar el aviso de fotografías de referencia |

Los tres proyectos actuales son simulaciones con imágenes de antes y después del mismo espacio. Conservan ejemplo: true y se muestran tanto en recientes como en el collage. Para publicar un trabajo real, reemplaza sus datos y fotografías.

## Añadir un proyecto

1. Crea una carpeta en src/assets/proyectos con un nombre claro, por ejemplo casa-lopez.
2. Coloca sus fotos ahí: portada.webp, antes.webp y despues.webp, según las que tengas.
3. Importa las fotos al principio de lista.js.
4. Copia un bloque de proyecto, cambia sus datos y asigna un id nuevo.

```js
import casaAntes from '../../assets/proyectos/casa-lopez/antes.webp'
import casaDespues from '../../assets/proyectos/casa-lopez/despues.webp'

// Dentro de PROYECTOS:
{
  id: 'casa-lopez', nombre: 'Casa López', tipo: 'Residencial',
  descripcion: 'Renovación de ventanas de aluminio.',
  detalle: 'Ventanas · Aluminio',
  portada: casaDespues, antes: casaAntes, despues: casaDespues,
  destacado: false, mostrarEnRecientes: true, ejemplo: false,
},
```

Si no tienes foto de antes, usa antes: null; la página oculta ese bloque. Para mostrar el mismo proyecto en ambos lugares, activa mostrarEnRecientes y asígnale una de las tres posiciones disponibles del collage.

## Otros archivos

- seleccion.js es automático: prepara las listas de inicio y recientes a partir de lista.js. No dupliques contenido aquí.
- fotografias.js selecciona escenas de referencia compartidas por otras secciones; no contiene fichas de proyectos.
- textos/ProyectosRecientes.json e ../inicio/textos/Proyectos.json contienen encabezados y botones de cada sección.

Después de editar, ejecuta npm run validar:contenido y npm run lint. La validación comprueba las fotos, los IDs y las tres posiciones del collage. Revisa en npm run dev; para publicar vuelve a compilar con npm run build.

## Ejemplos instalados

La lista actual incluye tres proyectos simulados, con sus pares antes/después y fotografías WebP locales en assets/proyectos. Los tres se muestran en recientes y en el collage. El collage mantiene fachada grande a la izquierda, residencial arriba a la derecha y barandales abajo a la derecha. Las imágenes y descripciones se identifican como simulaciones. Los archivos antiguos se conservan como referencia, sin duplicar fichas en lista.js.
