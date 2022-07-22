import { defineConfig } from 'vite';
import { VitePluginFonts as vitePluginFonts } from 'vite-plugin-fonts';
import { createHtmlPlugin } from 'vite-plugin-html';

const htmlTransformPlugin = () => {
    return {
        name: 'html-transform',
        transformIndexHtml(html) {
            return html.replace('<script type="module"', '<script defer type="module"');
        },
        enforce: 'post',
    };
};

export default defineConfig({
    base: '/',
    plugins: [
        htmlTransformPlugin() as any,
        createHtmlPlugin({
            minify: true,
            // After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
            entry: '/src/index.ts',
            template: 'index.html',
            // Data that needs to be injected into the index.html ejs template
            inject: {
                data: {
                    title: 'ricardobarata.github.io',
                },
            },
        }),
        vitePluginFonts({
            custom: {
                families: [
                    {
                        name: 'Oswald',
                        local: 'Oswald',
                        src: './src/assets/fonts/Oswald-Regular.ttf',
                    },
                ],
                /**
                 * Defines the default `font-display` value used for the generated
                 * `@font-rule` classes.
                 */
                display: 'auto',
                preload: true,
                /**
                 * define where the font load tags should be inserted
                 * default: 'head-prepend'
                 *   values: 'head' | 'body' | 'head-prepend' | 'body-prepend'
                 */
                injectTo: 'head-prepend',
            },
        }),
    ],
    build: {
        chunkSizeWarningLimit: 600,
        rollupOptions: {
            output: {
                manualChunks: undefined,
            },
        },
    },
});
