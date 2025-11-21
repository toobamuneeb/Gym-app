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

const ClientRegister3 = ({ navigation, route }: any) => {
  const planData = useSelector((state: RootState) => state.planSlice);
  const { control, handleSubmit } = useForm();
  const { data } = route.params || {};
  const { openGallery, openCamera, selectedMedia, val } = useImagePicker();

  console.log('ClientRegister3', { data });

  console.log({ val });
  const dispatch = useDispatch();
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
          description: `${dataa.sets} ` + `${dataa.reps}`,
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

          {val?.path && (
            // <Pressable
            //   style={
            //     {
            //       // height: 100,
            //       // width: 200,
            //       // backgroundColor: 'gray',
            //       // marginTop: 10,
            //       // justifyContent: 'center',
            //       // alignItems: 'center',
            //     }
            //   }
            // >

            // <Modal>
            <CustomWebViewVideoPlayer uri={val?.path} />
            // </Modal>

            // </Pressable>
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
