import React, {useEffect, useState} from 'react';
import {Alert, Pressable} from 'react-native';
import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';

import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import Header from '../../../components/common/Header';
import CustomButton from '../../../components/common/customButton';
import CustomRHFTextInput from '../../../components/common/customRHFinput';
import {useForm} from 'react-hook-form';
import {ScrollView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Customimage from '../../../components/common/customImage';
import {ImagPath} from '../../../utils/ImagePath';
import {TextNormal} from '../../../components/common/customText';
import personalDataHook from '../../Trainer/PersonalDetails2/PersonalData2';
import EditProHook from './useEditPro';

export default function EditProfile({navigation}: any) {
  const [isEditing, setIsEditing] = useState(false);
  const {
    onSelect,
    control,
    onEdit,
    handleSubmit,
    isLoading,
    profileImage,

    watch,
  } = EditProHook();


  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onEditProfile = () => {
    if (!isEditing) {
      return;
    }
    const submit = handleSubmit(data => onEdit(data, navigation));
    return submit();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <CustomWrapper edge={['top']}>
        <ScrollView
          bounces={false}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Header title={'Profile'} navigation={navigation} />

          <Customimage
            source={{uri: profileImage?.path || profileImage}}
            resizeMode={'cover'}
            style={{
              width: wp(35),
              height: wp(35),
              borderRadius: wp(20),
              alignSelf: 'center',
              marginTop: hp(8),
              position: 'relative',
            }}
          />
          {isEditing && (
            <Pressable
              onPress={() => {
                onSelect();
              }}>
              <TextNormal style={{alignSelf: 'center', marginTop: hp(1)}}>
                Edit profile image
              </TextNormal>
            </Pressable>
          )}

          <CustomRHFTextInput
            title="First Name"
            placeholder="Enter First Name"
            control={control}
            name="firstName"
            rules={{
              required: {value: true, message: 'First name is required'},
            }}
            editable={isEditing}
          />

          <CustomRHFTextInput
            title="Last Name"
            placeholder="Last Name"
            control={control}
            name="lastName"
            rules={{
              required: {value: true, message: 'Last name is required'},
            }}
            editable={isEditing}
          />

          <View
            style={{flex: 1, justifyContent: 'flex-end', marginBottom: hp(3)}}>
            <CustomButton
              text={isEditing ? 'Save Changes' : 'Edit Profile'}
              onPress={!isEditing ? toggleEdit : onEditProfile}
              isLoading={isLoading}
            />
          </View>
        </ScrollView>
      </CustomWrapper>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  profileImageWrapper: {
    marginBottom: 30,
    borderRadius: 75,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  profileImage: {
    width: 150,
    height: 150,
  },
});
