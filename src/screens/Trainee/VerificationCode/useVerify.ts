import {useForm} from 'react-hook-form';
import {useVerifyCodeMutation} from '../../../redux/Api/auth.api';
import React from 'react';
import {apiRequestHandler} from '../../../utils';
import useToast from '../../../hooks/Toast';
import {ScreenNames} from '../../../navigations/ScreenName';
import {useDispatch} from 'react-redux';
import {setLogin, setToken} from '../../../redux/reducers/generalSlice';

const useVerify = () => {
  const {control, trigger, clearErrors, handleSubmit} = useForm();
  const [useVerify, {isLoading}] = useVerifyCodeMutation();
  const {showToast} = useToast();
  const dispatch = useDispatch();
  const handleVerify = React.useCallback(async (data: any, navigation: any) => {

    try {
      clearErrors();
      const res = await useVerify(data);
      const nextRes = apiRequestHandler(res);

      if (nextRes.isSuccess && data?.usedfor === 'EMAIL-VERIFICATION') {
        showToast('success', 'Success', nextRes.data.message);
        let payload = {
          Token: nextRes.data.data.isToken,
          role: nextRes.data.data.role,
        };
        dispatch(setToken(payload));
        const payload1 = {...nextRes.data.data};
        delete payload1.isToken;
        dispatch(setLogin(payload1));
      }
      if (nextRes.isSuccess) {
        showToast('success', 'Success', nextRes.data.message);
        navigation.navigate(ScreenNames.CREATE_NEW_PASS, {
          id: nextRes.data.data._id,
        });
      }
    } catch (error) {
  
    }
  }, []);

  return {control, handleSubmit, handleVerify, trigger, isLoading};
};
export default useVerify;
