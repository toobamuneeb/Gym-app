import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Onboarding from '../screens/Trainee/Onboarding';
import {ImagPath} from '../utils/ImagePath';
import * as Screen from '../screens';
import {CustomIcon} from '../components/common/customIcons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {TextSmall} from '../components/common/customText';
import Customimage from '../components/common/customImage';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {ScreenNames} from './ScreenName';
import {COLORS} from '../utils/theme';

const Tab = createBottomTabNavigator();
const BottomStak = () => {
  const userData = useSelector((state: RootState) => state?.generalSlice.data);

  const userTabs = [
    {
      id: 0,
      name:
        userData.role === 'coach'
          ? ScreenNames.TRAINER_HOME
          : ScreenNames.USER_HOME,
      image: ImagPath.homeIcon,
      component: userData.role === 'coach' ? Screen.TrainerHome : Screen.Home,
    },
    {
      id: 1,
      name:
        userData.role === 'coach' ? ScreenNames.CLIENTS : ScreenNames.DIET_PALN,
      image:
        userData.role === 'coach' ? ImagPath.clientsIcon : ImagPath.dietIcon,
      component: userData.role === 'coach' ? Screen.Clients : Screen.DietPlan,
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
      //  source={{
      //     uri:
      //       userData?.traineeProfile?.profileImage ||
      //       userData?.trainerProfile?.profileImage,
      //   }}
      component: Screen.Profile,
    },
    // {
    //   id: 4,
    //   name: ScreenNames.RATING,
    //   image: ImagPath.profileIcon,
    //   component: Screen.Rating,
    // },
  ];

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
      }}>
      {userTabs.map((item, index) => (
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
                  }}>
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
                    }}>
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
