"use server";

import { getAllProjects } from "./db/project";

export async function fetchAllProjects() {
  const response = await getAllProjects(); // This is a recursive call leading to stack overflow

  return response;
}
