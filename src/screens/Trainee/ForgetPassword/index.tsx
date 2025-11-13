import {useForm} from 'react-hook-form';
import {ScrollView, View, StyleSheet} from 'react-native';
import CustomButton from '../../../components/common/customButton';
import CustomHeader from '../../../components/common/customHeader';
import Customimage from '../../../components/common/customImage';
import CustomRHFTextInput from '../../../components/common/customRHFinput';
import {TextSmall} from '../../../components/common/customText';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import {ImagPath} from '../../../utils/ImagePath';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useForgetPasswordMutation} from '../../../redux/Api/auth.api';
import {ScreenNames} from '../../../navigations/ScreenName';
import useToast from '../../../hooks/Toast';
import {apiRequestHandler} from '../../../utils';
import useForgetPassword from './useForget';

const ForgetPassword = ({navigation}: any) => {
  const {isLoading, handleForget, handleSubmit, control, trigger} =
    useForgetPassword();
  const onSend = async () => {
    return handleSubmit(data => handleForget(data, navigation))();
    // return handleSubmit(data =>
    //   navigation.navigate(ScreenNames.VERIFICATION_CODE),
    // )();
  };
  return (
    <CustomWrapper edge={['top']}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <CustomHeader navigation={navigation} title={'Forget Password'} />

        <TextSmall textStyle={{}}>
          enter your email address for verification
        </TextSmall>

        <View style={{marginTop: hp(3)}}>
          <CustomRHFTextInput
            name="email"
            control={control}
            title="Email"
            placeholder="Enter Email"
            rules={{
              required: {value: true, message: 'Email is required '},
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            }}
          />

          <Customimage source={ImagPath.forImg} style={styles.forImg} />
        </View>
        <View style={styles.btnView}>
          <CustomButton
            onPress={onSend}
            text="send code"
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </CustomWrapper>
  );
};

export default ForgetPassword;

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
