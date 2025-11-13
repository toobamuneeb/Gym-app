import {StatusBar, StyleSheet} from 'react-native';
import React from 'react';

import Animated, {SlideInUp, FadeOutUp} from 'react-native-reanimated';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../utils/theme';
import {TextNormal} from '../customText';

interface connectionProps {
  handleClose?: () => void;
}

const NetConnectionModal = ({handleClose}: connectionProps) => {
  return (
    <Animated.View
      entering={SlideInUp.duration(1000)}
      exiting={FadeOutUp.duration(5000)}
      style={styles.content}>
      <StatusBar backgroundColor={'transparent'} />
      <TextNormal textStyle={{color: '#fff'}}>
        No Internet Connection
      </TextNormal>
    </Animated.View>
  );
};

export default NetConnectionModal;

const styles = StyleSheet.create({
  content: {
    justifyContent: 'space-between',
    paddingHorizontal: widthPercentageToDP(4),
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 999999,
    marginHorizontal: widthPercentageToDP(6),
    position: 'absolute',
    backgroundColor: COLORS.Green,
    height: widthPercentageToDP(10),
    top: heightPercentageToDP(15),
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: widthPercentageToDP(10),
  },

  icon: {
    height: widthPercentageToDP(5),
    width: widthPercentageToDP(5),
    tintColor: '#fff',
    zIndex: 99999,
  },
});
