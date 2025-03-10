import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, Controller, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import Button from "@/components/ui/Button";
import BackButton from "@/components/ui/BackButton";
import MultiInput from "@/utils/MultiInput";
import Loading from "@/utils/Loading";
import SuspenseWrapper from "@/utils/SuspenseWrapper";

import { IPartialProjectSchema, updateProjectSchema } from "../lib/types";
import { getAllProjects, updateProject } from "../server/db/project";
import { IProject } from "../schemas/schema";

const updateProjectMutation = async ({
  _id,
  dataValue,
}: {
  _id: string;
  dataValue: IPartialProjectSchema;
}) => {
  const response = await updateProject(_id, dataValue);
  return response;
};

const UpdateProject = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const _id = searchParams.get("project_action_id") ?? "";
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Fetch all projects
  const { data, error, isPending } = useQuery<IProject[]>({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  // Find the project to update
  const filteredProject = data?.find((project) => project._id === _id);

  const mutation = useMutation({
    mutationFn: updateProjectMutation,
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message);
        queryClient.invalidateQueries({ queryKey: ["projects"] }); // Refresh projects list
        reset();
        router.back();
      } else {
        // Handle Zod validation errors dynamically
        if (response.errors && typeof response.errors === "object") {
          Object.entries(response.errors).forEach(([key, value]) => {
            setError(key as keyof IPartialProjectSchema, {
              type: "manual",
              message: Array.isArray(value) ? value[0] : "",
            });
          });
        } else {
          setErrorMessage(response.error ?? "An unknown error occurred");
        }
      }
    },
    onError: (error) => {
      console.log(error);

      toast.error(error.message);
      setErrorMessage(error.message);
    },
  });

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(updateProjectSchema),
  });

  const onSubmit = (dataValue: FieldValues) => {
    const data = dataValue as IPartialProjectSchema;

    mutation.mutate({ _id, dataValue: data });
  };

  if (isPending) {
    return (
      <section className="flex justify-start min-h-[70vh] items-start">
        <Loading />
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex justify-start min-h-[70vh] items-start">
        <p className="text-red-500">{error.message}</p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      {errorMessage && (
        <p className="my-4 w-full rounded-sm bg-red-100 p-2 text-center text-sm text-red-500">
          {errorMessage}
        </p>
      )}

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

      {filteredProject && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Project Title */}
          <div>
            <label htmlFor="title">Project Title</label>
            <input
              id="title"
              placeholder="Enter project title"
              {...register("title")}
              defaultValue={filteredProject.title ?? ""}
              required
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Enter project description"
              {...register("description")}
              defaultValue={filteredProject.description ?? ""}
              required
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Tech Stack */}
          <div>
            <label htmlFor="techStack">Tech Stack</label>
            <Controller
              name="techStack"
              control={control}
              defaultValue={filteredProject?.techStack ?? [""]}
              render={({ field }) => (
                <MultiInput
                  value={field.value || [""]}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.techStack && (
              <p className="text-red-500 text-sm">{errors.techStack.message}</p>
            )}
          </div>

          {/* GitHub URL */}
          <div>
            <label htmlFor="githubUrl">GitHub URL (optional)</label>
            <input
              id="githubUrl"
              type="url"
              placeholder="Enter GitHub URL"
              defaultValue={filteredProject.githubUrl ?? ""}
              {...register("githubUrl")}
            />
            {errors.githubUrl && (
              <p className="text-red-500 text-sm">{errors.githubUrl.message}</p>
            )}
          </div>

          {/* Live URL */}
          <div>
            <label htmlFor="liveUrl">Live URL (optional)</label>
            <input
              id="liveUrl"
              type="url"
              placeholder="Enter live URL"
              defaultValue={filteredProject.liveUrl ?? ""}
              {...register("liveUrl")}
            />
            {errors.liveUrl && (
              <p className="text-red-500 text-sm">{errors.liveUrl.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button disabled={isSubmitting} className="w-40">
            {isSubmitting ? <Loading /> : "Update Project"}
          </Button>
        </form>
      )}
    </section>
  );
};

const UpdateProjectForm = () => {
  return (
    <SuspenseWrapper>
      <UpdateProject />
    </SuspenseWrapper>
  );
};

export default UpdateProjectForm;
