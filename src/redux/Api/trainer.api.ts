import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const trainers = createApi({
  reducerPath: 'trainers',
  baseQuery: baseQuery,

  endpoints: builder => ({
    getallTrainers: builder.query({
      query: ({ page, search, type }) => {
        return {
          url: `trainer/getalltrainer?name=${search}&page=${page}&limit=10&type=${type}`,
          method: 'GET',
        };
      },
    }),

    getProfile: builder.query({
      query: () => {
        return {
          url: `trainer/getcurrentuser`,
          method: 'GET',
        };
      },
    }),
    editProfile: builder.mutation({
      query: body => {
        return {
          url: `trainer/editProfile`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {
  useLazyGetallTrainersQuery,
  useGetProfileQuery,
  useEditProfileMutation,
} = trainers;

// serializeQueryArgs: ({endpointName}) => endpointName,

// merge: (currentCache = {data: []}, newItems, {arg}) => {

//   if (arg.page === 1) {
//     return newItems;
//   }

//   return {
//     ...newItems,
//     data: [...currentCache?.data, ...newItems.data],
//   };
// },

// forceRefetch({currentArg, previousArg}) {
//   return currentArg.page !== previousArg.page;
// },
