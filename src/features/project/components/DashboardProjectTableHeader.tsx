import React from "react";

const DashboardProjectTableHeader = () => {
  return (
    <div className="project-table h-[40px]">
      <p className="truncate p-[0.75rem] text-left text-[0.75rem] font-semibold leading-[1rem] text-primaryLight">
        Project Title
      </p>
      <p className="truncate p-[0.75rem] text-left text-[0.75rem] font-semibold leading-[1rem] text-primaryLight">
        Description
      </p>
      <p className="truncate p-[0.75rem] text-left text-[0.75rem] font-semibold leading-[1rem] text-primaryLight">
        Created At
      </p>
      <p className="truncate p-[0.75rem] text-left text-[0.75rem] font-semibold leading-[1rem] text-primaryLight">
        Updated At
      </p>
      <p className="truncate p-[0.75rem] text-center text-[0.75rem] font-semibold leading-[1rem] text-primaryLight"></p>
    </div>
  );
};

export default DashboardProjectTableHeader;
