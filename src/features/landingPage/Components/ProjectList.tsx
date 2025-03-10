import CustomLink from "@/components/ui/CustomLink";
import { IProject } from "@/features/project/schemas/schema";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { FC } from "react";

interface ProjectListProps {
  projects: IProject[];
  limit?: number;
  className?: string;
}

const ProjectList: FC<ProjectListProps> = ({
  projects,
  limit = 3,
  className,
}) => {
  const displayedProjects =
    limit === 1 ? projects.slice(0, 1) : projects.slice(1, limit + 1);

  return (
    <section className={cn("text-white", className)}>
      {displayedProjects.map((project) => (
        <div key={project._id}>
          <div
            className={cn(
              "py-[1.375rem] md:py-[3.75rem] bg-secondaryBackgroundColor border-border rounded-[0.875rem] border-[2px] px-[1rem] md:px-[2.625rem] relative",
              className,
              {
                "h-[298.2px] md:h-[528px]": limit > 1,
                "h-[466px] md:h-[764px]": limit === 1,
              },
            )}
          >
            <h3>{project.title}</h3>

            <div
              className={cn(
                "relative w-full h-[80%] md:h-[90%] mt-[2rem] border-border border-[1px] rounded-[15px]",
              )}
            >
              <Image
                quality={100}
                fill
                sizes="(min-width: 768px) 100vw, 700px"
                src={project.imageUrls[0].url}
                priority
                alt={`${project.title} image`}
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                }}
                className="rounded-[15px]"
              />
            </div>

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
                  strokeWidth="2.40017"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </CustomLink>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProjectList;
