import {fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Mutex} from 'async-mutex';
import {API_URL} from '../../../utils/constant';
import {RootState} from '../../store';

const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, {getState}) => {
    const state = getState() as RootState;
    const token = state?.generalSlice?.loginData?.Token;

    headers.set('Accept', 'application/json');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});
