import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CustomImage from '../../../../components/common/customImage';
import { CustomIcon } from '../../../../components/common/customIcons';
import {
  TextNormal,
  TextSmaller,
} from '../../../../components/common/customText';
import { COLORS } from '../../../../utils/theme';
import { ImagPath } from '../../../../utils/ImagePath';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../../../navigations/ScreenName';

const RenderItem = ({ item }: any) => {
  const navigation = useNavigation<any>();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate(ScreenNames.EXERCISE_LIST, { data: item })
      }
      style={styles.container}
    >
      <View style={styles.profileContainer}>
        <CustomImage
          source={
            item.trainerProfile?.profileImage
              ? { uri: item.trainerProfile?.profileImage }
              : ImagPath.poster
          }
          style={styles.imageContainer}
          resizeMode="cover"
        />
        <View>
          <TextNormal children={item.firstName + ' ' + item.lastName} />
          <TextSmaller color={COLORS.Green} children={'Your Assign Trainer'} />
        </View>
      </View>
      <CustomIcon
        type="antdesign"
        icon="arrowright"
        size={wp(6)}
        color={'#000'}
      />
    </Pressable>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(3),
    gap: wp(4),
  },
  imageContainer: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(2),
  },
});
