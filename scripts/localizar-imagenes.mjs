import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';

// Ejecutar desde la raíz. El manifiesto permite recuperar las fuentes originales.
const manifiestoPath = 'src/contenido/imagenes-origen.json';
let manifiesto = [];
try { manifiesto = JSON.parse(await readFile(manifiestoPath, 'utf8')); } catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
const fuentes = ['catalogo', 'inicio', 'proyectos'];
const textos = new Map();
for (const fuente of fuentes) {
  const archivo = `src/contenido/${fuente}.js`;
  const texto = await readFile(archivo, 'utf8');
  textos.set(archivo, texto);
  for (const url of new Set(texto.match(/https:\/\/(?:blir\.com\.mx|images\.unsplash\.com)\/[^'"\s]+/g) || [])) {
    if (manifiesto.some(item => item.url === url && item.archivo === archivo)) continue;
    const parsed = new URL(url);
    const relativo = parsed.hostname === 'blir.com.mx'
      ? `catalogo/${parsed.pathname.split('/individuales/')[1]}`
      : `${fuente}/${path.posix.basename(parsed.pathname)}-${parsed.searchParams.get('w') || 'original'}.jpg`;
    manifiesto.push({ archivo, url, local: `src/assets/${relativo}` });
  }
}
let indice = 0;
let fallos = 0;
await Promise.all(Array.from({ length: 6 }, async () => {
  while (indice < manifiesto.length) {
    const item = manifiesto[indice++];
    try {
      try { await access(item.local); } catch {
        const respuesta = await fetch(item.url, { signal: AbortSignal.timeout(45000) });
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        if (!respuesta.headers.get('content-type')?.startsWith('image/')) throw new Error('La respuesta no es una imagen');
        const datos = Buffer.from(await respuesta.arrayBuffer());
        if (!datos.length) throw new Error('Imagen vacía');
        await mkdir(path.dirname(item.local), { recursive: true });
        await writeFile(item.local, datos);
      }
      console.log(`OK ${item.local}`);
    } catch (error) { fallos++; console.error(`ERROR ${item.url}: ${error.message}`); }
  }
}));
await writeFile(manifiestoPath, JSON.stringify(manifiesto, null, 2) + '\n');
if (fallos) throw new Error(`${fallos} descargas fallidas. Ejecuta de nuevo para reintentarlas.`);
for (const [archivo, original] of textos) {
  let texto = original;
  const imports = [];
  let numero = 0;
  for (const item of manifiesto.filter(item => item.archivo === archivo)) {
    if (!texto.includes(item.url)) continue;
    const nombre = `imagenLocal${numero++}`;
    imports.push(`import ${nombre} from '${item.local.replace('src/', '../')}'`);
    texto = texto.replaceAll(`'${item.url}'`, nombre).replaceAll(`"${item.url}"`, nombre);
  }
  if (imports.length) await writeFile(archivo, imports.join('\n') + '\n' + texto);
}
console.log(`Verificadas ${manifiesto.length} referencias; contenido conectado a imágenes locales.`);
