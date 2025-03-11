"use client";
import React, { useState } from "react";
import Logo from "./Logo";
import NavList from "./NavList";
import MobileNavList from "./MobileNavList";

const NavBar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleDropdown = () => setIsExpanded(!isExpanded);
  return (
    <header className="flex py-[2rem] w-[100%] sticky top-0 bg-background z-50 max-w-[1440px] mx-auto justify-start items-start">
      <Logo setIsExpanded={setIsExpanded} />
      <div className="relative w-[100%]">
        <NavList />
        <MobileNavList
          isExpanded={isExpanded}
          toggleDropdown={toggleDropdown}
        />
      </div>
    </header>
  );
};

export default NavBar;
