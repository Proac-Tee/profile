"use client";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import { getAllProjects } from "../server/db/project";
import Loading from "@/utils/Loading";
import { IProject } from "../schemas/schema";
import DashboardProjectTableHeader from "./DashboardProjectTableHeader";
import DashboardProjectBody from "./DashboardProjectBody";
import TablePagination from "@/utils/Pagination";

type TableProps = {
  page: number | string;
  per_page: number;
};

const DashboardProjectTable: FC<TableProps> = ({ page, per_page }) => {
  const { data, error, isPending } = useQuery<IProject[]>({
    queryKey: ["projects"],
    queryFn: getAllProjects,
  });

  if (isPending) {
    return (
      <section className="py-[2rem] flex justify-start min-h-[70vh] items-start">
        <Loading />
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-[2rem] flex justify-start min-h-[70vh] items-start">
        <p className="text-[1rem]">{error.message}</p>
      </section>
    );
  }
  // Calculate pagination values
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  return (
    <section className="py-[2rem]">
      {data && data.length > 0 ? (
        <section className="my-[1rem]">
          <section className="z-10 min-h-[50vh] overflow-y-hidden overflow-x-scroll pb-[6rem]">
            <div className="relative z-10 mb-[1rem] h-auto w-[1000px] rounded-[0.75rem] border-[1px] border-border">
              <DashboardProjectTableHeader />
              <DashboardProjectBody
                data={data}
                page={page}
                per_page={per_page}
              />
            </div>
          </section>
          <TablePagination
            totalEntries={data}
            hasNextPage={end < data.length}
            hasPrevPage={start > 0}
          />
        </section>
      ) : (
        ""
      )}
    </section>
  );
};

export default DashboardProjectTable;
