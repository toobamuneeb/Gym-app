import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/theme';
import {
  TextBig,
  TextBiggest,
  TextNormal,
  TextSmall,
} from '../common/customText';
import {Font} from '../../utils/ImagePath';
import CustomButton from '../common/customButton';
import {planProps} from './interface';
import {CustomIcon} from '../common/customIcons';
import {useDispatch} from 'react-redux';
import {removeExercise} from '../../redux/reducers/planSlice';

const CustomAddPlan = ({
  onPress,
  title,
  count,
  data,
  index,
  btnText,
  onPressCross,
  exercise = false,
  day,
}: planProps) => {


  const dispatch = useDispatch();
  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TextBig textStyle={{fontFamily: Font.bold}}>{title}</TextBig>

        {!exercise && (
          <CustomIcon
            icon="cross"
            type="entypo"
            size={wp(6)}
            color="#000"
            onPress={onPressCross}
          />
        )}
      </View>
      {data &&
        data?.map((item, index) => (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{marginVertical: hp(0.5), flexDirection: 'row'}}
              key={index}>
              <TextNormal>{index + 1 + ` : `}</TextNormal>
              <View>
                <TextNormal>{item?.name}</TextNormal>
                <TextSmall>{item?.description || item?.quantity}</TextSmall>
              </View>
            </View>
            {exercise && (
              <CustomIcon
                icon="cross"
                type="entypo"
                size={wp(6)}
                color="#000"
                onPress={() =>
                  dispatch(removeExercise({day: day, index: index}))
                }
              />
            )}
          </View>
        ))}
      <CustomButton
        onPress={onPress}
        containerStyle={styles.btnStyle}
        text={btnText}
      />
    </View>
  );
};

export default CustomAddPlan;

const styles = StyleSheet.create({
  mainContainer: {
    padding: wp(4),
    borderRadius: wp(3),
    backgroundColor: COLORS.inputBack,
    borderWidth: hp(0.15),
    borderColor: COLORS.btnBlack,
    // minHeight: hp(15),
    // maxHeight: hp(15),
    marginBottom: hp(2),
  },
  btnStyle: {
    // width: '35%',
    minHeight: hp(3),
    paddingVertical: hp(0.5),
    borderRadius: wp(10),
    marginTop: hp(2),
    alignSelf: 'flex-start',
    paddingHorizontal: wp(3),
  },
});
