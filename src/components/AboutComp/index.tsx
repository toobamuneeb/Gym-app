import {
  FlatList,
  ImageBackground,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import CustomWrapper from '../../components/Wrappers/CustomWrapper';
import Customimage from '../../components/common/customImage';
import {Font, ImagPath} from '../../utils/ImagePath';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomHeader from '../../components/common/customHeader';
import {Rating, AirbnbRating} from 'react-native-ratings';

import {
  TextBig,
  TextBigger,
  TextNormal,
  TextSmall,
  TextSmaller,
} from '../../components/common/customText';
import {CustomIcon} from '../../components/common/customIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import Video, {VideoRef} from 'react-native-video';
import CustomButton from '../common/customButton';
const CustomAboutCard = ({navigation, data}: any) => {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const videoRef = useRef<VideoRef>(null);
  const reviewsPerPage = 3;
  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + reviewsPerPage);
  };
  const reviewsToShow = data?.reviews?.slice(0, visibleReviews);
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={{uri: data?.trainerProfile?.profileImage}}
        // source={{uri: data?.profileImage}}
        style={{width: '100%', height: hp(40)}}
        resizeMode={'cover'}>
        <CustomHeader
          containerStyle={{marginLeft: wp(5)}}
          navigation={navigation}
          color="#fff"
        />
      </ImageBackground>

      <View style={{paddingHorizontal: wp(5), flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextBigger
            numberOfLines={1}
            textStyle={{fontFamily: Font.bold, marginVertical: hp(1), flex: 1}}>
            {data?.firstName?.length + data?.lastName?.length > 15
              ? data.firstName.slice(0, 7) +
                ' ' +
                data?.lastName?.slice(0, 7) +
                '...'
              : data.firstName + ' ' + data.lastName}
          </TextBigger>

          <View style={styles.ratingView}>
            <CustomIcon
              icon="star"
              type={'antdesign'}
              size={wp(4)}
              color="#FFC403"
              style={{width: wp(4), marginRight: wp(1)}}
            />
            <TextSmaller>{data?.trainerProfile?.rating}</TextSmaller>
            {/* <TextSmaller>{data?.rating}</TextSmaller> */}
          </View>
        </View>
        <View style={styles.specialtiesContainer}>
          {data?.trainerProfile?.specialization?.map(
            // {data?.specialization?.map(
            (specialty: any, index: number) => (
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

          <TextSmaller>{data?.experience}</TextSmaller>
        </View>

        <TextBig textStyle={{fontFamily: Font.semiBold, marginVertical: hp(1)}}>
          About
        </TextBig>

        {data?.about?.map((i: any, index: number) => (
          <View key={index}>
            <TextSmall numberOfLines={showFullText ? undefined : 3}>
              {i?.desc}
            </TextSmall>

            <CustomButton
              onPress={() => {
                toggleText();
              }}
              text={showFullText ? 'Show Less' : 'Read More'}
              containerStyle={styles.readmore}
              textStyle={{
                color: '#7BD942',
                fontFamily: Font.semiBold,
                fontSize: RFValue(12),
              }}
            />

            {i?.video && (
              <View style={styles.videoView}>
                <Video
                  poster={i?.image}
                  source={{
                    uri: i?.video,
                  }}
                  posterResizeMode="cover"
                  ref={videoRef}
                  style={styles.backgroundVideo}
                  controls
                  resizeMode="stretch"
                  playInBackground={false}
                />
              </View>
            )}
          </View>
        ))}

        <TextBig textStyle={{fontFamily: Font.semiBold, marginVertical: hp(2)}}>
          Reviews
        </TextBig>

        {data?.reviews?.length >= 1 ? (
          reviewsToShow?.map((i: any, index: number) => (
            <View key={index} style={styles.ratingContainer}>
              <AirbnbRating
                count={5}
                defaultRating={i?.Rating}
                size={wp(4)}
                isDisabled
                reviews={['']}
                reviewSize={0.1}
              />

              <TextNormal
                textStyle={{
                  fontFamily: Font.bold,
                  marginVertical: hp(1),
                }}>
                {i?.userName}
              </TextNormal>

              <TextSmall>{i?.rev}</TextSmall>

              {i?.image && (
                <View style={{width: '100%'}}>
                  <Customimage
                    btnStyle={{width: '33%'}}
                    source={i.image}
                    style={styles.reviewImage}
                  />
                </View>
              )}
            </View>
          ))
        ) : (
          <TextSmall textStyle={{textAlign: 'center', color: 'gray'}}>
            No Reviews
          </TextSmall>
        )}

        {data?.reviews?.length > visibleReviews && (
          <Pressable onPress={loadMoreReviews} style={styles.reviewBtn}>
            <TextNormal
              textStyle={{color: '#7BD942', fontFamily: Font.semiBold}}>
              View all reviews (10)
            </TextNormal>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default CustomAboutCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: wp(4),
    padding: wp(2),
    elevation: 5,
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
    // position: 'absolute',
    // right: wp(2),
    // top: hp(1),
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
  ratingContainer: {
    width: '100%',
    borderRadius: wp(4),
    marginBottom: hp(2),
    padding: wp(4),
    paddingTop: 0,
    backgroundColor: '#F4F4F4',
    alignItems: 'flex-start',
  },
  backgroundVideo: {
    width: '100%',
    height: '100%',
  },
  videoView: {
    width: '100%',
    height: hp(30),
    borderRadius: wp(4),
    marginTop: hp(2),
    overflow: 'hidden',
  },

  reviewImage: {
    width: '100%',
    borderRadius: wp(2),
    height: hp(15),
    marginVertical: hp(1),
  },
  reviewBtn: {
    alignItems: 'center',
    padding: wp(2),
    borderRadius: wp(4),
    marginBottom: hp(2),
  },
  readmore: {
    backgroundColor: 'transparent',
    // backgroundColor:"red",
    borderWidth: 0,

    justifyContent: 'flex-start',
    // height:0,
    padding: 0,
    minHeight: 0,
  },
});
