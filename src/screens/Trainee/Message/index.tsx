import {Alert, Platform, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import Header from '../../../components/common/Header';
import {
  Bubble,
  GiftedChat,
  IMessage,
  InputToolbar,
  Time,
} from 'react-native-gifted-chat';
import {Font} from '../../../utils/ImagePath';
import Customimage from '../../../components/common/customImage';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextSmall} from '../../../components/common/customText';
import {CustomIcon} from '../../../components/common/customIcons';
import {COLORS} from '../../../utils/theme';
import {
  useGetMessagesQuery,
  useSendMessageMutation,
} from '../../../redux/Api/message.api';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import socketServices from '../../../utils/socketservice';
import useMessagesHook from './useMessage';

const Message = ({navigation, route}: any) => {
  const {data: dataa} = route.params || {};

  const data = JSON.parse(dataa);
  const {
    messages: allMessages,
    loadMoreClients,
    isLoading,
    onSend: send,
    refetchClients,
  } = useMessagesHook(data);
  const userData = useSelector((state: RootState) => state.generalSlice.data);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetchClients();
    });
    return unsubscribe;
  }, [navigation]);

  const onLeave = () => {
    socketServices.emit('leave_room', data?.chatID);
    navigation.goBack();
  };
  return (
    <CustomWrapper edge={['top']}>
      <Header
        trainerProfile={data?.profileImage}
        message
        title={`${data?.userName}`}
        navigation={navigation}
        onBackPress={onLeave}
      />

      <View style={{flex: 1}}>
        <GiftedChat
          loadEarlier={true}
          onLoadEarlier={loadMoreClients}
          isLoadingEarlier={isLoading.isLoadMore}
          infiniteScroll
          messages={allMessages}
          onSend={(messages: any) => send(messages)}
          user={{
            _id: userData?._id,
          }}
          showUserAvatar
          renderAvatar={() => (
            <Customimage
              source={userData?.traineeProfile?.profileImage}
              style={styles.storyImage}
              resizeMode={'cover'}
            />
          )}
          showAvatarForEveryMessage
          renderAvatarOnTop
          renderBubble={props => {
            return (
              <View>
                <Bubble
                  {...props}
                  wrapperStyle={{
                    right: styles.rightContainer,
                    left: styles.leftContainer,
                  }}
                  renderTime={() => null}
                />

                <View
                  style={{
                    alignSelf:
                      props.position === 'right' ? 'flex-end' : 'flex-start',
                  }}>
                  <Time
                    {...props}
                    timeTextStyle={{
                      right: {
                        color: 'gray',
                      },
                      left: {
                        color: 'gray',
                      },
                    }}
                  />
                </View>
              </View>
            );
          }}
          renderMessageText={props => (
            <TextSmall textStyle={{fontFamily: Font.regular}}>
              {props.currentMessage.text}
            </TextSmall>
          )}
          renderSend={props => (
            <CustomIcon
              onPress={() => {
                if (props.text && props.onSend) {
                  props.onSend({text: props.text.trim()}, true);
                }
              }}
              icon="send"
              type="feather"
              size={wp(6)}
              color={COLORS.Icongreen}
              style={{
                paddingHorizontal: wp(3),
                bottom: Platform.OS === 'ios' ? hp(1) : hp(1.5),
              }}
            />
          )}
          renderInputToolbar={props => (
            <View style={styles.inputToolbar}>
              {/* <CustomIcon
                onPress={() => {
                  Alert.alert('OK');
                }}
                icon="dots-vertical"
                type="materialCommunityIcons"
                size={wp(6)}
                color="gray"
                style={{
                  bottom: Platform.OS === 'ios' ? hp(1) : hp(1.5),
                  marginLeft: wp(2),
                }}
              /> */}

              <InputToolbar {...props} containerStyle={styles.inputContainer} />
            </View>
          )}
        />
      </View>
    </CustomWrapper>
  );
};

export default Message;

const styles = StyleSheet.create({
  storyImage: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(8),
  },
  rightContainer: {
    backgroundColor: '#E1F8CF',
    marginBottom: hp(0.5),
    borderRadius: wp(3),
    padding: wp(2.5),
  },
  leftContainer: {
    backgroundColor: '#f0f0f0',
    marginBottom: hp(0.5),
    borderRadius: wp(3),
    padding: wp(2.5),
  },
  inputToolbar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#F4F4F4',
    borderRadius: wp(3),
    marginHorizontal: wp(2),
    marginBottom: hp(1),
    borderTopWidth: 0,
  },

  inputContainer: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    borderRadius: wp(3),
    borderTopWidth: 0,
  },
});
