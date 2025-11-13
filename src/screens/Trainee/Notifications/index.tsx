import {Alert, FlatList, Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import {
  TextNormal,
  TextSmall,
  TextSmaller,
} from '../../../components/common/customText';
import Header from '../../../components/common/Header';
import {Font, ImagPath} from '../../../utils/ImagePath';
import {RFValue} from 'react-native-responsive-fontsize';
import Customimage from '../../../components/common/customImage';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {CustomIcon} from '../../../components/common/customIcons';
import CustomNotification from '../../../components/customNotification';

const Notification = ({navigation}: any) => {
  const data = [
    {
      id: 0,
      day: 'Today',
      Noti: [
        {
          id: 0,
          profileImag: ImagPath.trainer1,
          name: 'Alex Mercer',
          element: 'Element',
          createdAt: '24 april 2021',
        },
        {
          id: 1,
          profileImag: ImagPath.trainer1,
          name: 'Alex Mercer',
          element: 'Element',
          createdAt: '24 april 2021',
        },
        {
          id: 2,
          profileImag: ImagPath.trainer1,
          name: 'Alex Mercer',
          element: 'Element',
          createdAt: '24 april 2021',
        },
        {
          id: 3,
          profileImag: ImagPath.trainer1,
          name: 'Alex Mercer',
          element: 'Elemesadsadsadsadsadsadsadsadasdasnt',
          createdAt: '24 april 2021',
        },
      ],
    },
    {
      id: 1,
      day: 'Yesterday',
      Noti: [
        {
          id: 0,
          profileImag: ImagPath.trainer1,
          name: 'Alex Mercer',
          element: 'Element',
          createdAt: '24 april 2021',
        },
        {
          id: 1,
          profileImag: ImagPath.trainer1,
          name: 'Alex Mercer',
          element: 'Elemesadsadsadsadsadsadsadsadasdasnt',
          createdAt: '24 april 2021',
        },
        {
          id: 2,
          profileImag: ImagPath.trainer1,
          name: 'Alex Mercer',
          element: 'Element',
          createdAt: '24 april 2021',
        },
        {
          id: 3,
          profileImag: ImagPath.trainer1,
          name: 'Alex Mercer',
          element: 'Elemesadsadsadsadsadsadsadsadasdasnt',
          createdAt: '24 april 2021',
        },
        {
          id: 4,
          profileImag: ImagPath.trainer1,
          name: 'Alex Mercer',
          element: 'Element',
          createdAt: '24 april 2021',
        },
        {
          id: 5,
          profileImag: ImagPath.trainer1,
          name: 'Alex Mercer',
          element: 'Elemesadsadsadsadsadsadsadsadasdasnt',
          createdAt: '24 april 2021',
        },
        {
          id: 6,
          profileImag: ImagPath.trainer1,
          name: 'Alex Mercer',
          element: 'Element',
          createdAt: '24 april 2021',
        },
        {
          id: 7,
          profileImag: ImagPath.trainer1,
          name: 'Alex Mercer',
          element: 'Element',
          createdAt: '24 april 2021',
        },
      ],
    },
  ];
  return (
    <CustomWrapper edge={['top']}>
      <Header title={'Notification'} navigation={navigation} />

      <FlatList
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <TextNormal textStyle={{alignSelf: 'center', marginTop: hp(2)}}>
            No Data Found
          </TextNormal>
        )}
        contentContainerStyle={{paddingBottom: hp(4)}}
        data={[]}
        renderItem={({item, index}) => (
          <CustomNotification item={item} index={index} />
        )}
      />
    </CustomWrapper>
  );
};

export default Notification;

const styles = StyleSheet.create({});
