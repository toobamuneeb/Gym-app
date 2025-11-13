import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../utils/theme';
import {ButtonProps} from './interface';
import {TextNormal, TextSmall, TextSmaller} from '../customText';
import {CustomIcon} from '../customIcons';
import {Font, ImagPath} from '../../../utils/ImagePath';
import Customimage from '../customImage';

const CustomButton: React.FC<ButtonProps> = ({
  text,
  textStyle,
  containerStyle,
  onPress,
  rightIcon,
  pickImage,
  media,
  centerIcon,
  type,
  icon,
  color,
  calenderIcon,
  Selection,
  Selected,
  value,
  pickImageStyle,
  imageStyle,
  personalDetail1,
  isLoading,
}) => {
  const isActive = Selection && Selected === value;


  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={typeof onPress !== 'function'}
      activeOpacity={0.7}
      style={[
        styles.container,
        styles.primaryColor,
        containerStyle,
        pickImage && {
          borderRadius: wp(3),
          justifyContent: 'flex-start',
          paddingHorizontal: wp(4),
          ...pickImageStyle,
        },
        calenderIcon && {
          justifyContent: 'space-between',
          paddingHorizontal: wp(5),
        },
        Selection && {
          justifyContent: 'space-between',
          paddingHorizontal: wp(4),
        },
      ]}>
      {pickImage ? (
        <>
          <Customimage
            source={{uri: media?.path}}
            style={{
              width: wp(16),
              height: wp(16),
              borderRadius: wp(3),
              marginRight: wp(3),
              backgroundColor: media ? null : '#FFFFFF',
              borderWidth: hp(0.15),
              ...imageStyle,
            }}
            resizeMode={'cover'}
          />
          {personalDetail1 ? (
            <View>
              <TextNormal
                numberOfLines={1}
                ellipsizeMode="tail"
                textStyle={{fontFamily: Font.semiBold}}>
                {text}
              </TextNormal>
              <TextSmaller textStyle={{color: COLORS.textGray}}>
                click to upload a photo of yourself
              </TextSmaller>
            </View>
          ) : (
            <View>
              <TextSmall textStyle={textStyle}>{text}</TextSmall>
              <TextSmaller>( svg, jpeg, png )</TextSmaller>
            </View>
          )}
        </>
      ) : (
        <>
          {centerIcon && (
            <CustomIcon type={type} icon={icon} size={wp(6)} color={color} />
          )}
          {isLoading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <TextNormal textStyle={textStyle}>{text}</TextNormal>
          )}
        </>
      )}
      {calenderIcon && (
        <CustomIcon
          type="antdesign"
          icon="calendar"
          size={wp(6)}
          color={COLORS.lightGrey}
        />
      )}
      {Selection ? (
        <CustomIcon
          icon={isActive ? 'dot-fill' : 'dot'}
          type="octicons"
          size={wp(6)}
          color={isActive ? '#000' : '#ACACAC'}
          style={styles.eyeIcon}
        />
      ) : null}
    </TouchableOpacity>
  );
};

export default React.memo(CustomButton);

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(1),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(10),
    flexDirection: 'row',
    minHeight: hp(7),
    borderWidth: hp(0.15),
    borderColor: '#000',
  },
  primaryColor: {
    backgroundColor: COLORS.btnGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIcon: {
    flexDirection: 'row',
    paddingRight: wp(2),
    alignSelf: 'center',
  },
});
