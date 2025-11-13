import {useForm} from 'react-hook-form';
import useImagePicker from '../../../hooks/useImagePicker';
import {Alert} from 'react-native';
import {useEffect} from 'react';

type Media = {
  path: string;
  mime?: string;
  name?: string;
};

type FormData = {
  certification: Media | null;
  specialization: string[];
  bio: string;
  specialityInput: string;
};

const personalDataHook = () => {
  const {openGallery, openCamera, selectedMedia} = useImagePicker();

  const {control, setValue, handleSubmit, watch, trigger, getValues} =
    useForm<FormData>({
      defaultValues: {
        certification: null,
        specialization: [],
        bio: '',
        specialityInput: '',
      },
    });

  const {certification, specialization, specialityInput} = watch();

  useEffect(() => {
    if (selectedMedia) {
      setValue('certification', selectedMedia);
      trigger('certification');
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

  const addSpeciality = async () => {
    const currentInput = specialityInput.trim();
    if (currentInput.length <= 3) {
      return Alert.alert('speciality should be greater than 3');
    }
    if (currentInput && !specialization.includes(currentInput)) {
      const newSpeciality = [...specialization, currentInput];
      setValue('specialization', newSpeciality);
      setValue('specialityInput', '');
      await trigger('specialization');
      await trigger('specialityInput');
    }
  };

  const removeSpeciality = (index: number) => {
    const updatedSpeciality = specialization.filter((_, i) => i !== index);
    setValue('specialization', updatedSpeciality);
    trigger('specialization');
  };

  return {
    onSelect,
    control,
    watch,
    setValue,
    handleSubmit,
    certification,
    specialization,
    specialityInput,
    addSpeciality,
    removeSpeciality,
    getValues,
  };
};

export default personalDataHook;
