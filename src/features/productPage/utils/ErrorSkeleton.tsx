import { cn } from "@/utils/cn";
import React, { FC } from "react";

interface ErrorSkeletonProps {
  text?: string;
}
const ErrorSkeleton: FC<ErrorSkeletonProps> = ({ text }) => {
  return (
    <div
      className={cn(
        " flex flex-col md:flex-row mb-[2rem] justify-start gap-[1rem] h-[100%] py-[1rem] pb-[2rem] bg-secondaryBackgroundColor border-border rounded-[0.875rem] border-[2px] px-[1rem]",
      )}
    >
      <p className="text-[1rem] text-red-400 text-center my-[1rem]">
        {text ?? "Error fetching data"}
      </p>
    </div>
  );
};

export default ErrorSkeleton;
