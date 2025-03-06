"use client";

import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import React, { ButtonHTMLAttributes, forwardRef } from "react";

type BackButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>(
  ({ className, children, ...props }, ref) => {
    const router = useRouter();
    return (
      <button
        ref={ref}
        onClick={() => router.back()}
        className={cn(
          (className =
            "mb-[2rem] flex h-[32px] w-[105px] cursor-pointer items-center justify-center gap-[0.5rem] rounded-[6.25rem] bg-primaryLight px-[0.5rem] py-[0.75rem] text-[0.875rem] font-[600] text-white"),
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

BackButton.displayName = "BackButton";

export default BackButton;
