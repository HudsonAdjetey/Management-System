"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const Page = ({ params }) => {
  console.log(params.users);
  const router = useRouter();
  const userID = router.query;
  const searchParams = useSearchParams();
  const search = searchParams.get("userID");
  console.log(search);
  console.log(searchParams);
  console.log(userID);

  return <div>hello </div>;
};

export default Page;
