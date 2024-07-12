"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "@/lib/Validation";
import AdminAccessDialog from "./AdminAccessDialog";
import LoadingIndicator from "./LoadingIndicator";

const PassKeyModal = ({ open, setOpen }) => {
  const [error, setError] = useState();
  const [otp, setOtp] = useState("");
  const [resendCountDown, setResendCountDown] = useState(0);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [textFormat, setTextFormat] = useState("");
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      devID: "",
      devName: "",
      phone: "",
    },
  });
  const apiKey = process.env.API_KEY;
  console.log("apiKey", apiKey);

  const closeModal = () => {
    setOpen(false);
    setIsLoading(false);
    setError("");
    router.replace("/");
  };

  useEffect(() => {
    if (!open) {
      closeModal();
    }
  }, [open, isLoading]);

  const onSubmit = async (e) => {
    e?.preventDefault();
    // Handle form submission
  };

  return (
    <div>
      {!isLoading ? (
        <AdminAccessDialog
          form={form}
          setOpen={setOpen}
          open={open}
          closeModal={closeModal}
          onSubmit={onSubmit}
        />
      ) : (
        <div className="isLoading">
          <h3>Info Here</h3>
          <LoadingIndicator />
        </div>
      )}
    </div>
  );
};

export default PassKeyModal;
