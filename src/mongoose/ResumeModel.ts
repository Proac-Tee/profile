import { IResume, ResumeSchema } from "@/features/resume/schemas/schema";
import mongoose, { Model } from "mongoose";

// Export the Mongoose model
const ResumeModel: Model<IResume> =
  mongoose.models.Resume || mongoose.model<IResume>("Resume", ResumeSchema);

export default ResumeModel;
