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
      providesTags: ["project"],
    }),
  }),
});

export const { useGetMyClientsQuery } = clientApi;
