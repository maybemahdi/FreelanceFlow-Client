/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjectByFreelancer: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/project/get-all-project-by-freelancer",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["project"],
    }),
  }),
});

export const { useGetAllProjectByFreelancerQuery } = projectApi;
