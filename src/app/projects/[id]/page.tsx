import ProjectDetail from "@/features/projectDetailPage/components/ProjectDetail";
import React, { use } from "react";

const ProjectDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);

  return <ProjectDetail id={id} />;
};
export default ProjectDetailPage;
