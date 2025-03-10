"use client";
import { getArrayFromCommaSeparatedParam } from "@/utils/getArrayFromCommaSeparatedParam";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { deleteProjectById } from "../server/db/project";
import Loading from "@/utils/Loading";
import SuspenseWrapper from "@/utils/SuspenseWrapper";

const deleteProjectMutation = async ({
  _id,
  images,
}: {
  _id: string;
  images: string[];
}) => {
  return await deleteProjectById(_id, images);
};

const DeleteProjectComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const _id = searchParams.get("project_delete");
  const url_images = searchParams.get("project_images");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // General error message
  const queryClient = useQueryClient();

  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({}); // Field-specific errors

  let images: string[] = [];
  if (url_images) {
    images = getArrayFromCommaSeparatedParam(url_images);
  }

  const handleBack = () => router.back();

  const deleteProject = useMutation({
    mutationFn: deleteProjectMutation,
    onSuccess: (response) => {
      if (response.success === true) {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        toast.success(response.message);
        handleBack();
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
          setFieldErrors(
            Object.fromEntries(
              Object.entries(zodErrorMessages).map(([key, value]) => [
                key,
                Array.isArray(value) ? value : [],
              ]),
            ),
          );
          toast.error(errorData._id);
        } else {
          // If the error is not a validation error, just log it
          toast.error(response.error ?? "An unknown error occurred");
        }
      }
    },
    onError: (error) => {
      // Handle mutation errors
      toast.error(error.message);
      setErrorMessage(error.message);
    },
  });

  const deleteHandler = () => {
    if (_id && images) {
      deleteProject.mutate({ _id, images });
    }
  };
  return (
    <section className=" relative flex w-[90vw] flex-col items-center justify-center gap-[1.5rem] rounded-[0.5rem] bg-white opacity-100 px-[2.5rem] py-[2rem] md:w-[400px]">
      <div className="flex flex-col items-center justify-center gap-[0.25rem]">
        {errorMessage && (
          <p className="my-4 w-full rounded-sm bg-red-200 p-[1rem] text-center text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        {fieldErrors._id && (
          <p className="mt-1 text-sm text-red-600">{fieldErrors.id[0]}</p>
        )}
        <span className="flex h-[3rem] w-[3rem] items-center justify-center rounded-[28px] bg-[#FEE4E2]">
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 5V4.2C14 3.0799 14 2.51984 13.782 2.09202C13.5903 1.71569 13.2843 1.40973 12.908 1.21799C12.4802 1 11.9201 1 10.8 1H9.2C8.07989 1 7.51984 1 7.09202 1.21799C6.71569 1.40973 6.40973 1.71569 6.21799 2.09202C6 2.51984 6 3.0799 6 4.2V5M8 10.5V15.5M12 10.5V15.5M1 5H19M17 5V16.2C17 17.8802 17 18.7202 16.673 19.362C16.3854 19.9265 15.9265 20.3854 15.362 20.673C14.7202 21 13.8802 21 12.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9265 3.32698 19.362C3 18.7202 3 17.8802 3 16.2V5"
              stroke="#D92D20"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h3 className="text-[1.125rem] font-[600] leading-[21.13px]">
          Delete Project
        </h3>
        <p className="text-center text-[0.875rem] leading-[20px]">
          Are you sure you want to delete this project? This action cannot be
          undone.
        </p>
      </div>
      <div className="flex w-[100%] items-center justify-center gap-[0.5rem] text-[0.875rem]">
        <button
          onClick={handleBack}
          className="flex h-[44px] flex-1 items-center justify-center rounded-[6.25rem] border-[1px] border-[#D0D5DD] px-[1.25rem] py-[0.875rem]"
        >
          No, cancel
        </button>
        <button
          onClick={deleteHandler}
          disabled={deleteProject.isPending}
          className="flex h-[44px] flex-1 items-center justify-center rounded-[6.25rem] border-[1px] border-[#D0D5DD] bg-[#D92D20] px-[1.25rem] py-[0.875rem] text-white"
        >
          {deleteProject.isPending ? <Loading /> : "Yes, Confirm"}
        </button>
      </div>
    </section>
  );
};

const DeleteProject = () => {
  return (
    <SuspenseWrapper>
      <DeleteProjectComponent />
    </SuspenseWrapper>
  );
};

export default DeleteProject;
