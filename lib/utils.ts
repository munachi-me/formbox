import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
}

export function truncateText(
  text: string,
  length: number = 100
): string {
  if (text.length <= length) return text;

  return text.slice(0, length) + "...";
}

export function generateShareId(length: number = 21): string {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const randomValues = crypto.getRandomValues(new Uint8Array(length));
  
  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charset.length];
  }
  
  return result;
}

export async function copyLink(url) {
  try {
    await navigator.clipboard.writeText(url);
    return {
      success: true,
      toast: {
              title: "Link copied",
              message: "Your form link has been copied.",
            }
    };
  } catch (error) {
    console.error("Failed to copy form link:", error);
    return {
      success: false,
      toast: {
              title: "Failed to copy form link",
              message: error.message,
            }
    };
  }
}