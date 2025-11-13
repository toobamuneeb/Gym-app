import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  NavigationState,
  useFocusEffect,
  useNavigationState,
} from '@react-navigation/native';
import React, {useState, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../../components/common/customButton';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import {Font} from '../../../utils/ImagePath';
import {COLORS} from '../../../utils/theme';
import Header from '../../../components/common/Header';
import {data} from '../Home';
import {ScreenNames} from '../../../navigations/ScreenName';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MyClients from './myClients';
import RequestClients from './reqClients';
import MyCustomTabBar from '../../../components/customTabBar';

const Clients = () => {
  const Tab = createMaterialTopTabNavigator();

  return (
    <CustomWrapper containerStyle={{paddingHorizontal: 0}}>
      <Tab.Navigator
        initialRouteName={ScreenNames.CLIENTS}
        tabBar={props => <MyCustomTabBar {...props} />}>
        <Tab.Screen name={ScreenNames.CLIENTS} component={MyClients} />
        <Tab.Screen
          name={ScreenNames.MY_CLIENTS_REQ}
          component={RequestClients}
        />
      </Tab.Navigator>
    </CustomWrapper>
  );
};

export default Clients;

const styles = StyleSheet.create({
  headerMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: hp(2),
  },
  headerBtn: {
    borderWidth: 0,
    minHeight: hp(5),
    paddingHorizontal: wp(8),
    borderRadius: 0,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp(5),
    overflow: 'hidden',
    backgroundColor: '#F6F6F6',
  },
  header: {
    padding: wp(4),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: COLORS.textDarkgreen,
    fontFamily: Font.bold,
  },

  sec: {
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    paddingVertical: hp(1),
  },
  downText: {
    color: '#4A4A4A',
    fontFamily: Font.regular,
  },
});
