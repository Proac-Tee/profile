import { IProject } from "@/features/project/schemas/schema";
import { getAllProjects } from "@/features/project/server/db/project";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Projets = () => {
  const { data, error, isPending } = useQuery<IProject[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const projects = await getAllProjects();
      return projects;
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error instanceof Error) {
    return <p>Error fetching projects: {error.message}</p>;
  }

  return <div>Projets</div>;
};

export default Projets;
