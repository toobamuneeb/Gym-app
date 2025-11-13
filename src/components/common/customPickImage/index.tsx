import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Controller} from 'react-hook-form';
import {imagePickProps} from './interface';
import {COLORS} from '../../../utils/theme';
import CustomButton from '../customButton';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {TextSmall} from '../customText';

const CustomPickImage = ({
  control,
  name,
  selectedMedia,
  title,
  containerStyle,
  onPress,
  pickImageStyle,
  imageStyle,
  personalDetail1,
  errstyle,
}: imagePickProps) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: {value: true, message: 'Image is required'},
      }}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <>
          <CustomButton
            containerStyle={containerStyle}
            pickImage
            onPress={onPress}
            text={title}
            media={selectedMedia}
            pickImageStyle={pickImageStyle}
            imageStyle={imageStyle}
            personalDetail1={personalDetail1}
          />
          {error && (
            <TextSmall
              textStyle={{
                color: 'red',
                marginTop: hp(-2),
                ...errstyle,
              }}>{`${error.message}`}</TextSmall>
          )}
        </>
      )}
    />
  );
};

export default CustomPickImage;
