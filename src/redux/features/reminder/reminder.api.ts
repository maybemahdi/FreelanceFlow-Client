/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const reminderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllReminder: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/reminder",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["reminder"],
    }),
    getSingleReminder: builder.query({
      query: (id) => {
        return {
          url: `/reminder/get-single-reminder/${id}`,
          method: "GET",
        };
      },
      providesTags: ["reminder"],
    }),
    createReminder: builder.mutation({
      query: (payload) => {
        return {
          url: "/reminder",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["reminder"],
    }),
    updateReminder: builder.mutation({
      query: ({ payload, id }) => {
        return {
          url: `/reminder/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["reminder"],
    }),
    deleteReminder: builder.mutation({
      query: (id) => {
        return {
          url: `/reminder/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["reminder"],
    }),
  }),
});

export const {
  useGetAllReminderQuery,
  useGetSingleReminderQuery,
  useCreateReminderMutation,
  useUpdateReminderMutation,
  useDeleteReminderMutation,
} = reminderApi;
