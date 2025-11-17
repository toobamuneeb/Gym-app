import React, {useState} from 'react';
import {
  useAcceptReqMutation,
  useDeleteReqMutation,
} from '../../../redux/Api/client.api';
import {apiRequestHandler} from '../../../utils';
import {ScreenNames} from '../../../navigations/ScreenName';
import useToast from '../../../hooks/Toast';

const useReq = () => {
  const [Accept, setAccept] = useState(false);
  const [acceptReq, {data, isLoading}] = useAcceptReqMutation();
  const {showToast} = useToast();
  const [deleteReq, {data: isData, isLoading: Delloading}] =
    useDeleteReqMutation();

  const calculateBMI = (
    weight: number,
    weightUnit: string,
    height: number,
    heightUnit: string,
  ) => {
    let weightInKg = weight;
    if (weightUnit === 'lbs') {
      weightInKg = weight / 2.205;
    }

    let heightInMeters;

    if (heightUnit === 'cm') {
      heightInMeters = height / 100;
    } else if (heightUnit === 'feet') {
      heightInMeters = height * 0.3048;
    } else {
      heightInMeters = height;
    }

    if (weightInKg > 0 && heightInMeters > 0) {
      const bmi = weightInKg / (heightInMeters * heightInMeters);
      return parseFloat(bmi.toFixed(2));
    } else {
      return 0;
    }
  };

  const handleAcceptReq = React.useCallback(async (data: any) => {
    try {
  

      const res = await acceptReq(data);
      const resData = apiRequestHandler(res);

      if (resData.isSuccess) {
     
        setAccept(true);
        showToast('success', 'Success', resData.data.message);
      }
    } catch (error) {
     
    }
  }, []);
  const handleDeleteReq = React.useCallback(
    async (data: any, navigation: any) => {
   
      try {
        const res = await deleteReq(data);
        const resData = apiRequestHandler(res);
       
        if (resData.isSuccess) {
          navigation.reset({
            index: 0,
            routes: [{name: ScreenNames.BOTTOM_STACK}],
          });
        }
      } catch (error) {

      }
    },
    [],
  );

  return {
    calculateBMI,
    handleAcceptReq,
    handleDeleteReq,
    Accept,
    isLoading,
    Delloading,
  };
};

export default useReq;
