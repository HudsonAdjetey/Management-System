"use client";

import { Button } from "./ui/button";
import { Toast } from "./ui/toast";

export function ToastWithTitle({ title, description }) {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        Toast({
          title: { title },
          description: { description },
        });
      }}
    >
      Show Toast
    </Button>
  );
}
