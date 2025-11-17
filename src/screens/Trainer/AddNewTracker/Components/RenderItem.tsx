import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import CustomRHFTextInput from '../../../../components/common/customRHFinput';

import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { COLORS } from '../../../../utils/theme';
import CustomDropdown from '../../../../components/common/customDropDown';
import { TextSmall } from '../../../../components/common/customText';
import CustomCheckBox from '../../../../components/customCheckBox';

let data = [
  {
    label: 'text',
    value: 'Text',
  },
];

const RenderItem = ({ control, index, setValue }: any) => {
  const [type, setType] = useState([]);
  console.log(type?.[index]);

  return (
    <View style={styles.container}>
      <CustomRHFTextInput
        control={control}
        name={`trackers.${index}.exercise`}
        title="Basic tracker info"
        placeholder="Add question here"
        rules={{
          required: { value: true, message: 'exercise name is required' },
        }}
        inputContainer={{ borderWidth: 0, borderRadius: 5, height: wp(12) }}
      />

      <Controller
        control={control}
        name={`trackers.${index}.isRadio`}
        render={({ field: { value, onChange } }) => (
          <CustomCheckBox
            id="radio"
            isChecked={value}
            title="Add yes/no Radio Button"
            setIsChecked={(checked: boolean) => onChange(checked)}
          />
        )}
      />

      <Controller
        control={control}
        name={`trackers.${index}.isTextField`}
        rules={{
          validate: (_, formValues) =>
            formValues.trackers[index].isRadio ||
            formValues.trackers[index].isTextField ||
            'Select any of the options',
        }}
        render={({ field: { value, onChange }, fieldState: { error } }) => {
          return (
            <>
              <CustomCheckBox
                id="text"
                isChecked={value}
                title="Add Text Option"
                setIsChecked={(checked: boolean) => onChange(checked)}
              />

              {error?.message && (
                <TextSmall textStyle={{ color: 'red' }}>
                  {error?.message}
                </TextSmall>
              )}
            </>
          );
        }}
      />
      <View>
        <CustomDropdown
          rules={{
            required: {
              value: true,
              message: 'city is required',
            },
          }}
          control={control}
          dropDownStyle={{
            borderWidth: 0,
            borderRadius: 3,
            height: heightPercentageToDP(6),
          }}
          title="Category type"
          placeholder={'Select Category type'}
          data={data}
          value={type?.[index]}
          name={`trackers.${index}.CategoryType`}
          onChange={item => {
            setValue(`trackers.${index}.CategoryType`, item.value);
            setType((prev: any) => ({
              ...prev,
              [index]: item.value,
            }));
          }}
        />
      </View>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginVertical: wp(3),
    padding: wp(4),
    borderRadius: wp(6),
    borderColor: COLORS.textGray,
    gap: wp(2),
    // flex: 1,
  },
});
