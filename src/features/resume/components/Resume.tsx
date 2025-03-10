"use client";
import { useUploadThing } from "@/utils/uploadthing";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useResumeContext } from "../hooks/ResumeContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import Loading from "@/utils/Loading";
import { addNewResume, getAllResume } from "../server/db/resume";
import { ICreateResumeSchema } from "../lib/types";
import ResumeUploader from "./ResumeUploader";
import { IResume } from "../schemas/schema";
import DashboardSkeleton from "@/features/project/utils/DashboardSkeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SuspenseWrapper from "@/utils/SuspenseWrapper";
import CustomLink from "@/components/ui/CustomLink";

// Create the mutation function for adding a new project
const createResumeMutation = async (data: ICreateResumeSchema) => {
  const response = await addNewResume(data);
  return response;
};

const Resume = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [errorMessage, setErrorMessage] = useState<string | null>(null); // General error message

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const { data, error, isPending } = useQuery<IResume[]>({
    queryKey: ["resume"],
    queryFn: getAllResume,
  });

  const mutation = useMutation({
    mutationFn: createResumeMutation,
    onSuccess: (response) => {
      if (response.success === true) {
        toast.success(response.message);
        setPreviews([]);
        setFiles([]);
        queryClient.invalidateQueries({ queryKey: ["resume"] });
      } else {
        // Handle Zod validation errors
        const zodErrorMessages = response.errors?.fieldErrors;

        if (zodErrorMessages && typeof zodErrorMessages === "object") {
          // Loop through the fieldErrors and set each error using React Hook Form's setError
          const errorData = Object.fromEntries(
            Object.entries(zodErrorMessages).map(([key, value]) => [
              key,
              Array.isArray(value) ? value[0] : "", // Extract the first error message if it's an array
            ]),
          );
          if (errorData) {
            toast.error("Invalid schema");
          }
        } else {
          // If the error is not a validation error, just log it
          setErrorMessage(response.error ?? "An unknown error occurred");
        }
      }
    },
    onError: (error) => {
      // Handle mutation errors
      toast.error(error.message);
      setErrorMessage(error.message);
    },
  });

  const {
    setIsUploading,
    isUploading,
    setProgress,
    setPreviews,
    setFiles,
    files,
  } = useResumeContext();

  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: () => {
      setProgress(100);
    },
    onUploadError: (e) => {
      toast.error(e.message);
      return;
    },
    onUploadBegin: () => {
      setIsUploading(true);
      setProgress(50);
    },
  });

  const updateResumeHandler = (_id: string, key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("case", "resume_update");
    params.set("resume_update", _id);
    params.set("resume_action_key", key);

    const newUrl = `${pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  const onSubmit = async () => {
    setIsUploading(true);

    try {
      if (files.length === 0) {
        toast.error("Please select a file to upload.");
        return;
      }

      // Upload images before submitting the form
      const imageUploadResult = await startUpload(files);

      if (!imageUploadResult) {
        toast.error("Image upload failed.");
        return;
      }

      imageUploadResult.forEach((d) => {
        mutation.mutate({
          key: d.key,
          url: d.ufsUrl,
          size: d.size,
          name: d.name,
        });
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsUploading(false);
    }
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <SuspenseWrapper>
      <section className="min-h-[70vh]">
        {error && (
          <p className="my-4 text-red-500 text-[1rem]">{error.message}</p>
        )}
        {data && data?.length < 0 && (
          <section>
            {errorMessage && (
              <p className="my-4 w-full rounded-sm bg-red-100 p-[0.5rem] text-center text-sm text-red-500">
                {errorMessage}
              </p>
            )}
            <div>
              <label className="block font-medium"> Upload resume</label>
              <ResumeUploader />
            </div>
            {files.length > 0 && (
              <Button
                onClick={onSubmit}
                disabled={isUploading}
                className={cn(
                  "hover:bg-primaryLight transition-all min-w-[150px] ease-in-out duration-300",
                  {
                    "bg-background hover:bg-background cursor-not-allowed":
                      isUploading,
                  },
                )}
              >
                {isUploading ? <Loading /> : "Upload Resume"}
              </Button>
            )}
          </section>
        )}

        <section>
          {data && !isPending ? (
            <div className="border-border flex justify-between items-center gap-[2rem] flex-wrap border-[1px] rounded-[15px] p-[1rem]">
              <h2>{data[0].name}</h2>
              <div className="flex justify-end items-center gap-[1rem]">
                <CustomLink className="p-[0.5rem]" href={`/resume`}>
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
                      d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                    />
                  </svg>
                </CustomLink>
                <Button
                  onClick={() => {
                    if (data) {
                      updateResumeHandler(data[0]._id, data[0].key);
                    }
                  }}
                  className="bg-gray"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1068_1505)">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.95697 0.9375L10.125 0.9375C10.4357 0.9375 10.6875 1.18934 10.6875 1.5C10.6875 1.81066 10.4357 2.0625 10.125 2.0625H9C7.21633 2.0625 5.93517 2.06369 4.96018 2.19478C4.00138 2.32369 3.42334 2.56886 2.9961 2.9961C2.56886 3.42334 2.32369 4.00138 2.19478 4.96018C2.06369 5.93517 2.0625 7.21633 2.0625 9C2.0625 10.7837 2.06369 12.0648 2.19478 13.0398C2.32369 13.9986 2.56886 14.5767 2.9961 15.0039C3.42334 15.4311 4.00138 15.6763 4.96018 15.8052C5.93517 15.9363 7.21633 15.9375 9 15.9375C10.7837 15.9375 12.0648 15.9363 13.0398 15.8052C13.9986 15.6763 14.5767 15.4311 15.0039 15.0039C15.4311 14.5767 15.6763 13.9986 15.8052 13.0398C15.9363 12.0648 15.9375 10.7837 15.9375 9V7.875C15.9375 7.56434 16.1893 7.3125 16.5 7.3125C16.8107 7.3125 17.0625 7.56434 17.0625 7.875V9.04303C17.0625 10.7743 17.0625 12.1311 16.9202 13.1897C16.7745 14.2733 16.4705 15.1283 15.7994 15.7994C15.1283 16.4705 14.2733 16.7745 13.1897 16.9202C12.1311 17.0625 10.7743 17.0625 9.04303 17.0625H8.95697C7.22567 17.0625 5.8689 17.0625 4.81028 16.9202C3.72673 16.7745 2.87171 16.4705 2.2006 15.7994C1.52949 15.1283 1.22549 14.2733 1.07981 13.1897C0.937483 12.1311 0.937491 10.7743 0.9375 9.04303V8.95697C0.937491 7.22567 0.937483 5.86889 1.07981 4.81028C1.22549 3.72673 1.52949 2.87171 2.2006 2.2006C2.87171 1.5295 3.72673 1.22549 4.81028 1.07981C5.86889 0.937483 7.22567 0.937491 8.95697 0.9375ZM12.5779 1.70694C13.6038 0.681022 15.2671 0.681022 16.2931 1.70694C17.319 2.73285 17.319 4.39619 16.2931 5.4221L11.307 10.4082C11.0285 10.6867 10.8541 10.8611 10.6594 11.013C10.4302 11.1918 10.1821 11.3451 9.91961 11.4702C9.69676 11.5764 9.46271 11.6544 9.08909 11.7789L6.91069 12.505C6.50851 12.6391 6.0651 12.5344 5.76533 12.2347C5.46556 11.9349 5.36089 11.4915 5.49495 11.0893L6.22108 8.91092C6.34559 8.53729 6.42359 8.30324 6.5298 8.08039C6.65489 7.81791 6.80821 7.56984 6.98703 7.34056C7.13887 7.1459 7.31333 6.97147 7.59183 6.693L12.5779 1.70694ZM15.4976 2.50243C14.911 1.91586 13.96 1.91586 13.3734 2.50243L13.0909 2.7849C13.108 2.85679 13.1318 2.94245 13.1649 3.038C13.2724 3.34779 13.4758 3.75579 13.86 4.14C14.2442 4.5242 14.6522 4.7276 14.962 4.83508C15.0575 4.86823 15.1432 4.89205 15.2151 4.90907L15.4976 4.62661C16.0841 4.04003 16.0841 3.08901 15.4976 2.50243ZM14.3289 5.79532C13.9419 5.6289 13.4911 5.36209 13.0645 4.93549C12.6379 4.50889 12.3711 4.05812 12.2047 3.67114L8.41313 7.46269C8.10074 7.77508 7.97823 7.89897 7.87411 8.03246C7.74553 8.19731 7.6353 8.37567 7.54536 8.56439C7.47252 8.71722 7.41651 8.8822 7.2768 9.30131L6.95288 10.2731L7.72693 11.0471L8.69869 10.7232C9.1178 10.5835 9.28278 10.5275 9.43561 10.4546C9.62433 10.3647 9.80269 10.2545 9.96754 10.1259C10.101 10.0218 10.2249 9.89926 10.5373 9.58687L14.3289 5.79532Z"
                        fill="#363636"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1068_1505">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </Button>
              </div>
            </div>
          ) : (
            <DashboardSkeleton />
          )}
        </section>
      </section>
    </SuspenseWrapper>
  );
};

export default Resume;
