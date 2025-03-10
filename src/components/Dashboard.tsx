"use client";

import Project from "@/features/project/components/Project";
import DashboardSkeleton from "@/features/project/utils/DashboardSkeleton";
import Resume from "@/features/resume/components/Resume";
import Loading from "@/utils/Loading";
import SuspenseWrapper from "@/utils/SuspenseWrapper";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useSearchParams } from "next/navigation";
import React from "react";

const DashboardComponent = () => {
  const searchParams = useSearchParams();
  const active_section = searchParams.get("section");

  const { getUser, isLoading } = useKindeBrowserClient();

  const user = getUser();

  const displayName = user?.given_name ?? "Admin";

  const renderComponent = () => {
    switch (active_section) {
      case "projects":
        return <Project />;
      case "resume":
        return <Resume />;

      default:
        return <DashboardSkeleton />;
    }
  };

  return (
    <section>
      {isLoading ? (
        <div className="mb-8">
          <Loading />
        </div>
      ) : (
        <h1 className="mb-8 text-[1.75rem] font-bold text-primary">
          Hi, {displayName}
        </h1>
      )}

      {renderComponent()}
    </section>
  );
};

const Dashboard = () => {
  return (
    <SuspenseWrapper>
      <DashboardComponent />
    </SuspenseWrapper>
  );
};

export default Dashboard;
