"use client";
import { IProject } from "@/features/project/schemas/schema";
import { getAllProjects } from "@/features/project/server/db/project";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import ProjectItem from "./ProjectItem";

type ProductDetailProps = {
  id: string;
};

const ProjectDetail: FC<ProductDetailProps> = ({ id }) => {
  const { data, error, isPending } = useQuery<IProject[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const projects = await getAllProjects();
      return projects;
    },
  });

  const project = data?.find((project) => project._id === id);

  if (isPending) {
    return <p>pending</p>;
  }

  if (error instanceof Error) {
    return <p>Error</p>;
  }

  return <ProjectItem project={project} />;
};

export default ProjectDetail;
