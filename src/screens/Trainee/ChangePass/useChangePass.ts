import React from 'react';
import {useForm} from 'react-hook-form';
import useToast from '../../../hooks/Toast';
import {ScreenNames} from '../../../navigations/ScreenName';
import {
  useCurrentPassMutation,
  useForgetPasswordMutation,
} from '../../../redux/Api/auth.api';
import {apiRequestHandler} from '../../../utils';

const useCurrentPassword = () => {
  const {control, trigger, clearErrors, handleSubmit} = useForm();
  const [currentPass, {isLoading}] = useCurrentPassMutation();
  const {showToast} = useToast();
  const handleCheck = React.useCallback(async (data: any, navigation: any) => {
    try {
      clearErrors();
      const res = await currentPass(data);
      const nextRes = apiRequestHandler(res);
      if (nextRes.isSuccess) {
        navigation.navigate(ScreenNames.NEW_PASSWORD);
      }
    } catch (error: any) {

      showToast('danger', 'Error', error.message);
    }
  }, []);

  return {control, handleSubmit, handleCheck, trigger, isLoading};
};
export default useCurrentPassword;
