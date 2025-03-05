"use client";

import DashboardProjectTable from "@/features/project/components/DashboardProjectTable";
import Loading from "@/utils/Loading";
import SuspenseWrapper from "@/utils/SuspenseWrapper";
import { useSearchParams } from "next/navigation";
import React from "react";

const Dashboard = () => {
  const searchParams = useSearchParams();
  const active_section = searchParams.get("section");

  const isLoading = false;

  const displayName = "Admin";

  const renderComponent = () => {
    switch (active_section) {
      case "projects":
        return <DashboardProjectTable />;

      default:
        return "";
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
      <SuspenseWrapper>{renderComponent()}</SuspenseWrapper>
    </section>
  );
};

export default Dashboard;
