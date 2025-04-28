/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const interactionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllInteraction: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/interaction",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["interaction"],
    }),
    getSingleInteraction: builder.query({
      query: (id) => {
        return {
          url: `/interaction/get-single-interaction/${id}`,
          method: "GET",
        };
      },
      providesTags: ["interaction"],
    }),
    createInteraction: builder.mutation({
      query: (payload) => {
        return {
          url: "/interaction",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["interaction"],
    }),
    updateInteraction: builder.mutation({
      query: ({ payload, id }) => {
        return {
          url: `/interaction/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["interaction"],
    }),
    deleteInteraction: builder.mutation({
      query: (id) => {
        return {
          url: `/interaction/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["interaction"],
    }),
  }),
});

export const {
  useGetAllInteractionQuery,
  useGetSingleInteractionQuery,
  useCreateInteractionMutation,
  useUpdateInteractionMutation,
  useDeleteInteractionMutation,
} = interactionApi;
