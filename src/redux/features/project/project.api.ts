import { baseApi } from "../../api/baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjectByFreelancer: builder.query({
      query: () => ({
        url: "/project/get-all-project-by-freelancer",
        method: "GET",
      }),
      providesTags: ["project"],
    }),
  }),
});

export const { useGetAllProjectByFreelancerQuery } = projectApi;
