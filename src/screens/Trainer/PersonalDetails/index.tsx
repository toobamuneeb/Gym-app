import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../../components/common/customHeader';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Font} from '../../../utils/ImagePath';
import {TextNormal, TextSmall} from '../../../components/common/customText';
import {Controller, useForm} from 'react-hook-form';
import CustomButton from '../../../components/common/customButton';
import {COLORS} from '../../../utils/theme';
import DatePicker from 'react-native-date-picker';
import {RFValue} from 'react-native-responsive-fontsize';
import CustomSelectBtn from '../../../components/ButtonComp';
import CustomDropdown from '../../../components/common/customDropDown';
import CustomPickImage from '../../../components/common/customPickImage';
import PersonalDetails1Hook from './PersonalDetails1';
import {ScreenNames} from '../../../navigations/ScreenName';

const PersonalDetails = ({navigation, route}: any) => {
  const {data} = route.params;
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const {
    onSelect,
    control,
    setValue,
    handleSubmit,
    profileImage,
    gender,
    Dob,
    country,
    city,
    countries,
    cities,
    trigger,
  } = PersonalDetails1Hook();

  const SignUp = () => {
    const submit = handleSubmit(dataa => {
      navigation.navigate(ScreenNames.PERSONAL_DETAILS2, {
        data: {...data, ...dataa},
      });
    });
    return submit();
  };

  return (
    <CustomWrapper edge={['top']}>
      <ScrollView
        bounces={false}
        scrollEnabled
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <CustomHeader
          trainer
          navigation={navigation}
          title="Personal Details"
        />

        <CustomPickImage
          personalDetail1
          imageStyle={{
            ...styles.profileImage,
            backgroundColor: profileImage ? '' : 'lightgray',
          }}
          pickImageStyle={styles.profileMainView}
          control={control}
          name="profileImage"
          title={`${data?.firstName}` + ' ' + `${data?.lastName}`}
          onPress={() => {
            onSelect();
          }}
          selectedMedia={profileImage}
          errstyle={{marginTop: hp(-1)}}
        />

        <View style={{marginTop: hp(3)}}>
          <TextNormal textStyle={styles.subTiile}>Date Of Birth</TextNormal>

          <Controller
            rules={{
              required: {
                value: true,
                message: 'date of birth is required',
              },
            }}
            control={control}
            name="Dob"
            render={({field: {value}, fieldState: {error}}) => (
              <>
                <CustomButton
                  text={value ? value.toLocaleDateString() : 'mm/dd/yyyy'}
                  containerStyle={{
                    ...styles.calender,
                    marginBottom: error ? 0 : hp(2),
                  }}
                  textStyle={{
                    color: value ? COLORS.textBlack : 'gray',
                    fontSize: !value ? RFValue(12) : RFValue(14),
                  }}
                  calenderIcon={true}
                  onPress={() => setIsDatePickerOpen(true)}
                />

                {error && (
                  <TextSmall textStyle={{color: 'red'}}>
                    {error.message}
                  </TextSmall>
                )}
              </>
            )}
          />
          <DatePicker
            theme="light"
            modal
            mode="date"
            open={isDatePickerOpen}
            date={Dob || new Date()}
            onConfirm={date => {
              setValue('Dob', date);
              trigger('Dob');
              setIsDatePickerOpen(false);
            }}
            onCancel={() => {
              setIsDatePickerOpen(false);
            }}
            maximumDate={new Date()}
          />

          <CustomDropdown
            rules={{
              required: {
                value: true,
                message: 'country is required',
              },
            }}
            control={control}
            title="Country"
            placeholder={'Select Country'}
            data={countries}
            value={country}
            name="country"
            onChange={item => {
              setValue('country', item.value);
              trigger('country');
            }}
          />
          <CustomDropdown
            rules={{
              required: {
                value: true,
                message: 'city is required',
              },
              validate: {
                countrySelected: () =>
                  country !== '' || 'Please select country first',
              },
            }}
            control={control}
            disable={!country}
            title="City"
            placeholder={'Select City'}
            data={cities}
            value={city}
            name="city"
            onChange={item => {
              setValue('city', item.value);
              trigger('city');
            }}
            onPress={() => {
              if (!country) {
                Alert.alert('Please Select Country First ');
              } else {
                return;
              }
            }}
          />

          <TextNormal textStyle={styles.subTiile}>Gender</TextNormal>
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: wp(2)}}>
            <CustomSelectBtn
              title={'Male'}
              name={'gender'}
              value={'male'}
              control={control}
              selectedValue={gender}
            />
            <CustomSelectBtn
              title={'Female'}
              name={'gender'}
              value={'female'}
              control={control}
              selectedValue={gender}
            />
          </View>
        </View>

        <View style={styles.btnView}>
          <CustomButton
            onPress={() => {
              SignUp();
            }}
            text="Next"
          />
        </View>
      </ScrollView>
    </CustomWrapper>
  );
};

export default PersonalDetails;

const styles = StyleSheet.create({
  subTiile: {
    fontFamily: Font.medium,
    color: COLORS.titleColor,
    marginBottom: hp(1),
  },
  btnView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: hp(2),
  },

  profileImage: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(2),
    marginRight: wp(4),
  },
  profileMainView: {
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    borderWidth: 0,
    marginTop: hp(2),
  },
  calender: {
    height: hp(8),
    backgroundColor: COLORS.inputBack,
  },
});
