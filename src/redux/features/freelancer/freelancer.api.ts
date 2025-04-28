import { baseApi } from "../../api/baseApi";

const freelancerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTotalClientsByFreelancer: builder.query({
      query: () => ({
        url: "/freelancer/get-total-clients-by-freelancer",
        method: "GET",
      }),
      providesTags: ["freelancer"],
    }),
    getTotalProjectsByFreelancer: builder.query({
      query: () => ({
        url: "/freelancer/get-total-projects-by-freelancer",
        method: "GET",
      }),
      providesTags: ["freelancer"],
    }),
    getDueSoonRemindersByFreelancer: builder.query({
      query: () => ({
        url: "/freelancer/get-due-soon-reminders-by-freelancer",
        method: "GET",
      }),
      providesTags: ["freelancer"],
    }),
  }),
});

export const {
  useGetTotalClientsByFreelancerQuery,
  useGetTotalProjectsByFreelancerQuery,
  useGetDueSoonRemindersByFreelancerQuery,
} = freelancerApi;
