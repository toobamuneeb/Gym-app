import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {CustomIcon} from '../common/customIcons';
import {TextSmall} from '../common/customText';

interface Propss {
  item?: {
    btn?: string;
    family?: any;
    icn?: any;
  };
  index?: number;
  onPress?: () => void;
}

const ProfileBtns: React.FC<Propss> = ({item, index, onPress}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{...styles.mainView, borderBottomWidth: index === 5 ? 0 : 1}}>
      <CustomIcon
        type={item?.family}
        icon={item?.icn}
        size={widthPercentageToDP(6)}
        color={'#677282'}
        style={{
          width: index === 1 ? widthPercentageToDP(6) : null,
          paddingLeft: index === 1 ? widthPercentageToDP(1) : null,
        }}
      />

      <TextSmall
        textStyle={{
          flex: 1,
          marginLeft: widthPercentageToDP(4),
          color: '#677282',
        }}>
        {item?.btn}
      </TextSmall>

      <CustomIcon
        type="feather"
        icon="chevron-right"
        size={widthPercentageToDP(6)}
        color={'#677282'}
      />
    </Pressable>
  );
};

export default ProfileBtns;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#DBDBDB',
    paddingVertical: heightPercentageToDP(2),
    paddingHorizontal: widthPercentageToDP(5),
  },
});
