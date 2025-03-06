"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DashboardProjectTable from "./DashboardProjectTable";
import Button from "@/components/ui/Button";
import SuspenseWrapper from "@/utils/SuspenseWrapper";
import CreateProjectForm from "./CreateProjectForm";
import UpdateProjectForm from "./UpdateProjectForm";

const Project = () => {
  const searchParams = useSearchParams();
  const active_section = searchParams.get("project_action");
  const page = parseInt(searchParams.get("page") ?? "1", 10); // Ensure page is a number
  const per_page = 10;

  const pathname = usePathname();
  const router = useRouter();

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  const renderComponent = () => {
    switch (active_section) {
      case "create":
        return <CreateProjectForm />;
      case "update":
        return <UpdateProjectForm />;
      default:
        return (
          <div>
            <Button
              onClick={() => updateQueryParams("project_action", "create")}
              className="flex items-center gap-4 rounded-full bg-priamryButtonColor cursor-pointer px-4 py-2 text-white"
            >
              Add Project
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Button>
            <DashboardProjectTable page={page} per_page={per_page} />
          </div>
        );
    }
  };

  return (
    <section>
      <SuspenseWrapper>{renderComponent()}</SuspenseWrapper>
    </section>
  );
};

export default Project;
