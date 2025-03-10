import { Schema, Document } from "mongoose";

export interface IResume extends Document {
  _id: string;
  key: string;
  url: string;
  size: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const ResumeSchema: Schema = new Schema(
  {
    key: { type: String, required: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    name: { type: String, required: true },
  },
  { timestamps: true },
);
