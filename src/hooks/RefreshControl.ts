import {useEffect, useMemo, useState} from 'react';
import {useDispatch} from 'react-redux';
import {trainers} from '../redux/Api/trainer.api';

interface Options {
  refresh: () => void;
  isFetching: boolean;
}

const useManualRefresh = ({refresh, isFetching}: Options) => {
  const [refreshRequested, setRefreshRequested] = useState(false);
  const dispatch = useDispatch();
  const handleRefresh = async () => {
    dispatch(trainers.util.resetApiState()); // 💥 Clears everything
  };
  const requestRefresh = () => {
    setRefreshRequested(true);

    // refresh();
    handleRefresh();
  };

  useEffect(() => {
    if (refreshRequested === true && isFetching === false) {
      setRefreshRequested(false);
    }
  }, [refreshRequested, isFetching]);

  const refreshing = useMemo(() => {
    return refreshRequested === true && isFetching === true;
  }, [isFetching, refreshRequested]);

  return {requestRefresh, refreshing};
};

export {useManualRefresh};
