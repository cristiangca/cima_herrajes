import fs from 'node:fs';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const sharp=require('C:/Users/pc/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const folders=['luz-y-amplitud','transparencia','nueva-mirada'];const images=[];
for(const [row,folder] of folders.entries())for(const [col,phase]of ['antes','despues'].entries())images.push({input:await sharp(`src/assets/proyectos/${folder}/${phase}-simulado.webp`).resize(600,400,{fit:'contain',background:'#eee'}).png().toBuffer(),left:col*600,top:row*400});
await sharp({create:{width:1200,height:1200,channels:3,background:'#eee'}}).composite(images).png().toFile('output/imagegen/revision-proyectos.png');
const generated=JSON.parse(fs.readFileSync('src/contenido/imagenes/generadas.json','utf8'));for(const asset of generated.imagenes){if(!fs.existsSync(asset.archivo)||!asset.prompt)throw Error('Falta imagen o prompt: '+asset.archivo);}console.log('13 imágenes y prompts presentes; antes/después listos.');
