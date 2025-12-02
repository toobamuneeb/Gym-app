import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CustomIcon } from '../../../../components/common/customIcons';
import { TextBiggest } from '../../../../components/common/customText';
import CustomDatePicker from '../../../../components/common/CustomDatePicker';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

interface CustomHeaderProps {
  onChange: (i: any) => void;
}

const CustomHeader = ({ onChange }: CustomHeaderProps) => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.headerContain}>
      <CustomIcon
        onPress={goBack}
        type="antdesign"
        icon="arrowleft"
        size={wp(6.4)}
      />
      <View style={styles.titleContainer}>
        <TextBiggest bold children={'Active Trackers'} />
        <CustomDatePicker onChange={onChange} />
      </View>
      <View></View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  headerContain: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: { flexDirection: 'row', alignItems: 'center', gap: wp(3) },
});
