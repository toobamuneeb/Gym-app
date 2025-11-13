import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {lazy, Suspense, useCallback, useEffect, useState} from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import HorizontalDatePicker from '../../../components/common/customCalender';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {
  TextBigger,
  TextBiggest,
  TextNormal,
} from '../../../components/common/customText';
import {Font, ImagPath} from '../../../utils/ImagePath';
import CustomPLan from '../../../components/customPlan';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {ScreenNames} from '../../../navigations/ScreenName';
import {COLORS} from '../../../utils/theme';
import {useHome} from './useHome';
import DietPlanButton from '../../../components/customPlan/dietPlan';
import WorkoutPlanButton from '../../../components/customPlan/workoutPlan';
import socketServices from '../../../utils/socketservice';
import {HomeCard} from '../../../components/HomeCardComp';
import {useManualRefresh} from '../../../hooks/RefreshControl';
import CustomSearchInput from '../../../components/common/customSearchInput';
import {useFocusEffect} from '@react-navigation/native';

const Home = React.memo(({navigation}: any) => {
  const Tab_Height = useBottomTabBarHeight();

  const {
    trainerData,
    todaysPlan,
    loadMoreTrainers,
    isLoading,
    refetchTrainers,
    trainerLoading,
    trainerIsFetching,
    hasMorePages,
    error,
    initialLoading,
    searchTrainer,
    handleSearch,
  } = useHome();

  const {meals, exercises} = React.useMemo(
    () => ({
      meals: todaysPlan.data?.meals || [],
      exercises: todaysPlan.data?.exercises || [],
    }),
    [todaysPlan.data],
  );

  const trainerDataa = React.useMemo(
    () => (initialLoading ? [...Array(4)] : trainerData || []),
    [trainerLoading, trainerData],
  );

  const handleNavigation = React.useCallback(
    (name: string, data: any) => navigation.navigate(name, {data}),
    [navigation],
  );

  const handleDietPress = React.useCallback(
    () => handleNavigation(ScreenNames.DIET_PALN, 'diet'),
    [handleNavigation],
  );

  const handleWorkoutPress = React.useCallback(
    () => handleNavigation(ScreenNames.DIET_PALN, 'workout'),
    [handleNavigation],
  );

  useEffect(() => {
    socketServices.initializeSocket();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      refetchTrainers();
    }, []),
  );
  const renderItem = useCallback(
    ({item, index}: {item: any; index: number}) => (
      <HomeCard
        item={item}
        onPress={() => handleNavigation(ScreenNames.ABOUT, item)}
        isLoading={trainerLoading}
      />
    ),
    [handleNavigation, isLoading.isRefresh],
  );

  const listHeader = () => {
    return (
      <>
        {todaysPlan.data && (
          <View>
            <TextBiggest textStyle={styles.plan}>Plan</TextBiggest>
            <DietPlanButton
              meals={meals}
              onPress={() => {
                handleDietPress();
              }}
            />

            <WorkoutPlanButton
              exercises={exercises}
              onPress={() => {
                handleWorkoutPress();
              }}
            />
          </View>
        )}
      </>
    );
  };

  return (
    <CustomWrapper edge={['top']} containerStyle={{paddingTop: hp(1.5)}}>
      <HorizontalDatePicker
        header
        onPressNotification={() => {
          navigation.navigate('notification');
        }}
        onPressProfile={() => {
          navigation.navigate('Profile');
        }}
      />

      {todaysPlan.data ? (
        listHeader()
      ) : (
        <>
          <CustomSearchInput
            placeholder="Search Trainer"
            onChangeText={handleSearch}
            value={searchTrainer}
          />

          <View style={{flex: 1, marginBottom: Tab_Height}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={() => (
                <TextBiggest textStyle={styles.plan}>
                  Select Trainer
                </TextBiggest>
              )}
              ListEmptyComponent={() => {
                if (initialLoading || isLoading.isRefresh || error) {
                  return null;
                }
                return (
                  <TextNormal
                    textStyle={{alignSelf: 'center', marginTop: hp(2)}}>
                    No Data Found
                  </TextNormal>
                );
              }}
              numColumns={2}
              refreshControl={
                <RefreshControl
                  refreshing={isLoading.isRefresh && !trainerIsFetching}
                  onRefresh={refetchTrainers}
                  tintColor={'#c4c4c4'}
                />
              }
              onEndReached={loadMoreTrainers}
              data={trainerDataa}
              columnWrapperStyle={{
                justifyContent: 'space-between',
                padding: wp(1),
                marginBottom: hp(1),
              }}
              keyExtractor={(item, index) => item?._id || index.toString()}
              renderItem={renderItem}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                isLoading.isLoadMore ? (
                  <ActivityIndicator color={COLORS.btnBlack} size={hp(3)} />
                ) : !isLoading.isLoadMore &&
                  !isLoading.isRefresh &&
                  !hasMorePages &&
                  trainerDataa.length ? (
                  <TextNormal
                    style={{
                      color: '#000',
                      textAlign: 'center',
                      fontFamily: Font.medium,
                    }}>
                    You have reached the end !
                  </TextNormal>
                ) : error && !isLoading.isLoadMore && !isLoading.isRefresh ? (
                  <TextNormal style={{color: 'red', alignSelf: 'center'}}>
                    {'Error fetching data'}
                  </TextNormal>
                ) : null
              }
            />
          </View>
        </>
      )}
    </CustomWrapper>
  );
});

export default Home;

const styles = StyleSheet.create({
  plan: {
    fontFamily: Font.bold,
    marginVertical: hp(1),
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(5),
  },
});
