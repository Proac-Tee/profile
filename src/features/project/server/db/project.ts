"use server";

import { Types } from "mongoose"; // Mongoose ObjectId type
import db from "@/mongoose/db";
import ProjectModel from "@/mongoose/ProjectModel";
import { IProject } from "../../schemas/schema";
import {
  ICreateProjectSchema,
  IPartialProjectSchema,
  projectIdSchema,
  projectSchema,
  updateProjectSchema,
} from "../../lib/types";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

/**
 * Add new project with validation
 * @param {IProject} data - Project data to be added
 * @returns {Object} - Success or error message
 */
export const addNewProject = async (data: ICreateProjectSchema) => {
  try {
    await db(); // Ensure the database connection

    // Validate input using Zod
    const validationResult = projectSchema.safeParse(data);
    if (!validationResult.success === true) {
      return {
        success: false,
        message: "❌ Validation Error",
        errors: validationResult.error.flatten(),
      };
    }

    // Create the project in the database
    const newProject = await ProjectModel.create(validationResult.data);

    return {
      success: true,
      message: `🎉 Successfully created ${newProject.title} project.`,
      data: {
        _id: newProject._id.toString(),
        title: newProject.title,
      },
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        success: false,
        message: "❌ Error creating project",
        error: error.message, //  Safely access error.message
      };
    } else {
      return {
        success: false,
        message: "❌ Unknown error occurred",
        error: "An unknown error occurred", // Default message if the error is not an instance of Error
      };
    }
  }
};

/**
 * Fetch all projects sorted by newest first
 * @returns {Array} - List of projects or empty array on failure
 */
export const getAllProjects = async (): Promise<IProject[]> => {
  try {
    await db(); // Ensure database connection

    const projects = await ProjectModel.find().sort({ createdAt: -1 }).lean(); // Convert Mongoose documents to plain objects

    // Convert `_id` and other nested `_id` fields to strings
    const sanitizedProjects = projects.map((project) => ({
      ...project,
      _id: project._id.toString(), // Convert `_id` to string
      imageUrls: project.imageUrls.map((image) => ({
        ...image,
        _id: image._id.toString(), // Convert nested `_id` to string
      })),
    }));

    return sanitizedProjects;
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return [];
  }
};

/**
 * Fetch all projects sorted by newest first
 * @returns {Array} - List of projects or empty array on failure
 */

export const getThreeProjects = async (): Promise<IProject[]> => {
  try {
    await db(); // Ensure database connection

    const projects = await ProjectModel.find()
      .sort({ createdAt: -1 })
      .limit(3) // Limit the number of projects to 3
      .lean(); // Convert Mongoose documents to plain objects

    // Convert `_id` and other nested `_id` fields to strings
    const sanitizedProjects = projects.map((project) => ({
      ...project,
      _id: project._id.toString(), // Convert `_id` to string
      imageUrls: project.imageUrls.map((image) => ({
        ...image,
        _id: image._id.toString(), // Convert nested `_id` to string
      })),
    }));

    return sanitizedProjects;
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    return [];
  }
};

/**
 * Fetch a single project by ID
 * @param {Types.ObjectId} _id - Project ID
 * @returns {Object|null} - Project details or null if not found
 */
export const getSingleProjectById = async (_id: Types.ObjectId) => {
  try {
    await db(); // Ensure database connection
    const project = await ProjectModel.findById(_id); // Find project by ID
    return JSON.stringify(project) ?? null;
  } catch (error) {
    console.error("❌ Error fetching project:", error);
    return null;
  }
};

/**
 * Update an existing project (Partial Update with Validation)
 * @param {Types.ObjectId} _id - Project ID
 * @param {Partial<IProject>} data - Partial project data for updating
 * @returns {Object} - Success or error message
 */
export const updateProject = async (
  _id: string,
  data: IPartialProjectSchema,
) => {
  try {
    await db(); // Ensure database connection

    const validationResult = updateProjectSchema.safeParse(data);

    if (!validationResult.success === true) {
      return {
        success: false,
        message: "❌ Validation Error",
        errors: validationResult.error.flatten(),
      };
    }

    // Update project with the validated data
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      _id,
      validationResult.data,
      {
        new: true, // Return updated document
        runValidators: true, // Enforce schema validation
      },
    );
    if (!updatedProject) {
      return {
        success: false,
        message: "❌ Project not found",
      };
    }

    return {
      success: true,
      message: "🎉 Successfully updated project.",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: "❌ Error updating project",
        error: error.message,
      };
    } else {
      return {
        success: false,
        message: "❌ Unknown error occurred",
        error: "An unknown error occurred", // Default message if the error is not an instance of Error
      };
    }
  }
};

/**
 * Delete a project by ID
 * @param {Types.ObjectId} _id - Project ID
 * @returns {Object} - Success or error message
 */
export const deleteProjectById = async (_id: string, images: string[]) => {
  try {
    await db(); // Ensure database connection

    const validationResult = projectIdSchema.safeParse({ _id, images });

    if (!validationResult.success === true) {
      return {
        success: false,
        message: "❌ Validation Error",
        errors: validationResult.error.flatten(),
      };
    }

    // Find and delete the project
    const deletedProject = await ProjectModel.findByIdAndDelete(_id);

    // Delete the image file using the external API
    await utapi.deleteFiles(images);

    if (!deletedProject) {
      return {
        success: false,
        message: "❌ Project not found",
      };
    }

    return {
      success: true,
      message: `🎉 Successfully deleted ${deletedProject.title} project.`,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: "❌ Error deleting project",
        error: error.message,
      };
    } else {
      return {
        success: false,
        message: "❌ Unknown error occurred",
        error: "An unknown error occurred", // Default message if the error is not an instance of Error
      };
    }
  }
};
