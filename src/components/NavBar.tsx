import React from "react";
import Logo from "./Logo";
import NavList from "./NavList";
import MobileNavList from "./MobileNavList";

const NavBar = () => {
  return (
    <header className="flex py-[2rem] w-[100%] sticky top-0 bg-background z-50 max-w-[1440px] mx-auto justify-start items-start">
      <Logo />
      <div className="relative w-[100%]">
        <NavList />
        <MobileNavList />
      </div>
    </header>
  );
};

export default NavBar;
