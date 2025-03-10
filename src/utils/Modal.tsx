"use client";

import DeleteProject from "@/features/project/components/DeleteProject";
import { useRouter, useSearchParams } from "next/navigation";
import SuspenseWrapper from "./SuspenseWrapper";
import ResumeUpdate from "@/features/resume/components/ResumeUpdate";

const ModalComponent = () => {
  const searchParams = useSearchParams();
  const active_section = searchParams.get("case");
  const router = useRouter();

  const renderModalContent = () => {
    switch (active_section) {
      case "project_delete":
        return <DeleteProject />;
      case "resume_update":
        return <ResumeUpdate />;

      default:
        return null;
    }
  };

  return (
    <section>
      {active_section && (
        <dialog className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-auto bg-black opacity-95">
          <div className="m-auto py-[2rem] lg:p-8">
            <div className="relative flex flex-col items-center">
              <div className="text-black absolute right-[2rem] top-[1rem] z-10">
                <button type="button" onClick={() => router.back()}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7 7L17 17M7 17L17 7"
                      stroke="#363636"
                      strokeWidth="2.66667"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {renderModalContent()}
            </div>
          </div>
        </dialog>
      )}
    </section>
  );
};

const Modal = () => {
  return (
    <SuspenseWrapper>
      <ModalComponent />
    </SuspenseWrapper>
  );
};

export default Modal;
