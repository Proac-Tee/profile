import Dashboard from "@/components/Dashboard";
import SideBar from "@/features/dashboard/components/SideBar";
import React from "react";

const DashobardPage = async () => {
  return (
    <section className="flex flex-col gap-[2rem] md:flex-row">
      <div>
        <SideBar />
      </div>
      <section className="flex-1 overflow-hidden">
        <Dashboard />
      </section>
    </section>
  );
};

export default DashobardPage;
