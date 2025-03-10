"use server";

import db from "@/mongoose/db";
import { UTApi } from "uploadthing/server";
import { IResume } from "../../schemas/schema";
import { ICreateResumeSchema, resumeSchema } from "../../lib/types";
import ResumeModel from "@/mongoose/ResumeModel";

const utapi = new UTApi();

/**
 * Add new project with validation
 * @param {IProject} data - Project data to be added
 * @returns {Object} - Success or error message
 */
export const addNewResume = async (data: ICreateResumeSchema) => {
  try {
    await db(); // Ensure the database connection

    // Validate input using Zod
    const validationResult = resumeSchema.safeParse(data);
    if (!validationResult.success === true) {
      return {
        success: false,
        message: "❌ Validation Error",
        errors: validationResult.error.flatten(),
      };
    }

    // Create the project in the database
    const newResume = await ResumeModel.create(validationResult.data);

    return {
      success: true,
      message: `🎉 Successfully created ${newResume.name} project.`,
      data: {
        _id: newResume._id.toString(),
        title: newResume.name,
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
 * Fetch all resume sorted by newest first
 * @returns {Array} - List of resume or empty array on failure
 */
export const getAllResume = async (): Promise<IResume[]> => {
  try {
    await db(); // Ensure database connection

    const resume = await ResumeModel.find().sort({ createdAt: -1 }).lean(); // Convert Mongoose documents to plain objects

    // Convert `_id` and other nested `_id` fields to strings
    const sanitizedProjects = resume.map((resume) => ({
      ...resume,
      _id: resume._id.toString(), // Convert `_id` to string
    }));

    return sanitizedProjects;
  } catch (error) {
    console.error("❌ Error fetching resume:", error);
    return [];
  }
};

/**
 * Update an existing resume
 * @param {Types.ObjectId} _id - Resume ID
 * @param {<IResume>} data - data for updating
 * @returns {Object} - Success or error message
 */
export const updateResume = async (
  _id: string,
  data: ICreateResumeSchema,
  key: string,
) => {
  try {
    await db(); // Ensure database connection

    const validationResult = resumeSchema.safeParse(data);

    if (!validationResult.success === true) {
      return {
        success: false,
        message: "❌ Validation Error",
        errors: validationResult.error.flatten(),
      };
    }

    // Update resume with the validated data
    const updatedResume = await ResumeModel.findByIdAndUpdate(
      _id,
      validationResult.data,
      {
        new: true, // Return updated document
        runValidators: true, // Enforce schema validation
      },
    );

    // Delete the image file using the external API
    await utapi.deleteFiles(key);

    if (!updatedResume) {
      return {
        success: false,
        message: "❌ Resume not found",
      };
    }

    return {
      success: true,
      message: "🎉 Successfully updated resume.",
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: "❌ Error updating resume",
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
