"use client";
import { useState, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "../lib/firebase";
import { useRouter } from "next/router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Icons } from "./constants/icons";

const PassKeyModal = ({}) => {
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [sentOtp, setSentOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const auth = getAuth(app);

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: (response) => {
            handleSendOtp();
          },
          "expired-callback": () => {
            window.recaptchaVerifier.reset();
          },
        },
        auth
      );
    }
  }, [auth]);

  const handleSendOtp = async () => {
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmationResult);
      setSentOtp(true);
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const handleConfirmOtp = async () => {
    try {
      if (confirmationResult) {
        await confirmationResult.confirm(otp);
        router.push("/dashboard");
      } else {
        setError("OTP was not sent, please try again.");
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const closeModal = () => {
    setOpenModal(false);
    setPhoneNumber("");
    setConfirmationResult(null);
    setSentOtp(false);
    setOtp("");
    router.push("/");
  };

  return (
    <AlertDialog open={openModal} onOpenChange={setOpenModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-start justify-between">
            Administrator Access Verification
            <Image
              src={Icons.Close}
              alt="close"
              width={20}
              height={20}
              onClick={closeModal}
              className="cursor-pointer"
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            Enter the 6-digit OTP sent to your registered phone number.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="shad-otp">
              {[...Array(6)].map((_, index) => (
                <InputOTPSlot
                  key={index}
                  className="shad-otp-slot"
                  index={index}
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
          {error && <p className="shad-error text-14-regular mt-4">{error}</p>}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleConfirmOtp}
            className="shad-primary-btn w-full"
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
        <div id="recaptcha-container"></div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PassKeyModal;
