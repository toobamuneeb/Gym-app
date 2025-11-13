import {StyleSheet} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import DatePicker from 'react-native-date-picker';
import {COLORS} from '../../utils/theme';
import CustomButton from '../common/customButton';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TextNormal, TextSmall} from '../common/customText';
import {Font} from '../../utils/ImagePath';
import {CalenderProps} from './interface';

const CalenderBtn = ({
  control,
  date,
  onConfirm,
  onCancel,
  openDatePicker,
  title,
  palceholder,
  titleStyle,
  name,
  fiedlName,
  errorMessage,
  open,
}: CalenderProps) => {
  const isOpen = name === fiedlName;
  return (
    <>
      {title && (
        <TextNormal textStyle={{...styles.subTiile, ...titleStyle}}>
          {title}
        </TextNormal>
      )}
      <Controller
        control={control}
        name={name}
        rules={{
          required: {value: true, message: errorMessage},
        }}
        render={({field: {value}, fieldState: {error}}) => (
          <>
            <CustomButton
              text={value ? value.toLocaleDateString() : palceholder}
              containerStyle={{
                height: hp(8),
                backgroundColor: COLORS.inputBack,
                marginBottom: hp(1),
              }}
              textStyle={{color: value ? COLORS.textBlack : COLORS.textGray}}
              calenderIcon={true}
              onPress={openDatePicker}
            />

            {error && (
              <TextSmall textStyle={{color: 'red'}}>
                {error?.message || null}
              </TextSmall>
            )}
          </>
        )}
      />
      <DatePicker
        theme="light"
        modal
        mode="date"
        open={isOpen || open}
        date={date}
        onConfirm={onConfirm}
        onCancel={onCancel}
        minimumDate={new Date()}
      />
    </>
  );
};

export default CalenderBtn;

const styles = StyleSheet.create({
  subTiile: {
    fontFamily: Font.medium,
    color: COLORS.titleColor,
    marginBottom: hp(1),
  },
});
