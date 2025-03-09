import { cn } from "@/utils/cn";

const ProjectListSkeleton = () => {
  return (
    <div>
      <section
        className={cn(
          " flex flex-col md:flex-row mb-[2rem] justify-start gap-[1rem] h-[100%] py-[1rem] pb-[2rem] bg-secondaryBackgroundColor border-border rounded-[0.875rem] border-[2px] px-[1rem]  relative animate-pulse",
        )}
      >
        <div className="relative h-[100%] w-[100%] md:w-[200px]">
          <div className={cn("h-[200px] bg-zinc-800 rounded")}></div>
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="h-6 bg-zinc-800 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-zinc-800 rounded w-[90%] mb-4"></div>
            <div className="h-8 bg-zinc-800 rounded w-1/6 mb-4"></div>
          </div>

          <div>
            <div className="h-8 bg-zinc-800 rounded w-1/3"></div>
          </div>
        </div>
        <div className="md:hidden rounded-full p-[0.5rem] md:p-[0.8rem] w-10 h-10 bg-zinc-800 "></div>

        <div className="hidden rounded-full p-[0.5rem] md:p-[0.8rem] w-10 h-10 bg-zinc-800 md:block absolute top-[rem]  right-[1.875rem] md:right-[3.375rem]"></div>
      </section>
      <section
        className={cn(
          " flex flex-col md:flex-row mb-[2rem] justify-start gap-[1rem] h-[100%] py-[1rem] pb-[2rem] bg-secondaryBackgroundColor border-border rounded-[0.875rem] border-[2px] px-[1rem]  relative animate-pulse",
        )}
      >
        <div className="relative h-[100%] w-[100%] md:w-[200px]">
          <div className={cn("h-[200px] bg-zinc-800 rounded")}></div>
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="h-6 bg-zinc-800 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-zinc-800 rounded w-[90%] mb-4"></div>
            <div className="h-8 bg-zinc-800 rounded w-1/6 mb-4"></div>
          </div>

          <div>
            <div className="h-8 bg-zinc-800 rounded w-1/3"></div>
          </div>
        </div>
        <div className="md:hidden rounded-full p-[0.5rem] md:p-[0.8rem] w-10 h-10 bg-zinc-800 "></div>

        <div className="hidden rounded-full p-[0.5rem] md:p-[0.8rem] w-10 h-10 bg-zinc-800 md:block absolute top-[rem]  right-[1.875rem] md:right-[3.375rem]"></div>
      </section>
      <section
        className={cn(
          " flex flex-col md:flex-row mb-[2rem] justify-start gap-[1rem] h-[100%] py-[1rem] pb-[2rem] bg-secondaryBackgroundColor border-border rounded-[0.875rem] border-[2px] px-[1rem]  relative animate-pulse",
        )}
      >
        <div className="relative h-[100%] w-[100%] md:w-[200px]">
          <div className={cn("h-[200px] bg-zinc-800 rounded")}></div>
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="h-6 bg-zinc-800 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-zinc-800 rounded w-[90%] mb-4"></div>
            <div className="h-8 bg-zinc-800 rounded w-1/6 mb-4"></div>
          </div>

          <div>
            <div className="h-8 bg-zinc-800 rounded w-1/3"></div>
          </div>
        </div>
        <div className="md:hidden rounded-full p-[0.5rem] md:p-[0.8rem] w-10 h-10 bg-zinc-800 "></div>

        <div className="hidden rounded-full p-[0.5rem] md:p-[0.8rem] w-10 h-10 bg-zinc-800 md:block absolute top-[rem]  right-[1.875rem] md:right-[3.375rem]"></div>
      </section>
    </div>
  );
};

export default ProjectListSkeleton;
