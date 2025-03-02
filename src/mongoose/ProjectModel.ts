import { IProject, ProjectSchema } from "@/features/project/schemas/schema";
import mongoose, { Model } from "mongoose";

// Export the Mongoose model
const ProjectModel: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);

export default ProjectModel;
