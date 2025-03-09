import React from "react";
import { techStack } from "./techstack";

type TechStackProps = {
  stack: string[];
};

const TechStack: React.FC<TechStackProps> = ({ stack }) => {
  return (
    <div className="flex gap-2">
      {stack.map((tech) => (
        <div key={tech} className="w-6 h-6">
          {techStack[tech.toLowerCase()] || <span>{tech}</span>}
        </div>
      ))}
    </div>
  );
};

export default TechStack;
