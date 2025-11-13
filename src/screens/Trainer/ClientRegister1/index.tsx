import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import Header from '../../../components/common/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HorizontalDatePicker from '../../../components/common/customCalender';
import CustomAddPlan from '../../../components/AddPlanComp';
import {Font} from '../../../utils/ImagePath';
import {TextBiggest} from '../../../components/common/customText';
import {ScreenNames} from '../../../navigations/ScreenName';
import CustomButton from '../../../components/common/customButton';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import usePLan from './usePlan';
import {
  addMealItem,
  copytoAll,
  removeExercise,
  removeMealItem,
} from '../../../redux/reducers/planSlice';

const plans = [
  {
    id: 0,
    heading: 'Diet Plan',
    sections: [
      {
        id: 0,
        title: 'Breakfast',
        items: [
          {id: 0, foodName: 'Scrambled Eggs', servingSize: '2 Eggs'},
          {id: 1, foodName: 'Whole Wheat Toast', servingSize: '1 Slice'},
          // Add more breakfast items or empty array if none
        ],
      },
      {
        id: 1,
        title: 'Lunch',
        items: [], // Empty lunch
      },
      {
        id: 2,
        title: 'Dinner',
        items: [{id: 0, foodName: 'Salmon Fillet', servingSize: '200g'}],
      },
      {
        id: 3,
        title: 'Snacks',
        items: [], // Empty snacks
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
const ClientRegister1 = ({navigation, route}: any) => {
  const dispatch = useDispatch();
  const planData = useSelector(
    (state: RootState) => state?.planSlice?.tempDataa,
  );

  const {data} = route.params || {};

  const [selectedDate, setSelectedDate] = useState();
  const {handlePlan, isLoading, editPlan, editPlanLoading} = usePLan();

  const filterPlan = planData.find(i => i.day === selectedDate);
  return (
    <CustomWrapper edge={['top']}>
      <Header
        navigation={navigation}
        headingStyle={{flex: 0, marginLeft: wp(5)}}
        title="Dite Plan"
      />

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <HorizontalDatePicker
          compactMode
          onDateChange={(date: any) => {
            setSelectedDate(date);
          }}
        />
        {filterPlan?.meals.length && (
          <CustomButton
            onPress={() => {
       
              dispatch(copytoAll({dayPlan: filterPlan}));
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
          <TextBiggest textStyle={{fontFamily: Font.semiBold}}>
            Diet Plan
          </TextBiggest>

          <FlatList
            scrollEnabled={false}
            ListFooterComponent={() => (
              <CustomButton
                onPress={() => {
                  // addMeal();
                  dispatch(addMealItem({selectedDate: selectedDate}));
                }}
                text="Add Meal"
                containerStyle={{
                  marginVertical: hp(1),
                }}
              />
            )}
            data={filterPlan?.meals}
            renderItem={({item, index}) => (
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
                        dayName: selectedDate,
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

          <TextBiggest textStyle={{fontFamily: Font.semiBold}}>
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
                      dayName: selectedDate,
                    },
                  },
                )
              }
              btnText="Add Exercise"
              day={selectedDate}
            />
          )}
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginVertical: hp(1),
          }}>
          <CustomButton
            onPress={() => {
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
