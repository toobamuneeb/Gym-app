import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const trackers = createApi({
  reducerPath: 'trackers',
  baseQuery: baseQuery,

  endpoints: builder => ({
    createTracker: builder.mutation({
      query: body => {
        return {
          url: `tracker/create`,
          method: 'POST',
          body: body,
        };
      },
    }),
    submitTracker: builder.mutation({
      query: body => {
        console.log({ body });
        return {
          url: `tracker/submit-tracker`,
          method: 'POST',
          body: body,
        };
      },
    }),
    approvedTracker: builder.mutation({
      query: body => {
        console.log({ body });
        return {
          url: `tracker/approve-tracker`,
          method: 'POST',
          body: body,
        };
      },
    }),

    getTracker: builder.query({
      query: params => ({
        url: `tracker/get-trackers`,
        method: 'GET',
        params: params,
      }),
    }),

    getTrackersTrainers: builder.query({
      query: ({ page, search, type }) => {
        return {
          url: `trainer/getalltrainer?page=1&limit=100&type=assigned`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useCreateTrackerMutation,
  useLazyGetTrackerQuery,
  useLazyGetTrackersTrainersQuery,
  useSubmitTrackerMutation,
  useApprovedTrackerMutation,
} = trackers;
