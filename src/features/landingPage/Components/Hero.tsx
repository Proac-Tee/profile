import CustomLink from "@/components/ui/CustomLink";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";
import profileImage from "../../../../assets/babatunde_headshot.png";

const Hero = () => {
  return (
    <section
      className={cn(
        "py-[1.375rem] md:py-[3.75rem] bg-secondaryBackgroundColor border-border rounded-[0.875rem] border-[2px] px-[1rem] md:px-[2.625rem] ",
      )}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-[0.9375rem]">
        <p className="text-gray font-medium text-[1.5rem]">Engineer</p>
        <p
          className={cn(
            "bg-background text-gray w-fit flex justify-center items-center gap-[1rem] border-[1px] border-border px-[1.0625rem] py-[0.25rem] rounded-[0.875rem] ",
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
      </div>

      <section className="pt-[4.375rem] flex-col-reverse md:flex-row flex justify-between items-start md:items-center gap-[1.875rem]">
        <div>
          <h1 className="text-white mb-[0.9375rem] font-semibold text-[2rem]">
            I&#39;m Babatunde
          </h1>
          <p className="text-gray text-[1.25rem] max-w-[288px] leading-[1.875rem]">
            Engineering iconic tech in artistic fashion.
          </p>
          <section
            className={cn(
              "mt-[1.75rem] flex justify-start flex-wrap items-center gap-[0.875rem]",
            )}
          >
            <CustomLink
              className="text-[1rem] md:text-[1.125rem] hover:bg-primaryLight"
              href={`/contact`}
            >
              Hire Me
              <span className="pl-[1rem] border-l-[1px] border-l-background h-[42px] flex justify-center ml-[1rem] items-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13 7.99854H8V12.9985C8 13.2638 7.89464 13.5181 7.70711 13.7056C7.51957 13.8932 7.26522 13.9985 7 13.9985C6.73478 13.9985 6.48043 13.8932 6.29289 13.7056C6.10536 13.5181 6 13.2638 6 12.9985V7.99854H1C0.734784 7.99854 0.48043 7.89318 0.292893 7.70564C0.105357 7.51811 0 7.26375 0 6.99854C0 6.73332 0.105357 6.47896 0.292893 6.29143C0.48043 6.10389 0.734784 5.99854 1 5.99854H6V0.998535C6 0.733319 6.10536 0.478964 6.29289 0.291428C6.48043 0.103892 6.73478 -0.00146484 7 -0.00146484C7.26522 -0.00146484 7.51957 0.103892 7.70711 0.291428C7.89464 0.478964 8 0.733319 8 0.998535V5.99854H13C13.2652 5.99854 13.5196 6.10389 13.7071 6.29143C13.8946 6.47896 14 6.73332 14 6.99854C14 7.26375 13.8946 7.51811 13.7071 7.70564C13.5196 7.89318 13.2652 7.99854 13 7.99854Z"
                    fill="white"
                  />
                </svg>
              </span>
            </CustomLink>

            <CustomLink
              className="cursor-pointer text-gray hover:brightness-75 transition-all ease-in-out duration-300 bg-secondaryBackgroundColor text-[1rem] md:text-[1.125rem] border-[1px] border-border flex justify-center items-center
          rounded-[15px] px-[1rem]"
              href={`/resume`}
            >
              Resume
              <span className="md:ml-[2rem] pl-[1rem] border-l-[1px] border-l-border h-[42px] flex justify-center ml-[1rem] items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                  />
                </svg>
              </span>
            </CustomLink>
          </section>
        </div>

        <div className="relative bg-white overflow-hidden w-[178px] h-[178px] rounded-full border-[8px] border-border border-solid">
          <Image
            quality={100}
            fill
            sizes="(min-width: 768px) 100vw, 700px"
            src={profileImage}
            priority
            alt="Babatunde Headeshot"
            style={{
              objectFit: "cover",
              objectPosition: "top",
            }}
          />
        </div>
      </section>
    </section>
  );
};

export default Hero;
