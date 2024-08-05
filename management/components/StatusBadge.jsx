import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { StatusIcons } from "./constants";

const StatusBadge = ({ status }) => {
  return (
    <div
      className={clsx("status-badge", {
        "bg-green-600": status === "approved",
        "bg-blue-600": status === "pending",

        "bg-red-600": status === "rejected",
      })}
    >
      <Image
        src={StatusIcons[status]}
        alt={status}
        width={24}
        height={24}
        className="h-fit w-3"
        layout="fixed"
      />
      <p
        className={clsx("text-12-semibold capitalize", {
          "text-green-500": status === "approved",
          "text-blue-500": status === "pending",
          "text-red-500": status === "rejected",
        })}
      >
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
