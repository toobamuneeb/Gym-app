import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './baseQuery';
import {allPlansTransform, TodaysPlanTransform} from '../../utils/transform';

export const plan = createApi({
  reducerPath: 'plans',
  baseQuery: baseQuery,

  endpoints: builder => ({
    getTodaysPlan: builder.query({
      query: () => 'plan/getPlan',
      transformResponse: TodaysPlanTransform,
    }),

    getAllPlans: builder.query({
      query: () => 'plan/getPlan',
      transformResponse: allPlansTransform,
    }),
    addPlan: builder.mutation({
      query: body => ({
        url: 'plan/addPlan',
        method: 'POST',
        body,
      }),
    }),
    editPlan: builder.mutation({
      query: body => ({
        url: 'plan/editPlan',
        method: 'POST',
        body,
      }),
    }),
    getbyID: builder.query({
      query: ({traineeID}) => {

        return {
          url: `plan/getbyid?traineeID=${traineeID}`,
          method: 'GET',
          transformResponse: allPlansTransform,
        };
      },
    }),
  }),
});

export const {
  useGetTodaysPlanQuery,
  useGetAllPlansQuery,
  useAddPlanMutation,
  useGetbyIDQuery,
  useEditPlanMutation,
} = plan;
