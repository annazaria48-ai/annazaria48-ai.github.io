import { siteConfig, absoluteUrl } from '../site';

export function canonicalFromAstro(site: URL | undefined, url: URL): string {
  if (site) {
    return new URL(url.pathname, site).href;
  }
  return url.href;
}

function personId(): string {
  return `${absoluteUrl('/')}#person`;
}

function serviceId(): string {
  return `${absoluteUrl('/')}#professional-service`;
}

function websiteId(): string {
  return `${absoluteUrl('/')}#website`;
}

function isPlaceholderUrl(u: string): boolean {
  return /example\.com|your-username|your_username|email@example/i.test(u);
}

/** Публичные профили (не мессенджеры-контакты) — для rich results и связывания сущности. */
function sameAsLinks(): string[] {
  return [siteConfig.telegramUrl].filter((u) => u && !isPlaceholderUrl(u));
}

export function personNode(): Record<string, unknown> {
  return {
    '@type': 'Person',
    '@id': personId(),
    name: siteConfig.psychologistName,
    givenName: siteConfig.shortName,
    jobTitle: 'Психолог-консультант',
    url: absoluteUrl('/'),
    telephone: siteConfig.phoneTel,
    email: siteConfig.email,
    image: absoluteUrl('/favicon.svg'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.city,
      addressCountry: 'RU',
    },
    ...(sameAsLinks().length ? { sameAs: sameAsLinks() } : {}),
  };
}

export function professionalServiceNode(): Record<string, unknown> {
  return {
    '@type': 'ProfessionalService',
    '@id': serviceId(),
    name: `${siteConfig.psychologistName} — психолог-консультант`,
    url: absoluteUrl('/'),
    telephone: siteConfig.phoneTel,
    image: absoluteUrl('/favicon.svg'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.city,
      addressCountry: 'RU',
    },
    areaServed: {
      '@type': 'City',
      name: siteConfig.city,
    },
    provider: { '@id': personId() },
  };
}

export function websiteNode(): Record<string, unknown> {
  return {
    '@type': 'WebSite',
    '@id': websiteId(),
    url: absoluteUrl('/'),
    name: siteConfig.psychologistName,
    inLanguage: 'ru-RU',
    publisher: { '@id': personId() },
  };
}

export function webPageNode(input: {
  canonical: string;
  title: string;
  description: string;
}): Record<string, unknown> {
  return {
    '@type': 'WebPage',
    '@id': `${input.canonical}#webpage`,
    url: input.canonical,
    name: input.title,
    description: input.description,
    isPartOf: { '@id': websiteId() },
    about: { '@id': personId() },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl('/favicon.svg'),
    },
  };
}

export function collectionPageNode(input: {
  canonical: string;
  title: string;
  description: string;
}): Record<string, unknown> {
  return {
    '@type': 'CollectionPage',
    '@id': `${input.canonical}#webpage`,
    url: input.canonical,
    name: input.title,
    description: input.description,
    isPartOf: { '@id': websiteId() },
    about: { '@id': personId() },
  };
}

export function articleNode(input: {
  canonical: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  imageUrl?: string;
}): Record<string, unknown> {
  const img = input.imageUrl ?? absoluteUrl('/favicon.svg');
  return {
    '@type': 'Article',
    '@id': `${input.canonical}#article`,
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    image: [img],
    author: { '@id': personId() },
    publisher: { '@id': personId() },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${input.canonical}#webpage` },
  };
}

export function breadcrumbListNode(
  items: { name: string; path: string }[]
): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path.startsWith('/') ? it.path : `/${it.path}`),
    })),
  };
}

export function faqPageNode(items: { q: string; a: string }[]): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}

export function jsonLdGraph(nodes: Record<string, unknown>[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes,
  };
}

export function homeJsonLd(input: { canonical: string; title: string; description: string }) {
  return jsonLdGraph([
    websiteNode(),
    webPageNode(input),
    personNode(),
    professionalServiceNode(),
  ]);
}

export function innerPageJsonLd(input: {
  canonical: string;
  title: string;
  description: string;
}) {
  return jsonLdGraph([webPageNode(input), personNode(), professionalServiceNode()]);
}

export function blogIndexJsonLd(input: {
  canonical: string;
  title: string;
  description: string;
}) {
  return jsonLdGraph([
    collectionPageNode(input),
    personNode(),
    professionalServiceNode(),
  ]);
}

export function blogPostJsonLd(input: {
  canonical: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  slug: string;
}) {
  const page = webPageNode({
    canonical: input.canonical,
    title: input.headline,
    description: input.description,
  });
  return jsonLdGraph([
    page,
    articleNode({
      canonical: input.canonical,
      headline: input.headline,
      description: input.description,
      datePublished: input.datePublished,
      dateModified: input.dateModified,
    }),
    breadcrumbListNode([
      { name: 'Главная', path: '/' },
      { name: 'Блог', path: '/blog' },
      { name: input.headline, path: `/blog/${input.slug}` },
    ]),
    personNode(),
    professionalServiceNode(),
  ]);
}

export function processPageJsonLd(
  input: { canonical: string; title: string; description: string },
  faqs: { q: string; a: string }[]
) {
  return jsonLdGraph([
    webPageNode(input),
    faqPageNode(faqs),
    personNode(),
    professionalServiceNode(),
  ]);
}
