import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomButton from '../../../components/common/customButton';
import CustomRHFTextInput from '../../../components/common/customRHFinput';
import {TextHuge, TextSmall} from '../../../components/common/customText';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import {Font} from '../../../utils/ImagePath';
import Header from '../../../components/common/Header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useForm} from 'react-hook-form';
import useCreateNewPass from '../CreateNewPass/useCreateNewPass';
import {RootState} from '../../../redux/store';
import {useSelector} from 'react-redux';
import useNewPass from './useNew';

const NewPass = ({navigation}: any) => {
  const id = useSelector((state: RootState) => state.generalSlice.data._id);
  const {getValues, control, handleSubmit, handleChange, isLoading} =
    useNewPass();
  const onChange = () => {
    return handleSubmit(data => handleChange({...data, id}, navigation))();
  };
  return (
    <CustomWrapper edge={['top']}>
      <Header
        headingStyle={{fontSize: RFValue(20), fontFamily: Font.semiBold}}
        title={'Change Password'}
        navigation={navigation}
      />

      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <TextHuge
          textStyle={{
            fontFamily: Font.bold,
            fontSize: RFValue(24),
            marginTop: hp(3),
          }}>
          New Password
        </TextHuge>

        <TextSmall textStyle={{}}>
          Enter a new password and remember it.{' '}
        </TextSmall>

        <View style={{marginTop: hp(3)}}>
          <CustomRHFTextInput
            control={control}
            name="password"
            secureTextEntry={true}
            title="Password"
            placeholder="New Password"
            rules={{
              required: {value: true, message: 'Password is required '},
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            }}
          />
          <CustomRHFTextInput
            name="cnfrmpassword"
            control={control}
            secureTextEntry={true}
            title="Confirm Password"
            placeholder="Confirm New Password"
            rules={{
              required: {value: true, message: 'Password is required '},
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
              validate: (value: string) => {
                const password = getValues('password');
                return value === password || 'Password must be same';
              },
            }}
          />
        </View>
        <View style={styles.btnView}>
          <CustomButton
            isLoading={isLoading}
            onPress={() => {
              onChange();
            }}
            text="Save"
          />
        </View>
      </ScrollView>
    </CustomWrapper>
  );
};

export default NewPass;

const styles = StyleSheet.create({
  btnView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: hp(2),
  },
});
