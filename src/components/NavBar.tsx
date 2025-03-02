import React from "react";
import Logo from "./Logo";
import NavList from "./NavList";
import MobileNavList from "./MobileNavList";

const NavBar = () => {
  return (
    <header className="flex max-w-[1440px] mx-auto justify-start items-center">
      <Logo />
      <NavList />
      <MobileNavList />
    </header>
  );
};

export default NavBar;
