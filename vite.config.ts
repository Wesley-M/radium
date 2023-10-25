import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svgr(), react(), splitVendorChunkPlugin()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: '@design-system', replacement: path.resolve(__dirname, 'src/design-system') },
      { find: '@components', replacement: path.resolve(__dirname, 'src/shared/components') },
      { find: '@assets', replacement: path.resolve(__dirname, 'src/shared/assets') },
      { find: '@api', replacement: path.resolve(__dirname, 'src/api') },
      { find: '@i18n', replacement: path.resolve(__dirname, 'src/i18n') }
    ],
  },
})
