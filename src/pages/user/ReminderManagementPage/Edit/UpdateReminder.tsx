/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiCalendar, FiBell, FiSave } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../../components/ui/Loading/Loading";
import { handleAsyncWithToast } from "../../../../utils/handleAsyncWithToast";
import { IClient, IProject } from "../../../../types";
import {
  useGetSingleReminderQuery,
  useUpdateReminderMutation,
} from "../../../../redux/features/reminder/reminder.api";
import { useGetMyClientsQuery } from "../../../../redux/features/client/client.api";
import { useGetAllProjectByFreelancerQuery } from "../../../../redux/features/project/project.api";

const reminderUpdateSchema = z
  .object({
    date: z
      .string()
      .refine((value) => !isNaN(Date.parse(value)), {
        message: "Date must be a valid date",
      })
      .transform((value) => {
        const date = new Date(value);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      })
      .optional(),
    message: z.string().min(1, { message: "Message is required" }).optional(),
    clientId: z.string().optional(),
    projectId: z.string().optional(),
  })
  .refine(
    (data) => {
      return Object.values(data).some((val) => val !== undefined);
    },
    { message: "At least one field must be updated" }
  );

type ReminderUpdateData = z.infer<typeof reminderUpdateSchema>;

const UpdateReminderPage = () => {
  const { reminderId } = useParams();
  const navigate = useNavigate();
  const { data: reminderData, isLoading } = useGetSingleReminderQuery(
    reminderId!
  );
  const { data: clients } = useGetMyClientsQuery(undefined);
  const { data: projects } = useGetAllProjectByFreelancerQuery(undefined);
  const [updateReminder] = useUpdateReminderMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<ReminderUpdateData>({
    resolver: zodResolver(reminderUpdateSchema),
  });

  const selectedClientId = watch("clientId");

  useEffect(() => {
    if (reminderData?.data) {
      const reminder = reminderData.data;
      reset({
        date: new Date(reminder.date).toISOString().slice(0, 16),
        message: reminder.message,
        clientId: reminder.clientId || "",
        projectId: reminder.projectId || "",
      });
    }
  }, [reminderData, reset]);

  const onSubmit = async (data: ReminderUpdateData) => {
    try {
      const updateData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );

      const res = await handleAsyncWithToast(async () => {
        return updateReminder({ payload: updateData, id: reminderId! });
      }, "Updating reminder...");

      if (res?.data?.success) {
        navigate("/reminders");
      }
    } catch (error) {
      console.error("Error updating reminder:", error);
    }
  };

  if (isLoading) return <Loading />;
  if (!reminderData?.data) return <div>Reminder not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-700 shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-600">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <FiBell className="mr-2" />
              Update Reminder
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Date Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Date
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  {...register("date")}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors?.date
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-slate-600 focus:ring-primary focus:border-primary"
                  } rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none sm:text-sm`}
                />
              </div>
              {errors?.date && (
                <p className="mt-1 text-sm text-red-600">
                  {errors?.date?.message}
                </p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <textarea
                {...register("message")}
                rows={3}
                className={`block w-full pl-3 pr-3 py-2 border ${
                  errors?.message
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 dark:border-slate-600 focus:ring-primary focus:border-primary"
                } rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none sm:text-sm`}
                placeholder="Enter reminder message..."
              />
              {errors?.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors?.message?.message}
                </p>
              )}
            </div>

            {/* Client Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client
              </label>
              <select
                {...register("clientId")}
                onChange={(e) => {
                  setValue("projectId", "");
                  register("clientId").onChange(e);
                }}
                className={`block w-full pl-3 pr-3 py-2 border ${
                  errors?.clientId
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 dark:border-slate-600 focus:ring-primary focus:border-primary"
                } rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none sm:text-sm`}
              >
                <option value="">Select a client (optional)</option>
                {clients?.data?.map((client: IClient) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
              {errors?.clientId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors?.clientId?.message}
                </p>
              )}
            </div>

            {/* Project Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Project (select client to whom a project assigned)
              </label>
              <select
                {...register("projectId")}
                disabled={!selectedClientId}
                className={`block w-full pl-3 pr-3 py-2 border ${
                  errors?.projectId
                    ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                    : "border-gray-300 dark:border-slate-600 focus:ring-primary focus:border-primary"
                } rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none sm:text-sm`}
              >
                <option value="">Select a project (optional)</option>
                {projects?.data
                  ?.filter(
                    (project: IProject) =>
                      project?.clientId === selectedClientId
                  )
                  .map((project: IProject) => (
                    <option key={project?.id} value={project?.id}>
                      {project?.title}
                    </option>
                  ))}
              </select>
              {errors?.projectId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors?.projectId?.message}
                </p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-slate-600">
              <button
                type="button"
                onClick={() => navigate(`/reminders/${reminderId}`)}
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
                {isSubmitting ? "Updating..." : "Update Reminder"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateReminderPage;
