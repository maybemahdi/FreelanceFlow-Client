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
    getSingleProject: builder.query({
      query: (id) => {
        return {
          url: `/project/get-single-project-by-freelancer/${id}`,
          method: "GET",
        };
      },
      providesTags: ["project"],
    }),
    createProject: builder.mutation({
      query: (payload) => {
        return {
          url: "/project",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["project"],
    }),
    updateProject: builder.mutation({
      query: ({ payload, id }) => {
        return {
          url: `/project/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["project"],
    }),
    updateProjectStatus: builder.mutation({
      query: ({ payload, id }) => {
        return {
          url: `/project/update-project-status/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["project"],
    }),
    deleteProject: builder.mutation({
      query: (id) => {
        return {
          url: `/project/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["project"],
    }),
  }),
});

export const {
  useGetAllProjectByFreelancerQuery,
  useGetSingleProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useUpdateProjectStatusMutation,
  useDeleteProjectMutation,
} = projectApi;
