import {Alert, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import Header from '../../../components/common/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomIcon} from '../../../components/common/customIcons';
import Customimage from '../../../components/common/customImage';
import {
  TextBigger,
  TextBiggest,
  TextNormal,
  TextSmall,
  TextSmaller,
} from '../../../components/common/customText';
import {Font} from '../../../utils/ImagePath';
import {COLORS} from '../../../utils/theme';
import {AirbnbRating, Rating as Ratingg} from 'react-native-ratings';
import useRating from './useRating';

const Rating = ({navigation, onPress}: any) => {
  const {handleRating, isLoading} = useRating();
  const submitRating = async (rating: any) => {
    let payload = {
      trainerID: '682f9be600ec9303575292fe',
      rating: rating,
    };
    handleRating(payload);
  };
  return (
    <CustomWrapper>
      <Header title={'Rate the trianer'} navigation={navigation} />

      <TextBigger textStyle={styles.plan}>Trainer</TextBigger>
      <Pressable onPress={onPress} style={styles.mainView}>
        <Customimage
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuNhTZJTtkR6b-ADMhmzPvVwaLuLdz273wvQ&s',
          }}
          style={styles.profileImage}
          resizeMode={'cover'}
        />

        <View style={{flex: 1, marginLeft: wp(4)}}>
          <TextSmall numberOfLines={1}>Trainer</TextSmall>
          <TextSmaller
            numberOfLines={1}
            textStyle={{fontSize: RFValue(10), color: 'gray'}}>
            Wihggy
          </TextSmaller>
        </View>
      </Pressable>

      <TextBigger textStyle={styles.plan}>Training Review</TextBigger>
      <TextSmall style={{color: COLORS.textGray}}>
        Share your thoughts about trianer
      </TextSmall>

      <Ratingg
        ratingBackgroundColor="#c8c7c8"
        ratingCount={5}
        imageSize={30}
        startingValue={0}
        onFinishRating={submitRating}
        style={{paddingVertical: hp(2), alignSelf: 'flex-start'}}
      />
    </CustomWrapper>
  );
};

export default Rating;

const styles = StyleSheet.create({
  HeadrPadding: {marginHorizontal: wp(5)},
  profileImage: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(14),
  },
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: hp(1),
  },
  plan: {
    fontFamily: Font.semiBold,
    marginTop: hp(2),
  },
});
