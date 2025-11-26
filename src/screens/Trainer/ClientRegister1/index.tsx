import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import Header from '../../../components/common/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HorizontalDatePicker from '../../../components/common/customCalender';
import CustomAddPlan from '../../../components/AddPlanComp';
import { Font } from '../../../utils/ImagePath';
import { TextBiggest } from '../../../components/common/customText';
import { ScreenNames } from '../../../navigations/ScreenName';
import CustomButton from '../../../components/common/customButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import usePLan from './usePlan';
import {
  addMealItem,
  copyToAll,
  removeExercise,
  removeMealItem,
} from '../../../redux/reducers/planSlice';
import moment from 'moment';

const plans = [
  {
    id: 0,
    heading: 'Diet Plan',
    sections: [
      {
        id: 0,
        title: 'Breakfast',
        items: [
          { id: 0, foodName: 'Scrambled Eggs', servingSize: '2 Eggs' },
          { id: 1, foodName: 'Whole Wheat Toast', servingSize: '1 Slice' },
        ],
      },
      {
        id: 1,
        title: 'Lunch',
        items: [],
      },
      {
        id: 2,
        title: 'Dinner',
        items: [{ id: 0, foodName: 'Salmon Fillet', servingSize: '200g' }],
      },
      {
        id: 3,
        title: 'Snacks',
        items: [],
      },
    ],
  },
  {
    id: 1,
    heading: 'Workout Plan',
    sections: [
      {
        id: 0,
        title: '',
        items: [], // Empty workout
      },
    ],
  },
];
const ClientRegister1 = ({ navigation, route }: any) => {
  const dispatch = useDispatch();
  const planData = useSelector(
    (state: RootState) => state?.planSlice?.tempDataa,
  );

  const { data } = route.params || {};
  let plansData = data?.plan?.data;

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const selectedDateKey = selectedDate
    ? selectedDate.toISOString().split('T')[0]
    : null;

  const { handlePlan, isLoading, editPlan, editPlanLoading } = usePLan();

  let currentDate = moment(selectedDate)
    .utcOffset(moment().utcOffset(), true)
    .format('YYYY-MM-DDTHH:mm:ssZ');

  let StartingDate = moment(
    plansData?.startDate ? plansData?.startDate : data?.startingDate,
  )
    .utcOffset(moment().utcOffset(), true)
    .format('YYYY-MM-DDTHH:mm:ssZ');

  let EndingDate = moment(
    plansData?.endDate ? plansData?.endDate : data?.endingDate,
  )
    .utcOffset(moment().utcOffset(), true)
    .format('YYYY-MM-DDTHH:mm:ssZ');
  console.log({ EndingDate, selectedDate });
  const filterPlan = planData.find(i => i.day === currentDate);

  return (
    <CustomWrapper edge={['top']}>
      <Header
        navigation={navigation}
        headingStyle={{ flex: 0, marginLeft: wp(5) }}
        title="Diet Plan"
      />

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <HorizontalDatePicker
          compactMode
          startingDate={
            plansData?.startDate
              ? new Date(plansData?.startDate).toString()
              : data?.startingDate?.toString()
          }
          endingDate={
            plansData?.endDate
              ? new Date(plansData?.endDate).toString()
              : data?.endingDate?.toString()
          }
          onDateChange={(date: any) => {
            console.log('HorizontalDatePicker', new Date(date).toString());
            setSelectedDate(date);
          }}
        />
        {filterPlan?.meals.length && (
          <CustomButton
            onPress={() => {
              dispatch(
                copyToAll({
                  dayPlan: filterPlan,
                  startingDate: StartingDate,
                  endingDate: EndingDate,
                }),
              );
            }}
            text="Copy to All"
            containerStyle={{
              width: '40%',
              alignSelf: 'flex-end',
              minHeight: hp(2),
              paddingVertical: hp(0.5),
            }}
          />
        )}
        <View>
          <TextBiggest textStyle={{ fontFamily: Font.semiBold }}>
            Diet Plan
          </TextBiggest>

          <FlatList
            data={filterPlan?.meals}
            scrollEnabled={false}
            ListFooterComponent={() => (
              <CustomButton
                onPress={() => {
                  // addMeal();
                  dispatch(
                    addMealItem({
                      selectedDate: currentDate,
                    }),
                  );
                  // dispatch(addMealItem({ selectedDate: selectedDateKey }));
                }}
                text="Add Meal"
                containerStyle={{
                  marginVertical: hp(1),
                }}
              />
            )}
            renderItem={({ item, index }) => (
              <CustomAddPlan
                data={item.items}
                title={item.subHeading}
                count={5}
                onPress={() =>
                  navigation.navigate(
                    ScreenNames.CLIENTS_REGISTER2,

                    {
                      data: {
                        ...data,
                        secTitle: `${item.subHeading}`,
                        day: currentDate,
                      },
                    },
                  )
                }
                btnText="Add Food"
                onPressCross={() => {
                  dispatch(
                    removeMealItem({
                      day: filterPlan?.day,
                      mealName: item.subHeading,
                    }),
                  );
                }}
              />
            )}
          />

          <TextBiggest textStyle={{ fontFamily: Font.semiBold }}>
            Workout Plan
          </TextBiggest>
          {filterPlan?.exercises && (
            <CustomAddPlan
              exercise
              data={filterPlan?.exercises}
              title="Exercises"
              onPress={() =>
                navigation.navigate(
                  ScreenNames.CLIENTS_REGISTER3,

                  {
                    data: {
                      ...data,
                      day: currentDate,
                    },
                  },
                )
              }
              btnText="Add Exercise"
              day={currentDate}
            />
          )}
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginVertical: hp(1),
          }}
        >
          <CustomButton
            onPress={() => {
              console.log({ planData });
              data?.planID
                ? editPlan(navigation, route, planData)
                : handlePlan(navigation, route, planData);
            }}
            text={data?.planID ? 'Edit Plan' : 'Create'}
            isLoading={isLoading || editPlanLoading}
          />
        </View>
      </ScrollView>
    </CustomWrapper>
  );
};

export default ClientRegister1;

const styles = StyleSheet.create({});
