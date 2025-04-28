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
      providesTags: ["project"],
    }),
  }),
});

export const { useGetAllInteractionQuery } = interactionApi;
