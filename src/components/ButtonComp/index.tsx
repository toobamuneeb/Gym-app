import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import CustomButton from '../common/customButton';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Control, FieldValues, Path} from 'react-hook-form';
import {COLORS} from '../../utils/theme';

interface BtnSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  value: string;
  selectedValue: string;
  title: string;
  titleStyle?: object;
  btnStyle?: object;
  selectedBtnStyle?: object;
}

const CustomSelectBtn = <T extends FieldValues>({
  control,
  name,
  value,
  selectedValue,
  title,
  titleStyle,
  btnStyle,
  selectedBtnStyle,
}: BtnSelectProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({field: {onChange}}) => (
        <CustomButton
          onPress={() => {
            onChange(value)
          }}
          text={title}
          containerStyle={{
            ...styles.btnStyle,
            ...btnStyle,
            ...(selectedValue === value && 
              styles.selectedBtnStyle || selectedBtnStyle),
          }}
          textStyle={{
            ...styles.titleStyle,
            ...titleStyle,
            ...(selectedValue === value && {color: COLORS.textBlack}),
          }}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    width: wp(30),
    borderRadius: wp(2),
    paddingVertical: hp(0.5),
    minHeight: hp(4),
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  titleStyle: {
    color: 'gray',
  },
  selectedBtnStyle: {
    backgroundColor: COLORS.btnGreen,
    borderWidth: hp(0.15),
  },

});

export default CustomSelectBtn;
