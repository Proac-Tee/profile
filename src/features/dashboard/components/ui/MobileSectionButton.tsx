"use client";
import SuspenseWrapper from "@/utils/SuspenseWrapper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const MobileSectionButton = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  return (
    <SuspenseWrapper>
      <div className="mb-[1rem] cursor-pointer flex items-center md:hidden">
        <button
          onClick={() => updateQueryParams("nav", "true")}
          className="hover:brightness-75; w-[167.5px] rounded-[6.25rem] border-[1px] border-[#D0D5DD] bg-[#1c1c1c0d] px-[1rem] py-[0.5rem] text-[1c1c1c] shadow-sm"
        >
          Section
        </button>
      </div>
    </SuspenseWrapper>
  );
};

export default MobileSectionButton;
