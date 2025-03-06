import React from "react";
import Experience from "./Experience";
import Specialization from "./Specialization";
import LatestProjects from "./LatestProjects";

const PortfolioGrid = () => {
  return (
    <section className="py-[1.25rem]">
      <Experience />
      <Specialization />
      <LatestProjects />
    </section>
  );
};

export default PortfolioGrid;
