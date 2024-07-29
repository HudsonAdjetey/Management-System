"use client";
import { api } from "@/lib/dataFetch";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const page = ({ params }) => {
  const userIDParams = params.userID;
  console.log(userIDParams);
  const [userID, setUserID] = useState(userIDParams);
  const [copied, setCopied] = useState(false);
  const [isChangedCopied, setIsChangedCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      // set a timeout
      setTimeout(() => {
        setIsChangedCopied(false);
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  //   handle copy
  const handleCopy = () => {
    navigator.clipboard.writeText(userID);
    setCopied(true);
    setIsChangedCopied(true);
  };

  // verify userID
  const userVerifyID = useQuery({
    queryKey: ["verifyUserID", userID],
    queryFn: async () => {
      const response = await api.get(`user/verify/${userID}`);

      return response.data;
    },
    keepPreviousData: true, // keep the previous data in the cache
  });

  return (
    <section className="section_main">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum ut, quae
      ipsam quam sint reprehenderit perferendis consectetur, sequi voluptas
      nulla at asperiores, impedit neque nesciunt obcaecati vel rem atque
      doloribus.
    </section>
  );
};

export default page;
