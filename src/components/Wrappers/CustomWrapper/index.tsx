import { Platform, StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../../utils/theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { WrapperProps } from './interface';

const CustomWrapper = ({ children, containerStyle, edge }: WrapperProps) => {
  return (
    <SafeAreaView edges={edge} style={[styles.container, containerStyle]}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={'#fff'}
        animated={true}
      />

      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
};

export default CustomWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appWhite,
    paddingHorizontal: wp(5),
  },
});
