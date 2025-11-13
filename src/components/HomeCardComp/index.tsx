import {View, Image, StyleSheet, Pressable, Text} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {ImagPath, Font} from '../../utils/ImagePath';
import {CustomIcon} from '../common/customIcons';
import {TextNormal, TextSmaller} from '../common/customText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Customimage from '../common/customImage';
import React, {Key} from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const HomeCardd = ({item, onPress, isLoading}: any) => {
  if (isLoading) {
    return (
      <SkeletonPlaceholder>
        <View
          style={{
            height: hp(30),
            width: wp(42),
            backgroundColor: 'red',
            borderRadius: wp(4),

            elevation: 5,
            shadowColor: '#000',
          }}></View>
      </SkeletonPlaceholder>
    );
  }
  const fullName = `${item?.firstName}${item?.lastName}`;
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={{position: 'relative'}}>
        <Customimage
          source={{uri: item?.trainerProfile?.profileImage}}
          style={{...styles.profile}}
          resizeMode={'cover'}
        />

        <View style={styles.ratingView}>
          <CustomIcon
            icon="star"
            type={'antdesign'}
            size={wp(4)}
            color="#FFC403"
            style={{width: wp(4), marginRight: wp(1)}}
          />
          <TextSmaller>{item?.trainerProfile?.rating}</TextSmaller>
        </View>
      </View>

      <TextNormal
        numberOfLines={1}
        textStyle={{fontFamily: Font.semiBold, marginVertical: hp(1)}}>
        {fullName.trim()}
      </TextNormal>

      <View style={styles.specialtiesContainer}>
        {item?.trainerProfile?.specialization?.map(
          (specialty: any, index: any) => (
            <View
              key={index}
              style={{
                ...styles.speciality,
                backgroundColor:
                  index === 0
                    ? '#F0EDFF'
                    : index === 1
                    ? '#ECFBE2'
                    : index === 2
                    ? '#FEEDEA'
                    : '#F0EDFF',
              }}>
              <TextSmaller
                textStyle={{
                  fontSize: RFValue(8),
                  color:
                    index === 0
                      ? '#9281FF'
                      : index === 1
                      ? '#72E427'
                      : index === 2
                      ? '#F88670'
                      : '#9281FF',
                }}>
                {specialty}
              </TextSmaller>
            </View>
          ),
        )}
      </View>

      <View style={{flexDirection: 'row', marginTop: hp(1)}}>
        <CustomIcon
          type="fontisto"
          icon="stopwatch"
          color="#7CE339"
          size={wp(4)}
          style={{width: wp(4), marginRight: wp(1)}}
        />

        <TextSmaller>{item?.experience}</TextSmaller>
      </View>
    </Pressable>
  );
};

export const HomeCard = React.memo(HomeCardd);

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: wp(4),
    padding: wp(2),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },

  profile: {
    width: '100%',
    height: hp(20),
    borderRadius: wp(4),
  },
  ratingView: {
    flexDirection: 'row',
    padding: wp(0.5),
    backgroundColor: '#484848BF',
    borderRadius: wp(6),
    width: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: wp(2),
    top: hp(1),
  },
  speciality: {
    padding: wp(1),
    paddingHorizontal: wp(2),
    borderRadius: wp(10),
    margin: wp(1),
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  namePlaceholder: {
    width: '70%',
    height: hp(2.5),
    marginTop: hp(1),
    borderRadius: wp(1),
  },

  specialtyPlaceholder: {
    width: wp(20),
    height: hp(2.5),
    borderRadius: wp(10),
    marginRight: wp(1.5),
    marginBottom: hp(0.5),
  },
  experiencePlaceholder: {
    width: '40%',
    height: hp(2),
    marginTop: hp(1),
    borderRadius: wp(1),
  },
});
