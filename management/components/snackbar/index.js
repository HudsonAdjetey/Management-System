import { ToastAction } from "../ui/toast";

export const snackFn = (title, description, state, variant) => {
  return {
    title,
    description,
    duration: 3000,
    variant,
    action:
      state === "networkError" && variant !== "success" ? (
        <ToastAction
          label="Retry"
          altText="Retry"
          onClick={() => {
            // Retry logic here
            window.location.reload();
          }}
        >
          Try Again
        </ToastAction>
      ) : null,
  };
};
