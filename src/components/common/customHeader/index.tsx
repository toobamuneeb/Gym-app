import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextHuge} from '../customText';
import {
  heightPercentageToDP,
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Font} from '../../../utils/ImagePath';
import {CustomIcon} from '../customIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomHeaderProps} from './interface';

const CustomHeader = ({
  containerStyle,
  title,
  navigation,
  color,
  trainer,
}: CustomHeaderProps) => {
  return (
    <View
      style={{
        ...styles.container,
        flexDirection: trainer ? 'row' : 'column',
        alignItems: trainer ? 'baseline' : undefined,

        marginTop: trainer ? heightPercentageToDP(2) : 0,
        ...containerStyle,
      }}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          marginVertical: trainer ? 0 : hp(1),
          marginTop: trainer ? 0 : hp(2),
          width: wp(6),
          marginRight: trainer ? wp(4) : 0,
        }}>
        <CustomIcon
          type="antdesign"
          icon="arrowleft"
          size={wp(6)}
          color={color}
        />
      </Pressable>
      <TextHuge textStyle={{fontFamily: Font.bold, fontSize: RFValue(22)}}>
        {title}
      </TextHuge>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    // height: hp(6),backgroundColor:"red"
  },
});
