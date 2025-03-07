import { socialLinks } from "@/utils/socialLinks";
import React from "react";

const LinkBanner = () => {
  return (
    <div className="flex justify-center items-center gap-[2rem] py-[1rem] flex-wrap">
      <a
        href="mailto:dev@babatundetaiwo.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-[0.875rem] md:text-[1.25rem] hover:text-primary transition-colors duration-300 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-[28px] h-[28px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
          />
        </svg>
      </a>

      {socialLinks.map((link) => (
        <a
          key={link.platform}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[0.875rem] md:text-[ tn1.25rem] hover:text-primary transition-colors  duration-300 ease-in-out"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default LinkBanner;
