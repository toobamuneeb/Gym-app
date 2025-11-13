import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React, {FC} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {COLORS} from '../../../utils/theme';

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {CustomIcon} from '../customIcons';

type Props = {
  value?: string;
  onSubmitEditing?: (e: any) => void;
  containerStyle?: ViewStyle;
  onChangeText: (text: string) => void;
  reference?: any;
  loading?: boolean;
  placeholder?: string;
};
const CustomSearchInput: FC<Props> = ({
  value,
  onSubmitEditing,
  containerStyle,
  onChangeText,
  reference,
  loading = false,
  placeholder = '',
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        ref={reference}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={COLORS.lightGrey}
        style={styles.input}
        // selectionColor={COLORS.black}
      />
      {loading ? (
        <ActivityIndicator size="small" color={'black'} />
      ) : (
        <CustomIcon type="feather" icon="search" size={20} color={'#0A61B0'} />
      )}
    </View>
  );
};

export default CustomSearchInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.appWhite,
    marginTop: heightPercentageToDP(1),
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Platform.OS == 'ios' ? heightPercentageToDP(1) : 0,
    paddingHorizontal: widthPercentageToDP(3),
    gap: widthPercentageToDP(1),
    borderBottomWidth: 1,
    borderColor: '#d7d7d7',
  },
  input: {
    color: '#000',
    textDecorationLine: 'none',
    flex: 1,
    height:
      Platform.OS == 'android'
        ? heightPercentageToDP(7)
        : heightPercentageToDP(5),
  },
});
