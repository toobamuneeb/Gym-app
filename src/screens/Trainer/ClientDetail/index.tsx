import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import Header from '../../../components/common/Header';
import Customimage from '../../../components/common/customImage';
import { Font, ImagPath } from '../../../utils/ImagePath';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  TextBigger,
  TextNormal,
  TextSmall,
  TextSmaller,
} from '../../../components/common/customText';
import { RFValue } from 'react-native-responsive-fontsize';
import HomeClientCard from '../../../components/HomeClientCard';
import CustomButton from '../../../components/common/customButton';
import CustomBottomSheet from '../../../components/common/customBottomSheet';
import { ScreenNames } from '../../../navigations/ScreenName';
import moment from 'moment';
import useReq from './useReq';
import { COLORS } from '../../../utils/theme';
import { useHome } from '../../Trainee/Home/useHome';
import { useRoute } from '@react-navigation/native';

const ClientDetail = ({ navigation, route }: any) => {
  const { data } = route.params;
  const isoDate = data?.userID?.traineeProfile?.Dob;
  const formattedDate = moment(isoDate).format('DD MMM YYYY');

  const [visible, setvisible] = useState(false);
  const refRBSheet = useRef<any>(null);
  const [selectedOption, setSelectedOption] = useState('');
  const onCreate = async () => {
    refRBSheet?.current?.open();
  };
  const {
    calculateBMI,
    handleAcceptReq,
    Accept,
    isLoading,
    Delloading,
    handleDeleteReq,
  } = useReq();
  const fullName = `${data?.userID?.firstName} ${data?.userID?.lastName}`;
  const Bmi = calculateBMI(
    data?.userID?.traineeProfile?.weight?.value,
    data?.userID?.traineeProfile?.weight?.unit,
    data?.userID?.traineeProfile?.height?.value,
    data?.userID?.traineeProfile?.height?.unit,
  );

  let payload = {
    reqID: data._id,
  };
  const { plansData } = useHome({
    checkTraineeID: true,
    traineeID: data?.userID?._id,
  });

  const onNext = useCallback(() => {
    if (!selectedOption) {
      Alert.alert('Please Select Anyone Plan');
    } else {
      refRBSheet?.current?.close();
      navigation.navigate(ScreenNames.CLIENTS_REGISTER, {
        data: { ...data, selectedOption },
      });
    }
  }, [selectedOption, onCreate]);

  return (
    <CustomWrapper
      edge={['top']}
      containerStyle={{ flex: 1, opacity: visible ? 0.2 : 1 }}
    >
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Header navigation={navigation} />

        <View style={{ alignItems: 'center' }}>
          <Customimage
            source={ImagPath.trainer1}
            style={styles.profileImage}
            resizeMode={'cover'}
          />

          <TextNormal textStyle={{ marginTop: hp(2) }}>{fullName}</TextNormal>
          <TextSmaller
            numberOfLines={1}
            textStyle={{ fontSize: RFValue(10), color: 'gray' }}
          >
            Weight Loss
          </TextSmaller>
        </View>

        <View style={styles.infoView}>
          <HomeClientCard
            icon="medal-outline"
            type="materialCommunityIcons"
            clientReq
            head="Goal"
            btmText={data?.userID?.traineeProfile?.goalweight?.value}
            unit={data?.userID?.traineeProfile?.weight?.unit}
          />
          <HomeClientCard
            btmText={data?.userID?.traineeProfile?.weight?.value}
            unit={data?.userID?.traineeProfile?.weight?.unit}
            head="Weight"
            icon="scale-outline"
            type="ionicons"
            clientReq
          />
          <HomeClientCard
            btnView={{ backgroundColor: '#F4F4F4' }}
            head="BMI"
            btmText={`${Bmi}`}
            icon="circular-graph"
            type="entypo"
            clientReq
          />
        </View>

        <View style={styles.mainView}>
          <View style={styles.subView}>
            <TextNormal textStyle={styles.textColor}>Date of Birth</TextNormal>
            <TextSmall textStyle={styles.textColor}>{formattedDate}</TextSmall>
          </View>
          <View style={{ ...styles.subView, borderBottomWidth: 0 }}>
            <TextNormal textStyle={styles.textColor}>Gender</TextNormal>
            <TextSmall textStyle={styles.textColor}>
              {data?.userID?.traineeProfile?.gender}
            </TextSmall>
          </View>
        </View>

        <View style={styles.addNewTracker}>
          <TextBigger bold={true} children={'Trackers'} />
          <TextNormal
            onPress={() => {
              navigation.navigate(ScreenNames.ADD_NEW_TRACKER, {
                userId: data?.userID?._id,
              });
            }}
            children={'Add new'}
          />
        </View>
        <View>
          <CustomButton
            centerIcon
            text={'Active Trackers'}
            color="#000"
            containerStyle={{ gap: hp(1) }}
            onPress={() => {
              navigation.navigate(ScreenNames.ACTIVE_TRACKER, {
                trainee_id: data?.userID?._id,
              });
            }}
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginVertical: hp(2),
          }}
        >
          {data?.status === 'accepted' ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                marginVertical: hp(2),
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  gap: hp(2),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <CustomButton
                  textStyle={{ color: COLORS.textWhte }}
                  text="View Plan"
                  containerStyle={styles.viewPlan}
                  onPress={() => {
                    navigation.navigate(ScreenNames.DIET_PALN, {
                      traineeID: data?.userID?._id,
                      data: 'diet',
                    });
                  }}
                />
                <CustomButton
                  onPress={() => {
                    // plansData.data?.data?.days?.length
                    //   ? navigation.navigate(ScreenNames.CLIENTS_REGISTER1, {
                    //       data: {
                    //         planID: plansData.data?.data?._id,
                    //         traineeID: plansData?.data?.data?.userID,
                    //         plan: plansData.data,
                    //       },
                    //     })
                    //   :
                    refRBSheet?.current?.open();
                  }}
                  text={
                    // plansData.data?.data?.days?.length
                    //   ? 'Edit Plan'
                    //   :
                    'Create Plan'
                  }
                  containerStyle={{ flex: 1 }}
                />
              </View>
            </View>
          ) : Accept ? (
            <View>
              <CustomButton
                centerIcon
                text="Create Plan"
                icon={'add'}
                type={'material-icons'}
                color="#000"
                containerStyle={{ gap: hp(1) }}
                onPress={() => {
                  onCreate();
                }}
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                gap: hp(2),
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <CustomButton
                textStyle={{ color: '#F04438' }}
                text="Delete"
                containerStyle={styles.delBtnstyle}
                onPress={() => {
                  handleDeleteReq(payload, navigation);
                }}
                isLoading={Delloading}
              />
              <CustomButton
                onPress={() => {
                  handleAcceptReq(payload);
                }}
                text="Accept"
                containerStyle={{ flex: 1 }}
                isLoading={isLoading}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <CustomBottomSheet
        clientPlan
        heading="Plan Type"
        headingStyle={{ fontFamily: Font.bold }}
        mainContainerStyle={styles.bottomSheet}
        weekonPress={() => {
          setSelectedOption('weekly');
        }}
        monthonPress={() => {
          setSelectedOption('monthly');
        }}
        Selected={selectedOption}
        // btnOnpress={() => {
        //   refRBSheet?.current?.close();
        //   navigation.navigate(ScreenNames.CLIENTS_REGISTER, {
        //     data: selectedOption,
        //   });
        // }}
        onOpen={() => {
          setvisible(true);
        }}
        onClose={() => {
          setvisible(false);
        }}
        reference={refRBSheet}
        onNext={() => {
          onNext();
        }}
      />
    </CustomWrapper>
  );
};

export default ClientDetail;

const styles = StyleSheet.create({
  profileImage: {
    width: wp(25),
    height: wp(25),
    borderRadius: wp(25),
  },
  textColor: { color: '#334155' },
  mainView: {
    marginTop: hp(4),
    borderWidth: hp(0.15),
    paddingVertical: wp(2),
    borderRadius: wp(3),
    paddingHorizontal: wp(4),
    borderColor: '#E2E8F0',
  },
  subView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: hp(0.15),
    paddingVertical: hp(1),
    borderColor: '#E2E8F0',
  },

  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: wp(2),
    marginTop: hp(2),
  },
  delBtnstyle: {
    flex: 1,
    backgroundColor: '#F044381F',
    borderColor: '#F04438',
  },
  viewPlan: {
    flex: 1,
    backgroundColor: '#000',
    borderColor: '#000',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    borderTopRightRadius: wp(10),
    borderTopLeftRadius: wp(10),
    paddingHorizontal: wp(4),
  },
  addNewTracker: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: wp(2),
  },
});
