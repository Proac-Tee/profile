import { cn } from "@/utils/cn";
import { workExperiences } from "@/utils/workExperiences";
import React from "react";

const Experience = () => {
  return (
    <section
      className={cn(
        "mb-[1rem] lg:mb-0 row-start-1 row-end-5 py-[1.375rem] lg:py-[3.75rem] bg-secondaryBackgroundColor border-border rounded-[0.875rem] border-[2px] px-[1rem] md:px-[2.625rem]",
      )}
    >
      <h2 className="text-gray flex items-center gap-[0.8125rem] font-medium text-[1rem] md:text-[1.5rem]">
        <svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="5" cy="4.51221" r="4.5" fill="#C0C0C0" />
        </svg>
        Recent Work
      </h2>

      <section className="pt-[2.375rem] md:pt-[3.375rem]">
        {workExperiences.map((experience, index) => (
          <div
            className="flex  mb-[2.1rem] justify-between gap-[2rem]"
            key={index}
          >
            <div>
              <h3
                className={cn(
                  "text-[1rem] md:text-[1.125rem] xl:text-[1.5rem] font-medium",
                  {
                    "text-primary": index === 0,
                  },
                )}
              >
                {experience.title}
              </h3>
              <h4 className="text-gray text-[0.9375rem] md:text-[1.125rem] xl:text-[1.25rem] font-normal]">
                {experience.startDate} - {experience.endDate}
              </h4>
            </div>
            <p className="text-gray text-end text-[1rem] md:text-[1.125rem] xl:text-[1.25rem]">
              {experience.company}
            </p>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Experience;
