import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextHuge, TextNormal, TextSmall} from '../common/customText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Font} from '../../utils/ImagePath';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '../common/customButton';
import {WeightCompProp} from './interface';
import CustomRHFTextInput from '../common/customRHFinput';
import {Controller, useForm} from 'react-hook-form';
import CustomTextinput from '../common/customTextinput';
import {COLORS} from '../../utils/theme';
import CustomSelectBtn from '../ButtonComp';

const WeightComp = ({
  title,
  rightText,
  rules,
  control,
  name,
  formState,
  btntitle1,
  b1name,
  value1,
  selectedValue1,
  btntitle2,
  b2name,
  value2,
  selectedValue2,
}: WeightCompProp) => {
  const {getFieldState} = useForm();
  const {error} = getFieldState(name, formState);
  

  return (
    <View style={{alignItems: 'center', gap: hp(2)}}>
      <TextHuge textStyle={styles.title}>{title}</TextHuge>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CustomSelectBtn
          title={btntitle1}
          name={b1name}
          value={value1}
          control={control}
          selectedValue={selectedValue1}
        />
        <CustomSelectBtn
          title={btntitle2}
          name={b2name}
          value={value2}
          control={control}
          selectedValue={selectedValue2}
        />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Controller
          rules={rules}
          control={control}
          name={name}
          defaultValue={null}
          key={name}
          render={({field: {value, onBlur, onChange}, fieldState: {error}}) => (
            <>
              <CustomTextinput
                numberOfLines={1}
                mainContainer={{marginBottom: 0}}
                inputContainer={{
                  ...styles.btnStyle,
                  borderWidth: 0,
                  backgroundColor: '#d7d7d7',
                  paddingHorizontal: wp(1),
                  flexDirection: 'column',
                }}
                inputStyle={{
                  fontFamily: Font.semiBold,
                  fontSize: RFValue(18),
                  color: `${COLORS.textBlack}`,
                  textAlign: value?.length <= 2 ? 'center' : undefined,
                }}
                value={value}
                onChangeText={onChange}
              />
            </>
          )}
        />

        <TextNormal textStyle={{color: 'gray'}}>{rightText}</TextNormal>
      </View>
      {error && (
        <TextSmall textStyle={{color: 'red'}}>{error.message || ''}</TextSmall>
      )}
    </View>
  );
};

export default WeightComp;

const styles = StyleSheet.create({
  pound: {
    width: wp(30),
    borderRadius: wp(2),
    paddingVertical: hp(0.5),
    minHeight: hp(4),
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  kilogram: {
    width: wp(30),
    borderRadius: wp(2),
    paddingVertical: hp(0.5),
    minHeight: hp(4),
  },
  title: {
    fontFamily: Font.bold,
    fontSize: RFValue(22),
    textAlign: 'center',
    marginBottom: hp(2),
  },
  btnStyle: {
    borderRadius: wp(30),
    width: wp(18),
    height: wp(18),
    borderWidth: 0,
    backgroundColor: '#d7d7d7',
    marginRight: wp(2),
  },
});
