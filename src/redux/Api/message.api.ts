import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {API_URL} from '../../utils/constant';
import {baseQuery} from './baseQuery';
import {TAG_TYPES} from './tags';
import {messageTransform} from '../../utils/transform';

export const message = createApi({
  reducerPath: 'message',
  baseQuery: baseQuery,
  tagTypes: [TAG_TYPES.MESSAGES, TAG_TYPES.CHAT],
  endpoints: builder => ({
    sendMessage: builder.mutation({
      query: body => {
     
        return {
          url: 'message/createMessage',
          method: 'POST',
          body,
        };
      },

      invalidatesTags: [TAG_TYPES.MESSAGES, TAG_TYPES.CHAT],
    }),

    getMessages: builder.query({
      query: params => {

        return {
          url: `message/getMessage?chatID=${params.chatID}&limit=${20}&page=${
            params.page
          }`,
          method: 'GET',
        };
      },
    }),
  }),
});

export const {
  useLazyGetMessagesQuery,
  useSendMessageMutation,
  useGetMessagesQuery,
} = message;
