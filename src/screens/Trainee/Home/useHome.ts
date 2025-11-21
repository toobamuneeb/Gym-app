import React, { useEffect, useState } from 'react';
import {
  useGetAllPlansQuery,
  useGetTodaysPlanQuery,
  useGetbyIDQuery,
} from '../../../redux/Api/plan.api';
import { useLazyGetallTrainersQuery } from '../../../redux/Api/trainer.api';
import { RTK_QUERY_CONFIG } from '../../../utils/constant';
import useDebounce from '../../../hooks/Debounce';

interface HomeHookOptions {
  traineeID?: string;
  checkTraineeID?: boolean;
  type?: string | undefined;
}

export const useHome = (options: HomeHookOptions = {}) => {
  const { traineeID, checkTraineeID, type } = options;

  const [initialLoading, setInitialLoading] = useState(true);
  const [searchTrainer, setsearchTrainer] = useState('');
  const debouncedValue = useDebounce(searchTrainer, 300);
  // Today's plan query (always fetched if fetchPlans is true)
  const todaysPlanQuery = useGetTodaysPlanQuery({}, RTK_QUERY_CONFIG);

  // Conditional plan queries
  const allPlansQuery = useGetAllPlansQuery(
    {},
    {
      ...RTK_QUERY_CONFIG,
      skip: checkTraineeID,
    },
  );

  const singlePlanQuery = useGetbyIDQuery(
    { traineeID: traineeID },
    {
      ...RTK_QUERY_CONFIG,
      skip: !traineeID,
    },
  );

  // Trainer data fetching logic (unchanged)
  const [
    fetchTrainers,
    {
      data: trainerResponse,
      isLoading: trainerLoading,
      isError: trainerError,
      isFetching: trainerIsFetching,
    },
  ] = useLazyGetallTrainersQuery();

  const [trainerData, setTrainerData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState({
    isLoadMore: false,
    isRefresh: false,
  });
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    refetchTrainers(type);
  }, []);
  useEffect(() => {
    refetchTrainers(type);
  }, [debouncedValue]);

  const fetchTrainersData = async (
    isRefresh: boolean,
    pageNumber: number,
    search: string,
    type: string | undefined,
  ) => {
    if (
      isLoading.isRefresh ||
      isLoading.isLoadMore ||
      (!isRefresh && !hasMorePages)
    )
      return;

    setIsLoading({
      isRefresh: isRefresh,
      isLoadMore: !isRefresh,
    });

    try {
      const res = await fetchTrainers({ page: pageNumber, search, type });
      console.log({ res });
      if (!res?.data) {
        setError(true);
        setIsLoading({ isLoadMore: false, isRefresh: false });
        setInitialLoading(false);
        return;
      }

      const morePagesAvailable = res.data.page < res.data.totalPages;
      setHasMorePages(morePagesAvailable);

      if (isRefresh) {
        setTrainerData(res.data.data || []);
        setPage(1);
      } else {
        setTrainerData(prev => [...prev, ...(res.data.data || [])]);
        setPage(pageNumber);
      }
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading({ isLoadMore: false, isRefresh: false });
      setInitialLoading(false); // Add this
    }
  };

  const refetchTrainers = (type: string | undefined) => {
    fetchTrainersData(true, 1, debouncedValue, type);
  };

  const loadMoreTrainers = () => {
    if (error) return;
    if (hasMorePages) {
      fetchTrainersData(false, page + 1, debouncedValue, type);
    }
  };

  // Memoized plan data
  const plansData = React.useMemo(() => {
    return !checkTraineeID
      ? {
          data: allPlansQuery.data,
          isLoading: allPlansQuery.isLoading,
          isFetching: allPlansQuery.isFetching,
          isError: allPlansQuery.isError,
          error: allPlansQuery.error,
          refetch: allPlansQuery.refetch,
        }
      : {
          data: singlePlanQuery.data,
          isLoading: singlePlanQuery.isLoading,
          isFetching: singlePlanQuery.isFetching,
          isError: singlePlanQuery.isError,
          error: singlePlanQuery.error,
          refetch: singlePlanQuery.refetch,
        };
  }, [allPlansQuery, singlePlanQuery]);

  const todaysPlan = React.useMemo(
    () => ({
      data: todaysPlanQuery.data,
      isLoading: todaysPlanQuery.isLoading,
      isFetching: todaysPlanQuery.isFetching,
      isError: todaysPlanQuery.isError,
      error: todaysPlanQuery.error,
      refetch: todaysPlanQuery.refetch,
    }),
    [todaysPlanQuery],
  );
  const handleSearch = (text: string) => {
    setsearchTrainer(text);
  };
  return {
    todaysPlan,
    plansData,
    trainerData,
    loadMoreTrainers,
    isLoading,
    error,
    refetchTrainers,
    hasMorePages,
    trainerLoading,
    trainerError,
    trainerIsFetching,
    initialLoading,
    searchTrainer,
    handleSearch,
  };
};
