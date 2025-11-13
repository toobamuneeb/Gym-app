import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS} from '../../utils/theme';
import Customimage from '../common/customImage';
import {Font, ImagPath} from '../../utils/ImagePath';
import {TextBiggest, TextNormal, TextSmall} from '../common/customText';
import {CustomIcon} from '../common/customIcons';
import {ClientCardProp} from './interface';

const HomeClientCard = ({
  btnView,
  data,
  clientHeader,
  onPress,
  clientReq,
  icon,
  type,
  head,
  btmText,
  unit,
  count,
}: ClientCardProp) => {
  return (
    <Pressable
      onPress={onPress}
      style={{...(clientReq ? styles.btnView1 : styles.btnView), ...btnView}}>
      {clientReq ? (
        <View style={{gap: hp(1)}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextSmall textStyle={{fontFamily: Font.bold}}>{head}</TextSmall>
            <CustomIcon icon={icon} type={type} size={wp(4)} color="#000" />
          </View>

          <TextBiggest textStyle={{fontFamily: Font.bold}}>
            {btmText} <TextSmall>{unit}</TextSmall>
          </TextBiggest>
        </View>
      ) : (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextBiggest textStyle={{fontFamily: Font.bold}}>
              {count}
            </TextBiggest>

            <CustomIcon
              icon={'arrow-up-right'}
              type={'feather'}
              color="#fff"
              size={wp(6)}
              style={styles.arrowIcon}
            />
          </View>
          <TextSmall textStyle={{marginTop: hp(1)}}>{clientHeader}</TextSmall>
          <FlatList
            style={{marginTop: hp(3)}}
            horizontal
            data={data}
            scrollEnabled={false}
            renderItem={({item, index}) => (
              <View
                style={{
                  marginLeft: index === 0 ? 0 : wp(-5),
                  zIndex: 5 - index,
                }}>
                <Customimage
                  source={{uri: item}}
                  style={{
                    width: wp(10),
                    height: wp(10),
                    borderRadius: wp(12),
                    borderWidth: hp(0.15),
                    borderColor: '#E86144',

                    backgroundColor: '#d7d7d7',
                  }}
                  resizeMode={'cover'}
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </>
      )}
    </Pressable>
  );
};

export default HomeClientCard;

const styles = StyleSheet.create({
  arrowIcon: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10),
  },
  btnView: {
    backgroundColor: COLORS.btnGreen,
    padding: wp(4),
    borderWidth: hp(0.15),
    borderColor: '#000',
    borderRadius: wp(2),
    flex: 1,
  },
  btnView1: {
    backgroundColor: COLORS.btnGreen,
    padding: wp(2),
    borderWidth: hp(0.15),
    borderColor: '#000',
    borderRadius: wp(2),
    flex: 1,
  },
});
