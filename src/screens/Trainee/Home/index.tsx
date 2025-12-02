import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import HorizontalDatePicker from '../../../components/common/customCalender';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { TextBiggest, TextNormal } from '../../../components/common/customText';
import { Font } from '../../../utils/ImagePath';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ScreenNames } from '../../../navigations/ScreenName';
import { COLORS } from '../../../utils/theme';
import { useHome } from './useHome';
import DietPlanButton from '../../../components/customPlan/dietPlan';
import WorkoutPlanButton from '../../../components/customPlan/workoutPlan';
import socketServices from '../../../utils/socketservice';
import { HomeCard } from '../../../components/HomeCardComp';
import CustomSearchInput from '../../../components/common/customSearchInput';
import { useFocusEffect } from '@react-navigation/native';

const Home = React.memo(({ navigation }: any) => {
  const Tab_Height = useBottomTabBarHeight();
  const [type, setType] = useState<string>('all');
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
  } = useHome({ type: type });

  const { meals, exercises } = React.useMemo(
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
    (name: string, data: any) => navigation.navigate(name, { data }),
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
      refetchTrainers(type);
    }, [type]),
  );
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
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
    <CustomWrapper edge={['top']} containerStyle={{}}>
      <HorizontalDatePicker
        onPressNotification={() => {
          navigation.navigate('notification');
        }}
        onPressProfile={() => {
          navigation.navigate('Profile');
        }}
      />

      {/* listHeader()
      ) : ( */}

      {/* {todaysPlan.data && ( */}
      <>
        <CustomSearchInput
          placeholder="Search Trainer"
          onChangeText={handleSearch}
          value={searchTrainer}
        />

        <View style={{ flex: 1, marginBottom: Tab_Height }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
              <Pressable onPress={() => {}} style={styles.tabContainer}>
                <TextNormal
                  onPress={() => {
                    setType('all');
                  }}
                  style={
                    type == 'all'
                      ? styles.tabActiveStyle
                      : styles.tabUnActiveStyle
                  }
                  children={'All Trainers'}
                />
                <TextNormal
                  onPress={() => {
                    setType('assigned');
                  }}
                  style={
                    type !== 'all'
                      ? styles.tabActiveStyle
                      : styles.tabUnActiveStyle
                  }
                  children={'Assign Trainers'}
                />
              </Pressable>
            )}
            ListEmptyComponent={
              <>
                {trainerDataa?.length == 0 && !trainerIsFetching && (
                  <TextNormal
                    textStyle={{ alignSelf: 'center', marginTop: hp(2) }}
                  >
                    No Data Found
                  </TextNormal>
                )}

                {trainerIsFetching && (
                  <ActivityIndicator
                    style={{ paddingTop: 50 }}
                    size={'large'}
                    color={COLORS.Green}
                  />
                )}
              </>
            }
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
                  }}
                >
                  You have reached the end !
                </TextNormal>
              ) : error && !isLoading.isLoadMore && !isLoading.isRefresh ? (
                <TextNormal style={{ color: 'red', alignSelf: 'center' }}>
                  {'Error fetching data'}
                </TextNormal>
              ) : null
            }
          />
        </View>
      </>
      {/* )} */}
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
  tabActiveStyle: {
    backgroundColor: COLORS.Green,
    padding: wp(2),
    borderRadius: wp(6),
    fontFamily: Font.bold,
    color: COLORS.appWhite,
    paddingHorizontal: wp(3),
  },
  tabUnActiveStyle: {
    padding: wp(2),
    borderRadius: wp(6),
    fontFamily: Font.bold,
    borderWidth: 0.6,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: wp(3),
  },
});
