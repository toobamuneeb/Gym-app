import { Alert, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useCreateTrackerMutation } from '../../../../redux/Api/trackers.api';
import { apiRequestHandler } from '../../../../utils';
import useToast from '../../../../hooks/Toast';

const useAddNewTrackers = (reset: any) => {
  const [createTracker, { isLoading }] = useCreateTrackerMutation();
  const { showToast } = useToast();
  const onSubmit = async (formData: any) => {
    console.log({ formData });

    try {
      if (!formData?.tracker_date) {
        return Alert.alert('Please select date');
      }
      const response = await createTracker(formData);
      const res = apiRequestHandler(response);
      if (res.isSuccess) {
        showToast('success', 'Success', res.data.message);
      }
      reset();
    } catch (error) {
      console.log('❌ Error:', error);
    }
  };
  return { onSubmit, isLoading };
};

export default useAddNewTrackers;
