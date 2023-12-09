// The script runs until `dist/index.mjs` is created by Vite, and then it exits.
// Used by `yarn start`.

import chokidar from 'chokidar';

chokidar.watch('dist').on('all', (event, path) => {
  if (event === 'add' && path === 'dist/index.mjs') {
    process.exit(0);
  }
});
