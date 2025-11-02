import path from 'path';

import svgr from '@svgr/rollup';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [svgr({ dimensions: false, svgo: false, typescript: true }), react(), tailwindcss()],
    server: {
        allowedHosts: ['xdedpx-94-232-205-182.ru.tuna.am']
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
