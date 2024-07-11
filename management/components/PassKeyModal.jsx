import React, { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import Image from "next/image";
import { Icons } from "./constants/icons";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserFormValidation } from "@/lib/Validation";
import { Form } from "./ui/form";
import CustomField from "./CustomFormFields";
import { Button } from "./ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import "react-phone-number-input/style.css";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "@/firebase";

const PassKeyModal = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);
  const [resendCountDown, setResendCountDown] = useState(0);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [adminID, setAdminID] = useState("asd454534534534534533363463");
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [isPending, startTransition] = useTransition();
  const [userAdmin, setUserAdmin] = useState({});
  const [requestIDPage, setRequestIDPage] = useState(true);

  useEffect(() => {
    let timer;
    if (resendCountDown > 0) {
      timer = setTimeout(() => {
        setResendCountDown((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [resendCountDown]);

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
      }
    );
    setRecaptchaVerifier(recaptchaVerifier);
    return () => {
      recaptchaVerifier.clear();
    };
  }, [auth]);

  const form = useForm({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      devID: "",
      phone: "",
    },
  });

  useEffect(() => {
    if (otp.length === 6) {
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
        router.replace("/dashboard");
      } catch (error) {
        console.log(error);
        setError("Failed to verify OTP. Please check the OTP");
      }
    });
  };

  const requestOTP = async (e) => {
    e?.preventDefault();
    setResendCountDown(60);
    startTransition(async () => {
      setError("");
      if (!recaptchaVerifier) {
        return setError("RecaptchaVerifier not initialized");
      }
      try {
        const { phone } = form.getValues();
        const confirmResult = await signInWithPhoneNumber(
          auth,
          phone,
          recaptchaVerifier
        );
        setConfirmationResult(confirmResult);
        setSuccess("Sent successfully");
      } catch (error) {
        setResendCountDown(0);
        if (error.code === "auth/invalid-phone-number") {
          setError("Invalid phone number. Please check the number.");
        } else if (error.code === "auth/too-many-requests") {
          setError("Too many requests. Please try again later.");
        } else {
          setError("Failed to send OTP. Please try again.");
        }
      }
    });
  };

  const onSubmit = async (values) => {
    alert("Hello");
    const { devID, phone } = form.getValues();
    const adminUser = {
      devID: devID,
      phone: phone,
    };
    console.log(adminUser);
    if (adminUser.devID === adminID) {
      setUserAdmin(adminUser);
      requestOTP();
      setRequestIDPage(false);
      console.log("Nothing here to be seen");
    } else {
      console.log("Invalid development ID");
      setError("Invalid Development ID");
      return;
    }
  };

  const closeModal = () => {
    setOpen(false);
    setError("");
    router.replace("/");
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="shad-alert-dialog bg-dark-300">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Administrator Access Verification
            <Image
              alt="close"
              width={20}
              height={20}
              onClick={closeModal}
              src={Icons.Close}
            />
          </AlertDialogTitle>
          {requestIDPage ? (
            <>
              <AlertDialogDescription>
                Enter the administrator's ID to continue.
              </AlertDialogDescription>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <CustomField
                    fieldType="input"
                    control={form.control}
                    name="devID"
                    label="Development ID"
                    placeholder="433_034C9A334"
                    register={form.register}
                    icon={Icons.IconDataBase}
                    admin={true}
                  />
                  <CustomField
                    fieldType="phoneInput"
                    control={form.control}
                    name="phone"
                    label="Phone Number"
                    placeholder="+233"
                    register={form.register}
                    phone={true}
                  />
                  <Button
                    onClick={onSubmit}
                    type="submit"
                    className="bg-blue-300 mt-3"
                  >
                    Confirm Credentials
                  </Button>
                </form>
              </Form>
            </>
          ) : (
            <>
              <AlertDialogDescription>
                Enter the Confirmation Code
              </AlertDialogDescription>
              <div>
                <InputOTP
                  value={otp}
                  onChange={(value) => setOtp(value)}
                  maxLength={6}
                >
                  <InputOTPGroup className="shad-otp">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <InputOTPSlot
                        index={index}
                        key={index}
                        className="shad-otp-slot"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                <Button
                  className="bg-blue-300 mt-3"
                  onClick={requestOTP}
                  disabled={resendCountDown > 0 || isPending}
                >
                  {resendCountDown > 0
                    ? `Resend OTP in ${resendCountDown}`
                    : isPending
                    ? "Sending OTP"
                    : "Send OTP"}
                </Button>
              </div>
            </>
          )}
        </AlertDialogHeader>
      </AlertDialogContent>
      <div id="recaptcha-container" />
    </AlertDialog>
  );
};

export default PassKeyModal;
