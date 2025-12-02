import { useEffect, useState } from 'react';
import {
  useLazyGetTrackerQuery,
  useSubmitTrackerMutation,
} from '../../../../redux/Api/trackers.api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { apiRequestHandler } from '../../../../utils';

const useTrackersList = (trainer_id: any) => {
  const [getTrackers, { reset, isLoading, isFetching }] =
    useLazyGetTrackerQuery();

  const [submit, { isLoading: loading }] = useSubmitTrackerMutation();
  const userData = useSelector((state: RootState) => state?.generalSlice.data);
  const [data, setData] = useState<any>();
  const [date, setDate] = useState<any>();

  useEffect(() => {
    handleGetTrackers(new Date().toString());
  }, []);

  const handleGetTrackers = async (tracker_date: string) => {
    try {
      const response = await getTrackers({
        trainer_id,
        trainee_id: userData?._id,
        tracker_date: decodeURIComponent(tracker_date),
        is_submitted: false,
      }).unwrap();
      setData(response.data[0]);
    } catch (error) {
      console.log('❌ Error:', error);
    }
  };

  const onChangeDate = (formData: any) => {
    console.log('Submitted Data:', formData.toString());
    setDate(formData.toString());
    handleGetTrackers(formData.toString());
  };
  const onChange = async (trackers: any) => {
    let payload = {
      tracker_id: data?._id,
      ...trackers,
    };
    console.log(payload);
    const response = await submit(payload);
    const responseHandler = apiRequestHandler(response);
    handleGetTrackers(date ? date : new Date()?.toString());
    console.log({ responseHandler });
  };

  return {
    handleGetTrackers,
    data,
    isLoading,
    onChangeDate,
    onChange,
    isFetching,
    loading,
  };
};

export default useTrackersList;
