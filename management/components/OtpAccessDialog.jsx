import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import Image from "next/image";
import { Icons } from "./constants/icons";
import { Button } from "./ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

const OtpAccessDialog = ({
  resendCountDown,
  otp,
  open,
  closeModal,
  handleChange,
  isPending,
  requestOTP,
}) => {
  return (
    <AlertDialog open={open} onOpenChange={closeModal}>
      <AlertDialogContent className="shad-alert-dialog">
        <AlertDialogTitle className="flex items-start justify-between">
          New Administrator's Access Verification
          <Image
            alt="close"
            width={20}
            height={20}
            onClick={closeModal}
            src={Icons.Close}
          />
        </AlertDialogTitle>

        <AlertDialogDescription>
          Enter the Confirmation Code
        </AlertDialogDescription>
        <div>
          <InputOTP value={otp} onChange={handleChange} maxLength={6}>
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
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default OtpAccessDialog;
