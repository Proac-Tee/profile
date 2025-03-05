import React, { useState } from "react";
import { ICreateProjectSchema } from "../lib/types";

const CreateProjectForm = () => {
  const [formData, setFormData] = useState<ICreateProjectSchema>({
    title: "",
    description: "",
    techStack: [],
    githubUrl: "",
    liveUrl: "",
    imageUrls: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // You can post data to the server here using fetch or axios
  };

  return (
    <section className="mb-[2rem]">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Project Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="techStack">Tech Stack (comma separated)</label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            value={formData.techStack.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                techStack: e.target.value.split(",").map((tech) => tech.trim()),
              })
            }
            required
          />
        </div>

        <div>
          <label htmlFor="githubUrl">GitHub URL (optional)</label>
          <input
            type="url"
            id="githubUrl"
            name="githubUrl"
            value={formData.githubUrl || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="liveUrl">Live URL (optional)</label>
          <input
            type="url"
            id="liveUrl"
            name="liveUrl"
            value={formData.liveUrl || ""}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="imageUrls">Image URLs (comma separated)</label>
          <input
            type="text"
            id="imageUrls"
            name="imageUrls"
            value={formData.imageUrls.map((img) => img.url).join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                imageUrls: e.target.value.split(",").map((url) => ({
                  key: "",
                  url: url.trim(),
                  size: 0,
                  name: "",
                })),
              })
            }
          />
        </div>

        <button type="submit">Create Project</button>
      </form>
    </section>
  );
};

export default CreateProjectForm;
