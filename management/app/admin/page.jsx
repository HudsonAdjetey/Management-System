import { Images } from "@/components/constants/img";
import { Icons } from "@/components/constants/icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import StatCard from "@/components/StatCard";

const page = () => {
  return (
    <div className="mx-auto flex  flex-col space-y-14">
      <header className="admin-header">
        <div className="logo-menu flex  items-center gap-5 ">
          <span className="border-r-2 px-2  border-[#EBF3FF]">
            <Image src={Icons.MenuIcon} width={30} height={30} />
          </span>
          <Link href={"/"} className="cursor-pointer">
            <Image
              src={Images.logo}
              width={32}
              height={162}
              className="h-8 w-fit"
            />
          </Link>
        </div>
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>
      <main className="admin-main max-w-7xl ">
        <section className=" w-full space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">
            Start the day with managing new appointments
          </p>
        </section>

        {/* admin stat */}
        <section className="admin-stat">
          {/* implement card formality */}
          <StatCard type={"students"} count={4} />
          <StatCard type={"teachers"} count={4} />
          <StatCard type={"classes"} count={4} />
          <StatCard type={"faculties"} count={4} />
        </section>
        {/* admin stat */}
      </main>
    </div>
  );
};

export default page;
