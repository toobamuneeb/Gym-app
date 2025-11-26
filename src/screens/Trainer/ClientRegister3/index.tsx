import {
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import Header from '../../../components/common/Header';
import { WebView } from 'react-native-webview';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomRHFTextInput from '../../../components/common/customRHFinput';
import { useForm } from 'react-hook-form';
import CustomButton from '../../../components/common/customButton';
import { useDispatch, useSelector } from 'react-redux';
import {
  addExercise,
  addExerciseItem,
  addPlanItem,
  addSingleItem,
} from '../../../redux/reducers/planSlice';
import { RootState } from '../../../redux/store';
import { TextBig, TextNormal } from '../../../components/common/customText';
import useImagePicker from '../../../hooks/useImagePicker';
import CustomWebViewVideoPlayer from '../../../components/common/customWebViewVideoPlayer';
import { useUpdateExerciseItemMutation } from '../../../redux/Api/plan.api';
import { apiRequestHandler } from '../../../utils';
import useToast from '../../../hooks/Toast';

const ClientRegister3 = ({ navigation, route }: any) => {
  const planData = useSelector((state: RootState) => state.planSlice);

  const { data } = route.params || {};
  let defaultValues = {
    exercise: data?.name,
    sets: data?.sets,
    reps: data?.repetition,
    planId: data?.planId,
    itemId: data?.itemId,
    secs: data?.secs,
  };
  const { control, handleSubmit } = useForm(
    data?.itemId && { defaultValues: defaultValues },
  );
  const { openGallery, openCamera, selectedMedia, val } = useImagePicker();

  console.log({ val, data });
  const dispatch = useDispatch();
  const [update, { isLoading }] = useUpdateExerciseItemMutation();
  const { showToast } = useToast();
  const addExercises = async () => {
    const submit = handleSubmit(dataa => {
      // let payload = {
      //   planType: data?.selectedOption,
      //   planCategory: 'combined',
      //   startDate: data?.startingDate,
      //   endDate: data?.endingDate,
      //   trainerID: data?.trainerID,
      //   userID: data?.userID?._id,
      //   days: {
      //     dayName: data?.dayName,
      //     secTitle: data?.secTitle,
      //     sectionType: 'exercise',
      //     newItem: {name: dataa.exercise, description: dataa.reps},
      //   },
      // };
      const formData = new FormData();

      let payload = {
        day: data?.day,
        item: {
          name: dataa.exercise,
          description: `${dataa.sets}  x  ${dataa.reps}`,
          secs: dataa?.secs,
          video: {
            uri: val?.path,
            type: val?.mime,
            name: 'trainingVideo' + val?.name,
          },
        },
      };
      formData.append('day', payload.day);
      formData.append('item', payload.item);

      // formData.append('profileImage', payload?.profileImage?.path);
      // formData.append('certification', payload?.certification?.path);
      formData.append('media', {
        uri: val?.path,
        type: val?.mime,
        name: 'trainingVideo' + val?.name,
      });
      dispatch(addExercise(payload));
      // dispatch(addPlanItem(payload));

      // dispatch(
      //   addExerciseItem({
      //     day: data?.day,
      //     sectionName: data?.secTitle,
      //     exerciseItem: {
      //       name: dataa.exercise,
      //       description: `${dataa.sets} ${dataa.reps}`,
      //     },
      //   }),
      // );

      navigation.goBack();
    });

    return submit();
  };
  const formData = new FormData();
  const updateExercises = handleSubmit(async formdata => {
    let payload = {
      planId: formdata.planId,
      itemId: formdata?.itemId,
      name: formdata?.exercise,
      description: `${formdata?.sets} x ${formdata?.reps} `,
      secs: formdata?.secs,
    };
    formData.append('planId', formdata.planId);
    formData.append('itemId', formdata?.itemId);
    formData.append('name', formdata?.exercise);
    formData.append('description', `${formdata?.sets} x ${formdata?.reps} `);
    formData.append('secs', `${formdata?.secs} `);
    formData.append('video', {
      uri: val?.path,
      type: val?.mime,
      name: 'trainingVideo' + val?.name,
    });
    const updateResponse = await update(val?.path ? formData : payload);
    const response = apiRequestHandler(updateResponse);
    if (response?.isSuccess) {
      showToast('success', response?.data?.message);
      navigation.goBack();
    }
  });
  let isVideo = val?.path || data?.video;
  return (
    <CustomWrapper edge={['top']}>
      <Header
        navigation={navigation}
        headingStyle={{ flex: 0, marginLeft: wp(5) }}
        title="Add Exercise"
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={{ marginTop: hp(4) }}>
          <CustomRHFTextInput
            control={control}
            name="exercise"
            title="Exercise Name"
            rules={{
              required: { value: true, message: 'exercise name is required ' },
            }}
            inputContainer={{ borderRadius: wp(4) }}
          />
          <CustomRHFTextInput
            control={control}
            name="sets"
            title="Sets"
            rules={{
              required: { value: true, message: 'sets is required ' },
            }}
            inputContainer={{ borderRadius: wp(4) }}
          />
          <CustomRHFTextInput
            control={control}
            name="reps"
            title="Repetitions"
            rules={{
              required: { value: true, message: 'reps is required ' },
            }}
            inputContainer={{ borderRadius: wp(4) }}
          />
          <CustomRHFTextInput
            control={control}
            name="secs"
            title="Time Interval"
            rules={{
              required: { value: true, message: 'Time interval is required ' },
            }}
            inputContainer={{ borderRadius: wp(4) }}
          />
          <Pressable
            onPress={() => {
              Alert.alert(
                'Choose an option',
                'Select media from:',
                [
                  {
                    text: 'Gallery',
                    onPress: () => openGallery('video'),
                    style: 'default',
                  },
                  {
                    text: 'Camera',
                    onPress: () => openCamera('video'),
                    style: 'default',
                  },
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
                { cancelable: true },
              );
            }}
            style={{ alignSelf: 'flex-end' }}
          >
            <TextNormal bold children={'Upload Video'} />
          </Pressable>

          {isVideo && <CustomWebViewVideoPlayer uri={isVideo} />}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginVertical: hp(1),
          }}
        >
          <CustomButton
            isLoading={isLoading}
            onPress={() => {
              data?.type == 'edit' ? updateExercises() : addExercises();
            }}
            text={data?.type == 'edit' ? 'Update Exercise' : 'Add Exercise'}
          />
        </View>
      </ScrollView>
    </CustomWrapper>
  );
};

export default ClientRegister3;

const styles = StyleSheet.create({});
