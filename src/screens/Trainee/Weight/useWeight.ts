import {useForm} from 'react-hook-form';
import {
  useForgetPasswordMutation,
  useRegisterMutation,
} from '../../../redux/Api/auth.api';
import React from 'react';
import {apiRequestHandler} from '../../../utils';
import useToast from '../../../hooks/Toast';
import {ScreenNames} from '../../../navigations/ScreenName';

const useWeight = (data: any) => {
  const {control, trigger, clearErrors, handleSubmit, formState, watch} =
    useForm({
      defaultValues: {
        weight: {
          value: '',
          unit: 'lbs',
        },
        height: {
          value: '',
          unit: 'ft',
        },
        goalweight: {
          value: '',
          unit: 'lbs',
        },
        ...data,
      },
    });
  const [register, {isLoading}] = useRegisterMutation();
  const {showToast} = useToast();
  const selectedWeight = watch('weight.unit');
  const selectedHeight = watch('height.unit');
  const selectedGweight = watch('goalweight.unit');

  const handleWeight = React.useCallback(async (data: any, navigation: any) => {

    try {
      clearErrors();
      const res = await register(data);
      const nextRes = apiRequestHandler(res);

   

      if (nextRes.isSuccess) {
        showToast('success', 'Success', nextRes.data.message);
        navigation.reset({
          index: 0,
          routes: [{name: ScreenNames.LOGIN}],
        });
      }
    } catch (error) {

    }
  }, []);

  return {
    control,
    handleSubmit,
    handleWeight,
    trigger,
    isLoading,
    clearErrors,
    formState,
    watch,
    selectedWeight,
    selectedHeight,
    selectedGweight,
  };
};
export default useWeight;
