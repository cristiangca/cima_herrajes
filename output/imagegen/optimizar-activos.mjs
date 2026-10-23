import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const sharp=require('C:/Users/pc/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const assets=JSON.parse(fs.readFileSync('output/imagegen/activos-generados.json','utf8'));
const root=path.resolve('src/assets');
const thumbnails=[];
for(const asset of assets){const dest=path.resolve(asset.dest);if(!dest.startsWith(root+path.sep))throw Error('Destino fuera de assets');if(fs.existsSync(dest))continue;fs.mkdirSync(path.dirname(dest),{recursive:true});await sharp(asset.source).rotate().resize({width:1536,height:1536,fit:'inside',withoutEnlargement:true}).webp({quality:84}).toFile(dest);thumbnails.push({input:await sharp(dest).resize(240,240,{fit:'contain',background:'#eeeeee'}).png().toBuffer(),left:(thumbnails.length%4)*240,top:Math.floor(thumbnails.length/4)*240});console.log(asset.key+': '+Math.round(fs.statSync(dest).size/1024)+' KB');}
await sharp({create:{width:960,height:Math.ceil(assets.length/4)*240,channels:3,background:'#eeeeee'}}).composite(thumbnails).png().toFile('output/imagegen/revision-domotica.png');
