import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import Header from '../../../components/common/Header';
import Customimage from '../../../components/common/customImage';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import {
  TextBig,
  TextNormal,
  TextSmaller,
} from '../../../components/common/customText';
import { COLORS } from '../../../utils/theme';
import CustomDatePicker from '../../../components/common/CustomDatePicker';
import RenderItem from './components/RenderItem';
import { useLazyGetDayExerciseQuery } from '../../../redux/Api/plan.api';

import moment from 'moment';
import useExerciseList from './Hooks/useExerciseList';

let list = [
  { id: 1, isCompleted: false },
  { id: 2, isCompleted: false },
  { id: 3, isCompleted: true },
];

const ExerciseList = ({ route, navigation }: any) => {
  const { data: items } = route.params || {};
  const {
    data,
    setData,
    percent,
    handleGetExercise,
    isLoading,
    isError,
    isFetching,
  } = useExerciseList(items?._id);

  const renderItem = useCallback(
    ({ item, index }: any) => {
      return (
        <RenderItem
          item={item}
          setData={setData}
          index={index}
          planId={data?.planId}
        />
      );
    },
    [list, setData, data],
  );

  return (
    <CustomWrapper edge={['top', 'bottom']}>
      <Header title={'Exercise Plan'} navigation={navigation} />
      {/* PROFILE BANNER */}

      <View
        style={{
          gap: widthPercentageToDP(4),
        }}
      >
        <View style={styles.profileBannerContainer}>
          <Customimage
            source={{ uri: items?.trainerProfile?.profileImage }}
            resizeMode={'cover'}
            style={styles.profileImage}
          />

          <View>
            <TextNormal
              color={COLORS?.appWhite}
              children={items?.firstName + ' ' + items?.lastName}
            />
            <TextSmaller
              color={COLORS?.appWhite}
              children={'Your Personal Trainer'}
            ></TextSmaller>
          </View>
        </View>
        {/*  */}
        {/* PROGRESS BANNER */}
        <View style={[styles.progressBannerContainer]}>
          <TextNormal bold children={'WorkOut Progress!'} />
          <View style={styles.progressBar}>
            <TextNormal bold children={`${percent}%`} />
          </View>
        </View>
      </View>

      {/* === */}

      <FlatList
        ListHeaderComponent={
          <View style={styles.dateContainer}>
            <TextNormal bold children={'Select Date'} />
            <CustomDatePicker
              onChange={(i: any) => {
                let date = encodeURIComponent(i.toString());
                setData([]);
                handleGetExercise(date);
              }}
            />
          </View>
        }
        data={data?.exercises || []}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.lisEmptyContainer}>
            {isLoading ||
              (isFetching && (
                <ActivityIndicator
                  size={'large'}
                  style={{ top: 30 }}
                  color={COLORS.Green}
                />
              ))}

            {data?.exercises?.length == 0 && (
              <TextBig
                center
                children={
                  'No Exercise Task ' + moment(data?.date).format('MMM DD YYYY')
                }
              />
            )}
          </View>
        }
      />

      {/*  */}
    </CustomWrapper>
  );
};

export default ExerciseList;

const styles = StyleSheet.create({
  profileBannerContainer: {
    borderRadius: widthPercentageToDP(5),
    backgroundColor: COLORS.IconBlack,
    flexDirection: 'row',
    padding: widthPercentageToDP(3),
    gap: widthPercentageToDP(3),
    alignItems: 'center',
  },

  progressBannerContainer: {
    borderRadius: widthPercentageToDP(5),

    flexDirection: 'row',
    padding: widthPercentageToDP(2),
    gap: widthPercentageToDP(3),
    alignItems: 'center',
    paddingHorizontal: widthPercentageToDP(3),
    justifyContent: 'space-between',
    backgroundColor: COLORS.lightGreen,
  },
  progressBar: {
    borderRadius: '100%',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',

    height: widthPercentageToDP(16),
    width: widthPercentageToDP(16),
  },
  profileImage: {
    height: widthPercentageToDP(13),
    width: widthPercentageToDP(13),
    borderRadius: widthPercentageToDP(13),
    borderWidth: 1,
    borderColor: COLORS.appWhite,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: widthPercentageToDP(4),
    alignSelf: 'center',
    paddingVertical: widthPercentageToDP(2),
  },
  lisEmptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: widthPercentageToDP(20),
  },
});
