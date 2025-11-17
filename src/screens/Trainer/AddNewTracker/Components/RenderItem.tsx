import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Controller } from 'react-hook-form';
import CustomRHFTextInput from '../../../../components/common/customRHFinput';
import CustomCheckBox from '../../../../components/CustomCheckBox';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { COLORS } from '../../../../utils/theme';

const RenderItem = ({ control, index }: any) => {
  return (
    <View style={styles.container}>
      {/* TEXT INPUT */}
      <CustomRHFTextInput
        control={control}
        name={`trackers.${index}.exercise`} // FIXED
        title="Basic tracker info"
        placeholder="Add question here"
        rules={{
          required: { value: true, message: 'exercise name is required' },
        }}
        inputContainer={{ borderWidth: 0, borderRadius: 5, height: wp(12) }}
      />

      {/* RADIO CHECKBOX */}
      <Controller
        control={control}
        name={`trackers.${index}.radio`} // FIXED
        render={({ field: { value, onChange } }) => (
          <CustomCheckBox
            id="radio"
            isChecked={value}
            setIsChecked={(checked: boolean) => onChange(checked)}
          />
        )}
      />

      {/* TEXT CHECKBOX */}
      <Controller
        control={control}
        name={`trackers.${index}.text`} // FIXED
        render={({ field: { value, onChange } }) => (
          <CustomCheckBox
            id="text"
            isChecked={value}
            setIsChecked={(checked: boolean) => onChange(checked)}
          />
        )}
      />
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginVertical: wp(3),
    padding: wp(4),
    borderRadius: wp(3),
    borderColor: COLORS.textGray,
  },
});
