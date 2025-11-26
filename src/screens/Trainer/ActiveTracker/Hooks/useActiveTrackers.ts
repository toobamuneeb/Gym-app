import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { useEffect, useState } from 'react';
import {
  useApprovedTrackerMutation,
  useLazyGetTrackerQuery,
} from '../../../../redux/Api/trackers.api';
import { apiRequestHandler } from '../../../../utils';

const useActiveTrackers = (trainee_id: string) => {
  const [getTrackers, { reset, isLoading, isFetching }] =
    useLazyGetTrackerQuery();
  const [trigger] = useApprovedTrackerMutation();
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state: RootState) => state?.generalSlice?.data);
  const [data, setData] = useState<any>();

  useEffect(() => {
    handleGetTrackers();
  }, []);

  const handleGetTrackers = async (tracker_date?: string) => {
    try {
      const response = await getTrackers({
        trainer_id: userData?._id,
        trainee_id,
        is_submitted: true,
        is_approved: false,
        tracker_date: tracker_date || undefined,
      }).unwrap();

      const sections = response?.data?.map?.((item: any) => ({
        title: new Date(item?.tracker_date),
        data: item?.questions,
      }));
      console.log({ sections });
      console.log(response?.data);
      setData(response?.data);
    } catch (error) {
      console.log('❌ Error:', error);
    }
  };

  const handleApprovedTracker = async (tracker_id: any) => {
    setLoading(true);
    const res = await trigger({ tracker_id: tracker_id });
    const response = apiRequestHandler(res);
    if (response?.isSuccess) {
      handleGetTrackers();
      setLoading(isFetching);
      return true;
    } else {
      handleGetTrackers();
      setLoading(isFetching);
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
