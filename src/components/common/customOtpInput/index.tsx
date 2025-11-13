import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import OTPTextView from 'react-native-otp-textinput';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../utils/theme';
import {OtpVerifyProp} from './interface';
import {TextSmall} from '../customText';
const CustomOtpInput: React.FC<OtpVerifyProp> = ({
  onChange,
  containerStyle,
  inputStyle,
  error,
}) => {
  return (
    <>
      <View>
        <OTPTextView
          inputCount={6}
          textInputStyle={{...styles.inputStyle, ...inputStyle}}
          handleTextChange={onChange}
          offTintColor={'#000000'}
          tintColor={COLORS.btnGreen}
          keyboardType="numeric"
          containerStyle={containerStyle}
        />
      </View>

      <View style={styles.errorContainer}>
        <TextSmall textStyle={{color: 'red'}}>{error && `${error}`}</TextSmall>
      </View>
    </>
  );
};

export default CustomOtpInput;

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: '#E7E7E7',
    borderBottomWidth: hp(0.2),
    borderRadius: 8,
    width: wp(12),
    borderWidth: hp(0.2),
  },
  errorContainer: {
    marginVertical: hp(0.7),
    marginLeft: wp(2),
  },
});
