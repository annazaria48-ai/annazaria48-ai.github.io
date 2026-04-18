/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** URL iframe виджета с календарём (Cal.com, Calendly), если нужен. Перекрывает siteConfig.bookingEmbedUrl. */
  readonly PUBLIC_BOOKING_EMBED_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
