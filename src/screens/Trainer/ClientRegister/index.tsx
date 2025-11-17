import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import Header from '../../../components/common/Header';
import { RFValue } from 'react-native-responsive-fontsize';
import { Font } from '../../../utils/ImagePath';
import { TextHuge, TextNormal } from '../../../components/common/customText';
import CalenderBtn from '../../../components/CalenderBtn';
import { useForm } from 'react-hook-form';
import { COLORS } from '../../../utils/theme';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from '../../../components/common/customButton';
import { ScreenNames } from '../../../navigations/ScreenName';
interface type {
  startingDate: null | Date;
  endingDate: null | Date;
}
const ClientRegister = ({ navigation, route }: any) => {
  const { data } = route.params || {};

  const { control, watch, setValue, trigger, handleSubmit } = useForm<type>({
    defaultValues: {
      startingDate: null,
      endingDate: null,
    },
  });
  // const [isDatePickerOpen, setIsDatePickerOpen] = useState('');
  const [open, setOpen] = useState(false);
  const startingDate = watch('startingDate');
  const endingDate = watch('endingDate');
  const onContinue = async () => {
    const submit = handleSubmit(formValue => {
      navigation.navigate(ScreenNames.CLIENTS_REGISTER1, {
        data: { ...data, ...formValue },
      });
    });
    return submit();
  };

  const handleDateConfirm = (date: Date) => {
    const startingDate = new Date(date);
    const endingDate = new Date(startingDate);
    endingDate.setDate(endingDate.getDate() + (data === 'weekly' ? 7 : 30));
    setValue('startingDate', startingDate);
    setValue('endingDate', endingDate);
    trigger?.('startingDate');
    trigger?.('endingDate');
    setOpen(false);
  };

  return (
    <CustomWrapper>
      <Header navigation={navigation} />

      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}
        >
          <TextHuge
            textStyle={{
              textAlign: 'center',
              fontFamily: Font.bold,
              fontSize: RFValue(22),
              marginVertical: hp(2),
            }}
          >
            Select Date
          </TextHuge>

          <CalenderBtn
            name="startingDate"
            // fiedlName={isDatePickerOpen}
            title={'Starting Date'}
            control={control}
            date={startingDate || new Date()}
            palceholder="mm/dd/yyyy"
            openDatePicker={() => {
              setOpen(true);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            open={open}
            onConfirm={handleDateConfirm}
            errorMessage="starting date required"
          />
          <CalenderBtn
            name="endingDate"
            titleStyle={{ color: COLORS.textBlack }}
            title={'End Date'}
            // fiedlName={isDatePickerOpen}
            control={control}
            date={endingDate || new Date()}
            palceholder="mm/dd/yyyy"
            // openDatePicker={() => {
            //   setIsDatePickerOpen('endingDate');
            // }}
            // onCancel={() => {
            //   setIsDatePickerOpen('');
            // }}
            // onConfirm={date => {
            //   setValue('endingDate', date);
            //   trigger('endingDate');
            //   setIsDatePickerOpen('');
            // }}
            errorMessage="ending date required"
          />

          <CustomButton
            containerStyle={{ marginTop: hp(4) }}
            text="Continue"
            onPress={() => {
              onContinue();
            }}
          />
        </View>
      </ScrollView>
    </CustomWrapper>
  );
};

export default ClientRegister;

const styles = StyleSheet.create({});
