import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useEffect, useState } from 'react';
import {
  useApprovedTrackerMutation,
  useLazyGetTrackerQuery,
} from '../../../../redux/Api/trackers.api';
import { apiRequestHandler } from '../../../../utils';

const useActiveTrackers = (trainee_ids: string) => {
  let trainee_id = '68f64e345c0eee6acabeda38';
  const [getTrackers, { reset, isLoading, isFetching }] =
    useLazyGetTrackerQuery();
  const [trigger, { isLoading: loading }] = useApprovedTrackerMutation();

  const userData = useSelector((state: RootState) => state?.generalSlice?.data);
  const [data, setData] = useState<any>();

  useEffect(() => {
    handleGetTrackers();
  }, []);

  const handleGetTrackers = async (tracker_date?: string) => {
    try {
      const response = await getTrackers({
        trainer_id: userData?._id,
        trainee_id: trainee_id,
        is_submitted: true,
        is_approved: false,
        tracker_date: tracker_date || undefined,
      }).unwrap();
      console.log(response?.data);

      const sections = response?.data?.map?.((item: any) => ({
        title: new Date(item?.tracker_date),
        data: item?.questions,
      }));

      setData(response.data);
    } catch (error) {
      console.log('❌ Error:', error);
    }
  };

  const handleApprovedTracker = async (tracker_id: any) => {
    const res = await trigger({ tracker_id: tracker_id });
    const response = apiRequestHandler(res);
    if (response?.isSuccess) {
      handleGetTrackers();
      return true;
    } else {
      handleGetTrackers();
      return false;
    }
  };
  const onChange = (date: any) => {
    setData([]);
    handleGetTrackers(date?.toString());
  };
  return {
    data,
    handleApprovedTracker,
    loading,
    handleGetTrackers,
    setData,
    onChange,
    isFetching,
  };
};

export default useActiveTrackers;
