import NetInfo from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';
import {Linking, Platform} from 'react-native';

export const useNetConnection = () => {
  const [internetStatus, setInternetStatus] = useState<any>(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const online: any = state?.isConnected;
      if (online) {
        setInternetStatus(false);
      } else {
        setInternetStatus(true);
        setTimeout(() => {
          setInternetStatus(false);
        }, 5000);
      }
    });

    return () => removeNetInfoSubscription();
  }, []);

  return {
    internetStatus,
    setInternetStatus,
  };
};
