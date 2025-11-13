import {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {ScrollView, View, StyleSheet} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomSelectBtn from '../../../components/ButtonComp';
import CustomButton from '../../../components/common/customButton';
import CustomHeader from '../../../components/common/customHeader';
import {TextNormal} from '../../../components/common/customText';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import {Font} from '../../../utils/ImagePath';
import {COLORS} from '../../../utils/theme';

const DateOfBirth = ({navigation, route}: any) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const {data} = route.params || {};
  

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {
      gender: 'male',
      Dob: new Date(),
    },
  });

  const selectedValue = watch('gender');
  const selectedDate = watch('Dob');

  const onSubmit = (isdata: any) => {

    navigation.navigate('weight', {data: {...data, ...isdata}});
  };

  return (
    <CustomWrapper edge={['top']} containerStyle={{flex: 1}}>
      <ScrollView
        bounces={false}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <CustomHeader
          navigation={navigation}
          title="What is your Date of Birth & Gender?"
        />

        <View style={{marginTop: hp(3)}}>
          <TextNormal textStyle={styles.subTiile}>Date Of Birth</TextNormal>

          <Controller
            control={control}
            name="Dob"
            render={({field: {value}}) => (
              <CustomButton
                text={
                  value ? value.toLocaleDateString() : 'Select date of birth'
                }
                containerStyle={{
                  height: hp(8),
                  backgroundColor: COLORS.inputBack,
                }}
                textStyle={{color: value ? COLORS.textBlack : 'gray'}}
                calenderIcon={true}
                onPress={() => setIsDatePickerOpen(true)}
              />
            )}
          />

          <View style={{marginTop: hp(2)}}>
            <TextNormal textStyle={styles.subTiile}>Gender</TextNormal>
            <View
              style={{flexDirection: 'row', alignItems: 'center', gap: wp(2)}}>
              <CustomSelectBtn
                title={'Male'}
                name={'gender'}
                value={'male'}
                control={control}
                selectedValue={selectedValue}
              />
              <CustomSelectBtn
                title={'Female'}
                name={'gender'}
                value={'female'}
                control={control}
                selectedValue={selectedValue}
              />
            </View>
          </View>

          <DatePicker
            theme="light"
            modal
            mode="date"
            open={isDatePickerOpen}
            date={selectedDate || new Date()}
            onConfirm={date => {
              setValue('Dob', date);
              setIsDatePickerOpen(false);
            }}
            onCancel={() => {
              setIsDatePickerOpen(false);
            }}
            maximumDate={new Date()}
          />
        </View>

        <View style={styles.btnView}>
          <CustomButton text="Next" onPress={handleSubmit(onSubmit)} />
          <TextNormal textStyle={styles.bottomText}>
            Don't have an account?{' '}
            <TextNormal textStyle={{fontFamily: Font.semiBold}}>
              SignUp
            </TextNormal>
          </TextNormal>
        </View>
      </ScrollView>
    </CustomWrapper>
  );
};

export default DateOfBirth;

const styles = StyleSheet.create({
  btnView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: hp(2),
  },
  bottomText: {
    color: '#64748B',
    marginTop: hp(1),
    textAlign: 'center',
    fontFamily: Font.medium,
  },
  subTiile: {
    fontFamily: Font.medium,
    color: COLORS.titleColor,
    marginBottom: hp(1),
  },
});
