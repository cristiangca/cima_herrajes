// Comprobación local para la entrega: npm run validar:contenido
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
const traverse = traverseModule.default;
const root = process.cwd();
function walk(dir) { return fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]); }
const problems = [];
let jsonCount = 0, references = 0;
for (const file of walk('src')) {
  if (file.endsWith('.json')) { JSON.parse(fs.readFileSync(file, 'utf8')); jsonCount++; }
  if (!/\.(js|jsx)$/.test(file)) continue;
  const source = fs.readFileSync(file, 'utf8');
  const ast = parse(source, { sourceType: 'module', plugins: ['jsx'] });
  let textos;
  function check(node) {
    const specifier = node.source?.value;
    if (!specifier?.startsWith('.')) return;
    references++;
    const target = path.resolve(path.dirname(file), specifier);
    if (![target, `${target}.js`, `${target}.jsx`, `${target}.json`].some(f => fs.existsSync(f) && fs.statSync(f).isFile())) problems.push(`${file}: no existe ${specifier}`);
    if (node.type === 'ImportDeclaration' && node.specifiers.some(s => s.local.name === 'TEXTOS')) textos = JSON.parse(fs.readFileSync(target, 'utf8'));
  }
  traverse(ast, { ImportDeclaration(p) { check(p.node); }, ExportNamedDeclaration(p) { check(p.node); }, ExportAllDeclaration(p) { check(p.node); } });
  if (textos) traverse(ast, { MemberExpression(p) {
    if (p.node.object.name !== 'TEXTOS') return;
    const key = p.node.computed ? p.node.property.value : p.node.property.name;
    if (typeof key === 'string' && !Object.hasOwn(textos, key)) problems.push(`${file}: falta el texto ${key}`);
  } });
  // Glob prefixes and their computed lookup paths must resolve to assets inside src.
  for (const match of source.matchAll(/['"`]((?:\.\.\/)+assets\/[^'"`]*\*)/g)) {
    const prefix = match[1].split('*')[0];
    if (!fs.existsSync(path.resolve(path.dirname(file), prefix))) problems.push(`${file}: carpeta de variantes inexistente ${prefix}`);
  }
}
const categories = walk('src/contenido/catalogo/categorias').filter(f => f.endsWith('.js'));
const ids = new Set();
for (const file of categories) {
  const source = fs.readFileSync(file, 'utf8');
  for (const [, id] of source.matchAll(/["']?\bid["']?\s*:\s*["']([^"']+)["']/g)) {
    if (ids.has(id)) problems.push(`ID de producto duplicado: ${id}`);
    ids.add(id);
  }
}
const solutions = fs.readFileSync('src/contenido/servicios/soluciones.js', 'utf8');
for (const [, list] of solutions.matchAll(/productos:\s*\[([^\]]+)\]/g)) {
  for (const [, id] of list.matchAll(/['"]([^'"]+)['"]/g)) if (!ids.has(id)) problems.push(`Producto del carrusel inexistente: ${id}`);
}
// Evaluate only the data modules with local image/glob adapters. This catches
// missing variant lookups as well as imports, without needing a browser/server.
const cache = new Map();
function loadContent(filename) {
  const file = path.resolve(filename);
  if (cache.has(file)) return cache.get(file);
  if (!file.startsWith(path.resolve('src/contenido') + path.sep)) throw Error(`Módulo fuera de contenido: ${file}`);
  let source = fs.readFileSync(file, 'utf8');
  const ast = parse(source, { sourceType: 'module' });
  const edits = [], imported = {}, exported = [];
  for (const node of ast.program.body) {
    if (node.type === 'ImportDeclaration') {
      const target = path.resolve(path.dirname(file), node.source.value);
      const module = /\.(png|jpe?g|webp|svg)$/i.test(target) ? { default: target } : loadContent(target);
      for (const specifier of node.specifiers) imported[specifier.local.name] = module[specifier.type === 'ImportDefaultSpecifier' ? 'default' : specifier.imported.name];
      edits.push({ start: node.start, end: node.end, text: '' });
    } else if (node.type === 'ExportDefaultDeclaration') {
      edits.push({ start: node.start, end: node.declaration.start, text: '__exports.default = ' });
    } else if (node.type === 'ExportNamedDeclaration' && node.declaration) {
      edits.push({ start: node.start, end: node.declaration.start, text: '' });
      if (node.declaration.declarations) exported.push(...node.declaration.declarations.map(d => d.id.name));
      else exported.push(node.declaration.id.name);
    }
  }
  for (const change of edits.sort((a, b) => b.start - a.start)) source = source.slice(0, change.start) + change.text + source.slice(change.end);
  source = source.replaceAll('import.meta.glob', '__glob');
  const assets = walk('src/assets').map(f => path.resolve(f));
  const glob = patterns => {
    const result = {};
    for (const pattern of Array.isArray(patterns) ? patterns : [patterns]) {
      const absolute = path.resolve(path.dirname(file), pattern).replaceAll('\\', '/');
      const expression = new RegExp('^' + absolute.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replaceAll('*', '[^/]*') + '$');
      for (const asset of assets) if (expression.test(asset.replaceAll('\\', '/'))) {
        let key = path.relative(path.dirname(file), asset).replaceAll('\\', '/');
        if (!key.startsWith('.')) key = './' + key;
        result[key] = asset;
      }
    }
    return result;
  };
  const context = { ...imported, __glob: glob, __exports: {} };
  vm.runInNewContext(source + '\n' + exported.map(name => `__exports.${name} = ${name};`).join('\n'), context, { timeout: 2000, filename: file });
  cache.set(file, context.__exports);
  return context.__exports;
}
if (!problems.length) {
  try {
    const { CATEGORIAS } = loadContent('src/contenido/catalogo/productos.js');
    for (const category of CATEGORIAS) for (const product of category.productos) {
      for (const [field, image] of Object.entries({ img: product.img, ...(product.imgDetalle ? { imgDetalle: product.imgDetalle } : {}), ...product.luces })) {
        if (typeof image !== 'string' || !fs.existsSync(image)) problems.push(`${product.id}: imagen inexistente en ${field}`);
      }
    }
    const { SOLUCIONES } = loadContent('src/contenido/servicios/soluciones.js');
    if (SOLUCIONES.length !== 4) problems.push('El carrusel requiere cuatro soluciones.');
    const projects = loadContent('src/contenido/proyectos/lista.js').PROYECTOS;
    const selected = loadContent('src/contenido/proyectos/seleccion.js');
    const projectIds = new Set();
    for (const project of projects) {
      if (!project.id || projectIds.has(project.id)) problems.push(`ID de proyecto vacío o duplicado: ${project.id}`);
      projectIds.add(project.id);
      if (![false, 1, 2, 3].includes(project.destacado)) problems.push(`${project.id}: destacado debe ser false, 1, 2 o 3.`);
      for (const field of ['portada', 'antes', 'despues']) {
        if (project[field] && !fs.existsSync(project[field])) problems.push(`${project.id}: falta la imagen ${field}.`);
      }
      if (project.destacado && !project.portada) problems.push(`${project.id}: el destacado requiere portada.`);
      if (project.mostrarEnRecientes && !project.despues) problems.push(`${project.id}: el proyecto reciente requiere imagen de después.`);
    }
    for (const position of [1, 2, 3]) {
      if (projects.filter(project => project.destacado === position).length !== 1) problems.push(`El collage requiere un solo proyecto en la posición ${position}.`);
      if (selected.PROYECTOS_DESTACADOS[position - 1]?.destacado !== position) problems.push('Orden incorrecto del collage de destacados.');
    }
    const windows = loadContent('src/contenido/catalogo/variantes/ventanas.js');
    const rails = loadContent('src/contenido/catalogo/variantes/barandales.js');
    for (const category of CATEGORIAS.filter(c => ['ventanas', 'ventanales', 'barandales'].includes(c.slug))) {
      let found = 0;
      for (const product of category.productos) {
        const item = { ...product, categoriaSlug: category.slug };
        const variant = category.slug === 'barandales' ? rails.imagenHerrajesBarandal(item, 'negro') : windows.imagenConAcabado(item, 'negro');
        if (variant !== product.img) { found++; if (!fs.existsSync(variant)) problems.push(`${product.id}: variante inexistente`); }
      }
      if (!found) problems.push(`${category.slug}: no se encontró ninguna variante negra.`);
    }
  } catch (error) { problems.push(`Evaluación de contenido: ${error.message}`); }
}
if (problems.length) { console.error(problems.join('\n')); process.exitCode = 1; }
else console.log(`Contenido válido: ${jsonCount} JSON, ${categories.length} categorías, ${ids.size} productos y ${references} referencias locales. Proyecto: ${path.basename(root)}.`);
