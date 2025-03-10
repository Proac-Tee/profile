import BackButton from "@/components/ui/BackButton";
import { getAllResume } from "@/features/resume/server/db/resume";
import React from "react";

async function fetchPDF(): Promise<string | null> {
  const resume = await getAllResume(); // Fetch the PDF data from the API

  // Check if resume is not null and contains a valid url
  if (resume[0]?.url) {
    return resume[0].url; // Return the URL if it exists
  }

  return null; // Return null if no resume or url is found
}

const ResumePage = async () => {
  const data = await fetchPDF();

  if (!data) {
    return (
      <section className="relative mx-auto mb-[5rem] h-full min-h-[70vh] w-full max-w-[750px] px-4 pb-[3rem]">
        <p className="pt-[2rem] text-center text-[#0D2F3F]">
          No PDF found to display
        </p>
      </section>
    );
  }

  return (
    <section className="relative mx-auto mb-[2rem] h-full min-h-[70vh] w-full max-w-[1440px] ">
      <BackButton>
        <span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.02055 3.64645C7.21581 3.84171 7.21581 4.15829 7.02055 4.35355L3.8741 7.5H13.3337C13.6098 7.5 13.8337 7.72386 13.8337 8C13.8337 8.27614 13.6098 8.5 13.3337 8.5H3.8741L7.02055 11.6464C7.21581 11.8417 7.21581 12.1583 7.02055 12.3536C6.82528 12.5488 6.5087 12.5488 6.31344 12.3536L2.31344 8.35355C2.11818 8.15829 2.11818 7.84171 2.31344 7.64645L6.31344 3.64645C6.5087 3.45118 6.82528 3.45118 7.02055 3.64645Z"
              fill="white"
            />
          </svg>
        </span>
        Go Back
      </BackButton>
      <div className="flex flex-wrap items-center justify-between gap-[2rem] pb-[2rem]">
        <h1 className="text-[1rem] font-bold text-gray md:text-[2rem]">
          Resume
        </h1>
        <a
          href={data}
          target="_blank"
          rel="noopener noreferrer"
          download="babatunde_resume.pdf"
          className="flex h-[32px] w-fit items-center justify-center gap-[0.5rem] rounded-[6px] bg-background py-[4px] pl-[8px] pr-[12px] text-[0.875rem] font-semibold leading-[1.5rem] text-gray hover:brightness-75"
        >
          Download as PDF
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
              />
            </svg>
          </span>
        </a>
      </div>
      <iframe
        src={`${data}#toolbar=0`}
        title="Resume PDF"
        className="h-[80vh] w-full rounded-[15px] border-[1px] border-border"
      />
    </section>
  );
};

export default ResumePage;
