import {useForm} from 'react-hook-form';
import {
  useResetPasswordMutation,
  useVerifyCodeMutation,
} from '../../../redux/Api/auth.api';
import React from 'react';
import {apiRequestHandler} from '../../../utils';
import useToast from '../../../hooks/Toast';
import {ScreenNames} from '../../../navigations/ScreenName';
import {useDispatch} from 'react-redux';
import {setLogin} from '../../../redux/reducers/generalSlice';

const useNewPass = () => {
  const {control, trigger, clearErrors, handleSubmit, getValues} = useForm();
  const [resetPassword, {isLoading}] = useResetPasswordMutation();
  const {showToast} = useToast();
  const handleChange = React.useCallback(async (data: any, navigation: any) => {

    try {
      clearErrors();
      const res = await resetPassword(data);
      const nextRes = apiRequestHandler(res);
      if (nextRes.isSuccess) {
        showToast('success', 'Success', nextRes.data.message);
        navigation.reset({
          index: 0,
          routes: [{name: ScreenNames.BOTTOM_STACK}],
        });
      }
    } catch (error: any) {
      showToast('danger', 'Error', error.message || 'Something went wrong');
    }
  }, []);

  return {control, handleSubmit, handleChange, trigger, isLoading, getValues};
};
export default useNewPass;
