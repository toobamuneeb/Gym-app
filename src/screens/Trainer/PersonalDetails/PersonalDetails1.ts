import {useForm} from 'react-hook-form';
import useImagePicker from '../../../hooks/useImagePicker';
import {Alert} from 'react-native';
import {useEffect, useState} from 'react';
import countriesData from '../../../utils/countries.json';

type Media = {
  path: string;
  mime?: string;
  name?: string;
};

interface FormValues {
  profileImage: Media | null;
  gender: string;
  Dob: Date | null;
  country: string;
  city: string;
}

const PersonalDetails1Hook = () => {
  const [countries, setCountries] = useState([{}]);
  const [cities, setCities] = useState([{}]);
  const {openGallery, openCamera, selectedMedia} = useImagePicker();
  const {control, watch, setValue, trigger, handleSubmit, getValues} =
    useForm<FormValues>({
      defaultValues: {
        gender: 'male',
        Dob: null,
        country: '',
        city: '',
      },
    });
  const {gender, Dob, country, city, profileImage} = watch();
  useEffect(() => {
    const countryNames = Object.keys(countriesData);
    const formattedCountries = countryNames.map(country => ({
      label: country,
      value: country,
    }));

    setCountries(formattedCountries);
  }, []);
  useEffect(() => {
    if (country) {
      const countryCities =
        country in countriesData
          ? countriesData[country as keyof typeof countriesData]
          : [];
      const formattedCities = countryCities.map((city: string) => ({
        label: city,
        value: city,
      }));
  
      setCities(formattedCities);
      setValue('city', '');
    } else {
      setCities([]);
    }
  }, [country]);
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

  return {
    onSelect,
    control,
    watch,
    setValue,
    handleSubmit,
    profileImage,
    gender,
    Dob,
    country,
    city,
    getValues,
    countries,
    cities,
    trigger,
  };
};

export default PersonalDetails1Hook;
