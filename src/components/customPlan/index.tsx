import React from 'react';
import {View, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {TextSmall, TextSmaller, TextNormal} from '../common/customText';
import {PlanProps} from './interface';
import {Font} from '../../utils/ImagePath';

const CustomPLanComponent = ({item, meals, isLastItem}: PlanProps) => {
  return (
    <View
      style={{
        ...styles.sec,
        borderBottomWidth: isLastItem ? 0 : hp(0.1),
      }}>
      <TextSmall>{item.name}</TextSmall>
      <TextSmaller style={styles.bottomText}>
        {item.quantity || item.description}
      </TextSmaller>
    </View>
  );
};

export default React.memo(CustomPLanComponent);
const styles = StyleSheet.create({
  sec: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'gray',
    paddingVertical: hp(1),
  },
  bottomText: {
    color: '#4A4A4A',
    fontFamily: Font.regular,
    marginTop: hp(0.5),
  },
});
