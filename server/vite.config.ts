import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  server: {
    port: 4000
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',

      appPath: './src/index.js',

      exportName: 'recogServer',

      tsCompiler: 'esbuild'
    })
  ],
  optimizeDeps: {
    // Vite does not work well with optional dependencies,
    // you can mark them as ignored for now
    // eg: for nestjs, exclude these optional dependencies:
    exclude: [
      'sequelize',
      'sqlite3'
    ]
  }
});
