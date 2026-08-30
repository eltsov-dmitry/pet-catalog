// Размеры прод-сборки: сырой, gzip, brotli
import { readdir, readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';

const ROOT = resolve(process.cwd(), 'dist');
const kb = (bytes) => String(Math.round(bytes / 1024)).padStart(5);

const files = (await readdir(ROOT)).filter((name) => /\.(js|css)$/.test(name)).sort();

if (files.length === 0) {
    console.log('Нет dist. Сначала yarn build');
    process.exit(1);
}

let totals = { raw: 0, gzip: 0, brotli: 0 };

for (const name of files) {
    const body = await readFile(join(ROOT, name));
    const gzip = gzipSync(body, { level: 9 }).length;
    const brotli = brotliCompressSync(body).length;

    totals = { raw: totals.raw + body.length, gzip: totals.gzip + gzip, brotli: totals.brotli + brotli };
    console.log(`${name.padEnd(42)} ${kb(body.length)} KB ${kb(gzip)} gzip ${kb(brotli)} br`);
}

console.log('-'.repeat(70));
console.log(`${'ИТОГО'.padEnd(42)} ${kb(totals.raw)} KB ${kb(totals.gzip)} gzip ${kb(totals.brotli)} br`);
