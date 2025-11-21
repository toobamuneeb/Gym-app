import { useSelector } from 'react-redux';
import React from 'react';
import { apiRequestHandler } from '../../../utils';
import useToast from '../../../hooks/Toast';
import { ScreenNames } from '../../../navigations/ScreenName';
import {
  useAddPlanMutation,
  useEditPlanMutation,
} from '../../../redux/Api/plan.api';
import { RootState } from '../../../redux/store';
import { useCreateChatMutation } from '../../../redux/Api/chat.api';
import { Alert } from 'react-native';

const usePLan = () => {
  const [addPlan, { isLoading }] = useAddPlanMutation();
  const [edittPlan, { isLoading: editPlanLoading }] = useEditPlanMutation();
  const [createCHAT] = useCreateChatMutation();
  const { showToast } = useToast();



  const handlePlan = React.useCallback(
    async (navigation: any, route: any, planData: any) => {
      if (planData.length !== 7) {
        return Alert.alert('add plans for Whole Week', '');
      }



      const { data } = route.params;

      let payload = {
        planType: data?.selectedOption,
        planCategory: 'combined',
        startDate: data?.startingDate,
        endDate: data?.endingDate,
        trainerID: data?.trainerID,
        userID: data?.userID?._id,
        days: planData,
      }
console.log({payload})

      try {
        const res = await addPlan(payload);
        const nextRes = apiRequestHandler(res);

        if (nextRes.isSuccess) {
          showToast('success', 'Success', nextRes.data.message);

          navigation.navigate(ScreenNames.PLAN_SUCCESS, {
            data: { ...data, status: 'accepted' },
          });
          createCHAT(data);
        }
      } catch (error) {

      }
    },
    [],
  );

  const editPlan = React.useCallback(
    async (navigation: any, route: any, planData: any) => {
      if (planData.length !== 7) {
        return Alert.alert('add plans for Whole Week', '');
      }


      const { data } = route.params;

      let payload = {
        planID: data.planID,
        days: planData,
      };


      try {
        const res = await edittPlan(payload);
        const nextRes = apiRequestHandler(res);

        if (nextRes.isSuccess) {
          showToast('success', 'Success', nextRes.data.message);

          navigation.navigate(ScreenNames.PLAN_SUCCESS, {
            data: { ...data, status: 'accepted' },
          });
        }
      } catch (error) {

      }
    },
    [],
  );
  return {
    handlePlan,
    isLoading,
    editPlan,
    editPlanLoading,
  };
};
export default usePLan;
