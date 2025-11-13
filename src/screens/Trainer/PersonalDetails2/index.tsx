import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import CustomHeader from '../../../components/common/customHeader';
import CustomButton from '../../../components/common/customButton';
import {TextNormal, TextSmall} from '../../../components/common/customText';
import {Font} from '../../../utils/ImagePath';
import {COLORS} from '../../../utils/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomPickImage from '../../../components/common/customPickImage';
import CustomRHFTextInput from '../../../components/common/customRHFinput';
import personalDataHook from './PersonalData2';
import {CustomIcon} from '../../../components/common/customIcons';
import CustomModel from '../../../components/common/customModel';
import {useDispatch} from 'react-redux';
import {useRegisterMutation} from '../../../redux/Api/auth.api';
import useToast from '../../../hooks/Toast';
import {ScreenNames} from '../../../navigations/ScreenName';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';
import {apiRequestHandler} from '../../../utils';

const PersonalDetails2 = ({navigation, route}: any) => {
  const {data} = route.params || {};

  const dispatch = useDispatch();
  const [visible, setvisible] = useState(false);
  const [regsiter, {isLoading}] = useRegisterMutation();
  const {
    handleSubmit,
    onSelect,
    control,
    certification,
    addSpeciality,
    specialization,
    removeSpeciality,
  } = personalDataHook();
  const {showToast} = useToast();
  const onNext = () => {
    const submit = handleSubmit(async dataa => {
      const {specialityInput, ...restData} = dataa;
      let payload = {
        ...data,
        ...restData,
        certification: dataa.certification,
        profileImage: data.profileImage,
      };
      
      const formData = new FormData();
      formData.append('firstName', payload.firstName);
      formData.append('lastName', payload.lastName);
      formData.append('email', payload.email);
      formData.append('password', payload.password);
      formData.append('gender', payload.gender);
      formData.append('role', payload.role);
      formData.append('bio', payload.bio);
      formData.append('country', payload.country);
      formData.append('city', payload.city);
      formData.append('Dob', payload.Dob?.toString() || '');
      payload.specialization.forEach((item: any, index: any) => {
        formData.append(`specialization[${index}]`, item);
      });
      // formData.append('profileImage', payload?.profileImage?.path);
      // formData.append('certification', payload?.certification?.path);
      formData.append('media', {
        uri: payload?.profileImage?.path,
        type: payload?.profileImage?.mime,
        name: 'profile' + payload?.profileImage?.name,
      });
      formData.append('media', {
        uri: payload?.certification?.path,
        type: payload?.certification?.mime,
        name: 'certificate' + payload?.certification?.name,
      });

      try {
        const res: any = await regsiter(formData);
        const nextRes = apiRequestHandler(res);

        if (nextRes.isSuccess) {
          showToast('success', 'Success', nextRes.data.message);
          navigation.reset({
            index: 0,
            routes: [{name: ScreenNames.LOGIN}],
          });
        }
      } catch (error) {
        
      }
      setvisible(true);
    });
    return submit();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <CustomWrapper edge={['top']}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          bounces={false}
          showsVerticalScrollIndicator={false}>
          <CustomHeader
            trainer
            navigation={navigation}
            title="Certification & 
Specialization"
          />

          <View style={{marginTop: hp(2)}}>
            <TextNormal
              textStyle={{
                fontFamily: Font.medium,
                color: COLORS.titleColor,
                marginBottom: hp(0.3),
              }}>
              Certification
            </TextNormal>
            <CustomPickImage
              containerStyle={{marginBottom: hp(2)}}
              control={control}
              name="certification"
              title={'Click to upload or drag and drop'}
              onPress={() => {
                onSelect();
              }}
              selectedMedia={certification}
            />

            <CustomRHFTextInput
              addBtn
              onAddPress={() => {
                addSpeciality();
           
              }}
              name={'specialityInput'}
              title="Specialization"
              control={control}
              placeholder="Add specialization"
              rules={{
                validate: () =>
                  specialization.length > 0 ||
                  'Please add at least one specialization',
              }}
            />

            {specialization && (
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {specialization?.map((specialty: any, index: any) => (
                  <View key={index} style={styles.specialtiesContainer}>
                    <TextSmall
                      textStyle={{
                        color: '#000',
                        marginRight: wp(2),
                      }}>
                      {specialty}
                    </TextSmall>

                    <CustomIcon
                      icon="cross"
                      type="entypo"
                      size={wp(6)}
                      color="#000"
                      onPress={() => {
                        removeSpeciality(index);
                      }}
                    />
                  </View>
                ))}
              </ScrollView>
            )}

            <CustomRHFTextInput
              name={'bio'}
              title="Bio"
              control={control}
              placeholder="add bio"
              multiline
              rules={{
                required: {value: true, message: 'bio is required'},
              }}
            />
          </View>

          <View style={styles.btnView}>
            <CustomButton
              onPress={() => {
                onNext();
              }}
              isLoading={isLoading}
              text="Next"
            />
          </View>
          {/* <CustomModel
            visible={visible}
            onRequestClose={() => {
              setvisible(false);
            }}
            btnOnpress={() => {
              setvisible(false);
              // navigation.navigate('bottomStack');
            }}
            title="Profile Submitted Successfully"
            desc="Our team will now review your profile to ensure it aligns with our standards and guidelines."
          /> */}
        </ScrollView>
      </CustomWrapper>
    </KeyboardAvoidingView>
  );
};

export default PersonalDetails2;
const styles = StyleSheet.create({
  btnView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: hp(2),
  },
  specialtiesContainer: {
    backgroundColor: COLORS.btnGreen,
    padding: wp(2),
    borderWidth: hp(0.15),
    borderRadius: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp(2),
    marginHorizontal: wp(2),
  },
});
