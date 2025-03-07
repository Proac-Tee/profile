import Dashboard from "@/components/Dashboard";
import MobileNavBar from "@/features/dashboard/components/MobileNavBar";
import SideBar from "@/features/dashboard/components/SideBar";
import MobileSectionButton from "@/features/dashboard/components/ui/MobileSectionButton";
import React from "react";

const DashobardPage = async () => {
  return (
    <section className="mb-[2rem] flex flex-col gap-[2rem] md:flex-row">
      <div>
        <SideBar />
        <MobileNavBar />
      </div>
      <section className="flex-1 overflow-hidden">
        <MobileSectionButton />
        <Dashboard />
      </section>
    </section>
  );
};

export default DashobardPage;
