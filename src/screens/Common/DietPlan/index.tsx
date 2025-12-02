import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';

import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  ScrollView,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../../components/common/customButton';
import { CustomIcon } from '../../../components/common/customIcons';
import CustomModel from '../../../components/common/customModel';
import {
  TextBiggest,
  TextSmall,
  TextBigger,
  TextNormal,
  TextSmaller,
} from '../../../components/common/customText';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import { Font } from '../../../utils/ImagePath';
import { COLORS } from '../../../utils/theme';
import Header from '../../../components/common/Header';
import Collapsible from 'react-native-collapsible';
import { useSafeTabHeight } from '../../../hooks/BottomBarHeight';
import { ScreenNames } from '../../../navigations/ScreenName';
import { RFValue } from 'react-native-responsive-fontsize';

import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { useHome } from '../../Trainee/Home/useHome';
import { useGetbyIDQuery } from '../../../redux/Api/plan.api';
import moment from 'moment';
import CustomWebViewVideoPlayer from '../../../components/common/customWebViewVideoPlayer';
import Customimage from '../../../components/common/customImage';

const days = [
  {
    day: 'Monday',
    exercises: [
      {
        description: '4 sets, 8 reps',
        name: 'Bench Press',
        _id: '681b7b754f4a713d6e3b4401',
      },

      {
        description: '4 sets, 8 reps',
        name: 'Cross Arm',
        _id: '681b7b754f4a713d6e3b4402',
      },
    ],
    meals: [
      {
        subHeading: 'Breakfast',
        items: [
          {
            name: 'Protein Shake',
            quantity: '300ml',
            _id: '681b7b754f4a713d6e3b43f9',
          },

          {
            name: 'Scrambled Eggs',
            quantity: '3 Eggs',
            _id: '681b7b754f4a713d6e3b43fa',
          },
        ],
      },
    ],
  },
  {
    day: 'Tuesday',
    exercises: [
      {
        description: '4 sets, 8 reps',
        name: 'Bench Press',
        _id: '681b7b754f4a713d6e3b4401',
      },

      {
        description: '4 sets, 8 reps',
        name: 'Cross Arm',
        _id: '681b7b754f4a713d6e3b4402',
      },
    ],
    meals: [
      {
        subHeading: 'Breakfast',
        items: [
          {
            name: 'Protein Shake',
            quantity: '300ml',
            _id: '681b7b754f4a713d6e3b43f9',
          },

          {
            name: 'Scrambled Eggs',
            quantity: '3 Eggs',
            _id: '681b7b754f4a713d6e3b43fa',
          },
        ],
      },
    ],
  },
  {
    day: 'Wednesday',
    exercises: [
      {
        description: '4 sets, 8 reps',
        name: 'Bench Press',
        _id: '681b7b754f4a713d6e3b4401',
      },

      {
        description: '4 sets, 8 reps',
        name: 'Cross Arm',
        _id: '681b7b754f4a713d6e3b4402',
      },
    ],
    meals: [
      {
        subHeading: 'Breakfast',
        items: [
          {
            name: 'Protein Shake',
            quantity: '300ml',
            _id: '681b7b754f4a713d6e3b43f9',
          },

          {
            name: 'Scrambled Eggs',
            quantity: '3 Eggs',
            _id: '681b7b754f4a713d6e3b43fa',
          },
        ],
      },
    ],
  },
  {
    day: 'Thursday',
    exercises: [
      {
        description: '4 sets, 8 reps',
        name: 'Bench Press',
        _id: '681b7b754f4a713d6e3b4401',
      },

      {
        description: '4 sets, 8 reps',
        name: 'Cross Arm',
        _id: '681b7b754f4a713d6e3b4402',
      },
    ],
    meals: [
      {
        subHeading: 'Breakfast',
        items: [
          {
            name: 'Protein Shake',
            quantity: '300ml',
            _id: '681b7b754f4a713d6e3b43f9',
          },

          {
            name: 'Scrambled Eggs',
            quantity: '3 Eggs',
            _id: '681b7b754f4a713d6e3b43fa',
          },
        ],
      },
    ],
  },
  {
    day: 'Friday',
    exercises: [
      {
        description: '4 sets, 8 reps',
        name: 'Bench Press',
        _id: '681b7b754f4a713d6e3b4401',
      },

      {
        description: '4 sets, 8 reps',
        name: 'Cross Arm',
        _id: '681b7b754f4a713d6e3b4402',
      },
    ],
    meals: [
      {
        subHeading: 'Breakfast',
        items: [
          {
            name: 'Protein Shake',
            quantity: '300ml',
            _id: '681b7b754f4a713d6e3b43f9',
          },

          {
            name: 'Scrambled Eggs',
            quantity: '3 Eggs',
            _id: '681b7b754f4a713d6e3b43fa',
          },
        ],
      },
    ],
  },
];
const DietPlan = ({ navigation, route }: any) => {
  const isRole = useSelector(
    (state: RootState) => state.generalSlice.data.role,
  );

  const { data: RouteData, traineeID } = route.params || { data: 'diet' };

  const [diet, setwork] = useState(RouteData || RouteData.data);
  const [activeIndex, setActiveIndex] = useState(null);
  const Tab_Height = useSafeTabHeight();
  const { plansData } = useHome({
    traineeID: traineeID,
    checkTraineeID: traineeID ? true : false,
  });
  useFocusEffect(
    React.useCallback(() => {
      plansData.refetch();
    }, [plansData.refetch]),
  );

  console.log({ isRole });

  const [open, setopen] = useState(false);
  const toggleSection = (index: any) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };
  const renderItem = ({ item, index }: { item: any; index: number }) => {
    return (
      <View key={index} style={styles.section}>
        <Pressable
          onPress={() => toggleSection(index)}
          style={{ paddingHorizontal: wp(4), paddingVertical: wp(2) }}
        >
          <View style={styles.header}>
            <View>
              <TextBigger bold color={COLORS.Green}>
                {moment(item?.day).format('dddd')}
              </TextBigger>
              <TextSmaller>
                {moment(item?.day).format('YYYY MMM DD')}
              </TextSmaller>
            </View>
            <CustomIcon
              icon={activeIndex === index ? 'chevron-up' : 'chevron-down'}
              type="feather"
              size={wp(6)}
              color="gray"
            />
          </View>

          {/* <TextSmall style={{}}>24 January 2024</TextSmall> */}
        </Pressable>
        <Collapsible collapsed={activeIndex !== index}>
          {diet === 'diet' ? (
            <View style={{ marginVertical: hp(1), paddingHorizontal: wp(4) }}>
              {item?.meals.map((mealGroup: any, mealIndex: number) => (
                <View
                  key={`${item.id}-${mealIndex}`}
                  style={[
                    styles.mealSection,
                    mealIndex === item?.meals.length - 1 && {
                      marginBottom: 0,
                      borderBottomWidth: 0,
                    },
                  ]}
                >
                  <View>
                    <TextSmall style={styles.subHeadingText}>
                      {mealGroup.subHeading}
                    </TextSmall>
                  </View>

                  {mealGroup.items.map((meal: any, itemIndex: number) => (
                    <Pressable
                      key={meal?._id}
                      onPress={() => {
                        isRole === 'coach' &&
                          navigation.navigate(
                            ScreenNames.CLIENTS_REGISTER2,

                            {
                              data: {
                                planId: plansData?.data?.data?._id,
                                type: 'edit',
                                mealId: mealGroup?._id,
                                itemId: meal?._id,
                                name: meal?.name,
                                quantity: meal?.quantity,
                              },
                            },
                          );
                      }}
                      style={styles.row}
                    >
                      <View
                        key={`${item.id}-${mealIndex}-${itemIndex}`}
                        style={[
                          styles.sec,
                          itemIndex === mealGroup.items.length - 1 &&
                            styles.lastItem,
                        ]}
                      >
                        <TextSmall>{meal.name}</TextSmall>
                        <TextSmall textStyle={styles.downText}>
                          {meal.quantity}
                        </TextSmall>
                      </View>
                      {isRole == 'coach' && (
                        <CustomIcon type="feather" icon="edit" size={20} />
                      )}
                    </Pressable>
                  ))}
                </View>
              ))}
            </View>
          ) : (
            <View style={{ marginVertical: hp(1), paddingHorizontal: wp(4) }}>
              {item?.exercises?.map((exerItem: any, exerIndex: number) => (
                <View
                  key={`${item.id}-${exerIndex}`}
                  style={[
                    styles.mealSection,
                    exerIndex === item?.exercises.length - 1 && {
                      marginBottom: 0,
                      borderBottomWidth: 0,
                    },
                  ]}
                >
                  <View style={styles.sec}>
                    <View style={styles.row}>
                      <TextSmall>{exerItem.name}</TextSmall>
                      {isRole == 'coach' && (
                        <CustomIcon
                          onPress={() => {
                            console.log(exerItem?.secs);
                            const parts =
                              exerItem?.description?.split(' ') || [];
                            navigation.navigate(
                              ScreenNames.CLIENTS_REGISTER3,

                              {
                                data: {
                                  planId: plansData?.data?.data?._id,
                                  type: 'edit',
                                  name: exerItem.name,
                                  sets: parts[0],
                                  repetition: parts[parts.length - 1],
                                  secs: exerItem?.secs,
                                  exercise: exerItem?._id,
                                  itemId: exerItem?._id,
                                  video: exerItem?.video,
                                },
                              },
                            );
                          }}
                          type="feather"
                          icon="edit"
                          size={20}
                        />
                      )}
                    </View>
                    <TextSmall textStyle={styles.downText}>
                      {exerItem?.description}
                    </TextSmall>

                    {isRole == 'coach' && (
                      <CustomWebViewVideoPlayer uri={exerItem?.video} />
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}
        </Collapsible>
      </View>
    );
  };
  useEffect(() => {
    if (RouteData) {
      setwork(RouteData);
    }

    return () => setwork('diet');
  }, [RouteData]);
  return (
    <CustomWrapper edge={['top']} containerStyle={{}}>
      <Header
        title={diet === 'diet' ? 'Diet Plan' : 'Workout Plan'}
        navigation={navigation}
      />

      <View style={styles.headerMain}>
        <CustomButton
          onPress={() => {
            setwork('diet');
          }}
          containerStyle={{
            ...styles.headerBtn,
            backgroundColor: diet === 'diet' ? COLORS.btnGreen : 'transparent',
          }}
          textStyle={{ color: diet === 'diet' ? COLORS.textBlack : 'gray' }}
          text="Diet Plan"
        />
        <CustomButton
          onPress={() => {
            setwork('workout');
          }}
          text="Workout Plan"
          containerStyle={{
            ...styles.headerBtn,
            backgroundColor:
              diet === 'workout' ? COLORS.btnGreen : 'transparent',
          }}
          textStyle={{ color: diet === 'workout' ? COLORS.textBlack : 'gray' }}
        />
      </View>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ marginBottom: Tab_Height }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <TextBiggest
              textStyle={{
                fontFamily: Font.bold,
                marginVertical: hp(1),
                flex: 1,
              }}
            >
              Plan
            </TextBiggest>

            <Pressable
              onPress={() => {
                setopen(true);
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <TextSmall
                  textStyle={{
                    color: COLORS.textGreen,
                    fontFamily: Font.semiBold,
                    marginRight: wp(2),
                  }}
                >
                  View calendar
                </TextSmall>

                <CustomIcon
                  type="antdesign"
                  icon="calendar"
                  size={wp(4)}
                  color={COLORS.Icongreen}
                  style={{ width: wp(4) }}
                />
              </View>
            </Pressable>
          </View>

          <FlatList
            scrollEnabled={false}
            data={plansData?.data?.days || plansData?.data?.data?.days}
            // data={days}
            renderItem={renderItem}
            keyExtractor={(item, index) => item?._id || index.toString()}
            ListEmptyComponent={() => (
              <View style={styles.emptyState}>
                <TextBigger>No Plan available</TextBigger>
              </View>
            )}
          />
        </View>

        <CustomModel
          visible={open}
          onRequestClose={() => {
            setopen(false);
          }}
          calender
        />
        {isRole === 'trainer' && (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              marginVertical: hp(2),
            }}
          >
            <CustomButton
              onPress={() => {
                navigation.navigate(ScreenNames.CLIENTS_REGISTER1);
              }}
              text="Create Plan"
            />
          </View>
        )}
      </ScrollView>
    </CustomWrapper>
  );
};

export default DietPlan;

const styles = StyleSheet.create({
  headerMain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#d7d7d7',
    borderRadius: wp(10),
    padding: hp(1),
    marginVertical: hp(2),
  },
  headerBtn: {
    borderWidth: 0,
    minHeight: hp(5),
    paddingHorizontal: wp(8),
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: hp(2),
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp(5),
    overflow: 'hidden',
    backgroundColor: '#F6F6F6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    color: COLORS.textDarkgreen,
    fontFamily: Font.bold,
  },

  sec: {
    paddingVertical: hp(1),
  },

  mealSection: {
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 8,
    marginBottom: hp(1),
  },

  subHeadingText: {
    fontFamily: Font.semiBold,
    color: COLORS.textDarkgreen,
  },

  lastItem: {
    borderBottomWidth: 0,
  },
  downText: {
    color: '#4A4A4A',
    fontFamily: Font.regular,
    marginTop: hp(0.5),
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: wp(5),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
