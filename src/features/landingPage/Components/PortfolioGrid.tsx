import React from "react";
import Experience from "./Experience";
import Specialization from "./Specialization";
import LatestProjects from "./LatestProjects";

const PortfolioGrid = () => {
  return (
    <section className="py-[1.25rem] lg:grid grid-cols-2 grid-rows-[repeat(9,150px)] gap-[1.25rem]">
      <Experience />
      <Specialization />
      <LatestProjects limit={1} className="row-start-5 row-end-10" />
      <LatestProjects className="row-start-3 mt-[1rem] row-end-10" limit={2} />
    </section>
  );
};

export default PortfolioGrid;
