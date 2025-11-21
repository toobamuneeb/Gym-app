import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Onboarding from '../screens/Trainee/Onboarding';
import { ImagPath } from '../utils/ImagePath';
import * as Screen from '../screens';
import { CustomIcon } from '../components/common/customIcons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { TextSmall } from '../components/common/customText';
import Customimage from '../components/common/customImage';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { ScreenNames } from './ScreenName';
import { COLORS } from '../utils/theme';

const Tab = createBottomTabNavigator();
const BottomStak = () => {
  const userData = useSelector((state: RootState) => state?.generalSlice.data);

  const coachTabs = [
    {
      id: 0,
      name: ScreenNames.TRAINER_HOME,
      image: ImagPath.homeIcon,
      component: Screen.TrainerHome,
    },
    {
      id: 1,
      name: ScreenNames.CLIENTS,
      image: ImagPath.clientsIcon,
      component: Screen.Clients,
    },
    {
      id: 2,
      name: ScreenNames.CHAT,
      image: ImagPath.chatIcon,
      component: Screen.Chat,
    },
    {
      id: 3,
      name: ScreenNames.PROFILE,
      image: ImagPath.profileIcon,
      component: Screen.Profile,
    },
  ];
  const userTabs = [
    {
      id: 0,
      name: ScreenNames.USER_HOME,
      image: ImagPath.homeIcon,
      component: Screen.Home,
    },
    {
      id: 1,
      name: ScreenNames.DIET_PALN,
      image: ImagPath.dietIcon,
      component: Screen.DietPlan,
    },
    {
      id: 2,
      name: ScreenNames.CHAT,
      image: ImagPath.chatIcon,
      component: Screen.Chat,
    },
    {
      id: 3,
      name: ScreenNames.PROFILE,
      image: ImagPath.profileIcon,
      component: Screen.Profile,
    },
    {
      id: 4,
      name: ScreenNames.TRACKERS,
      image: ImagPath.trackersIcon,
      component: Screen.Trackers,
    },
    // {
    //   id: 4,
    //   name: ScreenNames.RATING,
    //   image: ImagPath.profileIcon,
    //   component: Screen.Rating,
    // },
  ];

  const TABS = userData?.role === 'coach' ? coachTabs : userTabs;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarBackground: () => (
          <View
            style={{
              shadowColor: '#000000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.17,
              shadowRadius: 3.05,
              elevation: 4,
            }}
          />
        ),
        tabBarStyle: {
          backgroundColor: COLORS.appWhite,
          height:
            Platform.OS === 'ios'
              ? heightPercentageToDP(11)
              : heightPercentageToDP(8.5),
          paddingBottom: Platform.OS == 'android' ? 10 : 15,
          borderTopRightRadius: widthPercentageToDP(10),
          borderTopLeftRadius: widthPercentageToDP(10),
          position: 'absolute',
          borderWidth: 1,
          borderBottomWidth: 0,
        },
      }}
    >
      {TABS.map((item, index) => (
        <Tab.Screen
          key={item.id}
          name={item?.name}
          component={item.component}
          options={{
            tabBarButton(props) {
              const focused = props.accessibilityState?.selected;

              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={props.onPress}
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: heightPercentageToDP(2),
                  }}
                >
                  {item.id === 3 ? (
                    <Customimage
                      disabled
                      source={{
                        uri:
                          userData?.traineeProfile?.profileImage ||
                          userData?.trainerProfile?.profileImage,
                      }}
                      style={{
                        height: widthPercentageToDP(7),
                        width: widthPercentageToDP(7),
                        borderColor: focused ? '#000' : '#94A3B8',
                        borderRadius: widthPercentageToDP(20),
                        borderWidth: 1,
                      }}
                    />
                  ) : (
                    <Customimage
                      disabled
                      source={item.image}
                      style={{
                        height: widthPercentageToDP(7),
                        width: widthPercentageToDP(7),
                        tintColor:
                          item.id === 3 ? '' : focused ? '#000' : '#94A3B8',
                      }}
                    />
                  )}

                  <TextSmall
                    textStyle={{
                      color: focused ? '#000' : '#94A3B8',
                      marginTop: heightPercentageToDP(0.5),
                    }}
                  >
                    {item.name}
                  </TextSmall>
                </TouchableOpacity>
              );
            },
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default BottomStak;

const styles = StyleSheet.create({});
