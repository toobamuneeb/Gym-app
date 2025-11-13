import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  TextBigger,
  TextBiggest,
  TextHuge,
  TextNormal,
  TextSmall,
} from '../customText';
import {Font, ImagPath} from '../../../utils/ImagePath';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomIcon} from '../customIcons';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Customimage from '../customImage';
import {HeaderProps} from './interface';
import {COLORS} from '../../../utils/theme';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

const Header = ({
  HomeScreen,
  navigation,
  title,
  containerStyle,
  color,
  message,
  headingStyle,
  onPressNotification,
  onPressProfile,
  trainerHome,
  trainerProfile,
  onBackPress,
}: HeaderProps) => {
  const userData = useSelector((state: RootState) => state.generalSlice.data);

  return (
    <>
      {HomeScreen ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: trainerHome ? 'flex-end' : 'center',
            justifyContent: 'space-between',
            marginTop: trainerHome ? heightPercentageToDP(2) : 0,
          }}>
          <View>
            {trainerHome && (
              <TextSmall textStyle={{color: '#929292'}}>
                Welcome Back!
              </TextSmall>
            )}
            <TextBiggest
              textStyle={{
                fontFamily: Font.bold,
              }}>
              {title}
            </TextBiggest>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomIcon
              style={{width: widthPercentageToDP(6)}}
              type="feather"
              icon="bell"
              size={widthPercentageToDP(6)}
              onPress={onPressNotification}
            />

            <Customimage
              onPress={onPressProfile}
              source={{
                uri:
                  userData.role === 'user'
                    ? userData?.traineeProfile?.profileImage
                    : userData?.trainerProfile?.profileImage || '',
              }}
              style={{
                height: widthPercentageToDP(12),
                width: widthPercentageToDP(12),
                borderRadius: widthPercentageToDP(12),
                marginLeft: widthPercentageToDP(2),
                borderColor: trainerHome ? COLORS.Icongreen : '#E86144',
                borderWidth: heightPercentageToDP(0.2),
              }}
            />
          </View>
        </View>
      ) : (
        <View
          style={{
            ...styles.container,
            borderBottomWidth: message ? 1 : 0,
            paddingVertical: message ? heightPercentageToDP(1) : 0,
            paddingBottom: message ? heightPercentageToDP(2) : 0,
            ...containerStyle,
          }}>
          <Pressable
            onPress={
              typeof onBackPress === 'function'
                ? onBackPress
                : () => navigation.goBack()
            }
            style={{
              width: widthPercentageToDP(6),
            }}>
            <CustomIcon
              type="antdesign"
              icon="arrowleft"
              size={widthPercentageToDP(6)}
              color={color}
            />
          </Pressable>

          {message && (
            <Customimage
              // source={trainerProfile || ImagPath.aboutTrainer}
              source={{uri: trainerProfile}}
              style={styles.storyImage}
              resizeMode={'cover'}
            />
          )}

          {message ? (
            <TextNormal style={{fontFamily: Font.semiBold}}>{title}</TextNormal>
          ) : (
            <TextHuge
              textStyle={{
                ...styles.heading,
                flex: message ? 0 : 1,
                ...headingStyle,
              }}>
              {title}
            </TextHuge>
          )}
        </View>
      )}
    </>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPercentageToDP(2),
    borderColor: '#E5EBF1',
  },
  storyImage: {
    width: widthPercentageToDP(11),
    height: widthPercentageToDP(11),
    borderRadius: widthPercentageToDP(11),
    marginHorizontal: widthPercentageToDP(3),
  },
  heading: {
    fontFamily: Font.bold,
    fontSize: RFValue(22),

    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
