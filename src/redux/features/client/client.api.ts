/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "../../api/baseApi";

const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyClients: builder.query({
      query: (data) => {
        const params = new URLSearchParams();
        if (data) {
          data?.forEach((item: any) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/client",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["client"],
    }),
    getSingleClient: builder.query({
      query: (id) => {
        return {
          url: `/client/${id}`,
          method: "GET",
        };
      },
      providesTags: ["client"],
    }),
    createClient: builder.mutation({
      query: (payload) => {
        return {
          url: "/client",
          method: "POST",
          body: payload,
        };
      },
      invalidatesTags: ["client"],
    }),
    updateClient: builder.mutation({
      query: ({ payload, id }) => {
        return {
          url: `/client/${id}`,
          method: "PATCH",
          body: payload,
        };
      },
      invalidatesTags: ["client"],
    }),
    deleteClient: builder.mutation({
      query: (id) => {
        return {
          url: `/client/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["client"],
    }),
  }),
});

export const {
  useGetMyClientsQuery,
  useGetSingleClientQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi;
