import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { COLORS } from '../../../../utils/theme';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {
  TextSmall,
  TextSmaller,
} from '../../../../components/common/customText';
import Customimage from '../../../../components/common/customImage';
import { ImagPath } from '../../../../utils/ImagePath';
import moment from 'moment';

const Banner = ({ data }: any) => {
  console.log(data);
  return (
    <View style={styles.container}>
      <View>
        <TextSmall bold children={'Daily Check-in'} />
        <TextSmaller
          textStyle={{ textDecorationLine: 'underline' }}
          children={moment().format('MMM DD, YYYY')}
        />
      </View>
      <View style={styles.row}>
        <View>
          <TextSmall bold children={data?.firstName + ' ' + data?.lastName} />
          <TextSmaller children={'Your Personal trainer'} />
        </View>

        <Customimage
          resizeMode={'cover'}
          source={{ uri: data?.trainerProfile?.profileImage }}
          style={styles.image}
        />
      </View>
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGreen,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(2),
    paddingVertical: wp(4),
    borderRadius: wp(3),
    marginVertical: wp(2),
  },
  image: { height: wp(10), width: wp(10), borderRadius: wp(10) },
  row: { flexDirection: 'row', alignItems: 'center', gap: wp(2) },
});
