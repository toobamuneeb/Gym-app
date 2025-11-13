import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './baseQuery';
import {allPlansTransform, TodaysPlanTransform} from '../../utils/transform';

export const rating = createApi({
  reducerPath: 'rating',
  baseQuery: baseQuery,

  endpoints: builder => ({
    addRating: builder.mutation({
      query: body => {

        return {
          url: 'rating/addRating',
          body,
          method: 'POST',
        };
      },
    }),
  }),
});

export const {useAddRatingMutation} = rating;
