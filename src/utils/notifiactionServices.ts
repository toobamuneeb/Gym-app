import messaging from '@react-native-firebase/messaging';
import {PermissionsAndroid, Platform} from 'react-native';
import {openSettings} from 'react-native-permissions';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {setFcmToken} from '../redux/reducers/generalSlice';

export function requestUserPermission() {
  const checkToken = useSelector(
    (state: RootState) => state?.generalSlice?.fcmToken,
  );

  const dispatch = useDispatch();
  const getPermission = async () => {
    if (Platform.OS == 'android' && Platform.Version >= 33) {
      // For Android 13 and above, request notification permission explicitly
      const authStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      if (authStatus === PermissionsAndroid.RESULTS.GRANTED) {

        getFCMToken();
        return;
      } else {

        return authStatus;
      }
    } else {
      // For iOS and Android versions below 13, request permission using Firebase
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {

        getFCMToken();
      }
    }
  };

  const getFCMToken = async () => {
    if (checkToken) {

      return checkToken;
    }
    try {
      await messaging().registerDeviceForRemoteMessages();
      const token = await messaging().getToken();
      
      dispatch(setFcmToken(token));
      return token;
    } catch (error) {
    
      return null;
    }
  };

  const opeSett = async () => {
    openSettings('application').catch(() =>
      console.warn('Cannot open app settings'),
    );
  };
  return {getPermission, opeSett};
}
