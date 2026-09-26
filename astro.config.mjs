// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://4rx7vist.github.io',
  base: '/Port_Vault',
  vite: {
    plugins: [tailwindcss()]
  }
});
