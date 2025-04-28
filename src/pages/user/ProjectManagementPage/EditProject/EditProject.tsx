/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiDollarSign, FiCalendar, FiClipboard, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { IClient } from "../../../../types";
import {
  useGetSingleProjectQuery,
  useUpdateProjectMutation,
} from "../../../../redux/features/project/project.api";
import Loading from "../../../../components/ui/Loading/Loading";
import { useGetMyClientsQuery } from "../../../../redux/features/client/client.api";
import { handleAsyncWithToast } from "../../../../utils/handleAsyncWithToast";

const projectUpdateSchema = z
  .object({
    title: z.string().min(1, { message: "Title is required" }).optional(),
    budget: z
      .number()
      .min(0, { message: "Budget must be positive" })
      .optional(),
    deadline: z
      .string()
      .refine((value) => !isNaN(Date.parse(value)), {
        message: "Deadline must be a valid date",
      })
      .transform((value) => {
        const date = new Date(value);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      })
      .optional(),
    status: z
      .enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED", "ON_HOLD"])
      .optional(),
    clientId: z.string().min(1, { message: "Client is required" }).optional(),
  })
  .refine(
    (data) => {
      return Object.values(data).some((val) => val !== undefined);
    },
    { message: "At least one field must be updated" }
  );

type ProjectUpdateData = z.infer<typeof projectUpdateSchema>;

const UpdateProjectPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: projectData, isLoading } = useGetSingleProjectQuery(projectId!);
  const { data: clients } = useGetMyClientsQuery(undefined);
  const [updateProject] = useUpdateProjectMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProjectUpdateData>({
    resolver: zodResolver(projectUpdateSchema),
  });

  useEffect(() => {
    if (projectData?.data) {
      reset({
        title: projectData.data.title,
        budget: projectData.data.budget,
        deadline: new Date(projectData.data.deadline)
          .toISOString()
          .slice(0, 16),
        status: projectData.data.status,
        clientId: projectData.data.clientId,
      });
    }
  }, [projectData, reset]);

  const onSubmit = async (data: ProjectUpdateData) => {
    try {
      const updateData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );
      const res = await handleAsyncWithToast(async () => {
        return updateProject({ payload: updateData, id: projectId! });
      }, "Updating client...");
      if (res?.data?.success) {
        navigate("/projects");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  if (isLoading) return <Loading />;
  if (!projectData?.data) return <div>Project not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-700 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-600">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <FiClipboard className="mr-2" />
              Update Project
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Project Title
              </label>
              <input
                {...register("title")}
                className={`block w-full pl-3 pr-3 py-2 border ${
                  errors?.title
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 dark:border-slate-600 focus:ring-primary focus:border-primary"
                } rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none sm:text-sm`}
              />
              {errors?.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors?.title?.message}
                </p>
              )}
            </div>

            {/* Budget Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Budget ($)
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiDollarSign className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  step="0.01"
                  {...register("budget", { valueAsNumber: true })}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors?.budget
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-slate-600 focus:ring-primary focus:border-primary"
                  } rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none sm:text-sm`}
                />
              </div>
              {errors?.budget && (
                <p className="mt-1 text-sm text-red-600">
                  {errors?.budget?.message}
                </p>
              )}
            </div>

            {/* Deadline Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Deadline
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  {...register("deadline")}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors?.deadline
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-slate-600 focus:ring-primary focus:border-primary"
                  } rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none sm:text-sm`}
                />
              </div>
              {errors?.deadline && (
                <p className="mt-1 text-sm text-red-600">
                  {errors?.deadline?.message}
                </p>
              )}
            </div>

            {/* Status Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                {...register("status")}
                className={`block w-full pl-3 pr-3 py-2 border ${"border-gray-300 dark:border-slate-600 focus:ring-primary focus:border-primary"} rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none sm:text-sm`}
              >
                <option value="NOT_STARTED">Not Started</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="ON_HOLD">On Hold</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>

            {/* Client Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client
              </label>
              <select
                {...register("clientId")}
                className={`block w-full pl-3 pr-3 py-2 border ${
                  errors?.clientId
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 dark:border-slate-600 focus:ring-primary focus:border-primary"
                } rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none sm:text-sm`}
              >
                <option value="">Select a client</option>
                {clients?.data?.map((client: IClient) => (
                  <option key={client?.id} value={client?.id}>
                    {client?.name}
                  </option>
                ))}
              </select>
              {errors?.clientId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors?.clientId?.message}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-slate-600">
              <button
                type="button"
                onClick={() => navigate(`/projects/${projectId}`)}
                className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-75"
              >
                <FiSave className="mr-2 h-4 w-4" />
                {isSubmitting ? "Updating..." : "Update Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProjectPage;
