/**
 * Подставьте свои данные перед публикацией.
 * URL и base должны совпадать с astro.config.mjs (SITE_URL + BASE).
 */
export const siteConfig = {
  psychologistName: 'Имя Фамилия',
  shortName: 'Имя',
  city: 'Москва',
  /** Полный публичный URL сайта (без завершающего слэша), как в astro.config site + base */
  origin: 'https://your-username.github.io',
  basePath: '/psy.site',
  whatsappUrl: 'https://wa.me/79000000000',
  whatsappDisplay: '+7 (900) 000-00-00',
  telegramUrl: 'https://t.me/your_username',
  telegramDisplay: '@your_username',
  email: 'email@example.com',
  phoneTel: '+79000000000',
  phoneDisplay: '+7 (900) 000-00-00',
  /** Лет практики, клиентов, часов обучения — замените цифры */
  stats: {
    years: 5,
    clients: 120,
    hours: 800,
  },
} as const;

export function absoluteUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.origin}${siteConfig.basePath}${p === '//' ? '/' : p}`;
}
