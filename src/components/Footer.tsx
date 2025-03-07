import { cn } from "@/utils/cn";
import { socialLinks } from "@/utils/socialLinks";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "py-[1.4375rem] mb-[4rem] flex flex-col-reverse md:flex-row justify-center md:justify-between items-center gap-[1.375rem] md:py-[2.8125rem] bg-background border-border rounded-[0.875rem] border-[2px] px-[2.5rem] md:px-[2.875rem]",
      )}
    >
      <p className="text-gray text-[1rem] font-medium md:text-[1.5rem]">
        Babatunde {currentYear}
      </p>
      <div className="flex justify-between gap-[1rem]">
        {socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FDFDFD] text-[0.875rem] md:text-[1.25rem] hover:text-primary transition-colors  duration-300 ease-in-out"
          >
            {link.platform}
          </a>
        ))}
      </div>
      <p
        className={cn(
          "bg-background w-fit flex justify-center items-center gap-[1rem] border-[1px] border-border px-[1.0625rem] py-[0.25rem] rounded-[0.875rem]  text-gray text-[9px] md:text-[1rem]",
        )}
      >
        <span>
          <svg
            width="9"
            height="9"
            viewBox="0 0 9 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="4.5" cy="4.5" r="4.5" fill="#E63E21" />
          </svg>
        </span>
        AVAILABLE FOR JOBS
      </p>
    </footer>
  );
};

export default Footer;
