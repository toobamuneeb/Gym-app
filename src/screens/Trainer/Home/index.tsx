import {
  Alert,
  FlatList,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import ProfileHeader from '../../../components/ProfileComp/ProfileHeader';
import HorizontalDatePicker from '../../../components/common/customCalender';
import Header from '../../../components/common/Header';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Customimage from '../../../components/common/customImage';
import {Font, ImagPath} from '../../../utils/ImagePath';
import {
  TextBiggest,
  TextHuge,
  TextNormal,
  TextSmall,
} from '../../../components/common/customText';
import CustomButton from '../../../components/common/customButton';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomIcon} from '../../../components/common/customIcons';
import {COLORS} from '../../../utils/theme';
import ClientComp from '../../../components/clientComp';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import HomeClientCard from '../../../components/HomeClientCard';
import {ScreenNames} from '../../../navigations/ScreenName';
import socketServices from '../../../utils/socketservice';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {useGetHomeClientQuery} from '../../../redux/Api/client.api';
import {useFocusEffect} from '@react-navigation/native';
export const data = [
  {
    id: 0,
    profileImag: ImagPath.trainer1,
    name: 'Alex Mercer',
    element: 'Loose Weight',
  },
  {
    id: 1,
    profileImag: ImagPath.onBoardingImage,
    name: 'Arthur',
    element: 'Gain Weight',
  },
  {
    id: 2,
    profileImag: ImagPath.loginBack,
    name: 'Madman',
    element: 'Build Muscle',
  },
  {
    id: 3,
    profileImag: ImagPath.aboutTrainer,
    name: 'Henry Marshal',
    element: 'Get FIt',
  },
  {
    id: 4,
    profileImag: ImagPath.aboutTrainer,
    name: 'Henry Marshal',
    element: 'Get FIt',
  },
  {
    id: 5,
    profileImag: ImagPath.aboutTrainer,
    name: 'Henry Marshal',
    element: 'Get FIt',
  },
  {
    id: 6,
    profileImag: ImagPath.aboutTrainer,
    name: 'Henry Marshal',
    element: 'Get FIt',
  },
  {
    id: 7,
    profileImag: ImagPath.aboutTrainer,
    name: 'Henry Marshal',
    element: 'Get FIt',
  },
  {
    id: 8,
    profileImag: ImagPath.aboutTrainer,
    name: 'Henry Marshal',
    element: 'Get FIt',
  },
];

const TrainerHome = ({navigation}: any) => {
  const userData = useSelector((state: RootState) => state.generalSlice.data);
  const {data: isData, isFetching, refetch} = useGetHomeClientQuery([]);
 
  const Tab_Height = useBottomTabBarHeight();
  const bottomPadding =
    Platform.OS === 'android' ? Tab_Height + hp(4) : Tab_Height;

  useEffect(() => {
    socketServices.initializeSocket();
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return (
    <CustomWrapper edge={['top']}>
      <Header
        onPressNotification={() => {
          navigation.navigate(ScreenNames.NOTIFICATION);
        }}
        onPressProfile={() => {
          navigation.navigate(ScreenNames.PROFILE);
        }}
        HomeScreen
        title={`${userData?.firstName}`}
        trainerHome
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: bottomPadding}}
        bounces={false}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            tintColor={'#c4c4c4'}
          />
        }>
        {/* <View style={styles.cardMainView}>
          <View
            style={{flexDirection: 'row', alignItems: 'center', gap: wp(2)}}>
            <Customimage
              source={ImagPath.cardIcon}
              style={{height: hp(8), width: hp(8)}}
            />

            <View style={{}}>
              <TextSmall textStyle={{color: '#929292'}}>
                Total Earning
              </TextSmall>

              <TextHuge textStyle={{fontFamily: Font.bold}}>$32,1k</TextHuge>

              <CustomButton
                textStyle={{
                  fontSize: RFValue(10),
                  fontFamily: Font.semiBold,
                  paddingHorizontal: wp(4),
                }}
                containerStyle={styles.percentAge}
                text="10% App Charge"
              />
            </View>
          </View>
          <CustomIcon
            icon={'arrow-up-right'}
            type={'feather'}
            color="#fff"
            size={wp(6)}
            style={styles.arrowIcon}
          />
        </View> */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: wp(2),
            marginTop: hp(2),
          }}>
          <HomeClientCard
            onPress={() => {
              navigation.navigate(ScreenNames.CLIENTS);
            }}
            data={isData?.data?.clientProfiles}
            count={isData?.data?.counts?.myClients}
            clientHeader="Clients"
          />
          <HomeClientCard
            data={isData?.data?.pendingRequests}
            clientHeader="Clients Request"
            count={isData?.data?.counts?.myRequests}
            btnView={{
              backgroundColor: '#F4F4F4',
            }}
            onPress={() => {
              navigation.navigate(ScreenNames.CLIENTS, {
                screen: ScreenNames.MY_CLIENTS_REQ,
              });
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TextBiggest
            textStyle={{fontFamily: Font.semiBold, marginVertical: hp(1)}}>
            New Clients
          </TextBiggest>

          <Pressable
            onPress={() => {
              Alert.alert('OK');
            }}>
            <TextSmall
              onPress={() => {
                navigation.navigate(ScreenNames.CLIENTS);
              }}>
              View all
            </TextSmall>
          </Pressable>
        </View>

        <FlatList
          ListEmptyComponent={() => {
            // if (initialLoading || isLoading.isRefresh) {
            //   return null;
            // }
            return (
              <TextNormal textStyle={{alignSelf: 'center', marginTop: hp(2)}}>
                No Data Found
              </TextNormal>
            );
          }}
          scrollEnabled={false}
          data={isData?.data?.clients}
          renderItem={({item, index}) => (
            <ClientComp loading={false} item={item} index={index} />
          )}
        />
      </ScrollView>
    </CustomWrapper>
  );
};

export default TrainerHome;

const styles = StyleSheet.create({
  cardMainView: {
    backgroundColor: '#9FE87080',
    borderWidth: hp(0.15),
    borderColor: '#000',
    borderRadius: wp(3),
    padding: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: hp(2),
  },
  arrowIcon: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(10),
    height: wp(10),
    borderRadius: wp(10),
  },
  percentAge: {
    minHeight: hp(3),
    backgroundColor: '#AFAFAF',
    borderWidth: 0,
    marginTop: hp(1),
  },
});
