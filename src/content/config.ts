import { defineCollection, z } from 'astro:content';

/** Темы для фильтра на /blog — совпадают с блоками «С чем работаю» + основные методы */
export const blogTopicEnum = z.enum([
  'anxiety',
  'depression',
  'burnout',
  'trauma',
  'relations',
  'family',
  'self-esteem',
  'growth',
  'career',
  'hypnotherapy',
  'ifs',
  'art-therapy',
]);

export type BlogTopic = z.infer<typeof blogTopicEnum>;

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).optional(),
    topics: z.array(blogTopicEnum).optional(),
  }),
});

export const collections = { blog };
