import { defineConfig } from 'tsup';

const sharedConfig = {
  external: [
    '@algolia/client-search',
    'algoliasearch',
    'contentlayer',
    'unified',
  ],
};

export default defineConfig([
  {
    ...sharedConfig,
    dts: true,
    target: 'es6',
    format: 'esm',
    entry: [
      'src/{toc,link,breadcrumb,sidebar,dynamic-link}.tsx',
      'src/{server,mdx-plugins}.ts',
      'src/contentlayer/{index,configuration}.ts',
      'src/{search,search-algolia}/client.ts',
      'src/search/shared.ts',
    ],
  },
  {
    ...sharedConfig,
    target: 'node18',
    format: 'cjs',
    dts: true,
    // Next.js can't resolve imports in ESM modules when the import points to `next`
    entry: ['src/{search,search-algolia}/server.ts', 'src/middleware.ts'],
  },
]);
