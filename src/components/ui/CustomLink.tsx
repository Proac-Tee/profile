import React, { AnchorHTMLAttributes, forwardRef } from "react";
import Link, { LinkProps } from "next/link";
import { cn } from "@/utils/cn";

type CustomLinkProps = LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

const CustomLink = forwardRef<HTMLAnchorElement, CustomLinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <Link {...props} legacyBehavior>
        <a
          ref={ref}
          className={cn(
            "bg-priamryButtonColor cursor-pointer transition-all ease-in-out duration-300 text-[1.125rem] border-[2px] border-background flex justify-center items-center rounded-[15px] px-[1rem]",
            className,
          )}
        >
          {children}
        </a>
      </Link>
    );
  },
);

CustomLink.displayName = "CustomLink";

export default CustomLink;
