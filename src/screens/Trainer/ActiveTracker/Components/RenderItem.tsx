import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../../../utils/theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  TextSmall,
  TextSmaller,
} from '../../../../components/common/customText';
import CustomCheckBox from '../../../../components/customCheckBox';
import CustomButton from '../../../../components/common/customButton';

const RenderItem = ({ item, index, handleApprovedTracker }: any) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <TextSmall bold children={item.question} />
      {item?.is_radio_button && (
        <View style={styles.checkBoxContainer}>
          <CustomCheckBox title={'Yes'} isChecked={item?.answer_radio_button} />
          <CustomCheckBox title={'No'} isChecked={!item?.answer_radio_button} />
        </View>
      )}

      {item?.is_text_field && (
        <View style={styles.description}>
          <TextSmaller children={item?.answer_text_field} />
        </View>
      )}
      <View style={{ paddingTop: wp(6) }}>
        <CustomButton
          isLoading={isLoading}
          onPress={async () => {
            setIsLoading(true);
            const res = await handleApprovedTracker(item?._id);

            setIsLoading(false);
          }}
          text="Approved"
        />
      </View>
    </View>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginVertical: wp(2),
    padding: wp(4),
    borderRadius: wp(3),
    borderColor: COLORS.textGray,
    gap: wp(3),
    // flex: 1,
  },

  checkBoxContainer: { flexDirection: 'row', gap: wp(4), alignItems: 'center' },
  description: {
    backgroundColor: COLORS.btnGray,
    paddingHorizontal: wp(2),
    borderRadius: wp(1),
    paddingVertical: wp(2),
  },
});
