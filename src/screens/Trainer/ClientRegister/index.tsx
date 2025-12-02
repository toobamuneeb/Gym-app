import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import Header from '../../../components/common/Header';
import { RFValue } from 'react-native-responsive-fontsize';
import { Font } from '../../../utils/ImagePath';
import {
  TextHuge,
  TextNormal,
  TextSmaller,
} from '../../../components/common/customText';
import CalenderBtn from '../../../components/CalenderBtn';
import { useForm } from 'react-hook-form';
import { COLORS } from '../../../utils/theme';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomButton from '../../../components/common/customButton';
import { ScreenNames } from '../../../navigations/ScreenName';
import { useGetLastDatePlanQuery } from '../../../redux/Api/plan.api';
import moment from 'moment';
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

  const { data: lastDate, isLoading } = useGetLastDatePlanQuery({});
  const [open, setOpen] = useState(false);
  const startingDate = watch('startingDate');
  const endingDate = watch('endingDate');

  const onContinue = async () => {
    console.log(startingDate);
    const submit = handleSubmit(formValue => {
      navigation.navigate(ScreenNames.CLIENTS_REGISTER1, {
        data: { ...data, ...formValue },
      });
    });
    return submit();
  };

  const [minDate, setMinDate] = useState(new Date());

  useLayoutEffect(() => {
    if (lastDate?.nextDate) {
      setMinDate(lastDate?.nextDate);
    }
  }, [lastDate?.nextDate, minDate]);

  const handleDateConfirm = (date: Date) => {
    const nextAllowed = new Date(minDate);

    if (date < nextAllowed) {
      setOpen(false);
      return Alert.alert(
        'Invalid Date',
        `Please select a date on or after ${nextAllowed.toDateString()}`,
      );
    }

    const startingDate = new Date(date);
    const endingDate = new Date(startingDate);

    if (data?.selectedOption === 'weekly') {
      endingDate.setDate(endingDate.getDate() + 6);
    } else {
      endingDate.setMonth(endingDate.getMonth() + 1);
      endingDate.setDate(endingDate.getDate() - 1);
    }
    console.log({ startingDate, endingDate });
    setValue('startingDate', startingDate);
    setValue('endingDate', endingDate);
    trigger?.('startingDate');
    trigger?.('endingDate');
    setOpen(false);
  };
  console.log({ minDate });
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
            minimumDate={minDate}
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
            errorMessage="ending date required"
          />

          <View>
            <TextSmaller
              color="red"
              children={`⚠️ Your next plan must start from ${moment(
                minDate,
              ).format('YYYY MMM DD')} `}
            />
          </View>

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
