import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {baseQuery} from './baseQuery';

export const client = createApi({
  reducerPath: 'clent',
  baseQuery: baseQuery,

  endpoints: builder => ({
    sendReq: builder.mutation({
      query: body => {

        return {
          url: 'client/sendRequest',
          method: 'POST',
          body,
        };
      },
    }),
    acceptReq: builder.mutation({
      query: body => {

        return {
          url: 'client/acceptRequest',
          method: 'POST',
          body,
        };
      },
    }),
    deleteReq: builder.mutation({
      query: body => {
      
        return {
          url: 'client/deleteRequest',
          method: 'POST',
          body,
        };
      },
    }),
    getAllClients: builder.query({
      query: ({page}) => {
     
        return {
          url: `client/getallClients?page=${page}&limit=10`,
          method: 'GET',
        };
      },
    }),
    getAllReq: builder.query({
      query: ({page}) => {
        return {
          url: `client/getallRequests?page=${page}&limit=10`,
          method: 'GET',
        };
      },
    }),
    getHomeClient: builder.query({
      query: ({page}) => {
        return {
          url: `client/homeClients`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useSendReqMutation,
  useAcceptReqMutation,
  useDeleteReqMutation,
  useLazyGetAllClientsQuery,
  useLazyGetAllReqQuery,
  useGetHomeClientQuery,
} = client;
