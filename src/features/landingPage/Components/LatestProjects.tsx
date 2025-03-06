"use client";
import CustomLink from "@/components/ui/CustomLink";
import { IProject } from "@/features/project/schemas/schema";
import { getThreeProjects } from "@/features/project/server/db/project";
import { cn } from "@/utils/cn";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const LatestProjects = () => {
  const { data, error, isPending } = useQuery<IProject[]>({
    queryKey: ["projects"],
    queryFn: getThreeProjects,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error instanceof Error) {
    return <p>Error fetching projects: {error.message}</p>;
  }

  return (
    <section>
      {data &&
        data.map((project) => (
          <div key={project._id}>
            <div
              className={cn(
                "py-[1.375rem] col-span-2 md:py-[3.75rem] bg-background border-border rounded-[0.875rem] border-[2px] px-[1rem] md:px-[2.625rem] relative", // Add relative class
              )}
            >
              <h3>{project.title}</h3>
              {project.imageUrls[0].url}

              {/* Positioned top-right */}
              <CustomLink
                className="rounded-full p-[0.5rem] md:p-[0.8rem] w-fit border-black border-[1px] absolute top-[1.4375rem] md:top-[3rem] right-[1.875rem] md:right-[3.375rem]"
                href={`projects/${project._id}`}
              >
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.7088 1.75994L14.3823 13.0544M13.7088 1.75994L2.41434 2.43348M13.7088 1.75994L1.31773 15.7226"
                    stroke="#FDFDFD"
                    stroke-width="2.40017"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </CustomLink>
            </div>
          </div>
        ))}
    </section>
  );
};

export default LatestProjects;
