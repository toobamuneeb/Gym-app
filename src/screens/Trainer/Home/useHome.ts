import {useGetHomeClientQuery} from '../../../redux/Api/client.api';

const useHome = () => {
  const {data, isLoading} = useGetHomeClientQuery([]);
};

export default useHome;
