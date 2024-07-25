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

export const convertFileToUrl = (file, ext) => {
  const url = URL.createObjectURL(new Blob([file], { type: `image/${ext}` }));
  return url;
};
export const getFileSizeInMb = (file) => {
  // file in bytes
  const fileSizeInBytes = file.size;
  // file in megabytes
  const fileSizeInMb = fileSizeInBytes / 1024 / 1024;
  return Math.round(fileSizeInMb * 100) / 100;
};

export const readFileAsBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (err) => reject(err);
  });
};

export const acceptFile = async (file, error) => {
  const acceptedFile = file[0];
  const ext = acceptedFile.name.split(".").pop();
  const validExtensions = [".jpg", ".jpeg", ".png"];
  if (!validExtensions.includes(ext)) {
    error?.extError;
    return;
  }
  const sizeInMb = getFileSizeInMb(acceptedFile)
  if (sizeInMb > 2) { 
    error.sizeError;
    return;
  }
  const fileContent = await readFileAsBase64(acceptedFile)
  return fileContent
};
