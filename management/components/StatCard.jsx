import clsx from "clsx";
import React from "react";

const StatCard = ({ type }) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-students": type === "students",
        "bg-teachers": type === "teachers",
        "bg-classes": type === "classes",
        "bg-faculties": type === "faculties",
      })}
    >
      StatCard
    </div>
  );
};

export default StatCard;
