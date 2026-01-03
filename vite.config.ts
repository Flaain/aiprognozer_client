import path from 'path';

import svgr from '@svgr/rollup';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [svgr({ dimensions: false, svgo: false, typescript: true }), react(), tailwindcss()],
    server: {
        allowedHosts: ['i977s1-31-180-136-152.ru.tuna.am']
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
