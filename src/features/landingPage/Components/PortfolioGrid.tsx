import React from "react";
import Experience from "./Experience";
import Specialization from "./Specialization";

const PortfolioGrid = () => {
  return (
    <section className="py-[1.25rem]">
      <Experience />
      <Specialization />
    </section>
  );
};

export default PortfolioGrid;
