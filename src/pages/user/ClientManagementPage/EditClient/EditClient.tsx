/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiFileText,
  FiSave,
} from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { handleAsyncWithToast } from "../../../../utils/handleAsyncWithToast";
import {
  useGetSingleClientQuery,
  useUpdateClientMutation,
} from "../../../../redux/features/client/client.api";
import Loading from "../../../../components/ui/Loading/Loading";
import { useEffect } from "react";

// Zod schema with all fields optional for updates
const clientUpdateSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Name must be at least 1 character" })
      .optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    phoneNumber: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" })
      .optional(),
    company: z.string().optional(),
    notes: z.string().optional(),
  })
  .refine(
    (data) => {
      // At least one field should be provided for update
      return Object.values(data).some((val) => val !== undefined);
    },
    { message: "At least one field must be updated" }
  );

type ClientUpdateData = z.infer<typeof clientUpdateSchema>;

const UpdateClientPage = () => {
  const { clientId } = useParams();
  const navigate = useNavigate();

  // Fetch existing client data
  const { data: clientDataResponse, isLoading } = useGetSingleClientQuery(
    clientId,
    { skip: !clientId }
  );
  const [updateClient] = useUpdateClientMutation();
  const clientData = clientDataResponse?.data;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ClientUpdateData>({
    resolver: zodResolver(clientUpdateSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      company: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (clientData) {
      reset({
        name: clientData?.name || "",
        email: clientData?.email || "",
        phoneNumber: clientData?.phoneNumber || "",
        company: clientData?.company || "",
        notes: clientData?.notes || "",
      });
    }
  }, [clientData, reset]);

  const onSubmit = async (data: ClientUpdateData) => {
    try {
      const updateData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );
      const res = await handleAsyncWithToast(async () => {
        return updateClient({ payload: updateData, id: clientId });
      }, "Updating client...");
      if (res?.data?.success) {
        navigate("/clients");
      }
    } catch (error) {
      console.error("Error updating client:", error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-slate-700 shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-600">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <FiUser className="mr-2" />
              Update Client
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Update the fields you want to change
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("name")}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors?.name
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-slate-600 focus:ring-primary focus:border-primary"
                  } rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none sm:text-sm`}
                  placeholder={clientData?.data?.name || "John Doe"}
                />
              </div>
              {errors?.name && (
                <p className="mt-1 text-sm text-red-600">
                  {errors?.name?.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("email")}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors?.email
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-slate-600 focus:ring-primary focus:border-primary"
                  } rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none sm:text-sm`}
                  placeholder={clientData?.data?.email || "john@example.com"}
                />
              </div>
              {errors?.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors?.email?.message}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("phoneNumber")}
                  className={`block w-full pl-10 pr-3 py-2 border ${
                    errors?.phoneNumber
                      ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 dark:border-slate-600 focus:ring-primary focus:border-primary"
                  } rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none sm:text-sm`}
                  placeholder={
                    clientData?.data?.phoneNumber || "+1 (555) 123-4567"
                  }
                />
              </div>
              {errors?.phoneNumber && (
                <p className="mt-1 text-sm text-red-600">
                  {errors?.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Company Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiBriefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("company")}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-slate-600 focus:ring-primary focus:border-primary rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none sm:text-sm"
                  placeholder={clientData?.data?.company || "Acme Inc."}
                />
              </div>
            </div>

            {/* Notes Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Notes
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                  <FiFileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  {...register("notes")}
                  rows={3}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-slate-600 focus:ring-primary focus:border-primary rounded-md bg-white dark:bg-slate-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none sm:text-sm"
                  placeholder={
                    clientData?.data?.notes || "Any additional information..."
                  }
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-slate-600">
              <button
                type="button"
                onClick={() => navigate(`/clients/${clientId}`)}
                className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-75"
              >
                <FiSave className="mr-2 h-4 w-4" />
                {isSubmitting ? "Updating..." : "Update Client"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateClientPage;
