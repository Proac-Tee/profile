"use client";
import { IProject } from "@/features/project/schemas/schema";
import { getThreeProjects } from "@/features/project/server/db/project";
import { useQuery } from "@tanstack/react-query";
import ProjectList from "./ProjectList";
import ProjectListSkeleton from "../utils/ProjectListSkeleton";
import ErrorSkeleton from "../utils/ErrorSkeleton";

const LatestProjects = ({
  limit = 3,
  className,
}: {
  limit?: number;
  className?: string;
}) => {
  const { data, error, isPending } = useQuery<IProject[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const projects = await getThreeProjects();
      return projects;
    },
  });

  if (isPending) {
    return <ProjectListSkeleton limit={limit} className={className} />;
  }

  if (error instanceof Error) {
    return (
      <ErrorSkeleton limit={limit} className={className} text={error.message} />
    );
  }

  return (
    <ProjectList projects={data || []} limit={limit} className={className} />
  );
};

export default LatestProjects;
