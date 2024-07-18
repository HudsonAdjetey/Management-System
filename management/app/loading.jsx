"use client";
import Image from "next/image";
import { Icons } from "../components/constants/icons";
export default function Loading() {
  return (
    <div className="flex-center  size-full h-screen gap-3 text-white">
      <Image
        src={Icons.Loader}
        alt="loader"
        width={40}
        height={3240}
        className="animate-spin"
      />
      Loading...
    </div>
  );
}
