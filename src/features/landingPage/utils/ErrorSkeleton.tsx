import { FC } from "react";
import { cn } from "@/utils/cn";

interface ErrorSkeletonProps {
  limit?: number;
  className?: string;
  text?: string;
}

const ErrorSkeleton: FC<ErrorSkeletonProps> = ({
  limit = 3,
  className,
  text,
}) => {
  return (
    <section className={cn("text-white", className)}>
      {Array.from({ length: limit }).map((_, index) => (
        <div key={index}>
          <div
            className={cn(
              "py-[1.375rem] md:py-[3.75rem] bg-secondaryBackgroundColor border-red-300 rounded-[0.875rem] border-[2px] px-[1rem] md:px-[2.625rem] relative ",
              className,
              {
                "h-[298.2px] md:h-[528px] ": limit > 1,
                "h-[466px] md:h-[764px]": limit === 1,
              },
            )}
          >
            <div className="p-[0.5rem] bg-red-400 flex justify-center mx-auto items-center rounded-full w-fit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#FF0000"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
            <p className="text-[1rem] text-red-400 text-center my-[1rem]">
              {text ?? "Error fetching data"}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ErrorSkeleton;
