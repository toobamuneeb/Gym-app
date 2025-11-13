import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {CustomIcon} from '../common/customIcons';
import Customimage from '../common/customImage';
import {TextBig, TextSmall, TextSmaller} from '../common/customText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {Client} from './interface';

const DEFAULT_PROFILE_IMAGE = 'https://www.example.com/default-profile.png';

interface ClientCompProps {
  item: Client;
  index: number;
  onPress?: () => void;
  loading?: boolean;
  dataCheck?: any;
}
const ClientComp = ({
  item,
  index,
  onPress,
  loading = false,
  dataCheck,
}: ClientCompProps) => {
  if (loading) {
    return (
      <View style={styles.mainView}>
        <SkeletonPlaceholder borderRadius={wp(14)}>
          <View style={styles.skeletonContainer}>
            <View style={styles.profileImage} />
            <View style={styles.textContainer}>
              <View
                style={{
                  width: wp(40),
                  height: hp(2),
                  borderRadius: wp(1),
                  marginVertical: hp(1),
                }}
              />
              <View
                style={{
                  width: wp(30),
                  height: hp(1.5),
                  borderRadius: wp(1),
                  marginTop: hp(0.5),
                }}
              />
            </View>
            <View
              style={{
                width: wp(5),
                height: wp(5),
                borderRadius: wp(5),
                backgroundColor: 'red',
              }}
            />
          </View>
        </SkeletonPlaceholder>
      </View>
    );
  }
  if (!item) {
    return null;
  }
  const fullName = item?.userID
    ? `${item?.userID?.firstName} ${item?.userID?.lastName}`
    : `${item?.firstName} ${item?.lastName}`;
  const profileImage = item.userID
    ? {uri: item?.userID?.traineeProfile?.profileImage}
    : {uri: item?.profileImage};


  return (
    <Pressable onPress={onPress} style={styles.mainView}>
      <Customimage
        source={profileImage}
        style={styles.profileImage}
        resizeMode={'cover'}
      />

      <View style={{flex: 1, marginLeft: wp(4)}}>
        <TextBig numberOfLines={1}>{fullName}</TextBig>
        {/* <TextSmaller
          numberOfLines={1}
          textStyle={{fontSize: RFValue(10), color: 'gray'}}>
          {item?.userID?.email}
        </TextSmaller>
        {item.status && (
          <TextSmaller
            numberOfLines={1}
            textStyle={{
              fontSize: RFValue(8),
              color: item.status === 'accepted' ? 'green' : 'orange',
              marginTop: hp(0.5),
            }}>
            {item.status.toUpperCase()}
          </TextSmaller>
        )} */}
      </View>

      <CustomIcon
        icon="chevron-forward"
        type="ionicons"
        size={wp(5)}
        color="#BBBBBB"
      />
    </Pressable>
  );
};

export default React.memo(ClientComp, (prevProps, nextProps) => {
  return (
    prevProps.item?._id === nextProps.item?._id &&
    prevProps.loading === nextProps.loading
  );
});
const styles = StyleSheet.create({
  profileImage: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(14),
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 3,
    borderRadius: wp(4),
    margin: hp(1),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingVertical: hp(2),
    paddingHorizontal: hp(1.5),
  },
  skeletonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginLeft: wp(4),
    // justifyContent: 'center',
  },
});
