import { IProject } from "@/features/project/schemas/schema";
import React, { FC } from "react";

type ProjectItemProps = {
  project: IProject;
};

const ProjectItem: FC<ProjectItemProps> = ({ project }) => {
  console.log(project);

  return <section>xx</section>;
};

export default ProjectItem;
