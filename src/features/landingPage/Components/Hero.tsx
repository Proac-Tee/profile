import CustomLink from "@/components/ui/CustomLink";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";
import profileImage from "../../../../assets/babatunde_headshot.png";

const Hero = () => {
  return (
    <section
      className={cn(
        "py-[1.375rem] md:py-[3.75rem] bg-background border-border rounded-[0.875rem] border-[2px] px-[1rem] md:px-[2.625rem] ",
      )}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-[0.9375rem]">
        <p className="text-gray font-medium text-[1.5rem]">Engineer</p>
        <p
          className={cn(
            "bg-background w-fit flex justify-center items-center gap-[1rem] border-[1px] border-border px-[1.0625rem] py-[0.25rem] rounded-[0.875rem] ",
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
              "mt-[1.75rem] flex justify-start items-center gap-[0.875rem]",
            )}
          >
            <CustomLink className="hover:bg-primaryLight" href={`/contact`}>
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
              className="cursor-pointer hover:brightness-75 transition-all ease-in-out duration-300 bg-secondaryBackgroundColor text-[1.125rem] border-[1px] border-border flex justify-center items-center
          rounded-[15px] px-[1rem]"
              href={`/resume`}
            >
              Resume
              <span className="pl-[1rem] border-l-[1px] border-l-border h-[42px] flex justify-center ml-[1rem] items-center">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.25 0.000488281H5.25C5.05109 0.000488281 4.86032 0.0795061 4.71967 0.220158C4.57902 0.360811 4.5 0.551576 4.5 0.750488V4.50049H0.75C0.551088 4.50049 0.360322 4.57951 0.21967 4.72016C0.0790178 4.86081 0 5.05158 0 5.25049V17.2505C0 17.4494 0.0790178 17.6402 0.21967 17.7808C0.360322 17.9215 0.551088 18.0005 0.75 18.0005H12.75C12.9489 18.0005 13.1397 17.9215 13.2803 17.7808C13.421 17.6402 13.5 17.4494 13.5 17.2505V13.5005H17.25C17.4489 13.5005 17.6397 13.4215 17.7803 13.2808C17.921 13.1402 18 12.9494 18 12.7505V0.750488C18 0.551576 17.921 0.360811 17.7803 0.220158C17.6397 0.0795061 17.4489 0.000488281 17.25 0.000488281ZM12 16.5005H1.5V6.00049H12V16.5005ZM16.5 12.0005H13.5V5.25049C13.5 5.05158 13.421 4.86081 13.2803 4.72016C13.1397 4.57951 12.9489 4.50049 12.75 4.50049H6V1.50049H16.5V12.0005Z"
                    fill="#C0C0C0"
                  />
                </svg>
              </span>
            </CustomLink>
          </section>
        </div>

        <div className="relative overflow-hidden w-[178px] h-[178px] rounded-full border-[8px] border-border border-solid">
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
