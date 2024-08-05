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
    error?.imageType;
    return;
  }
  const sizeInMb = getFileSizeInMb(acceptedFile);
  if (sizeInMb > 2) {
    console.log("Yep");
    error.imageSize;
    return;
  }
  console.log("Nope");
  const fileContent = await readFileAsBase64(acceptedFile);
  return fileContent;
};

export const ErrorFunc = (toast, toastConfig) => {
  return {
    passwordMismatch: toast(
      toastConfig("Passwords mismatch!", "Passwords should match", "", "error")
    ),
    passwordLength: toast(
      toastConfig(
        "Password too short!",
        "Password should be at least 8 characters long",
        "",
        "error"
      )
    ),
    passwordSpecialChar: toast(
      toastConfig(
        "Password too weak!",
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "",
        "error"
      )
    ),
    // image size error
    imageSize: toast(
      toastConfig(
        "Image too large!",
        "Image size should not exceed 2MB",
        "",
        "error"
      )
    ),
    imageType: toast(
      toastConfig(
        "Invalid file type!",
        "Only PNG, JPG, JPEG, GIF, and SVG images are allowed",
        "",
        "error"
      )
    ),
    requiredFields: toast(
      toastConfig(
        "All fields required",
        "Please fill out all required fields",
        "",
        "error"
      )
    ),
    validationError: toast(
      toastConfig(
        "Form validation error",
        "Please fix the errors in the form",
        "",
        "error"
      )
    ),
  };
};

// format date

export const FormatDateTime = (date) => {
  const dateTimeOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const dateDayOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  const dateOptions = {
    
  }
  // return new Date(date).toLocaleString("en-US", options);
};
