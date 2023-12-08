import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  esbuild: false,
  server: {
    port: 4000,
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',

      appPath: './src/index.ts',

      exportName: 'recogServer',

      tsCompiler: 'swc',

      swcOptions: {
        jsc: {
          target: 'es2022',
          parser: {
            syntax: 'typescript',
            decorators: true,
          },
          transform: {
            legacyDecorator: false,
            decoratorMetadata: true,
          },
        },
      },
    }),
  ],
  optimizeDeps: {
    // Vite does not work well with optional dependencies, you can mark them as ignored for now
    // eg: for nestjs, exclude these optional dependencies:
    exclude: ['sequelize', 'sqlite3'],
  },
});
