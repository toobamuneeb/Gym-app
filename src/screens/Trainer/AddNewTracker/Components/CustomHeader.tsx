import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import {
  TextBig,
  TextBigger,
  TextNormal,
} from '../../../../components/common/customText';
import CustomButton from '../../../../components/common/customButton';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { CustomIcon } from '../../../../components/common/customIcons';
import CustomDatePicker from '../../../../components/common/CustomDatePicker';

const CustomHeader = ({ onChange }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <TextBig bold children={'Add New Tracker'} />
        <CustomDatePicker onChange={onChange} />
      </View>
      <View style={{ flex: 0.35 }}>
        <CustomButton
          centerIcon
          text={'Publish now'}
          color="#000"
          onPress={() => {}}
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
    flex: 1,
  },
  contentContainer: {
    flex: 0.65,
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(3),
  },
});
