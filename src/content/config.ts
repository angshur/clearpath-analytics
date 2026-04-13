import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    keywords: z.array(z.string()).optional(),
    author: z.string().default('Angshuman Rudra'),
    readTime: z.string().optional(),
  }),
});

export const collections = { blog };
