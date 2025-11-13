import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {widthPercentageToDP} from 'react-native-responsive-screen';
import {Font, ImagPath} from '../../utils/ImagePath';
import Customimage from '../common/customImage';
import {COLORS} from '../../utils/theme';
import {
  TextBig,
  TextBigger,
  TextHuge,
  TextNormal,
  TextSmall,
} from '../common/customText';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomIcon} from '../common/customIcons';
import {RootState} from '../../redux/store';
import {useSelector} from 'react-redux';

interface Props {
  profileName?: string;
  email?: string;
  mainContainer?: ViewStyle;
  onPress: () => void;
}

const ProfileHeader = ({profileName, email, mainContainer, onPress}: Props) => {
  const userData = useSelector((state: RootState) => state.generalSlice.data);
  return (
    <Pressable
      onPress={onPress}
      style={{...styles.mainContainer, ...mainContainer}}>
      <Customimage
        source={{
          uri:
            userData?.traineeProfile?.profileImage ||
            userData?.trainerProfile?.profileImage,
        }}
        style={styles.storyImage}
        resizeMode={'cover'}
      />

      <View style={{flex: 1}}>
        <TextBig numberOfLines={1} textStyle={{fontFamily: Font.semiBold}}>
          {profileName}
        </TextBig>
        <TextSmall numberOfLines={1} textStyle={{fontFamily: Font.regular}}>
          {email}
        </TextSmall>
      </View>

      <CustomIcon
        type="materialCommunityIcons"
        icon="account-edit-outline"
        size={widthPercentageToDP(6)}
        color={'#469811'}
      />
    </Pressable>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  storyImage: {
    width: widthPercentageToDP(12),
    height: widthPercentageToDP(12),
    borderRadius: widthPercentageToDP(11),
    marginHorizontal: widthPercentageToDP(3),
  },
  mainContainer: {
    backgroundColor: '#9FE87040',
    borderRadius: widthPercentageToDP(4),
    padding: widthPercentageToDP(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
