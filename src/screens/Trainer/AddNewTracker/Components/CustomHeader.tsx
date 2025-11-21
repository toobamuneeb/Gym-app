import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextBig } from '../../../../components/common/customText';
import CustomButton from '../../../../components/common/customButton';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomDatePicker from '../../../../components/common/CustomDatePicker';

interface CustomHeaderProps {
  onChange?: (date: Date) => void;
  onPress?: () => void;
  isLoading: boolean;
}

const CustomHeader = ({ onChange, onPress, isLoading }: CustomHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TextBig bold children={'Add New Tracker'} />
        <CustomDatePicker onChange={onChange} />
      </View>
      <View style={{ flex: 0.35 }}>
        <CustomButton
          isLoading={isLoading}
          centerIcon
          text={'Publish now'}
          color="#000"
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: wp(2),
  },
  contentContainer: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
});
