import React from 'react';
import {Pressable} from 'react-native';
import {COLORS} from '../../utils/theme';
import {TextBigger} from '../common/customText';
import CustomPLanComponent from './index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const DietPlanButton = React.memo(
  ({meals, onPress}: {meals: any[]; onPress: () => void}) => (
    <Pressable
      onPress={onPress}
      style={{
        borderRadius: wp(6),
        backgroundColor: COLORS.Green,
        padding: hp(2),
        borderWidth: hp(0.15),
        marginBottom: hp(2),
      }}>
      <TextBigger>Diet Plan</TextBigger>
      {meals.map((item, index) => (
        <CustomPLanComponent
          key={item._id}
          meals
          item={item}
          isLastItem={index === meals.length - 1}
        />
      ))}
    </Pressable>
  ),
);
export default DietPlanButton;
