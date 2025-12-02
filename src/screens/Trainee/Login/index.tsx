import React from 'react';
import { useForm } from 'react-hook-form';
import {
  View,
  StatusBar,
  ScrollView,
  Image,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useSelector } from 'react-redux';
import CustomButton from '../../../components/common/customButton';
import CustomRHFTextInput from '../../../components/common/customRHFinput';
import { TextHuge, TextNormal } from '../../../components/common/customText';
import { ImagPath, Font } from '../../../utils/ImagePath';
import { COLORS } from '../../../utils/theme';
import useLogin from './useLogin';
import { RootState } from '../../../redux/store';

const Login = ({ navigation }: any) => {
  const fcmToken = useSelector(
    (state: RootState) => state?.generalSlice?.fcmToken,
  );
  const { control, handleLogin, handleSubmit, isLoading } = useLogin();
  const onLogin = () => {
    return handleSubmit(data =>
      handleLogin({ ...data, fcmToken }, navigation),
    )();
  };

  const navigateTo = (screen: string) => () => {
    navigation.navigate(screen);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'#000'}
        animated={true}
      />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.headerContainer}>
          <Image source={ImagPath.loginBack} style={styles.imgBack} />
          <TextHuge textStyle={styles.loginText}>Login</TextHuge>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputsContainer}>
            <CustomRHFTextInput
              control={control}
              name="email"
              title="Email"
              placeholder="Enter Email"
              rules={{
                required: { value: true, message: 'Email is required' },
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              }}
            />

            <CustomRHFTextInput
              control={control}
              secureTextEntry
              title="Password"
              placeholder="Enter Password"
              name="password"
              rules={{
                required: { value: true, message: 'Password is required' },
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              }}
            />

            <Pressable onPress={navigateTo('forgetpassword')}>
              <TextNormal textStyle={styles.forgetPass}>
                Forget Password
              </TextNormal>
            </Pressable>
          </View>

          <View style={styles.buttonContainer}>
            <CustomButton
              isLoading={isLoading}
              onPress={onLogin}
              text="Login"
            />
            <TextNormal textStyle={styles.bottomText}>
              Don't have an account?{' '}
              <TextNormal
                onPress={navigateTo('register')}
                textStyle={{ fontFamily: Font.semiBold }}
              >
                SignUp
              </TextNormal>
            </TextNormal>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    position: 'relative',
  },
  imgBack: {
    width: '100%',
    height: hp(40),
    borderBottomRightRadius: wp(12),
    borderBottomLeftRadius: wp(12),
    borderWidth: 1,
  },
  loginText: {
    color: COLORS.textWhte,
    fontFamily: Font.bold,
    marginLeft: wp(8),
    fontSize: RFValue(28),
    position: 'absolute',
    bottom: hp(3),
  },
  formContainer: {
    paddingHorizontal: wp(8),
    flex: 1,
  },
  inputsContainer: {
    marginTop: hp(4),
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: hp(1),
  },
  bottomText: {
    color: '#64748B',
    marginTop: hp(1),
    textAlign: 'center',
    fontFamily: Font.medium,
  },
  forgetPass: {
    fontSize: RFValue(12),
    fontFamily: Font.medium,
    textAlign: 'right',
  },
});
function useLayoutEffect(arg0: () => void, arg1: any[]) {
  throw new Error('Function not implemented.');
}
