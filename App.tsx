import {StatusBar, StyleSheet, Text, useColorScheme, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import RootStack from './src/navigations/RootStack';
import {Provider, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor, RootState} from './src/redux/store';
import AuthStack from './src/navigations/AuthStack';
import {COLORS} from './src/utils/theme';
import {requestUserPermission} from './src/utils/notifiactionServices';
import {Linking, ActivityIndicator} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {ScreenNames} from './src/navigations/ScreenName';

const App = () => {
  const {getPermission, opeSett} = requestUserPermission();
  const checkFCNMToken = useSelector(
    (state: RootState) => state?.generalSlice.fcmToken,
  );
  const NAVIGATION_IDS = [
    `${ScreenNames.LOGIN}`,
    `${ScreenNames.REGISTER}`,
    `${ScreenNames.NOTIFICATION}`,
    `${ScreenNames.MESSAGE}`,
  ];

  function buildDeepLinkFromNotificationData(data: any) {
 
    const navigationId = data?.navigationId;
    if (!NAVIGATION_IDS.includes(navigationId)) {
     
      return null;
    }
    if (navigationId === `${ScreenNames.LOGIN}`) {
      return `myapp://${ScreenNames.LOGIN}`;
    }
    if (navigationId === `${ScreenNames.REGISTER}`) {
      return `myapp://${ScreenNames.REGISTER}`;
    }

    if (navigationId === `${ScreenNames.MESSAGE}`) {
      let dataa = encodeURIComponent(data.data);
    
      return `myapp://${ScreenNames.MESSAGE}/${dataa}`;
    }

    return null;
  }

  const linking = {
    prefixes: ['myapp://'],

    config: {
      initialRouteName: ScreenNames.BOTTOM_STACK,
      screens: {
        [ScreenNames.MESSAGE]: {
          path: 'message/:data',
        },
      },
    },

    async getInitialURL() {
      const url = await Linking.getInitialURL();
      if (typeof url === 'string') {
        return url;
      }

      const message = await messaging().getInitialNotification();
      const deeplinkURL = buildDeepLinkFromNotificationData(message?.data);
      if (typeof deeplinkURL === 'string') {
        return deeplinkURL;
      }
    },
    subscribe(listener: (url: string) => void) {
      const onReceiveURL = ({url}: {url: string}) => listener(url);

      const linkingSubscription = Linking.addEventListener('url', onReceiveURL);

      const unsubscribe = messaging().onNotificationOpenedApp(remoteMessage => {
        const url = buildDeepLinkFromNotificationData(remoteMessage.data);
        if (typeof url === 'string') {
          listener(url);
        }
      });

      return () => {
        linkingSubscription.remove();
        unsubscribe();
      };
    },
  };

  useEffect(() => {
    getPermission();
  }, [!checkFCNMToken]);
  const loginData = useSelector(
    (state: RootState) => state?.generalSlice.loginData,
  );

  return (
    <NavigationContainer linking={linking}>
      <View style={{backgroundColor: COLORS.appWhite, flex: 1}}>
        {loginData?.Token && loginData?.role ? <RootStack /> : <AuthStack />}
      </View>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
