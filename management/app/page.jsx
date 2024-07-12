"use client";

import { Images } from "@/components/constants/img";
import Image from "next/image";
import React, { useState } from "react";
import PanelForm from "@/components/PanelForm";
import Link from "next/link";
import dynamic from "next/dynamic";
const DynamicPassKeyModal = dynamic(() => import("@/components/PassKeyModal"), {
  ssr: false,
});

const Page = ({ searchParams }) => {
  const isAdmin = searchParams?.admin === "true";
  const [open, setOpen] = useState(false);

  const handleOnClick = () => {
    setOpen(true);
  };

  return (
    <section className="flex justify-between h-screen max-h-screen">
      {isAdmin && <DynamicPassKeyModal open={open} setOpen={setOpen} />}
      <div className="section_main remove-scrollbar flex flex-col justify-between">
        <div className="flex gap-3 items-center mt-3">
          <Image
            src={Images.logo}
            width={40}
            height={40}
            className="aspect-square"
            alt="logo"
          />
          <h1>Management System</h1>
        </div>
        <PanelForm />
        <div className="text-14-regular mt-20 flex justify-between">
          <p className="justify-items-end text-dark-600 xl:text-left">
            © 2024 SwiftTech
          </p>
          <span onClick={handleOnClick}>
            <Link href="/?admin=true" className="text-blue-500">
              Administrator
            </Link>
          </span>
        </div>
      </div>
      <div className="flex section_right_overlay remove-scrollbar max-w-[40%] bg-pink-50">
        <Image
          src={Images.OverLay}
          alt="Two Students"
          height={"100%"}
          width={"100%"}
          className="side-img object-contain"
        />
      </div>
    </section>
  );
};

export default Page;
