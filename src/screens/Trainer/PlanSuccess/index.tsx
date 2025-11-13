import {BackHandler, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import {TextHuge, TextSmall} from '../../../components/common/customText';
import {Font} from '../../../utils/ImagePath';
import CustomButton from '../../../components/common/customButton';
import {COLORS} from '../../../utils/theme';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ScreenNames} from '../../../navigations/ScreenName';

const PlanSuccess = ({navigation, route}: any) => {
  const {data} = route.params;


  useEffect(() => {
    const backAction = () => {
      navigation.reset({
        index: 0,
        routes: [{name: ScreenNames.BOTTOM_STACK}],
      });
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigation]);

  return (
    <CustomWrapper edge={['top']}>
      <View style={{flex: 1, justifyContent: 'center', gap: hp(3)}}>
        <View>
          <TextHuge
            textStyle={{fontFamily: Font.semiBold, textAlign: 'center'}}>
            Plan Created Successfully!
          </TextHuge>
          <TextSmall textStyle={{textAlign: 'center', color: '#64748B'}}>
            Great work crafting this plan! Your expertise will guide your
            trainee to success.
          </TextSmall>
        </View>
        <View>
          <CustomButton
            onPress={() => {
              // navigation.replace('bottomStack');
              navigation.reset({
                index: 0,
                routes: [{name: ScreenNames.BOTTOM_STACK}],
              });
            }}
            text="Back to home"
          />
          {/* <CustomButton
            text="View Profile"
            containerStyle={{backgroundColor: COLORS.btnGray, marginTop: hp(2)}}
            onPress={() => {
              navigation.navigate(ScreenNames.CLIENTS_REQUEST, {data: data});
            }}
          /> */}
        </View>
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          marginVertical: hp(1),
        }}>
        {/* <CustomButton
          onPress={() => {
            navigation.goBack();
          }}
          text="Add Exercise"
        /> */}
      </View>
    </CustomWrapper>
  );
};

export default PlanSuccess;

const styles = StyleSheet.create({});
