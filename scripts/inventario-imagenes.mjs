// Genera documentación de imágenes. No cambia ni convierte las fotografías.
import fs from 'node:fs';
import path from 'node:path';
function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]); }
const unix = file => file.replaceAll('\\', '/');
const references = new Map();
const globs = [];
const sources = walk('src/contenido').filter(f => f.endsWith('.js'));
for (const file of sources) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/['"]((?:\.\.\/)+assets\/[^'"\n]+)['"]/g)) {
    const target = unix(path.normalize(path.join(path.dirname(file), match[1])));
    if (target.includes('*')) { globs.push({ prefix: target.split('*')[0], file: unix(file) }); continue; }
    if (!references.has(target)) references.set(target, []);
    references.get(target).push(unix(file));
  }
}
const output = ['# Inventario de imágenes', '', 'Generado con `npm run inventario:imagenes`. Para sustituir una imagen, reemplaza su archivo o edita la selección en el contenido indicado. Las entradas por variante se relacionan por nombre de modelo, acabado o luz.', ''];
const images = walk('src/assets').filter(f => /\.(jpe?g|png|webp|svg|gif|avif)$/i.test(f)).map(unix).sort();
let directory = '';
for (const file of images) {
  const parent = path.posix.dirname(file);
  if (directory !== parent) {
    directory = parent;
    output.push(`## ${parent}`, '', '| Archivo | Peso | Archivo de contenido |', '| --- | --- | --- |');
  }
  const uses = [...new Set([...(references.get(file) || []), ...globs.filter(g => file.startsWith(g.prefix)).map(g => g.file)])];
  const size = `${Math.round(fs.statSync(file).size / 1024)} KB`;
  const link = path.posix.relative('src/contenido/imagenes', file).split('/').map(encodeURIComponent).join('/');
  const names = uses.length ? uses.map(f => `[${path.posix.relative('src/contenido', f)}](${path.posix.relative('src/contenido/imagenes', f)})`).join(', ') : 'Material conservado; sin selección directa en contenido';
  output.push(`| [${path.posix.basename(file)}](${link}) | ${size} | ${names} |`);
}
fs.writeFileSync('src/contenido/imagenes/INVENTARIO.md', output.join('\n') + '\n');
console.log(`Inventario actualizado: ${images.length} imágenes.`);
