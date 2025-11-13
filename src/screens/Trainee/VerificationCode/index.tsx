import {useForm, Controller} from 'react-hook-form';
import {ScrollView, View, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../../components/common/customButton';
import CustomHeader from '../../../components/common/customHeader';
import Customimage from '../../../components/common/customImage';
import CustomOtpInput from '../../../components/common/customOtpInput';
import {TextSmall} from '../../../components/common/customText';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import {ImagPath} from '../../../utils/ImagePath';
import useVerify from './useVerify';
import {ScreenNames} from '../../../navigations/ScreenName';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';

const VerificationCode = ({navigation, route}: any) => {
  const {email, usedfor} = route.params || {};
  const fcmToken = useSelector(
    (state: RootState) => state?.generalSlice?.fcmToken,
  );

  const {control, handleSubmit, handleVerify, trigger, isLoading} = useVerify();
  const onVerify = () => {
    return handleSubmit(data =>
      handleVerify({...data, email, usedfor, fcmToken}, navigation),
    )();
    return handleSubmit(data =>
      navigation.navigate(ScreenNames.CREATE_NEW_PASS),
    )();
  };
  return (
    <CustomWrapper edge={['top']}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <CustomHeader navigation={navigation} title={'Verifcation Code'} />

        <TextSmall textStyle={{}}>
          Please enter the verification code sent to your email address.
        </TextSmall>

        <View style={{marginTop: hp(3)}}>
          <Controller
            control={control}
            name="code"
            key="code"
            rules={{
              required: {value: true, message: 'Code is required '},
              pattern: {
                value: /^\d{6}$/,
                message: 'Please enter a valid 6-digit code',
              },
            }}
            render={({
              field: {value, onBlur, onChange},
              fieldState: {error},
            }) => (
              <CustomOtpInput
                onChange={text => {
                  onChange(text);
                }}
                error={error?.message}
              />
            )}
          />

          <Customimage source={ImagPath.verifyImg} style={styles.forImg} />
        </View>
        <View style={styles.btnView}>
          <CustomButton
            isLoading={isLoading}
            text="verify code"
            onPress={() => {
              onVerify();
            }}
          />
        </View>
      </ScrollView>
    </CustomWrapper>
  );
};

export default VerificationCode;

const styles = StyleSheet.create({
  forImg: {
    width: '100%',
    height: hp(50),
    borderRadius: wp(4),
    marginTop: hp(2.5),
  },
  btnView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: hp(2),
  },
});
