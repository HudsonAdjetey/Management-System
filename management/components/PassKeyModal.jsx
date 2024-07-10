"use client";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { app } from "../lib/firebase";
import { useRouter } from "next/dist/client/router";
import { usePathname } from "next/navigation";

const PassKeyModal = ({}) => {
  const router = useRouter();
  const path = usePathname();
  const [openModal, setOpenModal] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const auth = getAuth(app);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [sentOtp, setSentOtp] = useState(false);

  const recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
    size: "normal",
    callback: (response) => {
      signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier)
        .then((confirmationResult) => {
          setConfirmationResult(confirmationResult);
          setSentOtp(true);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    "expired-callback": () => {
      recaptchaVerifier.reset();
      setConfirmationResult(null);
      setSentOtp(false);
    },
  });
      const handleSendOtp = async () => {
        try {
          const confirmationResult = await signInWithPhoneNumber(
            auth,
            phoneNumber,
            recaptchaVerifier
          );
          setConfirmationResult(confirmationResult);
          setOtpSent(true);
        } catch (error) {
          console.error(error);
        }
      };

      const handleConfirmOtp = async () => {
        try {
          await confirmationResult.confirm(otp);
          router.push("/dashboard");
        } catch (error) {
          console.error(error);
        }
      };

};
