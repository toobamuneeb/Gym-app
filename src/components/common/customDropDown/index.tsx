import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Dropdown } from 'react-native-element-dropdown';
import { Font } from '../../../utils/ImagePath';
import { COLORS } from '../../../utils/theme';
import { DropdownProps } from './interface';
import { TextNormal, TextSmall } from '../customText';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const CustomDropdown = ({
  placeholder,
  value,
  name,
  onFocus,
  onChange,
  onBlur,
  data,
  title,
  disable,
  control,
  rules,
  onPress,
  dropDownStyle,
}: DropdownProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ fieldState: { error } }) => (
        <>
          {title && (
            <TextNormal textStyle={styles.subTiile}>{title}</TextNormal>
          )}
          <Pressable onPress={onPress} disabled={typeof onPress !== 'function'}>
            <Dropdown
              disable={disable}
              mode="auto"
              style={[
                styles.dropdown,
                error && { marginBottom: 0 },
                dropDownStyle,
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={placeholder}
              searchPlaceholder="Search..."
              value={value}
              onFocus={onFocus}
              onBlur={onBlur}
              onChange={onChange}
            />
          </Pressable>
          {error && (
            <TextSmall textStyle={{ color: 'red' }}>{error.message}</TextSmall>
          )}
        </>
      )}
    />
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: hp(0.15),
    borderColor: COLORS.btnBlack,
    backgroundColor: COLORS.inputBack,
    paddingHorizontal: wp(4.1),
    flex: 1,
    borderRadius: wp(20),
    height: hp(7.5),
    marginBottom: hp(2),
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'red',
  },
  placeholderStyle: {
    fontFamily: Font.regular,
    fontSize: RFValue(12),
    color: 'gray',
  },
  selectedTextStyle: {
    fontFamily: Font.regular,
    fontSize: RFValue(14),
  },
  iconStyle: {
    width: wp(6),
    height: wp(6),
  },
  inputSearchStyle: {
    height: hp(6),
    fontFamily: Font.regular,
    fontSize: RFValue(12),
  },
  subTiile: {
    fontFamily: Font.medium,
    color: COLORS.titleColor,
    marginBottom: hp(1),
  },
});
