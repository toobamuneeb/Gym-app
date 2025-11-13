import {useState, useEffect} from 'react';
import {useLazyGetallTrainersQuery} from '../../../../redux/Api/trainer.api';
import {useLazyGetAllClientsQuery} from '../../../../redux/Api/client.api';

const useClients = () => {
  const [
    fetchData,
    {
      data: data,
      isLoading: clientisLoading,
      isError: clientError,
      isFetching: clientisFetching,
    },
  ] = useLazyGetAllClientsQuery();
  const [initialLoading, setInitialLoading] = useState(true);
  const [clientData, setclientData] = useState<any[]>([]);

  const [isLoading, setIsLoading] = useState({
    isLoadMore: false,
    isRefresh: false,
  });
  const [page, setPage] = useState(1);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    refetchClients();
  }, []);

  const fetchClients = async (isRefresh: boolean, pageNumber: number) => {
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
      const res = await fetchData({page: pageNumber});

      if (!res?.data) {
        setError(true);
        setIsLoading({isLoadMore: false, isRefresh: false});
        setInitialLoading(false); // Add this
        return;
      }

      const morePagesAvailable = res.data.page < res.data.totalPages;
      setHasMorePages(morePagesAvailable);

      if (isRefresh) {
        setclientData(res.data.data || []);
        setPage(1);
      } else {
        setclientData(prev => [...prev, ...(res.data.data || [])]);
        setPage(pageNumber);
      }
    } catch (error) {

      setError(true);
    } finally {
      setIsLoading({isLoadMore: false, isRefresh: false});
      setInitialLoading(false); // Add this
    }
  };
  const refetchClients = () => {
    fetchClients(true, 1);
  };

  const loadMoreClients = () => {
    if (error) return;
    if (hasMorePages) {
      fetchClients(false, page + 1);
    }
  };

  return {
    clientData,
    loadMoreClients,
    isLoading,
    error,
    refetchClients,
    hasMorePages,
    clientisLoading,
    clientError,
    clientisFetching,
    initialLoading,
  };
};
export default useClients;
