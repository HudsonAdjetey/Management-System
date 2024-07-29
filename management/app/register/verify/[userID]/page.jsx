"use client";
import { Icons } from "@/components/constants/icons";
import CustomField from "@/components/CustomFormFields";
import SubmitBtn from "@/components/SubmitBtn";
import { Form } from "@/components/ui/form";
import { api } from "@/lib/dataFetch";
import { UserValidation } from "@/lib/Validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const page = ({ params }) => {
  const userIDParams = params.userID;
  console.log(userIDParams);
  const [userID, setUserID] = useState(userIDParams);
  const [copied, setCopied] = useState(false);
  const [isChangedCopied, setIsChangedCopied] = useState(false);

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      userID,
    },
  });

  const router = useRouter();
  useEffect(() => {
    if (copied) {
      // set a timeout
      setTimeout(() => {
        setIsChangedCopied(false);
        setCopied(false);
      }, 6000);
    }
  }, [copied]);

  //   handle copy
  const handleCopy = (e) => {
    e?.preventDefault();
    navigator.clipboard.writeText(userID);
    setCopied(true);
    setIsChangedCopied(true);
  };

  // verify userID
  const userVerifyID = useQuery({
    queryKey: ["verifyUserID", userID],
    queryFn: async () => {
      const response = await api.put(`/verify/update/${userID}`);
      console.log(response);
      return response.data;
    },
    keepPreviousData: true, // keep the previous data in the cache
  });

  useEffect(() => {
    if (userVerifyID.data && userVerifyID.isSuccess) {
      console.log("User verified successfully");
      // redirect to admin page
      router.push("/admin/[userID]", `/admin/${userID}`);
    } else if (userVerifyID.error) {
      console.log("Error verifying user", userVerifyID.error);
    } else {
      console.log("User not verified yet");
    }
  }, [userVerifyID.data, userVerifyID.isSuccess]);

  return (
    <section className="section_main flex_container ">
      <div className="flex  flex-col items-center mx-auto">
        <h1>Verify Account</h1>
        <p>Please enter the verification code sent to your email.</p>

        {/* input field */}
        <div className="input_card bg-dark-200 mt-6 md:w-[450px] p-4 rounded-md">
          <Form {...form}>
            <form action="">
              <div className="flex justify-between gap-3 items-center">
                <CustomField
                  fieldType="input"
                  name="userID"
                  control={form.control}
                  register={form.register}
                  placeholder="UserID"
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <span
                        onClick={(e) => handleCopy(e)}
                        className=" h-9 cursor-pointer flex space-y-2"
                      >
                        <Image
                          src={copied ? Icons.Copied : Icons.Copy}
                          width={25}
                          height={25}
                          alt="copy icon"
                        />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent className="bg-dark-500 text-white border-none outline-none ">
                      <p>{copied ? "Copied" : "Copy"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <SubmitBtn className={"-mt-6"}>Verify</SubmitBtn>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default page;
