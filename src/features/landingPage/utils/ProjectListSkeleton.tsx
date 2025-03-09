import { FC } from "react";
import { cn } from "@/utils/cn";

interface ProjectListSkeletonProps {
  limit?: number;
  className?: string;
}

const ProjectListSkeleton: FC<ProjectListSkeletonProps> = ({
  limit = 3,
  className,
}) => {
  return (
    <section className={cn("text-white", className)}>
      {Array.from({ length: limit }).map((_, index) => (
        <div key={index}>
          <div
            className={cn(
              "py-[1.375rem] md:py-[3.75rem] bg-secondaryBackgroundColor border-border rounded-[0.875rem] border-[2px] px-[1rem] md:px-[2.625rem] relative animate-pulse",
              className,
              {
                "h-[298.2px] md:h-[528px] ": limit > 1,
                "h-[466px] md:h-[764px]": limit === 1,
              },
            )}
          >
            <div className="h-6 bg-zinc-800 rounded w-3/4 mb-4"></div>
            <div
              className={cn("h-48 bg-zinc-800 rounded", {
                "md:mt-[5rem] mt-0 w-[70%] mx-auto": limit > 1,
                "mt-[2rem] w-[95%] h-[90%]": limit === 1,
              })}
            ></div>
            <div className="rounded-full p-[0.5rem] md:p-[0.8rem] w-10 h-10 bg-zinc-800 absolute top-[1.4375rem] md:top-[3rem] right-[1.875rem] md:right-[3.375rem]"></div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProjectListSkeleton;
