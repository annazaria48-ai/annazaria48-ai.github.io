import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/** Замените на ваш GitHub username и имя репозитория (должно совпадать с base). */
const SITE_URL = 'https://your-username.github.io';
const BASE = '/psy.site/';

import { visit } from 'unist-util-visit';

function rehypeRebaseImages(base) {
  const prefix = base.replace(/\/$/, '');
  return () => (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img' && node.properties?.src?.startsWith('/')) {
        node.properties.src = prefix + node.properties.src;
      }
    });
  };
}

export default defineConfig({
  site: SITE_URL,
  base: BASE,
  integrations: [sitemap()],
  trailingSlash: 'ignore',
  markdown: {
    rehypePlugins: [rehypeRebaseImages(BASE)],
  },
});
