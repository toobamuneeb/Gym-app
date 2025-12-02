import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { TextBig } from '../../../../components/common/customText';
import CustomButton from '../../../../components/common/customButton';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomDatePicker from '../../../../components/common/CustomDatePicker';
import { RFValue } from 'react-native-responsive-fontsize';

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
      {/* <View style={{}}> */}
      <CustomButton
        isLoading={isLoading}
        textStyle={styles.btnTextStyle}
        centerIcon
        text={'Publish now'}
        color="#000"
        onPress={onPress}
      />
      {/* </View> */}
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
    // flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
  btnTextStyle: {
    fontSize: RFValue(13),
    paddingHorizontal: wp(2),
    width: wp(30),
  },
});
