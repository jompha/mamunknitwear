import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const assetStub = fileURLToPath(new URL('./tests/stubs/asset.ts', import.meta.url));

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
  resolve: {
    alias: [
      {
        // Match the whole image/font specifier so the replacement stands alone.
        find: /^(?:\.{0,2}\/)+.*\.(?:png|jpe?g|gif|webp|avif|svg|woff2?)$/i,
        replacement: assetStub,
      },
    ],
  },
  define: {
    'import.meta.env.SITE': JSON.stringify('https://mmknit.github.io'),
  },
});
