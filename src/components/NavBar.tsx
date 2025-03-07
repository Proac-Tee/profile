import React from "react";
import Logo from "./Logo";
import NavList from "./NavList";
import MobileNavList from "./MobileNavList";
import LinkBanner from "./LinkBanner";

const NavBar = () => {
  return (
    <section className="pb-[2rem] sticky top-0 z-50  bg-background max-w-[1440px] mx-auto">
      <LinkBanner />
      <header className="flex justify-start items-center">
        <Logo />
        <NavList />
        <MobileNavList />
      </header>
    </section>
  );
};

export default NavBar;
