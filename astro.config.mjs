// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import tailwindcss from '@tailwindcss/vite';

const isDev = process.argv.includes('dev');
const hasCustomDomain = fs.existsSync('./public/CNAME');

// https://astro.build/config
export default defineConfig({
  site: hasCustomDomain ? 'https://' + fs.readFileSync('./public/CNAME', 'utf-8').trim() : 'https://4rx7vist.github.io',
  base: isDev || hasCustomDomain ? '/' : '/Port_Vault',
  output: 'static',
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()]
  }
});
