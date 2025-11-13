import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from '../../utils/constant';
import {baseQuery} from './baseQuery';

export const userAuth = createApi({
  reducerPath: 'userAuth',
  baseQuery: baseQuery,
  endpoints: builder => ({
    register: builder.mutation({
      query: body => {
   
        return {
          url: 'user/userSignup',
          method: 'POST',
          body,
        };
      },
    }),
    login: builder.mutation({
      query: body => ({
        url: 'user/userLogin',
        method: 'POST',
        body,
      }),
    }),

    forgetPassword: builder.mutation({
      query: body => {
        return {
          url: 'user/forgetPassword',
          method: 'POST',
          body,
        };
      },
    }),
    verifyCode: builder.mutation({
      query: body => {
        return {
          url: 'user/verifyCode',
          method: 'PATCH',
          body,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: body => {
        return {
          url: `user/resetPassword/${body.id}`,
          method: 'PATCH',
          body,
        };
      },
    }),
    currentPass: builder.mutation({
      query: body => {
        return {
          url: `user/currentPass`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useForgetPasswordMutation,
  useVerifyCodeMutation,
  useResetPasswordMutation,
  useCurrentPassMutation,
} = userAuth;
