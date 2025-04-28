/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetDueSoonRemindersByFreelancerQuery,
  useGetTotalClientsByFreelancerQuery,
  useGetTotalProjectsByFreelancerQuery,
} from "../../../redux/features/freelancer/freelancer.api";
import { HiUsers } from "react-icons/hi2";
import { GrTasks } from "react-icons/gr";
import { RiAlarmFill } from "react-icons/ri";
import { useGetAllProjectByFreelancerQuery } from "../../../redux/features/project/project.api";
import ProjectsTable from "./ProjectsTable/ProjectsTable";
import { IProject } from "../../../types";
import { useEffect, useState } from "react";
import MyPagination from "../../../components/ui/MyPagination/MyPagination";
import Loading from "../../../components/ui/Loading/Loading";
import Empty from "../../../components/shared/Empty/Empty";

const DashboardRootPage = () => {
  const [query, setQuery] = useState<{ name: string; value: any }[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [statusForFilter, setStatusForFilter] = useState("");
  const [searchText, setSearchText] = useState<{ name: string; value: any }>({
    name: "",
    value: "",
  });
  const {
    data: totalClientResponse,
    isLoading: isTotalClientLoading,
    isFetching: isTotalClientFetching,
  } = useGetTotalClientsByFreelancerQuery(undefined);
  const {
    data: totalProjectResponse,
    isLoading: isTotalProjectLoading,
    isFetching: isTotalProjectFetching,
  } = useGetTotalProjectsByFreelancerQuery(undefined);
  const {
    data: remindersResponse,
    isLoading: isRemindersLoading,
    isFetching: isRemindersFetching,
  } = useGetDueSoonRemindersByFreelancerQuery(undefined);

  useEffect(() => {
    setQuery([
      { name: "page", value: page },
      { name: "limit", value: pageSize },
    ]);
  }, [page, pageSize]);

  useEffect(() => {
    setPage(1);
    setQuery([
      { name: "page", value: page },
      { name: "limit", value: pageSize },
      {
        name: "status",
        value: statusForFilter,
      },
    ]);
  }, [statusForFilter]);

  useEffect(() => {
    setPage(1);
    setQuery([
      { name: "page", value: page },
      { name: "limit", value: pageSize },
      searchText,
    ]);
  }, [searchText]);

  const {
    data: projectsResponse,
    isLoading: isProjectLoading,
    isFetching: isProjectFetching,
  } = useGetAllProjectByFreelancerQuery(query);

  const projects = projectsResponse?.data;

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const onSearch = (value: string) =>
    setSearchText({ name: "searchTerm", value: value });

  const handleEdit = (project: IProject) => {
    console.log("Edit project:", project);
    // Your edit logic here
  };

  const handleDelete = (projectId: string) => {
    console.log("Delete project:", projectId);
    // Your delete logic here
  };

  if (
    isTotalClientLoading ||
    isTotalClientFetching ||
    isTotalProjectLoading ||
    isTotalProjectFetching ||
    isRemindersLoading ||
    isRemindersFetching
  ) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-primary dark:text-white">
        {/* stat cards */}
        <div className="p-5 border border-primary rounded-xl flex flex-col gap-5">
          <h2 className="font-semibold text-lg md:text-2xl text-primary dark:text">
            Total Clients
          </h2>
          <div className="flex items-center gap-5">
            <div className="bg-primary p-2 rounded-xl">
              <HiUsers size={30} className="text-white" />
            </div>
            <p className="font-medium text-lg md:text-2xl">
              {totalClientResponse?.data?.count}
            </p>
          </div>
        </div>
        <div className="p-5 border border-primary rounded-xl flex flex-col gap-5">
          <h2 className="font-semibold text-lg md:text-2xl text-primary dark:text">
            Total Projects
          </h2>
          <div className="flex items-center gap-5">
            <div className="bg-primary p-2 rounded-xl">
              <GrTasks size={30} className="text-white" />
            </div>
            <p className="font-medium text-lg md:text-2xl">
              {totalProjectResponse?.data?.count}
            </p>
          </div>
        </div>
        <div className="p-5 border border-primary rounded-xl flex flex-col gap-5">
          <h2 className="font-semibold text-lg md:text-2xl text-primary dark:text">
            Due soon reminders
          </h2>
          <div className="flex items-center gap-5">
            <div className="bg-primary p-2 rounded-xl">
              <RiAlarmFill size={30} className="text-white" />
            </div>
            <p className="font-medium text-lg md:text-2xl">
              {remindersResponse?.data?.length}
            </p>
          </div>
        </div>
      </div>
      {/* project table by status */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-5 justify-between">
          <h2 className="font-semibold text-2xl text-primary dark:text">
            My Projects
          </h2>
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full border border-primary focus:outline-primary bg-transparent text-primary rounded-lg p-2 pr-8"
                value={searchText.value}
                onChange={(e) => onSearch(e.target.value)}
              />
              {searchText.value ? (
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-primary"
                  onClick={() =>
                    setSearchText({ name: "searchTerm", value: "" })
                  }
                >
                  ✕
                </button>
              ) : (
                ""
              )}
            </div>
            <select
              className="border border-primary focus:outline-primary bg-transparent text-primary rounded-lg p-2 cursor-pointer"
              onChange={(e) => setStatusForFilter(e.target.value)}
            >
              <option value="">All</option>
              <option value="NOT_STARTED">Not Started</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="ON_HOLD">On Hold</option>
            </select>
          </div>
        </div>
        {!isProjectLoading && !isProjectFetching ? (
          <div className="w-full">
            <ProjectsTable
              projects={projects}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <MyPagination
              page={page}
              pageSize={pageSize}
              total={projectsResponse?.meta?.total || 0}
              onPageChange={handlePaginationChange}
            />
          </div>
        ) : (
          ""
        )}
        {isProjectLoading || isProjectFetching ? (
          <div className="w-full gap-x-2 flex justify-center items-center h-[200px]">
            <div className="w-5 bg-[#d991c2] animate-pulse h-5 rounded-full animate-bounce"></div>
            <div className="w-5 animate-pulse h-5 bg-[#9869b8] rounded-full animate-bounce"></div>
            <div className="w-5 h-5 animate-pulse bg-[#6756cc] rounded-full animate-bounce"></div>
          </div>
        ) : (
          ""
        )}
        {!isProjectLoading && !isProjectFetching && projects?.length < 1 ? (
          <Empty
            title="No Project Found"
            description="No project found. Create project to get started."
            actionText="Create Project"
            actionPath="/projects/new"
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DashboardRootPage;
