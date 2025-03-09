"use client";
import Projects from "@/features/projectPage/components/Projects";
import React from "react";

const ProjectsPage = () => {
  return (
    <section className="mb-[5rem]">
      <div className="pb-[4rem]">
        <h2 className="pb-[2rem] text-primary text-[2rem] md:text-[4rem] font-medium">
          Projects
        </h2>
        <p className="text-[1rem] md:text-[1.125rem] text-gray">
          Welcome to my project showcase! I am a software engineer passionate
          about building innovative, scalable, and user-centric solutions. From
          front-end designs, electronics to back-end architectures, each project
          reflects my dedication to solving real-world problems through code.
          Here, you will find a curated collection of my work, demonstrating my
          technical expertise, creativity, and commitment to continuous learning
        </p>
      </div>
      <Projects />
    </section>
  );
};

export default ProjectsPage;
