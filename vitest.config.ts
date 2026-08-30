import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    resolve: {
        alias: { '@': path.resolve(__dirname, 'src') },
    },
    test: {
        // jsdom нужен персисту: он пишет в localStorage
        environment: 'jsdom',
        include: ['src/**/*.test.ts'],
        restoreMocks: true,
    },
});
