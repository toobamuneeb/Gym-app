import {useForm} from 'react-hook-form';
import {ScrollView, View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../../components/common/customButton';
import CustomRHFTextInput from '../../../components/common/customRHFinput';
import {TextHuge, TextSmall} from '../../../components/common/customText';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import {Font} from '../../../utils/ImagePath';
import Header from '../../../components/common/Header';
import useCurrentPassword from './useChangePass';

const ChangePass = ({navigation}: any) => {
  const {control, handleCheck, handleSubmit, isLoading} = useCurrentPassword();

  const onSubmit = handleSubmit(data => handleCheck(data, navigation));
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
          Current Password
        </TextHuge>

        <TextSmall textStyle={{}}>enter your current password</TextSmall>

        <View style={{marginTop: hp(3)}}>
          <CustomRHFTextInput
            name="password"
            control={control}
            secureTextEntry={true}
            title="Password"
            placeholder="Current Password"
            rules={{
              required: {value: true, message: 'Password is required '},
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            }}
          />
        </View>
        <View style={styles.btnView}>
          <CustomButton
            onPress={() => {
              onSubmit();
            }}
            isLoading={isLoading}
            text="Next"
          />
        </View>
      </ScrollView>
    </CustomWrapper>
  );
};

export default ChangePass;

const styles = StyleSheet.create({
  btnView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: hp(2),
  },
});
