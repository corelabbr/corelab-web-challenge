import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function cn(...classes: ClassValue[]): string {
  return twMerge(clsx(classes));
}
