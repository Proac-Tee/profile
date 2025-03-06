import { cn } from "@/utils/cn";
import React from "react";

const Specialization = () => {
  return (
    <section className="grid grid-cols-2 gap-[0.875rem] md:gap-[1.25rem]">
      <section
        className={cn(
          "py-[1.375rem] col-span-2 md:py-[3.75rem] bg-background border-border rounded-[0.875rem] border-[2px] px-[1rem] md:px-[2.625rem]",
        )}
      >
        <p className="text-gray text-[0.875rem] text-center md:text-[1.5rem] font-medium">
          Embedded Systems
        </p>
      </section>
      <section
        className={cn(
          "py-[1.375rem] md:py-[3.75rem] bg-background border-border rounded-[0.875rem] border-[2px] px-[1rem] md:px-[2.625rem]",
        )}
      >
        <p className="text-gray text-[0.875rem] text-center md:text-[1.5rem] font-medium">
          Frontend
        </p>
      </section>
      <section
        className={cn(
          "py-[1.375rem] md:py-[3.75rem] bg-background border-border rounded-[0.875rem] border-[2px] px-[1rem] md:px-[2.625rem]",
        )}
      >
        <p className="text-gray text-[0.875rem] text-center md:text-[1.5rem] font-medium">
          Backend
        </p>
      </section>
    </section>
  );
};

export default Specialization;
