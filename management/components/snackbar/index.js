"use server";
import { Bounce, toast } from "react-toastify";

export const toastError = (error) => {
  toast.error(error, {
    position: "bottom-left",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    transition: Bounce,
    theme: "dark",
    toastId: "error-toast",
    closeButton: false,
    className: "toast-error",
    bodyClassName: "toast-body",
  });
};

export const toastSuccess = (success) => {
  toast.success(success, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};
export const toastWarn = (warn) => {
  toast.warn(warn, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
};
