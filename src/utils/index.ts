import React from 'react';
import {IRequestHandler, RequestHandlerResponse} from './interface';
import useToast from '../hooks/Toast';
const {showToast} = useToast();
export const apiRequestHandler = (
  props: IRequestHandler,
  isShow: Boolean = true,
): RequestHandlerResponse => {
  try {
    const {data, error} = props;



    if (!error) {
      return {data, isSuccess: true};
    }

    let errorMessage: string | undefined = '';
    let errorStatus: string | undefined = '';

    if (Array.isArray(error?.data?.message)) {
      errorMessage = error?.data?.message.join(', ');
    } else {
      errorMessage = error?.data?.message || '';
    }

    if (error?.status === 400) {
      errorStatus = 'Bad Request';
    } else if (error?.status === 401) {
      errorStatus = 'Unauthorized';
    } else if (error?.status === 403) {
      errorStatus = 'Forbidden';
    } else if (error?.status === 'FETCH_ERROR') {
      errorStatus = 'No internet connection';
    } else if (error?.status === 404) {
      errorStatus = 'Not Found';
    } else if (error?.status === 409) {
      errorStatus = 'Request Refused';
    } else if (error?.status === 500) {
      errorStatus = 'Internal Server Error';
    } else if (error?.status === 503) {
      errorStatus = 'Service Unavailable';
    }
    isShow && showToast('danger', errorStatus, errorMessage);

    throw new Error(errorMessage);
  } catch (error: any) {
    return {errorMessage: error.message, isSuccess: false};
  }
};
