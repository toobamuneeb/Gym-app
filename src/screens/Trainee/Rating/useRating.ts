import React from 'react';
import {useAddRatingMutation} from '../../../redux/Api/rating.api';
import {apiRequestHandler} from '../../../utils';
import {Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

const useRating = () => {
  const [addRating, {isLoading}] = useAddRatingMutation();
  const userData = useSelector((state: RootState) => state.generalSlice.data);

  const handleRating = React.useCallback(async (data: any) => {
    if (userData.role === 'coach') {
      return Alert.alert('User is not allowed');
    }

    if (data.rating === 0) {
      Alert.alert('Rating should be greater than 0');
    }
    if (isLoading) {
      return Alert.alert('Wait for the rating for complete');
    }

    try {
      const res = await addRating(data);
      const resData = apiRequestHandler(res);

      if (resData.isSuccess) {
     
      }
    } catch (error) {
   
    }
  }, []);

  return {
    handleRating,
    isLoading,
  };
};
export default useRating;
