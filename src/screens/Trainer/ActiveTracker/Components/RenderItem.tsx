import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../../utils/theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  TextSmall,
  TextSmaller,
} from '../../../../components/common/customText';
import CustomCheckBox from '../../../../components/customCheckBox';
import CustomButton from '../../../../components/common/customButton';

const RenderItem = ({ item, index }: any) => {
  return (
    <View style={styles.container}>
      <TextSmall bold children={item.question} />
      {item?.isRadioBtn && (
        <View style={styles.checkBoxContainer}>
          <CustomCheckBox title={'Yes'} isChecked={false} />
          <CustomCheckBox title={'No'} isChecked={true} />
        </View>
      )}

      {item?.isTextField && (
        <View style={styles.description}>
          <TextSmaller
            children={
              'JavaScript logs have moved! They can now be viewed in React Native DevTools. Tip: Type j in the terminal to open (requires Google Chrome or Microsoft Edge).'
            }
          />
        </View>
      )}
      <View style={{ paddingTop: wp(6) }}>
        <CustomButton text="Approved" />
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
