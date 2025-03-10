"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Loading from "@/utils/Loading";
import { updateResume } from "../server/db/resume";
import { useResumeContext } from "../hooks/ResumeContext";
import { useUploadThing } from "@/utils/uploadthing";
import { ICreateResumeSchema } from "../lib/types";
import SuspenseWrapper from "@/utils/SuspenseWrapper";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import ResumeUploader from "./ResumeUploader";

const updateResumeMutation = async ({
  _id,
  data,
  key,
}: {
  _id: string;
  data: ICreateResumeSchema;
  key: string;
}) => {
  return await updateResume(_id, data, key);
};

const ResumeUpdate = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const _id = searchParams.get("resume_update");
  const key = searchParams.get("resume_action_key");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // General error message
  const queryClient = useQueryClient();

  const handleBack = () => router.back();

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

  const updateResume = useMutation({
    mutationFn: updateResumeMutation,
    onSuccess: (response) => {
      if (response.success === true) {
        setPreviews([]);
        setFiles([]);
        queryClient.invalidateQueries({ queryKey: ["resume"] });
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

  const updateHandler = async () => {
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

      if (_id && key) {
        imageUploadResult.forEach((d) => {
          const data = {
            key: d.key,
            url: d.ufsUrl,
            size: d.size,
            name: d.name,
          };

          updateResume.mutate({
            _id,
            data,
            key,
          });
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <SuspenseWrapper>
      <section className="min-h-[50vh] w-[70vw] bg-white px-[1rem] py-[2rem] rounded-[15px]">
        {_id && (
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
                onClick={updateHandler}
                disabled={isUploading}
                className={cn(
                  "hover:bg-primaryLight transition-all min-w-[150px] ease-in-out duration-300",
                  {
                    "bg-background hover:bg-background cursor-not-allowed":
                      isUploading,
                  },
                )}
              >
                {isUploading ? <Loading /> : "Update Resume"}
              </Button>
            )}
          </section>
        )}
      </section>
    </SuspenseWrapper>
  );
};

export default ResumeUpdate;
