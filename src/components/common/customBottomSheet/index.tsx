import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../utils/theme';
import {CustomIcon} from '../customIcons';
import {TextBigger, TextSmall} from '../customText';
import CustomButton from '../customButton';
import {CustomBottomSheetProps} from './interface';
import {Controller, useForm} from 'react-hook-form';

const CustomBottomSheet: React.FC<CustomBottomSheetProps> = ({
  reference,
  onOpen,
  onClose,
  userStyle,
  coachStyle,
  btnOnpress,
  onUserPress,
  onCoachPress,
  heading,
  headingStyle,
  mainContainerStyle,
  clientPlan,
  weekonPress,
  monthonPress,
  onNext,
  Selected,
  name,
  control,
}) => {
  const renderClientPlanView = () => (
    <View style={styles.clientPlanContainer}>
      <CustomButton
        Selection
        Selected={Selected}
        onPress={weekonPress}
        text="Weekly"
        value="weekly"
        containerStyle={{
          backgroundColor: Selected === 'weekly' ? '#9FE87080' : '#F4F4F4',
        }}
      />
      <CustomButton
        Selection
        Selected={Selected}
        onPress={monthonPress}
        value="monthly"
        text="Monthly"
        containerStyle={{
          backgroundColor: Selected === 'monthly' ? '#9FE87080' : '#F4F4F4',
        }}
      />
      <CustomButton onPress={onNext} text="Next" />
    </View>
  );

  const renderUserCoachView = () => {
    return (
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Please select any role',
          },
        }}
        render={({field: {value}, fieldState: {error}}) => (
          <>
            <View style={styles.selectionContainer}>
              <Pressable
                onPress={onUserPress}
                style={[
                  styles.optionButton,
                  userStyle,
                  value === 'user' && {
                    borderColor: 'orange',
                    borderWidth: hp(0.3),
                  },
                ]}>
                <CustomIcon
                  icon={'user'}
                  type="feather"
                  size={wp(8)}
                  color={COLORS.appWhite}
                  style={styles.userIcon}
                />
                <TextSmall textStyle={styles.userText}>User</TextSmall>
              </Pressable>

              <Pressable
                onPress={onCoachPress}
                style={[
                  styles.optionButton,
                  coachStyle,
                  styles.coachButton,
                  value === 'coach' && {
                    borderColor: 'orange',
                    borderWidth: hp(0.3),
                  },
                ]}>
                <CustomIcon
                  icon={'dumbbell'}
                  type="font-awesome5"
                  size={wp(8)}
                  color={COLORS.btnBlack}
                  style={styles.coachIcon}
                />
                <TextSmall textStyle={styles.coachText}>Coach</TextSmall>
              </Pressable>
            </View>
            {error && (
              <TextSmall
                textStyle={{
                  color: 'red',
                  textAlign: 'center',
                  marginTop: hp(1),
                }}>
                {error?.message}
              </TextSmall>
            )}
            <CustomButton
              text="Continue"
              containerStyle={{
                ...styles.continueButton,
                marginTop: error ? 0 : hp(3),
              }}
              textStyle={styles.continueText}
              onPress={btnOnpress}
            />
          </>
        )}
      />
    );
  };

  return (
    <RBSheet
      closeOnPressBack
      customStyles={{
        wrapper: {backgroundColor: 'transparent'},
        container: {
          minHeight: hp(40),
          // height: hp(40),
          // maxHeight: hp(45),
          backgroundColor: COLORS.Green,
          borderTopRightRadius: wp(15),
          borderTopLeftRadius: wp(15),
          borderWidth: hp(0.2),
          borderColor: '#000',
          width: '100%',
          borderBottomWidth: 0,
          paddingHorizontal: wp(10),
          paddingTop: hp(4),
          ...mainContainerStyle,
        },
      }}
      onOpen={onOpen}
      onClose={onClose}
      ref={reference}
      customModalProps={{animationType: 'slide'}}>
      <TextBigger textStyle={{...styles.heading, ...headingStyle}}>
        {heading}
      </TextBigger>

      {clientPlan ? renderClientPlanView() : renderUserCoachView()}
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
  },
  clientPlanContainer: {
    gap: hp(2),
    marginTop: hp(3),
  },
  selectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(2),
  },
  optionButton: {
    width: wp(35),
    height: hp(18),
    borderRadius: wp(4),
    backgroundColor: COLORS.btnBlack,
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp(0.5),
  },
  coachButton: {
    backgroundColor: COLORS.appWhite,
  },
  userIcon: {
    width: wp(8),
  },
  coachIcon: {
    width: wp(11),
  },
  userText: {
    color: COLORS.textWhte,
  },
  coachText: {
    color: COLORS.textBlack,
  },
  continueButton: {
    backgroundColor: COLORS.btnBlack,
    // marginVertical: hp(3),
  },
  continueText: {
    color: COLORS.textWhte,
  },
});

export default CustomBottomSheet;
