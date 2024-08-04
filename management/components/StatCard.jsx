import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const StatCard = ({ type, icon, count, label }) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-students": type === "students",
        "bg-teachers": type === "teachers",
        "bg-classes": type === "classes",
        "bg-faculties": type === "faculties",
      })}
    >
      <div className="flex items-center gap-4">
        <Image
          src={icon}
          height={40}
          width={40}
          alt={`${type} card`}
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>
      <div className="flex items-center flex-row  gap-3 justify-between">
        <p className="text-14-regular">{label}</p>
        <Link
          className="text-[#909294]  md:hover:text-white transition-colors max-md:text-white no-underline font-medium "
          href={"/"}
        >
          View Analytics
        </Link>
      </div>
    </div>
  );
};

export default StatCard;
