import React, { FC } from "react";
import { IProject } from "../schemas/schema";
import dayjs from "../../../utils/dayjsConfig";
import { useDropdown } from "../hooks/useDropdown";
import Dropdown from "./Dropdown";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

type TableBodyProps = {
  data: IProject[];
  page: number | string;
  per_page: number;
};

const DashboardProjectBody: FC<TableBodyProps> = ({ data, page, per_page }) => {
  const { dropdownId, setDropdownId } = useDropdown();

  // Calculate pagination values
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = Array.isArray(data)
    ? data.slice(start, end).map((entry) => ({
        _id: entry._id,
        title: entry.title,
        imageUrls: entry.imageUrls,
        updatedAt: entry.updatedAt,
        createdAt: entry.createdAt,
        description: entry.description,
      }))
    : [];

  const handleClick = (productId: string) => {
    setDropdownId((prevId) => (prevId === productId ? "" : productId));
  };

  return (
    <>
      {entries.map((data) => (
        <div key={data._id} className="relative">
          <div className="project-table border-t-[1px] border-t-border text-white">
            <p className="truncate p-[0.75rem] text-left text-white font-[400]">
              {capitalizeFirstLetter(data.title)}
            </p>
            <p className="truncate p-[0.75rem] text-left text-white font-[400]">
              {capitalizeFirstLetter(data.description)}
            </p>
            <p className="truncate p-[0.75rem] text-left text-white font-[400]">
              {dayjs(data.createdAt).fromNow()}
            </p>
            <p className="truncate p-[0.75rem] text-left text-white font-[400]">
              {dayjs(data.updatedAt).fromNow()}
            </p>

            <div className="relative flex justify-end">
              <button
                onClick={() => {
                  handleClick(data._id);
                }}
                className="flex cursor-pointer items-center justify-center truncate p-[0.75rem] text-center text-[0.875rem] font-[400]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                  />
                </svg>
              </button>
              {dropdownId === data._id && (
                <Dropdown
                  _id={dropdownId}
                  view_text="View Project"
                  imageUrls={data.imageUrls}
                  update_text="Update Project"
                  delete_text="Delete Project"
                />
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default DashboardProjectBody;
