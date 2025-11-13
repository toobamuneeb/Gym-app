import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from '../../utils/constant';
import {baseQuery} from './baseQuery';
import {message, useGetMessagesQuery} from './message.api';
import {TAG_TYPES} from './tags';

export const chat = createApi({
  reducerPath: 'chat',
  baseQuery: baseQuery,
  tagTypes: [TAG_TYPES.CHAT],
  endpoints: builder => ({
    getChats: builder.query({
      query: () => ({
        url: 'chat/getChat',
        method: 'GET',
      }),
      providesTags: [TAG_TYPES.CHAT],
    }),
    createChat: builder.mutation({
      query: body => ({
        url: 'chat/createChat',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {useGetChatsQuery, useCreateChatMutation} = chat;
