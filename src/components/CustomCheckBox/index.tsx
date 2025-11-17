import { Pressable, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { COLORS } from '../../utils/theme';
import { TextSmall } from '../common/customText';

interface CustomCheckBoxProps {
  isChecked: boolean;
  setIsChecked: (value: boolean) => void; // FIXED
  id: string;
}

const CustomCheckBox = ({
  isChecked,
  setIsChecked,
  id,
}: CustomCheckBoxProps) => {
  const styles = useMemo(() => style(isChecked), [isChecked]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setIsChecked(!isChecked)} // FIXED → returns ONLY boolean
        style={styles.checkBox}
      />

      <TextSmall>
        {id === 'radio' ? 'Add yes/no Radio Button' : 'Add Text Option'}
      </TextSmall>
    </View>
  );
};

export default CustomCheckBox;

const style = (isChecked: boolean) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: wp(2),
    },
    checkBox: {
      width: wp(4),
      height: wp(4),
      borderWidth: 1,
      borderRadius: wp(1),
      borderColor: isChecked ? COLORS.Green : COLORS.textGray,
      backgroundColor: isChecked ? COLORS.Green : COLORS.textWhte,
    },
  });
