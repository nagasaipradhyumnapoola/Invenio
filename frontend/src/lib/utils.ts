/**
 * cn — className utility
 *
 * Combines clsx (conditional class logic) with tailwind-merge
 * (resolves Tailwind class conflicts). This is the standard shadcn/ui pattern.
 *
 * Usage:
 *   cn('px-4 py-2', isActive && 'bg-primary', className)
 */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * formatDate — Format a date string for display
 * Future: Will use user locale and timezone preferences from settings.
 */
export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

/**
 * truncate — Truncate a string to a maximum length
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 3) + '...'
}

/**
 * slugify — Convert a string to URL-friendly slug
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .trim()
}
