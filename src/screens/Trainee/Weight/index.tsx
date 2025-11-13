import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import CustomHeader from '../../../components/common/customHeader';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomButton from '../../../components/common/customButton';
import {TextHuge, TextNormal} from '../../../components/common/customText';
import {Font} from '../../../utils/ImagePath';
import {RFValue} from 'react-native-responsive-fontsize';
import {COLORS} from '../../../utils/theme';
import WeightComp from '../../../components/WeightComponent';
import CustomModel from '../../../components/common/customModel';
import {useForm} from 'react-hook-form';
import {weightProps} from './interface';
import {useDispatch} from 'react-redux';
import useWeight from './useWeight';

const Weight = ({navigation, route}: weightProps) => {
  const {data} = route?.params || {};

  const dispatch = useDispatch();
  const [visible, setvisible] = useState(false);

  const {
    control,
    handleSubmit,
    handleWeight,
    formState,
    selectedWeight,
    selectedHeight,
    selectedGweight,
    isLoading,
  } = useWeight(data);

  const onSend = async () => {
    return handleSubmit(data => handleWeight(data, navigation))();
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{flex: 1}}>
      <CustomWrapper edge={['top']}>
        <ScrollView
          bounces={false}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <CustomHeader
            navigation={navigation}
            containerStyle={{height: hp(8)}}
          />

          <View
            style={{
              flex: 1,
              alignItems: 'center',
              gap: hp(4),
              marginBottom: hp(2),
            }}>
            <WeightComp
              control={control}
              title="Your Weight"
              subtitle1="Pound"
              subtitle2="Kilogram"
              rightText={`${selectedWeight === 'lbs' ? 'lbs' : 'kg'}`}
              name={'weight.value'}
              rules={{
                required: {value: true, message: 'your weight is required '},
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'Please enter numbers only',
                },
              }}
              formState={formState}
              btntitle1={'Pound'}
              b1name={'weight.unit'}
              value1={'lbs'}
              selectedValue1={selectedWeight}
              btntitle2={'Kilogram'}
              b2name={'weight.unit'}
              value2={'kg'}
              selectedValue2={selectedWeight}
            />

            <WeightComp
              control={control}
              title="Your Height"
              subtitle1="Feet"
              subtitle2="Centimeter"
              rightText={`${selectedHeight === 'ft' ? 'ft' : 'cm'}`}
              name={'height.value'}
              rules={{
                required: {value: true, message: 'Your height is required'},
                validate: {
                  validHeight: (value: string) => {
                    if (!value) return true;

                    if (selectedHeight === 'ft') {
                      const cleanedValue = value
                        .trim()
                        .replace(/[`´‘’‛“”]/g, "'") // Normalize smart quotes
                        .replace(/[^0-9']/g, ''); // Strip everything but digits and apostrophe

                      const match = cleanedValue.match(/^(\d+)'\s*(\d{0,2})$/);
                      if (!match)
                        return "Invalid height format. Use format like 5'11";

                      const feet = parseInt(match[1]);
                      const inches = match[2] ? parseInt(match[2]) : 0;

                      if (isNaN(feet) || feet < 2 || feet > 8)
                        return 'Feet should be between 2 and 8';
                      if (isNaN(inches) || inches < 0 || inches > 11)
                        return 'Inches should be between 0 and 11';
                    } else {
                      const cm = parseInt(value);
                      if (isNaN(cm) || cm < 50 || cm > 250)
                        return 'Height should be between 50cm and 250cm';
                    }

                    return true;
                  },
                },
              }}
              formState={formState}
              btntitle1={'Feet'}
              b1name={'height.unit'}
              value1={'ft'}
              selectedValue1={selectedHeight}
              btntitle2={'Centimeter'}
              b2name={'height.unit'}
              value2={'cm'}
              selectedValue2={selectedHeight}
            />
            <WeightComp
              control={control}
              title="Your Goal Weight"
              subtitle1="Pound"
              subtitle2="Kilogram"
              rightText={`${selectedGweight === 'lbs' ? 'lbs' : 'kg'}`}
              name={'goalweight.value'}
              rules={{
                required: {
                  value: true,
                  message: 'your goal weight is required ',
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'Please enter numbers only',
                },
              }}
              formState={formState}
              btntitle1={'Pound'}
              b1name={'goalweight.unit'}
              value1={'lbs'}
              selectedValue1={selectedGweight}
              btntitle2={'Kilogram'}
              b2name={'goalweight.unit'}
              value2={'kg'}
              selectedValue2={selectedGweight}
            />
          </View>

          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              marginVertical: hp(1),
            }}>
            <CustomButton
              isLoading={isLoading}
              text="Next"
              onPress={() => {
                // setvisible(true);
                onSend();
              }}
            />
          </View>

          <CustomModel
            visible={visible}
            onRequestClose={() => {
              setvisible(false);
            }}
            btnOnpress={() => {
              setvisible(false);
              navigation.navigate('bottomStack');
            }}
            title="User Signed Up"
            desc="  Your account has been successfully created. Feel free to explore, and
          don’t forget to complete your profile!"
          />
        </ScrollView>
      </CustomWrapper>
    </KeyboardAvoidingView>
  );
};

export default Weight;

const styles = StyleSheet.create({
  pound: {
    width: wp(30),
    borderRadius: wp(2),
    paddingVertical: hp(0.5),
    minHeight: hp(4),
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  kilogram: {
    width: wp(30),
    borderRadius: wp(2),
    paddingVertical: hp(0.5),
    minHeight: hp(4),
  },
});
