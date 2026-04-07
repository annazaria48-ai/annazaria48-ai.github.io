import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/** Замените на ваш GitHub username и имя репозитория (должно совпадать с base). */
const SITE_URL = 'https://your-username.github.io';
const BASE = '/psy.site';

export default defineConfig({
  site: SITE_URL,
  base: BASE,
  integrations: [sitemap()],
  trailingSlash: 'never',
});
