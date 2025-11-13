import {useForm} from 'react-hook-form';
import {useForgetPasswordMutation} from '../../../redux/Api/auth.api';
import React from 'react';
import {apiRequestHandler} from '../../../utils';
import useToast from '../../../hooks/Toast';
import {ScreenNames} from '../../../navigations/ScreenName';

const useForgetPassword = () => {
  const {control, trigger, clearErrors, handleSubmit} = useForm();
  const [forgetPassword, {isLoading}] = useForgetPasswordMutation();
  const {showToast} = useToast();
  const handleForget = React.useCallback(async (data: any, navigation: any) => {
    try {
      clearErrors();
      const res = await forgetPassword({
        ...data,
        email: data.email.toLowerCase(),
      });
      const nextRes = apiRequestHandler(res);
      if (nextRes.isSuccess) {
        showToast('success', 'Success', nextRes.data.message);
        navigation.navigate(ScreenNames.VERIFICATION_CODE, {
          email: data?.email.toLowerCase(),
          usedfor: 'FORGOT-USER-PASSWORD',
        });
      }
    } catch (error:any) {
      showToast('danger', 'Error', error.message || 'Something went wrong');

    }
  }, []);

  return {control, handleSubmit, handleForget, trigger, isLoading};
};
export default useForgetPassword;
