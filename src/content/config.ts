import { defineCollection, z } from 'astro:content';

const categoriesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    categorySlug: z.string(),
    shortDescription: z.string().max(100),
    image: z.string(),
    imageAlt: z.string().min(5).max(125),
    isPlaceholder: z.boolean().default(true),
    customizationOptions: z.array(z.string()).min(2),
    materials: z.array(z.string()).min(2),
    whatsappMessage: z.string(),
    order: z.number(),
  }),
});

const galleryCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    category: z.string(),
    image: z.string(),
    imageAlt: z.string().min(5).max(125),
    isPlaceholder: z.boolean().default(true),
    materialType: z.string(),
    dimensions: z.string(),
    finishType: z.string(),
    location: z.string(),
    whatsappMessage: z.string(),
    date: z.date().optional(),
  }),
});

const reviewsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    customerName: z.string(),
    projectType: z.string(),
    rating: z.number().min(1).max(5).optional(),
    date: z.date().optional(),
    source: z.enum(['manual', 'google']).default('manual'),
  }),
});

const materialsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    budgetTier: z.enum(['Budget', 'Mid-Range', 'Premium']),
    applicableCategories: z.array(z.string()),
    order: z.number(),
    isPlaceholder: z.boolean().default(false),
  }),
});

export const collections = {
  categories: categoriesCollection,
  gallery: galleryCollection,
  reviews: reviewsCollection,
  materials: materialsCollection,
};
