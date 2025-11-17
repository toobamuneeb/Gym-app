import { StyleSheet, Text, View } from 'react-native';
import React, { memo, useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { CustomIcon } from '../customIcons';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

interface CustomDatePickerProps {
  onChange?: any;
}

const CustomDatePicker = ({ onChange }: CustomDatePickerProps) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  return (
    <View style={{}}>
      <CustomIcon
        onPress={() => setOpen(true)}
        icon="calendar"
        type={'fontawesome'}
        size={wp(5)}
      />
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
          onChange?.(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

export default memo(CustomDatePicker);

const styles = StyleSheet.create({});
