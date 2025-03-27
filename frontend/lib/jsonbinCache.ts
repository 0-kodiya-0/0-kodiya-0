import { revalidateTag } from 'next/cache';

// Cache tags for different data types
export const CACHE_TAGS = {
  TESTIMONIALS: 'testimonials',
  FEATURED_TESTIMONIALS: 'featured-testimonials',
};

// Default cache time of 5 minutes (300 seconds)
export const DEFAULT_CACHE_TIME = 300;

// Helper function to revalidate multiple cache tags
export function revalidateMultipleTags(tags: string[]): void {
  tags.forEach(tag => revalidateTag(tag));
}

// Revalidate all testimonial-related cache
export function revalidateTestimonials(): void {
  revalidateMultipleTags([
    CACHE_TAGS.TESTIMONIALS,
    CACHE_TAGS.FEATURED_TESTIMONIALS
  ]);
}

// Revalidate everything
export function revalidateAll(): void {
  revalidateMultipleTags(Object.values(CACHE_TAGS));
}