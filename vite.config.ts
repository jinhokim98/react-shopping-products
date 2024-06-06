import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@apis', replacement: resolve(__dirname, 'src/apis') },
      { find: '@appTypes', replacement: resolve(__dirname, 'src/appTypes') },
      { find: '@assets', replacement: resolve(__dirname, 'src/assets') },
      { find: '@components', replacement: resolve(__dirname, 'src/components') },
      { find: '@constants', replacement: resolve(__dirname, 'src/constants') },
      { find: '@hooks', replacement: resolve(__dirname, 'src/hooks') },
      { find: '@mocks', replacement: resolve(__dirname, 'src/mocks') },
      { find: '@pages', replacement: resolve(__dirname, 'src/pages') },
      { find: '@queries', replacement: resolve(__dirname, 'src/queries') },
      { find: '@styles', replacement: resolve(__dirname, 'src/styles') },
      { find: '@utils', replacement: resolve(__dirname, 'src/utils') },
    ],
  },
});
