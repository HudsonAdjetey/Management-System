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
import { decryptKey, encryptKey } from "@/lib/utils";
import { ToastWithTitle } from "./ToastSimple";
import { toast } from "sonner";
import OtpAccessDialog from "./OtpAccessDialog";

const PassKeyModal = ({ open, setOpen }) => {
  const [error, setError] = useState("");
  const [passKey, setPassKey] = useState("");
  const [validatedKey, setValidateKey] = useState("");
  const [otpRedirect, setOtpRedirect] = useState(false);
  const [resendCountDown, setResendCountDown] = useState(0);
  const [otp, setOtp] = useState("");

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      devID: "",
      devName: "",
      phoneNumber: "",
    },
  });

  const closeModal = () => {
    setOpen(false);
    setError("");
    router.replace("/");
  };

  useEffect(() => {
    if (!open) {
      closeModal();
    }
  }, [open]);

  // OTP CALLS
  useEffect(() => {
    let timer;
    if (resendCountDown > 0) {
      timer = setTimeout(() => {
        setResendCountDown((prevCount) => prevCount - 1);
      }, 1000);
    }
    // perform a cleanup
    return () => {
      clearTimeout(timer);
    };
  }, [resendCountDown]);

  const dataCheckTempUserMutation = useMutation({
    mutationKey: ["checkTempUser"],
    mutationFn: async (data) => {
      const apiReq = await api.put("user/temp-user/check", data);
      return apiReq;
    },
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    const values = form.getValues();
    setError("");
    try {
      const requestCheck = await dataCheckTempUserMutation.mutateAsync({
        phoneNumber: values.phoneNumber,
        devID: values.devID,
        devName: values.devName,
      });
      console.log(requestCheck);
      setPassKey(values.devID);
      const encryptedKey = encryptKey(values.devID);
      setValidateKey(values.devID);
      window.localStorage.setItem("access_key", encryptedKey);
    } catch (err) {
      setError("Failed to check user. Please try again.");
    }
  };

  const access_key =
    typeof window !== "undefined"
      ? window.localStorage.getItem("access_key")
      : null;

  const decryptedKey = access_key ? decryptKey(access_key) : null;

  useEffect(() => {
    if (decryptedKey && decryptedKey === validatedKey) {
      // router.replace("/dashboard");
      setOtpRedirect(true);
    } else {
      setError("Access denied. Please enter the correct access key");
    }
  }, [decryptedKey, validatedKey]);

  return (
    <div>
      {dataCheckTempUserMutation.isPending ? (
        <div className="isLoading">
          <LoadingIndicator />
        </div>
      ) : otpRedirect ? (
        <OtpAccessDialog />
      ) : (
        <AdminAccessDialog
          form={form}
          setOpen={setOpen}
          open={open}
          closeModal={closeModal}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};

export default PassKeyModal;
