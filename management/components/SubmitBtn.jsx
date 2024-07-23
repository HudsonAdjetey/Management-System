import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Icons } from "./constants/icons";

const SubmitBtn = ({ isLoading, className, children, handleSubmit }) => {
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className="shad-primary-btn w-full mt-10 "
      onClick={handleSubmit}
    >
      {isLoading ? (
        <div className="flex items-center gap-4 ">
          <Image
            src={Icons.Loader}
            width={20}
            height={20}
            className="animate-spin"
          />
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default SubmitBtn;
