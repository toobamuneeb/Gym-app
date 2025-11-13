import {Alert, FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import Header from '../../../components/common/Header';
import ProfileHeader from '../../../components/ProfileComp/ProfileHeader';
import ProfileBtns from '../../../components/ProfileComp/ProfileBtns';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {ScreenNames} from '../../../navigations/ScreenName';
import {RootState} from '../../../redux/store';

const Profile = ({navigation}: any) => {
  const userData = useSelector((state: RootState) => state.generalSlice.data);
  const dispatch = useDispatch();
  const data = [
    {
      btn: 'Notifications',
      icn: 'notifications',
      family: 'ionicons',
    },
    {
      btn: 'Change Password',
      icn: 'lock',
      family: 'fontawesome',
    },
    {
      btn: 'Privacy Policy',
      icn: 'privacy-tip',
      family: 'material-icons',
    },
    {
      btn: 'Term & Condtion',
      icn: 'file-document',
      family: 'materialCommunityIcons',
    },
    {
      btn: 'FAQs',
      icn: 'message-question',
      family: 'materialCommunityIcons',
    },
    {
      btn: 'Log out',
      icn: 'logout',
      family: 'materialCommunityIcons',
    },
  ];
  const toScreen = (index: number) => {
    switch (index) {
      case 0:
        navigation.navigate('notification');
        break;
      case 1:
        navigation.navigate('changepass');
        break;
      case 2:
        navigation.navigate('privacypolicy');
        break;
      case 3:
        navigation.navigate('termscondition');
        break;
      case 4:
        navigation.navigate('faq');
        break;
      case 5:
        dispatch({type: 'LOGOUT'});
      // navigation.reset({
      //   index: 0,
      //   routes: [{name: 'AUTH'}],
      // });
      default:
        break;
    }
  };

  return (
    <CustomWrapper containerStyle={{paddingHorizontal: 0}}>
      <Header
        title={'Profile'}
        navigation={navigation}
        containerStyle={styles.HeadrPadding}
      />

      <ProfileHeader
        mainContainer={{
          ...styles.HeadrPadding,
          marginVertical: heightPercentageToDP(2),
        }}
        profileName={`${userData.firstName}`}
        email={`${userData.email}`}
        onPress={() => {
          navigation.navigate(ScreenNames.EDIT_PROFILE);
        }}
      />

      <FlatList
        bounces={false}
        data={data}
        renderItem={({item, index}) => (
          <ProfileBtns
            item={item}
            index={index}
            onPress={() => {
              toScreen(index);
            }}
          />
        )}
      />
    </CustomWrapper>
  );
};

export default Profile;

const styles = StyleSheet.create({
  HeadrPadding: {marginHorizontal: widthPercentageToDP(5)},
});
