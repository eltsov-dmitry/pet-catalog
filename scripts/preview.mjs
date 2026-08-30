// Раздаёт dist со сжатием и SPA-фолбэком, как статический хостинг
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';

const ROOT = resolve(process.cwd(), 'dist');
const PORT = Number(process.env.PORT) || 5050;

const CONTENT_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.map': 'application/json; charset=utf-8',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.woff2': 'font/woff2',
};

const read = async (path) => {
    try {
        return await readFile(path);
    } catch {
        return null;
    }
};

const server = createServer(async (req, res) => {
    const pathname = decodeURIComponent(req.url.split('?')[0]);
    const filePath = join(ROOT, normalize(pathname === '/' ? '/index.html' : pathname));

    // /favorites и прочие маршруты файлами не существуют
    let body = await read(filePath);
    const servedPath = body ? filePath : join(ROOT, 'index.html');
    body ??= await read(servedPath);

    if (!body) {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
        res.end('Нет dist. Сначала yarn build');
        return;
    }

    const headers = { 'content-type': CONTENT_TYPES[extname(servedPath)] ?? 'application/octet-stream' };
    const accepted = req.headers['accept-encoding'] ?? '';

    if (accepted.includes('br')) {
        body = brotliCompressSync(body);
        headers['content-encoding'] = 'br';
    } else if (accepted.includes('gzip')) {
        body = gzipSync(body, { level: 9 });
        headers['content-encoding'] = 'gzip';
    }

    headers['content-length'] = body.length;
    res.writeHead(200, headers);
    res.end(body);
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Порт ${PORT} занят. Останови прежний процесс или задай другой: PORT=5051 pnpm preview`);
        process.exit(1);
    }

    throw error;
});

server.listen(PORT, () => {
    console.log(`Превью прод-сборки: http://localhost:${PORT}`);
});
