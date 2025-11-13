import {Alert} from 'react-native';
import {useSendReqMutation} from '../../../redux/Api/client.api';
import {apiRequestHandler} from '../../../utils';
import React from 'react';
import useToast from '../../../hooks/Toast';

const useAbout = () => {
  const [sendReq, {isLoading}] = useSendReqMutation();
  const {showToast} = useToast();
  const handleSendreq = React.useCallback(async (data: any) => {
    try {
      const res = await sendReq(data);
      const nextRes = apiRequestHandler(res);

      if (nextRes.isSuccess) {
    
        showToast('success', 'Success', nextRes.data.message);
      }
    } catch (error) {
  
    }
  }, []);

  const onSubmit = (data: any) => {
    Alert.alert('Alert', 'Do you want to send request', [
      {
        text: 'Yes',
        onPress: () => {
          handleSendreq(data);
        },
      },

      {
        text: 'No',
        onPress() {
          return;
        },
      },
    ]);
  };
  return {
    onSubmit,
    isLoading,
  };
};
export default useAbout;
