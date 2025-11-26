import { useEffect, useState } from 'react';
import { useLazyGetDayExerciseQuery } from '../../../../redux/Api/plan.api';

const useExerciseList = (trainerId: any) => {
  const [trigger, { isLoading, isError, isFetching }] =
    useLazyGetDayExerciseQuery();
  const [data, setData] = useState<any>();

  const [percent, setPercent] = useState<any>(0);
  const calculateProgress = () => {
    const res = data.exercises?.filter((i: any) => i.isCompleted == true);
    let per = (res.length * 100) / data.exercises?.length;
    setPercent(Math.round(per));
  };
  useEffect(() => {
    if (data?.exercises?.length) {
      calculateProgress();
    }
  }, [data?.exercises]);
  const handleGetExercise = async (date: any) => {
    try {
      const res = await trigger({ trainerId: trainerId, date: date });

      if (res?.data) {
        setData(res?.data);
      }

      if (res?.error) {
        setData({ exercises: [] });
      }
    } catch (error) {
      console.log('❌ Error:', error);
    }
  };

  let date = encodeURIComponent(new Date().toString());

  useEffect(() => {
    handleGetExercise(date);
  }, []);

  return {
    data,
    setData,
    percent,
    handleGetExercise,
    isError,
    isLoading,
    isFetching,
  };
};

export default useExerciseList;
