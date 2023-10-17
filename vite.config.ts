import { defineConfig } from 'vite'
import svgr from "vite-plugin-svgr";
import * as path from 'path'
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), preact()],
  build: {
    sourcemap: true,
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from 'preact'`,
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@design-system', replacement: path.resolve(__dirname, 'src/design-system') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/shared/components') },
      { find: '@hooks', replacement: path.resolve(__dirname, 'src/shared/hooks') },
      { find: '@context', replacement: path.resolve(__dirname, 'src/shared/context') },
      { find: '@utils', replacement: path.resolve(__dirname, 'src/shared/utils') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
      { find: '@i18n', replacement: path.resolve(__dirname, 'src/i18n') }
    ],
  },
})