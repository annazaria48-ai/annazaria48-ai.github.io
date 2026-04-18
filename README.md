# Сайт психолога (Astro)

Статический сайт на [Astro](https://astro.build): страницы, блог из Markdown, деплой на GitHub Pages.

## Требования

- **Node.js** 18+ (для CI используется 20)
- **npm**

## Быстрый старт

```bash
npm install
npm run dev
```

Локальный адрес обычно: `http://localhost:4321`. С учётом `base` в конфиге пути будут вида `http://localhost:4321/psy.site/`.

## Скрипты

| Команда        | Назначение                          |
|----------------|-------------------------------------|
| `npm run dev`  | Режим разработки с hot reload       |
| `npm run build`| Сборка в `dist/`                    |
| `npm run preview` | Просмотр production-сборки локально |

## Настройка перед публикацией

1. **`astro.config.mjs`** — задайте `SITE_URL` (origin, без пути к репо) и `BASE` (путь репозитория на GitHub Pages, например `/psy.site`). Для пользовательского сайта `username.github.io` без подпапки укажите `base: '/'`.
2. **`src/site.ts`** — имя, город, телефон, мессенджеры, почта, статистика. Поля `origin` и `basePath` должны соответствовать `SITE_URL` и `BASE` из конфига Astro.
3. **`public/robots.txt`** — замените URL в директиве `Sitemap` на ваш реальный (как в итоговом адресе сайта + `sitemap-index.xml`).

После смены `base` перезапустите dev-сервер.

## Структура проекта

```
src/
  components/     # Header, Footer, CTA, HeroSection
  content/blog/   # Статьи блога (.md + frontmatter)
  layouts/        # BaseLayout (мета, обёртка страниц)
  pages/          # Маршруты сайта
  styles/         # global.css
public/           # favicon, robots.txt, статика (images/)
```

Черновики текстов страниц лежат в корне в папке `pages/` и в `seo.md` — это референс; рендерятся страницы из `src/pages/`.

## Блог

Файлы в `src/content/blog/`:

- обязательный **frontmatter**: `title`, `description`, `date`, опционально `tags`
- URL статьи: `{base}/blog/{имя-файла-без-md}`

Новая статья — новый `.md` в этой папке.

## SEO и карта сайта

- Мета-теги и Open Graph задаются в **`src/layouts/BaseLayout.astro`** (через пропсы страниц).
- Подключён **`@astrojs/sitemap`**: при сборке в `dist/` появляется sitemap (нужен корректный `site` в `astro.config.mjs`).

## Деплой (GitHub Pages)

В репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Workflow: `.github/workflows/deploy.yml` (push в `main` или `master`). Первый деплой может потребовать выдачи разрешения на workflow в настройках Actions.

## Полезные ссылки

- [Документация Astro](https://docs.astro.build)
- [Astro + GitHub Pages](https://docs.astro.build/en/guides/deploy/github/)
