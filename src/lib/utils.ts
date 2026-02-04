import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// `cn` is a small utility that composes className values safely:
// - `clsx` turns mixed inputs into a space-separated class string
// - `twMerge` resolves Tailwind class conflicts (keeps last wins semantics)
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
