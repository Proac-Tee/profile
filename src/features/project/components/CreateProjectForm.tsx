import React, { useState } from "react";
import Button from "@/components/ui/Button";
import { cn } from "@/utils/cn";
import BackButton from "@/components/ui/BackButton";
import { useImageContext } from "../Context/ImageFormContext";
import toast from "react-hot-toast";
import { useUploadThing } from "@/utils/uploadthing";
import ImageUploader from "./ImageUploader";
import Loading from "@/utils/Loading";
import { Controller, FieldValues, useForm } from "react-hook-form";
import MultiInput from "@/utils/MultiInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientProjectSchema, IClientCreateProjectSchema } from "../lib/types";
import { addNewProject } from "../server/db/project";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Create the mutation function for adding a new project
const createProjectMutation = async (data: IClientCreateProjectSchema) => {
  const response = await addNewProject(data);
  return response;
};

const CreateProjectForm = () => {
  const {
    setIsUploading,
    isUploading,
    setProgress,
    setPreviews,
    setFiles,
    files,
  } = useImageContext();

  const [errorMessage, setErrorMessage] = useState<string | null>(null); // General error message

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createProjectMutation,
    onSuccess: (response) => {
      if (response.success === true) {
        toast.success(response.message);
        reset();
        setPreviews([]);
        setFiles([]);
        queryClient.invalidateQueries({ queryKey: ["projects"] });
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

          if (errorData.title) {
            setError("title", {
              type: "manual",
              message: errorData.title, // Pass the extracted error message
            });
          }

          if (errorData.description) {
            setError("description", {
              type: "manual",
              message: errorData.description, // Pass the extracted error message
            });
          }

          if (errorData.techStack) {
            setError("techStack", {
              type: "manual",
              message: errorData.techStack, // Pass the extracted error message
            });
          }

          if (errorData.githubUrl) {
            setError("githubUrl", {
              type: "manual",
              message: errorData.githubUrl, // Pass the extracted error message
            });
          }

          if (errorData.liveUrl) {
            setError("liveUrl", {
              type: "manual",
              message: errorData.liveUrl, // Pass the extracted error message
            });
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
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(clientProjectSchema),
  });

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

  const onSubmit = async (dataValue: FieldValues) => {
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

      const imageShape = imageUploadResult.map((d) => ({
        key: d.key,
        url: d.ufsUrl,
        size: d.size,
        name: d.name,
      }));

      const data = dataValue as IClientCreateProjectSchema;

      const newProject = {
        title: data.title,
        description: data.description,
        techStack: data.techStack,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        imageUrls: imageShape, // Ensure correct type
      };

      mutation.mutate(newProject);
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <section className="mb-[2rem]">
      <BackButton>
        <span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.02055 3.64645C7.21581 3.84171 7.21581 4.15829 7.02055 4.35355L3.8741 7.5H13.3337C13.6098 7.5 13.8337 7.72386 13.8337 8C13.8337 8.27614 13.6098 8.5 13.3337 8.5H3.8741L7.02055 11.6464C7.21581 11.8417 7.21581 12.1583 7.02055 12.3536C6.82528 12.5488 6.5087 12.5488 6.31344 12.3536L2.31344 8.35355C2.11818 8.15829 2.11818 7.84171 2.31344 7.64645L6.31344 3.64645C6.5087 3.45118 6.82528 3.45118 7.02055 3.64645Z"
              fill="white"
            />
          </svg>
        </span>
        Go Back
      </BackButton>
      {errorMessage && (
        <p className="my-4 w-full rounded-sm bg-red-100 p-[0.5rem] text-center text-sm text-red-500">
          {errorMessage}
        </p>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-[2rem]">
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            placeholder="Enter project title"
            {...register("title", { required: "Project title is required" })}
            required
          />
          {errors.title?.message && (
            <p className="mt-1 text-sm text-red-500">
              {typeof errors.title.message === "string"
                ? errors.title.message
                : "Invalid input"}
            </p>
          )}
        </div>

        <div className="mb-[2rem]">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter project description"
            {...register("description")}
            required
          />
          {errors.description?.message && (
            <p className="mt-1 text-sm text-red-500">
              {typeof errors.description.message === "string"
                ? errors.description.message
                : "Invalid input"}
            </p>
          )}
        </div>

        <div className="mb-[2rem]">
          <label htmlFor="techStack">Tech Stack</label>
          <Controller
            name="techStack"
            control={control}
            defaultValue={[]} // Default to an empty array
            render={({ field }) => (
              <MultiInput
                value={field.value as string[]}
                onChange={field.onChange} // Type-safe onChange
              />
            )}
          />

          {errors.techStack?.message && (
            <p className="mt-1 text-sm text-red-500">
              {typeof errors.techStack.message === "string"
                ? errors.techStack.message
                : "Invalid input"}
            </p>
          )}
        </div>

        <div className="mb-[2rem]">
          <label htmlFor="githubUrl">GitHub URL (optional)</label>
          <input
            type="url"
            placeholder="Enter github url"
            {...register("githubUrl")}
          />
          {errors.githubUrl?.message && (
            <p className="mt-1 text-sm text-red-500">
              {typeof errors.githubUrl.message === "string"
                ? errors.githubUrl.message
                : "Invalid input"}
            </p>
          )}
        </div>

        <div className="mb-[2rem]">
          <label htmlFor="liveUrl">Live URL (optional)</label>
          <input
            type="url"
            placeholder="Enter live url"
            {...register("liveUrl")}
          />
          {errors.liveUrl?.message && (
            <p className="mt-1 text-sm text-red-500">
              {typeof errors.liveUrl.message === "string"
                ? errors.liveUrl.message
                : "Invalid input"}
            </p>
          )}
        </div>

        <div>
          <label className="block font-medium"> Upload images</label>
          <ImageUploader />
        </div>
        <Button
          disabled={isUploading || isSubmitting}
          className={cn(
            "hover:bg-primaryLight transition-all w-[150px] ease-in-out duration-300",
            {
              "bg-background hover:bg-background cursor-not-allowed":
                isUploading || isSubmitting,
            },
          )}
        >
          {isUploading || isSubmitting ? <Loading /> : "Create Project"}
        </Button>
      </form>
    </section>
  );
};

export default CreateProjectForm;
