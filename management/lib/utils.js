import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function encryptKey(passkey) {
  return btoa(encodeURIComponent(passkey));
}
export function decryptKey(passkey) {
  return decodeURIComponent(atob(passkey));
}

export const convertFileToUrl = (file) => URL.createObjectURL(file);
