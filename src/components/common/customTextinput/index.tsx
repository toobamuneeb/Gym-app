import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { TextNormal, TextSmall } from '../customText';
import { Font } from '../../../utils/ImagePath';
import { COLORS } from '../../../utils/theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { CustomIcon } from '../customIcons';
import { CustomTextinputProp } from './interface';

const CustomTextinput: React.FC<CustomTextinputProp> = ({
  secureTextEntry,
  placeholder,
  title,
  value,
  onChangeText,
  onBlur,
  numberOfLines,
  error,
  mainContainer,
  inputContainer,
  inputStyle,
  multiline,
  addBtn,
  onAddPress,
  editable,
  keyboardType,
}) => {
  const [hidePassword, setHidePassword] = useState(true);
  return (
    <View style={{ marginBottom: hp(2), ...mainContainer }}>
      {title && (
        <TextNormal
          textStyle={{
            fontFamily: Font.medium,
            color: COLORS.titleColor,
            marginBottom: hp(0.3),
          }}
        >
          {title}
        </TextNormal>
      )}

      <View
        style={[
          styles.inputContainer,
          inputContainer,
          multiline && {
            borderRadius: wp(8),
            height: hp(25),
            flexDirection: undefined,
            paddingVertical: hp(1),
          },
        ]}
      >
        <TextInput
          keyboardType={keyboardType}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          autoCapitalize="none"
          secureTextEntry={secureTextEntry ? hidePassword : false}
          style={[
            styles.inputStyle,
            inputStyle,
            multiline && {
              minHeight: hp(7),
              maxHeight: hp(24),
              flex: undefined,
            },
            // { height: multiline ? undefined : hp(7) },
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholderTextColor={'gray'}
        />

        {secureTextEntry && (
          <CustomIcon
            icon={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            type="ionicons"
            size={wp(6)}
            color={COLORS.lightGrey}
            onPress={() => setHidePassword(!hidePassword)}
            style={styles.eyeIcon}
          />
        )}

        {addBtn && (
          <CustomIcon
            icon={'add-to-list'}
            type="entypo"
            size={wp(6)}
            color={'#000'}
            onPress={onAddPress}
            style={styles.eyeIcon}
          />
        )}
      </View>

      {error && (
        <TextSmall textStyle={{ color: 'red' }}>{error || null}</TextSmall>
      )}
    </View>
  );
};

export default CustomTextinput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderWidth: hp(0.15),
    borderColor: COLORS.btnBlack,
    backgroundColor: COLORS.inputBack,
    paddingHorizontal: wp(1),
    flex: 1,
    borderRadius: wp(20),
  },

  inputStyle: {
    flex: 1,
    fontSize: wp(3.6),
    paddingHorizontal: wp(3),
    color: COLORS.titleColor,
  },
  eyeIcon: {
    flexDirection: 'row',
    paddingRight: wp(2),
    alignSelf: 'center',
  },
});
