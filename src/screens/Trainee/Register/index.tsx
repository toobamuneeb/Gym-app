import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import CustomHeader from '../../../components/common/customHeader';
import CustomRHFTextInput from '../../../components/common/customRHFinput';
import CustomButton from '../../../components/common/customButton';
import CustomBottomSheet from '../../../components/common/customBottomSheet';
import CustomChcekBox from '../../../components/common/customCheckBox';
import {ScreenNames} from '../../../navigations/ScreenName';
import registerUserHook from './register';

const Register = ({navigation}: any) => {
  const [visible, setVisible] = useState(false);

  const {
    control,
    getValues,
    setValue,
    trigger,
    onContinue,
    onSignup,
    refRBSheet,
  } = registerUserHook();

  const toggleCheckbox = (value: string) => {
    return value === 'nag' ? 'agreed' : 'nag';
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <CustomWrapper
        edge={['top']}
        containerStyle={{flex: 1, opacity: visible ? 0.3 : 1}}>
        <ScrollView
          bounces={false}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <CustomHeader navigation={navigation} title="Register" />

          <View style={{marginTop: hp(3)}}>
            <CustomRHFTextInput
              title="First Name"
              placeholder="Enter First Name"
              control={control}
              name="firstName"
              rules={{
                required: {value: true, message: 'First name is required'},
              }}
            />

            <CustomRHFTextInput
              title="Last Name"
              placeholder="Last Name"
              control={control}
              name="lastName"
              rules={{
                required: {value: true, message: 'Last name is required'},
              }}
            />

            <CustomRHFTextInput
              title="Email"
              placeholder="Enter Email"
              control={control}
              name="email"
              rules={{
                required: {value: true, message: 'Email is required'},
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
            />

            <CustomRHFTextInput
              secureTextEntry
              title="Password"
              placeholder="New Password"
              control={control}
              name="password"
              rules={{
                required: {value: true, message: 'Password is required'},
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              }}
            />

            <CustomRHFTextInput
              title="Confirm Password"
              placeholder="Confirm New Password"
              secureTextEntry
              control={control}
              name="confirmpassword"
              rules={{
                required: {
                  value: true,
                  message: 'Confirm password is required',
                },
                validate: (value: string) =>
                  value === getValues('password') || 'Passwords do not match',
              }}
            />

            <Controller
              control={control}
              name="checkbox"
              // defaultValue="nag"
              rules={{
                pattern: {
                  value: /agreed/,
                  message: 'Please agree to the terms and conditions',
                },
              }}
              render={({field: {onChange, value}, fieldState: {error}}) => (
                <CustomChcekBox
                  agreed={value}
                  onPress={() => onChange(toggleCheckbox(value))}
                  error={error?.message}
                />
              )}
            />
          </View>

          <View style={styles.btnView}>
            <CustomButton onPress={onContinue} text="Register" />
          </View>
        </ScrollView>

        <CustomBottomSheet
          control={control}
          name={'role'}
          heading="Select Role"
          btnOnpress={() => {
            onSignup(navigation);
          }}
          onOpen={() => setVisible(true)}
          onClose={() => setVisible(false)}
          onCoachPress={() => {
            setValue('role', 'coach');
            trigger('role');
          }}
          onUserPress={() => {
            setValue('role', 'user');
            trigger('role');
          }}
          reference={refRBSheet}
          mainContainerStyle={{maxHeight: hp(45)}}
        />
      </CustomWrapper>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({
  btnView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: hp(2),
  },
});
