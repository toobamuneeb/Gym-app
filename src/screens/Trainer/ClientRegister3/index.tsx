import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import Header from '../../../components/common/Header';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomRHFTextInput from '../../../components/common/customRHFinput';
import {useForm} from 'react-hook-form';
import CustomButton from '../../../components/common/customButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  addExercise,
  addPlanItem,
  addSingleItem,
} from '../../../redux/reducers/planSlice';
import {RootState} from '../../../redux/store';

const ClientRegister3 = ({navigation, route}: any) => {
  const planData = useSelector((state: RootState) => state.planSlice);
  const {control, handleSubmit} = useForm();
  const {data} = route.params || {};
  const dispatch = useDispatch();
  const addExercises = async () => {
    const submit = handleSubmit(dataa => {

      let payload = {
        planType: data?.selectedOption,
        planCategory: 'combined',
        startDate: data?.startingDate,
        endDate: data?.endingDate,
        trainerID: data?.trainerID,
        userID: data?.userID?._id,
        days: {
          dayName: data?.dayName,
          secTitle: data?.secTitle,
          sectionType: 'exercise',
          newItem: {name: dataa.exercise, description: dataa.reps},
        },
      };
      let payload1 = {
        day: data?.dayName,
        item: {
          name: dataa.exercise,
          description: `${dataa.sets} ` + `${dataa.reps}`,
        },
      };

      dispatch(addExercise(payload1));
      // dispatch(addPlanItem(payload));
      navigation.goBack();
    });

    return submit();
  };
  return (
    <CustomWrapper edge={['top']}>
      <Header
        navigation={navigation}
        headingStyle={{flex: 0, marginLeft: wp(5)}}
        title="Add Exercise"
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={{marginTop: hp(4)}}>
          <CustomRHFTextInput
            control={control}
            name="exercise"
            title="Exercise Name"
            rules={{
              required: {value: true, message: 'exercise name is required '},
            }}
            inputContainer={{borderRadius: wp(4)}}
          />
          <CustomRHFTextInput
            control={control}
            name="sets"
            title="Sets"
            rules={{
              required: {value: true, message: 'sets is required '},
            }}
            inputContainer={{borderRadius: wp(4)}}
          />
          <CustomRHFTextInput
            control={control}
            name="reps"
            title="Repetitions"
            rules={{
              required: {value: true, message: 'reps is required '},
            }}
            inputContainer={{borderRadius: wp(4)}}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginVertical: hp(1),
          }}>
          <CustomButton
            onPress={() => {
              addExercises();
            }}
            text="Add Exercise"
          />
        </View>
      </ScrollView>
    </CustomWrapper>
  );
};

export default ClientRegister3;

const styles = StyleSheet.create({});
