import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import {Font, ImagPath} from '../../../utils/ImagePath';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {RFValue} from 'react-native-responsive-fontsize';
import {TextHuge} from '../../../components/common/customText';
import {COLORS} from '../../../utils/theme';
import CustomButton from '../../../components/common/customButton';
import {useFocusEffect} from '@react-navigation/native';
import useToast from '../../../hooks/Toast';

const Onboarding = ({navigation}: any) => {
  const {showToast} = useToast();

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={'#000'}
        animated={true}
      />
      <ImageBackground
        source={ImagPath.onBoardingImage}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.mainView}>
          <TextHuge textStyle={{color: COLORS.appWhite, textAlign: 'center'}}>
            Make The{' '}
            <TextHuge
              textStyle={{fontFamily: Font.bold, color: COLORS.btnGreen}}>
              Body Of {'\n'}Your{' '}
            </TextHuge>
            Dreams.
          </TextHuge>
          <View style={styles.bottomView}>
            <CustomButton
              onPress={() => {
                navigation.navigate('login');
              }}
              containerStyle={{
                backgroundColor: COLORS.btnBlack,
                marginBottom: hp(1),
              }}
              textStyle={styles.btnText}
              text="Login"
            />
            <CustomButton
              onPress={() => {
                navigation.navigate('register');
              }}
              textStyle={{...styles.btnText, color: COLORS.textBlack}}
              text="Register"
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  mainView: {
    gap: hp(3),
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  bottomView: {
    height: hp(25),
    backgroundColor: '#fff',
    borderTopRightRadius: wp(10),
    borderTopLeftRadius: wp(10),
    paddingTop: hp(5),
    paddingHorizontal: wp(8),
  },
  btnText: {
    color: COLORS.textWhte,
    fontSize: RFValue(11),
  },
});
