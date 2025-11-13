import {useForm} from 'react-hook-form';
import useImagePicker from '../../../hooks/useImagePicker';
import {Alert} from 'react-native';
import React, {useEffect} from 'react';
import {
  useEditProfileMutation,
  useGetProfileQuery,
} from '../../../redux/Api/trainer.api';
import {apiRequestHandler} from '../../../utils';
import {setLogin, setToken} from '../../../redux/reducers/generalSlice';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

type Media = {
  path: string;
  mime?: string;
  name?: string;
};

type FormData = {
  profileImage: Media | null;
  firstName: string;
  lastName: string;
};

const EditProHook = () => {
  const userData = useSelector((state: RootState) => state?.generalSlice?.data);

  const {data} = useGetProfileQuery({});
  const [editProfile, {isLoading}] = useEditProfileMutation();
  const {openGallery, openCamera, selectedMedia} = useImagePicker();
  const dispatch = useDispatch();
  const profileImg =
    userData.role === 'user'
      ? userData?.traineeProfile?.profileImage
      : userData?.trainerProfile?.profileImage;
  const initialData: any = {
    firstName: userData?.firstName,
    lastName: userData?.lastName,
    profileImage: profileImg,
  };

  const {control, setValue, handleSubmit, watch, trigger, getValues} =
    useForm<FormData>({
      defaultValues: initialData,
    });
  const {firstName, lastName, profileImage} = watch();
  useEffect(() => {
    if (selectedMedia) {
      setValue('profileImage', selectedMedia);
      trigger('profileImage');
    }
  }, [selectedMedia, setValue, trigger]);

  const onSelect = () => {
    Alert.alert(
      'Choose an option',
      'Select media from:',
      [
        {
          text: 'Gallery',
          onPress: () => openGallery('photo'),
          style: 'default',
        },
        {
          text: 'Camera',
          onPress: () => openCamera('photo'),
          style: 'default',
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const onEdit = React.useCallback(async (data: any, navigation: any) => {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('media', {
      uri: data?.profileImage?.path,
      type: data?.profileImage?.mime,
      name: 'profile' + data?.profileImage?.name,
    });

    const hasChanges =
      data.firstName !== initialData.firstName ||
      data.lastName !== initialData.lastName ||
      data.profileImage !== initialData.profileImage;

    // let payload = {
    //   ...data,
    //   profileImage: data.profileImage.path,
    // };

    if (!hasChanges) {
      Alert.alert(
        'No changes detected',
        'Please modify at least one field to update your profile',
      );
      return;
    }

    try {
      const res = await editProfile(formData);
      const resData = apiRequestHandler(res);

      if (resData.isSuccess) {
     
        dispatch(setLogin(resData?.data?.data));
        navigation.goBack();
      }
    } catch (error) {}
  }, []);
  return {
    onSelect,
    control,
    watch,
    setValue,
    handleSubmit,
    getValues,
    firstName,
    lastName,
    profileImage,
    data,
    onEdit,

    trigger,
    initialData,
    isLoading,
  };
};

export default EditProHook;
