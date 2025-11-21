import { StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../../utils/theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  TextSmall,
  TextSmaller,
} from '../../../../components/common/customText';
import CustomCheckBox from '../../../../components/customCheckBox';
import { Controller } from 'react-hook-form';
import CustomRHFTextInput from '../../../../components/common/customRHFinput';
import { RFValue } from 'react-native-responsive-fontsize';
import { Font } from '../../../../utils/ImagePath';

const RenderItem = ({ item, index, control }: any) => {
  return (
    <View style={styles.container}>
      <TextSmall bold children={item.question} />
      {item?.is_radio_button && (
        <Controller
          control={control}
          defaultValue={null}
          rules={{
            validate: value => value !== null || 'Select any of the options',
          }}
          name={`trackers.${index}.answer_radio_button`}
          render={({ field: { value, onChange }, fieldState: { error } }) => (
            <View>
              <View style={styles.checkBoxContainer}>
                <CustomCheckBox
                  id="yes"
                  isChecked={value === true}
                  title="Yes"
                  setIsChecked={(checked: boolean) => onChange(true)}
                />
                <CustomCheckBox
                  id="no"
                  isChecked={value === false}
                  title="No"
                  setIsChecked={(checked: boolean) => onChange(false)}
                />
              </View>
              {error?.message && (
                <TextSmaller style={styles.radioButtonError}>
                  {error.message}
                </TextSmaller>
              )}
            </View>
          )}
        />
      )}

      {item?.is_text_field && (
        <CustomRHFTextInput
          control={control}
          name={`trackers.${index}.answer_text_field`}
          placeholder="Answer here"
          rules={{
            required: { value: true, message: 'Answer is required' },
          }}
          inputContainer={styles.input}
        />
      )}
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginVertical: wp(1),
    padding: wp(4),
    borderRadius: wp(3),
    borderColor: COLORS.textGray,
    gap: wp(3),
  },

  checkBoxContainer: { flexDirection: 'row', gap: wp(4), alignItems: 'center' },
  description: {
    backgroundColor: COLORS.btnGray,
    paddingHorizontal: wp(2),
    borderRadius: wp(1),
    paddingVertical: wp(2),
  },
  input: {
    borderWidth: 0,
    borderRadius: 5,
    height: wp(22),
    alignItems: 'flex-start',
  },
  radioButtonError: {
    color: 'red',
    fontSize: RFValue(11),
    fontFamily: Font.semiBold,
    paddingTop: wp(1),
  },
});
