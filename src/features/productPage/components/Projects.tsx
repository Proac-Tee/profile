import { IProject } from "@/features/project/schemas/schema";
import { getAllProjects } from "@/features/project/server/db/project";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import ProjectList from "./ProjectList";
import ProjectListSkeleton from "../utils/ProductListSkeleton";
import ErrorSkeleton from "../utils/ErrorSkeleton";

const Projects = () => {
  const { data, error, isPending } = useQuery<IProject[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const projects = await getAllProjects();
      return projects;
    },
  });

  if (isPending) {
    return <ProjectListSkeleton />;
  }

  if (error instanceof Error) {
    return <ErrorSkeleton text={error.message} />;
  }

  return <ProjectList projects={data || []} />;
};

export default Projects;
