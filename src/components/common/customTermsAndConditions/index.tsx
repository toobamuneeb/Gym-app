import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CustomIcon } from '../customIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { COLORS } from '../../../utils/theme';
import { TextSmall } from '../customText';
interface Props {
  agreed?: string;
  onPress?: () => void;
  error?: string;
}
const CustomTermsAndConditions = ({ agreed, onPress, error }: Props) => {
  return (
    <View>
      <Pressable onPress={onPress} style={styles.privacy}>
        {agreed === 'agreed' ? (
          <CustomIcon
            type="antdesign"
            icon="checksquare"
            size={RFValue(16)}
            color={COLORS.Icongreen}
            style={{ width: RFValue(16) }}
          />
        ) : (
          <CustomIcon
            icon={'square'}
            size={RFValue(16)}
            color={COLORS.IconBlack}
            type="feather"
            style={{ width: RFValue(16) }}
          />
        )}

        <TextSmall textStyle={{ marginLeft: RFValue(7) }}>
          By registering, you are accepting our Terms and conditions and Privacy
          Policy
        </TextSmall>
      </Pressable>
      {error && (
        <TextSmall textStyle={{ color: 'red' }}>{`${error}`}</TextSmall>
      )}
    </View>
  );
};

export default CustomTermsAndConditions;

const styles = StyleSheet.create({
  privacy: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
  },
});
