import {useForm} from 'react-hook-form';
import {ScrollView, View, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../../components/common/customButton';
import CustomHeader from '../../../components/common/customHeader';
import Customimage from '../../../components/common/customImage';
import CustomRHFTextInput from '../../../components/common/customRHFinput';
import {TextSmall} from '../../../components/common/customText';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import {ImagPath} from '../../../utils/ImagePath';
import useCreateNewPass from './useCreateNewPass';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {ScreenNames} from '../../../navigations/ScreenName';

const CreateNewPass = ({navigation, route}: any) => {
  const {id} = route.params || {};
  const {getValues, control, handleSubmit, handleChange, isLoading} =
    useCreateNewPass();
  const onChange = () => {
    return handleSubmit(data => handleChange({...data, id}, navigation))();
  };
  return (
    <CustomWrapper>
      <ScrollView
        bounces={false}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <CustomHeader navigation={navigation} title="Create New Password" />
        <TextSmall textStyle={{}}>
          Create a new password and remember it
        </TextSmall>

        <View style={{marginTop: hp(3)}}>
          <CustomRHFTextInput
            control={control}
            name="password"
            secureTextEntry={true}
            title="Password"
            placeholder="Enter Password"
            rules={{
              required: {value: true, message: 'Password is required '},
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            }}
          />

          <CustomRHFTextInput
            name="cnfrmpass"
            title="Confirm  Password"
            placeholder="Enter Password"
            secureTextEntry={true}
            control={control}
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

          <Customimage source={ImagPath.NewPasImg} style={styles.NewPasImg} />
        </View>
        <View style={styles.btnView}>
          <CustomButton
            onPress={() => {
              onChange();
            }}
            isLoading={isLoading}
            text="Reset Password"
          />
        </View>
      </ScrollView>
    </CustomWrapper>
  );
};

export default CreateNewPass;

const styles = StyleSheet.create({
  NewPasImg: {
    width: '100%',
    height: hp(35),
  },
  btnView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: hp(2),
  },
});
