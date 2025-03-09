import { IProject } from "@/features/project/schemas/schema";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";

interface ProjectListProps {
  projects: IProject[];
}

const ProjectList: FC<ProjectListProps> = ({ projects }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleHandler = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className=" mt-[1rem] md:mt-[2rem]">
      {projects?.map((project, index) => (
        <div
          onClick={() => toggleHandler(index)}
          className={cn(
            "border-border mb-[2rem] transition-all duration-300 ease-in-out flex flex-col md:flex-row gap-[1rem] bg-secondaryBackgroundColor border-[1px] rounded-[15px] p-[1rem] cursor-pointer",
            {
              "md:max-h-[100%]": expandedIndex === index,
              "md:max-h-[200px]": expandedIndex !== index,
            },
          )}
          key={project._id}
        >
          <div className="relative mb-[1rem] h-[150px] w-[100%] overflow-hidden rounded-lg border-[1px] border-border md:mb-0 md:h-[120px] md:w-[200px]">
            <Image
              quality={100}
              fill
              sizes="(min-width: 768px) 100vw, 700px"
              src={project.imageUrls[0].url}
              priority
              className="hover:scale-x-125 transition-all duration-300 ease-in-out overflow-hidden"
              alt={`${project.title} image`}
            />
          </div>

          <div className="flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-primaryLight text-[1.125rem] md:text-[1.5rem]">
                {capitalizeFirstLetter(project.title)}
              </h3>
              <p className="pt-[1rem] text-gray line-clamp-2 text-[1rem]">
                {capitalizeFirstLetter(project.description)}
              </p>
            </div>

            {expandedIndex === index && (
              <div className="pt-[1rem]">
                <Link
                  href={`/projects/${project._id}`}
                  className="text-primaryLight"
                >
                  See more
                </Link>

                <ul className="flex flex-wrap items-center gap-[2rem]">
                  {project.liveUrl && (
                    <li>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-[1.125rem]"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                          />
                        </svg>
                      </a>
                    </li>
                  )}
                  {project.githubUrl && (
                    <li>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 48 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M24.0199 0C10.7375 0 0 10.8167 0 24.1983C0 34.895 6.87988 43.9495 16.4241 47.1542C17.6174 47.3951 18.0545 46.6335 18.0545 45.9929C18.0545 45.4319 18.0151 43.509 18.0151 41.5055C11.3334 42.948 9.94198 38.6209 9.94198 38.6209C8.86818 35.8164 7.27715 35.0956 7.27715 35.0956C5.09022 33.6132 7.43645 33.6132 7.43645 33.6132C9.86233 33.7735 11.1353 36.0971 11.1353 36.0971C13.2824 39.7827 16.7422 38.7413 18.1341 38.1002C18.3328 36.5377 18.9695 35.456 19.6455 34.8552C14.3163 34.2942 8.70937 32.211 8.70937 22.9161C8.70937 20.2719 9.66321 18.1086 11.1746 16.4261C10.9361 15.8253 10.1008 13.3409 11.4135 10.0157C11.4135 10.0157 13.4417 9.3746 18.0146 12.4996C19.9725 11.9699 21.9916 11.7005 24.0199 11.6982C26.048 11.6982 28.1154 11.979 30.0246 12.4996C34.5981 9.3746 36.6262 10.0157 36.6262 10.0157C37.9389 13.3409 37.1031 15.8253 36.8646 16.4261C38.4158 18.1086 39.3303 20.2719 39.3303 22.9161C39.3303 32.211 33.7234 34.2539 28.3544 34.8552C29.2296 35.6163 29.9848 37.0583 29.9848 39.3421C29.9848 42.5871 29.9454 45.1915 29.9454 45.9924C29.9454 46.6335 30.383 47.3951 31.5758 47.1547C41.12 43.9491 47.9999 34.895 47.9999 24.1983C48.0392 10.8167 37.2624 0 24.0199 0Z"
                            fill="black"
                          />
                        </svg>
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent toggling parent div
              toggleHandler(index);
            }}
            className={`rounded-full border-[1px] border-black w-fit bg-primary h-fit p-[0.2rem] text-orange-300 shadow-sm transition-all duration-300 ease-in-out`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className={`h-6 w-6 transform transition-transform ${expandedIndex === index ? "rotate-90" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      ))}
    </section>
  );
};

export default ProjectList;
