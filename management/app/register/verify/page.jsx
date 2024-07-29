"use client";
import React, { useEffect, useState } from "react";

const page = () => {
  const [userID, setUserID] = useState("");
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
