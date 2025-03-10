import React from "react";
import ContactForm from "./ContactForm";
import { socialLinks } from "@/utils/socialLinks";

const Contact = () => {
  return (
    <section>
      <ContactForm />
      <div>
        <div
          className="p-[0.5rem] rounded-[15px] flex w-fit mx-auto justify-center border-border border-[1px] bg-secondaryBackgroundColor
          items-center gap-[1rem] py-[1rem] flex-col"
        >
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
              className="w-[22px] h-[22px]"
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
              className="text-[0.875rem] md:text-[1.25rem] hover:text-primary transition-colors  duration-300 ease-in-out"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
