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
      providesTags: ["project"],
    }),
  }),
});

export const { useGetAllReminderQuery } = reminderApi;
