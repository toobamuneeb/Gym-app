import {useForm} from 'react-hook-form';
import {useLoginMutation} from '../../../redux/Api/auth.api';
import {useDispatch} from 'react-redux';
import React from 'react';
import {apiRequestHandler} from '../../../utils';
import useToast from '../../../hooks/Toast';
import {Alert} from 'react-native';
import {ScreenNames} from '../../../navigations/ScreenName';
import {setLogin, setToken} from '../../../redux/reducers/generalSlice';

const useLogin = () => {
  const [login, {isLoading}] = useLoginMutation();
  const dispatch = useDispatch();
  const {showToast} = useToast();
  const {control, clearErrors, handleSubmit} = useForm({});

  const handleLogin = React.useCallback(async (data: any, navigation: any) => {
    try {
      clearErrors();

      const res = await login({...data, email: data.email.toLowerCase()});
    
      const nextRes = apiRequestHandler(res);

      if (nextRes.isSuccess) {
        showToast('success', 'Success', nextRes.data.message);

        let payload = {
          Token: nextRes.data.data.isToken,
          role: nextRes.data.data.role,
        };
        dispatch(setToken(payload));
        const payload1 = {...nextRes.data.data};
        delete payload1.isToken;
        dispatch(setLogin(payload1));
      } else if (
        nextRes?.errorMessage ===
        'Profile needs verification. An OTP has been sent to your email.'
      ) {
        navigation.navigate(ScreenNames.VERIFICATION_CODE, {
          email: data?.email.toLowerCase(),
          usedfor: 'EMAIL-VERIFICATION',
        });
      }
    } catch (error:any) {
      showToast('danger', 'Error', error.message || 'Something went wrong');
     
    }
  }, []);

  return {
    control,
    handleLogin,
    handleSubmit,
    isLoading,
  };
};
export default useLogin;
