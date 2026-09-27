/**
 * Servidor local sem dependências.
 *   node dev.mjs             → gera o build, serve em http://localhost:4321 e refaz ao salvar
 *   node dev.mjs --no-watch  → só serve o build atual
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { join, extname, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
const port = Number(process.env.PORT) || 4321;
const shouldWatch = !process.argv.includes('--no-watch');

const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
  '.json': 'application/json',
  '.ico': 'image/x-icon',
};

// Cada build roda em um processo novo para sempre ler a versão atual dos módulos.
const build = () => spawnSync(process.execPath, [join(root, 'build.mjs')], { stdio: 'inherit' });
build();

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    if (path.endsWith('/')) path += 'index.html';
    const file = normalize(join(dist, path));
    if (!file.startsWith(dist)) throw new Error('fora de dist');
    await stat(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(await readFile(file));
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Não encontrado');
  }
}).listen(port, () => console.log(`→ http://localhost:${port}`));

if (shouldWatch) {
  let timer;
  const rebuild = () => {
    clearTimeout(timer);
    timer = setTimeout(build, 80);
  };
  watch(join(root, 'src'), { recursive: true }, rebuild);
  watch(join(root, 'public'), { recursive: true }, rebuild);
  console.log('Observando src/ e public/ — salve um arquivo e recarregue a página.');
}
