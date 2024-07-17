"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "@/lib/Validation";
import AdminAccessDialog from "./AdminAccessDialog";
import LoadingIndicator from "./LoadingIndicator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/dataFetch";
import { decryptKey, encryptKey } from "@/lib/utils";
import { toast } from "sonner";
import OtpAccessDialog from "./OtpAccessDialog";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const PassKeyModal = ({ open, setOpen }) => {
  const [error, setError] = useState("");
  const [passKey, setPassKey] = useState("");
  const [validatedKey, setValidateKey] = useState("");
  const [otpRedirect, setOtpRedirect] = useState(false);
  const [resendCountDown, setResendCountDown] = useState(0);
  const [otp, setOtp] = useState("");
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [openOtp, setOpenOtp] = useState(false);
  const [isPending, startTransition] = useTransition();
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
  const closeOtpModal = () => {
    setOpenOtp(false);
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

  // handle otp change

  // recaptch verifier
  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    setRecaptchaVerifier(recaptchaVerifier);

    // clean up function
    return () => {
      recaptchaVerifier.clear();
    };
  }, []);

  // data fetch
  const dataCheckTempUserMutation = useMutation({
    mutationKey: ["checkTempUser"],
    mutationFn: async (data) => {
      const apiReq = await api.put("user/temp-user/check", data);
      return apiReq;
    },
  });

  // verify otp function
  useEffect(() => {
    if (otp.length === 6) {
      // call the verify otp
      verifyOtp();
    }
  }, [otp]);

  const verifyOtp = async () => {
    startTransition(async () => {
      setError("");
      if (!confirmationResult) {
        setError("Please request OTP first");
        return;
      }
      try {
        await confirmationResult.confirm(otp);
        //route push to register/user=true?userID=validateKey
        router.push(`/register/newuser=true?userID=${validatedKey}`);
      } catch (error) {
        console.log(error);
        setError("Failed to verify OTP. Please try again.");
      }
    });
  };

  // request otp
  const requestOTP = async (e) => {
    e?.preventDefault();
    setResendCountDown(60);
    startTransition(async () => {
      setError("");
      if (!recaptchaVerifier) {
        return setError("RecaptchaVerifier not initialized");
      }
      try {
        const { phoneNumber } = form.getValues();
        const confirmResult = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          recaptchaVerifier
        );
        setOtpRedirect(true);
        setConfirmationResult(confirmResult);
        setOpenOtp(true); // Ensure OTP dialog is opened
      } catch (error) {
        console.log(error?.message);
        if (error?.code === "auth/invalid-phone-number") {
          setError("Invalid phone number. Please check the number.");
        } else if (error?.code === "auth/too-many-requests") {
          console.log("Too many requests");
          setError("Too many requests. Please try again later.");
        } else {
          setError("Failed to send OTP. Please try again.");
        }
      }
    });
  };

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
      // call request otp
      requestOTP();
      setPassKey(values.devID);
      const encryptedKey = encryptKey(values.devID);
      setValidateKey(values.devID);
      window.localStorage.setItem("access_key", encryptedKey);
    } catch (err) {
      setError("Failed to check user. Please try again.");
      toast("Error", {
        description: "Failed to check user. Please try again.",
        action: {
          label: "Retry",
          onClick: () => {
            // Optionally retry the action
          },
        },
      });
    }
  };

  const access_key =
    typeof window !== "undefined"
      ? window.localStorage.getItem("access_key")
      : null;

  const decryptedKey = access_key ? decryptKey(access_key) : null;

  useEffect(() => {
    console.log(validatedKey);
    if (decryptedKey && decryptedKey === validatedKey) {
      setOtpRedirect(true);

      router.push(`/register/newuser=true?userID=${validatedKey}`);
    } else {
      setError("Access denied. Please enter the correct access key");
      toast("Access Denied", {
        description: "Please enter the correct access key",
        action: {
          label: "Retry",
          onClick: () => {
            // Optionally retry the action
          },
        },
      });
    }
  }, [decryptedKey, validatedKey]);

  return (
    <div>
      {dataCheckTempUserMutation.isPending || isLoading ? (
        <div className="isLoading">
          <LoadingIndicator />
        </div>
      ) : otpRedirect && openOtp ? (
        <OtpAccessDialog
          handleChange={(value) => setOtp(value)}
          otp={otp}
          open={openOtp}
          closeModal={closeOtpModal}
          isPending={isPending}
          requestOTP={requestOTP}
          resendCountDown={resendCountDown}
        />
      ) : (
        <AdminAccessDialog
          form={form}
          setOpen={setOpen}
          open={open}
          closeModal={closeModal}
          onSubmit={onSubmit}
        />
      )}
      <div id="recaptcha-container" />
    </div>
  );
};

export default PassKeyModal;
