"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "@/lib/Validation";
import AdminAccessDialog from "./AdminAccessDialog";
import LoadingIndicator from "./LoadingIndicator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/dataFetch";
import axios from "axios";

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

  const values = form.getValues();

  // using useMutation of tanstack query
  const queryClient = useQueryClient();
  const dataCheckTempUserMutation = useMutation({
    mutationKey: ["checkTempUser", values.phone],
    mutationFn: async (data) => {
      const apiReq = await axios.put(
        "http://localhost:5060/user/temp-user/check",
        data
      );
    },
    // enable when values are present
    enabled:
      values.devID !== "" && values.devName !== "" && values.phone !== "",
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    // Handle form submission
    try {
      const requestCheck = await dataCheckTempUserMutation.mutateAsync({
        phone: values.phone,
        devID: values.devID,
        devName: values.devName,
      });
      console.log(requestCheck);
    } catch (err) {
      console.log(err);
    }
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
