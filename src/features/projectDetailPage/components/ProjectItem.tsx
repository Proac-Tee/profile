import { IProject } from "@/features/project/schemas/schema";
import React, { FC } from "react";
import ImageComponent from "./ImageComponent";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { techStack } from "@/utils/techStack";
import BackButton from "@/components/ui/BackButton";

type ProjectItemProps = {
  project: IProject | undefined;
};

const ProjectItem: FC<ProjectItemProps> = ({ project }) => {
  return (
    <section className="pb-[5rem]">
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
      <h1 className="text-primaryLight text-[2rem] md:text-[1.5rem] pb-[1rem]">
        {capitalizeFirstLetter(project?.title ?? "")}{" "}
      </h1>
      <ImageComponent
        name={project?.title ?? "Project title"}
        imagePaths={project?.imageUrls ?? []}
      />
      {project && (
        <div>
          <section className="py-[2rem]">
            <h2 className="text-primary text-[1.125rem] md:text-[1.5rem]">
              Description
            </h2>
            <div className="border-t-border border-t-[2px] text-gray pt-[1rem]">
              <h3>{capitalizeFirstLetter(project?.description)}</h3>
            </div>
          </section>
          <section className="py-[2rem]">
            <h2 className="text-primary text-[1.125rem] md:text-[1.5rem]">
              Tech Stack
            </h2>

            <div className="border-t-border border-t-[2px] text-white pt-[1rem] flex gap-[1rem]">
              {project.techStack.map((tech: string) => (
                <div key={tech} className="w-6 h-6 text-white">
                  {techStack[tech.toLowerCase()] || <span>{tech}</span>}
                </div>
              ))}
            </div>
          </section>
          <section className="py-[2rem]">
            <h2 className="text-primary text-[1.125rem] md:text-[1.5rem]">
              Links
            </h2>
            <div className="border-t-border border-t-[2px] text-gray pt-[1rem]">
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
                          fill="white"
                        />
                      </svg>
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </section>
        </div>
      )}
    </section>
  );
};

export default ProjectItem;
