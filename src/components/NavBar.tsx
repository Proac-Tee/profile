import React from "react";
import Logo from "./Logo";
import NavList from "./NavList";
import MobileNavList from "./MobileNavList";

const NavBar = () => {
  return (
    <section className="py-[2rem] sticky top-0 z-50  bg-background max-w-[1440px] mx-auto">
      <header className="flex justify-start items-center">
        <Logo />
        <NavList />
        <MobileNavList />
      </header>
    </section>
  );
};

export default NavBar;
