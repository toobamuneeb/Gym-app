/**
 * @format
 */

import {AppRegistry, StatusBar} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/redux/store';
import FlashMessage from 'react-native-flash-message';
import BootSplash from 'react-native-bootsplash';
import {useEffect} from 'react';
import {useNetConnection} from './src/hooks/useNetinfo';
import NetConnectionModal from './src/components/common/NetConnectionModal';

const MainRoute = () => {
  // useEffect(() => {
  //   const handle = async () => await BootSplash.hide({fade: true});
  //   handle();
  // }, []);
  const {internetStatus, setInternetStatus} = useNetConnection();
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {internetStatus && <NetConnectionModal />}
        <App />
        <FlashMessage duration={2000} autoHide hideOnPress position={'top'} />
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => MainRoute);
