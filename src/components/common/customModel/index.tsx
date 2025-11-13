import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CustomModalProps} from './interface';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../../utils/theme';
import {
  TextBig,
  TextBigger,
  TextHuge,
  TextNormal,
  TextSmall,
} from '../customText';
import CustomButton from '../customButton';
import {CustomIcon} from '../customIcons';
import Modal from 'react-native-modal';
import {Font} from '../../../utils/ImagePath';
import {Calendar, LocaleConfig} from 'react-native-calendars';

const CustomModel: React.FC<CustomModalProps> = ({
  visible = true,
  title,
  desc,
  onRequestClose,
  btnOnpress,
  calender,
}) => {
  const currentDate = new Date().toISOString().split('T')[0];
  return (
    <Modal
      onBackdropPress={onRequestClose}
      onBackButtonPress={onRequestClose}
      isVisible={visible}
      backdropOpacity={0.4}
      style={{margin: wp(4)}}>
      <View style={styles.modalContainer}>
        {calender ? (
          <>
            <Calendar
              // Mark today with custom styling
              markedDates={{
                [currentDate]: {
                  selected: true,
                  selectedColor: '#9FE870',
                  customStyles: {
                    container: {
                      borderRadius: 10,
                    },
                    text: {
                      color: 'black',
                      fontWeight: 'bold',
                    },
                  },
                },
              }}
              // Customize theme including arrow colors
              theme={{
                todayTextColor: 'black',
                arrowColor: '#fff',
                'stylesheet.calendar.header': {
                  arrow: {
                    backgroundColor: '#9FE870',
                    borderRadius: 20,
                    padding: 5,
                  },
                },
              }}
              // Hide day markings except for today
              markingType={'custom'}
              // Basic calendar configuration
              current={currentDate}
              minDate={'2020-01-01'}
              maxDate={'2030-12-31'}
              hideExtraDays={true}
              firstDay={1} // Start week on Monday
            />
          </>
        ) : (
          <>
            <CustomIcon
              type="feather"
              size={wp(15)}
              color={'#9FE870'}
              icon="check-circle"
              style={{width: wp(15)}}
            />

            <TextHuge textStyle={{fontFamily: Font.bold, textAlign: 'center'}}>
              {title}
            </TextHuge>

            <TextNormal textStyle={{textAlign: 'center'}}>{desc}</TextNormal>

            <CustomButton
              onPress={btnOnpress}
              text="Done"
              containerStyle={{width: '100%'}}
            />
          </>
        )}
      </View>
    </Modal>
  );
};

export default CustomModel;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    minHeight: hp(40),
    backgroundColor: COLORS.appWhite,
    borderRadius: wp(10),
    borderWidth: hp(0.2),
    borderColor: '#000',
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: wp(10),
    gap: hp(2),
    paddingVertical: hp(3),
  },

  user: {
    width: wp(35),
    height: hp(18),
    borderRadius: wp(4),
    backgroundColor: COLORS.btnBlack,
    alignItems: 'center',
    justifyContent: 'center',
    gap: hp(0.5),
  },
});
