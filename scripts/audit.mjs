import {readdir,readFile} from 'node:fs/promises';
import {join} from 'node:path';
const dir=process.argv[2];if(!dir){console.error('Usage: node scripts/audit.mjs ARTICLES_DIR');process.exit(2)}
let errors=0, count=0;
for(const name of (await readdir(dir)).sort()){
 if(!name.endsWith('.md'))continue;
 count++;
 const text=await readFile(join(dir,name),'utf8');
 if(!/^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(name)||!/^---\r?\n/.test(text)||!/^schema: 1\s*$/m.test(text)){console.error('Invalid article: '+name);errors++;}
}
console.log(JSON.stringify({count,errors}));if(errors||!count)process.exitCode=1;
