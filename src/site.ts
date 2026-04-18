/**
 * Подставьте свои данные перед публикацией.
 * URL и base должны совпадать с astro.config.mjs (SITE_URL + BASE).
 */
export const siteConfig = {
  psychologistName: 'Анна Заря',
  shortName: 'Анна',
  city: 'Санкт-Петербург',
  /** Полный публичный URL сайта (без завершающего слэша), как в astro.config site + base */
  origin: 'https://your-username.github.io',
  basePath: '/psy.site',
  whatsappUrl: 'https://wa.me/79130114848',
  /** Текст на карточке контактов (номер на странице не показываем) */
  whatsappCardLabel: 'Написать в чат',
  telegramUrl: 'https://t.me/anna_zaria',
  /** Текст на карточке контактов (как у WhatsApp) */
  telegramDisplay: 'Написать в чат',
  email: 'anna.zaria.48@gmail.com',
  phoneTel: '+79130114848',
  /**
   * URL встраивания виджета с календарём (Cal.com, Calendly и т.п.), если решите показывать свободные слоты.
   * Пустая строка: форма заявки на странице контактов (связь без публичного календаря).
   */
  bookingEmbedUrl: '',
  /** Лет практики, клиентов, часов обучения */
  stats: {
    years: 3,
    clients: 50,
    hours: 3000,
  },
} as const;

export function absoluteUrl(path: string): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.origin}${siteConfig.basePath}${p === '//' ? '/' : p}`;
}
