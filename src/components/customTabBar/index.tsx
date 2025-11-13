import React from 'react';
import {View, TouchableOpacity, Animated, StyleSheet, Text} from 'react-native';
import Header from '../common/Header';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {Font} from '../../utils/ImagePath';

const MyCustomTabBar = ({
  state,
  navigation,
  position,
}: MaterialTopTabBarProps) => {
  const inputRange = state.routes.map((_, i) => i);
  const horizontalPadding = wp(5);
  const totalTabBarWidth = wp(100) - horizontalPadding * 2;
  const tabWidth = totalTabBarWidth / state.routes.length;

  const translateX = position.interpolate({
    inputRange,
    outputRange: inputRange.map(i => i * tabWidth),
  });
  return (
    <>
      <Header
        containerStyle={{paddingHorizontal: wp(5)}}
        title={state.index === 0 ? 'My Clients' : 'Request Clients'}
        navigation={navigation}
      />
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const label = route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
          });

          return (
            <TouchableOpacity
              activeOpacity={0.8}
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tab}>
              <Animated.Text
                style={[
                  {opacity},
                  {
                    color: isFocused ? '#083400' : '#94A3B8',
                    fontSize: RFValue(12),
                    fontFamily: Font.medium,
                  },
                ]}>
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Animated.View
        style={{
          height: 2,
          backgroundColor: '#083400',
          width: tabWidth,
          transform: [{translateX}],
          marginLeft: horizontalPadding,
        }}
      />
    </>
  );
};

export default MyCustomTabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderColor: '#ddd',
    marginTop: hp(2),
    marginBottom: hp(0.8),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
