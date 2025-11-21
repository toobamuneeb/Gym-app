import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import Header from '../../../components/common/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomRHFTextInput from '../../../components/common/customRHFinput';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../components/common/customButton';
// import useClientReg2 from './useClientReg2';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFoodItem,
  addPlanItem,
  addSingleItem,
} from '../../../redux/reducers/planSlice';
import { RootState } from '../../../redux/store';
import moment from 'moment';

const ClientRegister2 = ({ navigation, route }: any) => {
  const planData = useSelector((state: RootState) => state.planSlice);

  const dispatch = useDispatch();
  const { data } = route.params;
  console.log('ClientRegister2', data?.day);
  const [days, setdays] = useState<any>([]);

  const { control, handleSubmit } = useForm();
  // const addFood = async () => {
  //   const dayName = new Date(data?.day).toLocaleString('en-US', {
  //     weekday: 'long',
  //   });

  //   const submit = handleSubmit(dataa => {
  //     let payload = {
  //       trainerID: data?.trainerID,
  //       userID: data?.userID?._id,
  //       days: {
  //         mealDate: data?.day,
  //         secTitle: data?.secTitle,
  //         sectionType: 'meal',
  //         newItem: { name: dataa.foodname, quantity: dataa.servingsize },
  //       },
  //     };
  //     let payload1 = {
  //       mealDate: data?.day,
  //       mealName: data?.secTitle,
  //       mealData: {
  //         name: dataa.foodname,
  //         quantity: dataa.servingsize,
  //       },
  //     };

  //     dispatch(addSingleItem(payload1));
  //     dispatch(addPlanItem(payload));
  //     navigation.goBack();
  //   });

  //   return submit();
  // };

  const addFood = handleSubmit(dataa => {
    dispatch(
      addFoodItem({
        day: data?.day,
        mealName: data?.secTitle,
        foodItem: {
          name: dataa.foodname,
          quantity: dataa.servingsize,
        },
      }),
    );

    navigation.goBack();
  });

  return (
    <CustomWrapper edge={['top']}>
      <Header
        navigation={navigation}
        headingStyle={{ flex: 0, marginLeft: wp(5) }}
        title="Add Food"
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginTop: hp(4) }}>
          <CustomRHFTextInput
            control={control}
            name="foodname"
            title="Food Name"
            rules={{
              required: { value: true, message: 'food name is required ' },
            }}
            inputContainer={{ borderRadius: wp(4) }}
          />
          <CustomRHFTextInput
            control={control}
            name="servingsize"
            title="Serving Size"
            rules={{
              required: { value: true, message: 'serving size is required ' },
            }}
            inputContainer={{ borderRadius: wp(4) }}
          />
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
              addFood();
            }}
            text="Add Food"
          />
        </View>
      </ScrollView>
    </CustomWrapper>
  );
};

export default ClientRegister2;

const styles = StyleSheet.create({});
