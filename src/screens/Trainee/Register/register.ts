import {useForm} from 'react-hook-form';
import {RegisterProps} from './interface';
import {useRef} from 'react';
import {ScreenNames} from '../../../navigations/ScreenName';

const registerUserHook = () => {
  const refRBSheet = useRef<any>(null);
  const {control, getValues, handleSubmit, setValue, trigger} =
    useForm<RegisterProps>({
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        confirmpassword: '',
        password: '',
        role: '',
        checkbox: 'nag',
      },
    });

  const onContinue = handleSubmit(data => {
    refRBSheet.current?.open();
  });

  const onSignup = (navigation: any) => {
    const submit = handleSubmit(data => {
      const {confirmpassword, checkbox, ...restData} = data;
      refRBSheet.current?.close();

      if (data?.role === 'user') {
        navigation.navigate(ScreenNames.DATE_OF_BIRTH, {
          data: {...restData, email: restData.email.toLowerCase()},
        });
      } else {
        navigation.navigate(ScreenNames.PERSONAL_DETAILS, {
          data: {...restData, email: restData.email.toLowerCase()},
        });
      }
    });
    return submit();
  };

  return {
    control,
    getValues,
    handleSubmit,
    setValue,
    trigger,
    onContinue,
    onSignup,
    refRBSheet,
  };
};
export default registerUserHook;
