import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';
import { allPlansTransform, TodaysPlanTransform } from '../../utils/transform';

export const plan = createApi({
  reducerPath: 'plans',
  baseQuery: baseQuery,

  endpoints: builder => ({
    getTodaysPlan: builder.query({
      query: () => 'plan/get-plan',
      transformResponse: TodaysPlanTransform,
    }),

    getLastDatePlan: builder.query({
      query: () => {
        return {
          url: `plan/check-plan-last-date`,
          method: 'GET',
        };
      },
    }),

    getAllPlans: builder.query({
      query: () => {
        let date = new Date().toString();
        let planDate = encodeURIComponent(date);
        return {
          url: `plan/get-plan?planDate=${planDate}`,
          method: 'GET',
        };
      },
      transformResponse: allPlansTransform,
    }),

    getDayExercise: builder.query({
      query: params => {
        return {
          url: `plan/get-day-exercise`,
          method: 'GET',
          params: params,
        };
      },
    }),

    addPlan: builder.mutation({
      query: body => ({
        url: 'plan/add-plan',
        method: 'POST',
        body,
      }),
    }),
    updateCompleted: builder.mutation({
      query: body => ({
        url: 'plan/update-completed',
        method: 'PATCH',
        body,
      }),
    }),

    editPlan: builder.mutation({
      query: body => ({
        url: 'plan/edit-plan',
        method: 'POST',
        body,
      }),
    }),

    updateMealItem: builder.mutation({
      query: body => ({
        url: 'plan/update-meal-item',
        method: 'PATCH',
        body,
      }),
    }),

    updateExerciseItem: builder.mutation({
      query: body => ({
        url: 'plan/update-exercise-item',
        method: 'PATCH',
        body,
      }),
    }),
    getbyID: builder.query({
      query: ({ traineeID }) => {
        return {
          url: `plan/get-by-id?traineeID=${traineeID}`,
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
  useGetLastDatePlanQuery,
  useUpdateMealItemMutation,
  useUpdateExerciseItemMutation,
  useLazyGetDayExerciseQuery,
  useUpdateCompletedMutation,
} = plan;
