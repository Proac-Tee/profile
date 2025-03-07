"use client";

import React from "react";
import { dashboardNavLinks } from "../utils/dashboardNavLinks";
import { cn } from "@/utils/cn";
import Button from "@/components/ui/Button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SuspenseWrapper from "@/utils/SuspenseWrapper";

const MobileNavBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    const newUrl = `${pathname}?section=${params.get("section")}`;
    router.replace(newUrl);
  };

  const isMobile = searchParams.get("nav");
  const active_section = searchParams.get("section") ?? "dashboard";

  const closeMobileNav = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("nav");
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  return (
    <SuspenseWrapper>
      <aside
        onClick={closeMobileNav}
        className={cn(
          "fixed left-0 top-0 z-50 block h-[100vh] w-[100%] overflow-hidden bg-black opacity-75 transition duration-[150ms] ease-in md:hidden",
          {
            "translate-y-0": isMobile,
            "translate-y-[100%]": !isMobile,
          },
        )}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="no-scrollbar absolute bottom-0 left-0 h-[350px] w-[100%] z-50 items-center justify-center overflow-x-hidden overflow-y-scroll rounded-t-[1.5rem] bg-secondaryBackgroundColor px-[1rem] opacity-100"
        >
          <h2 className="text-2xl text-primary mb-8 font-medium">Menu</h2>
          <ul className="flex-grow">
            {dashboardNavLinks.map((item) => (
              <li
                className="text-gray text-lg cursor-pointer my-6"
                key={item.name}
              >
                <Button
                  onClick={() =>
                    updateQueryParams("section", item.name.toLowerCase())
                  }
                  className={cn(
                    "flex w-full hover:bg-transparent justify-start cursor-pointer bg-secondaryBackgroundColor border-border border-2 transition-all ease-in-out duration-300 items-center",
                    {
                      "border-primaryLight":
                        active_section === item.name.toLowerCase(),
                    },
                  )}
                >
                  {item.name}
                </Button>
              </li>
            ))}
          </ul>

          <Button
            className={cn(
              "flex w-full gap-4 hover:bg-primaryLight justify-start cursor-pointer bg-priamryButtonColor border-border border-2 transition-all ease-in-out duration-300 items-center mt-auto",
            )}
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
            </span>
            Log out
          </Button>
        </div>
      </aside>
    </SuspenseWrapper>
  );
};

export default MobileNavBar;
