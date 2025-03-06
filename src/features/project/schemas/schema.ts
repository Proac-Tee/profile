import { Schema, Document } from "mongoose";

export interface IImage {
  _id: string;
  key: string;
  url: string;
  size: number;
  name: string;
}

export interface IProject extends Document {
  _id: string;
  title: string;
  description: string;
  techStack: string[]; // Array of strings
  githubUrl?: string; // Optional
  liveUrl?: string; // Optional
  imageUrls: IImage[]; // Array of image objects
  createdAt?: Date;
  updatedAt?: Date;
}

export const ProjectSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String], required: true },
    githubUrl: { type: String, required: false },
    liveUrl: { type: String, required: false },
    imageUrls: [
      {
        key: { type: String, required: true },
        url: { type: String, required: true },
        size: { type: Number, required: true },
        name: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);
