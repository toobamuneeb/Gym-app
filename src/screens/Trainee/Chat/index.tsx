import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  FlatList,
  ScrollView,
  Pressable,
  StyleSheet,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Customimage from '../../../components/common/customImage';
import CustomSearchInput from '../../../components/common/customSearchInput';
import {TextNormal, TextSmaller} from '../../../components/common/customText';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import {ImagPath} from '../../../utils/ImagePath';
import Header from '../../../components/common/Header';
import {ChatItem} from './interface';
import {chat, useGetChatsQuery} from '../../../redux/Api/chat.api';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {ScreenNames} from '../../../navigations/ScreenName';
import socketServices from '../../../utils/socketservice';
import moment from 'moment';

const Chat = ({navigation}: any) => {
  const userData = useSelector((state: RootState) => state.generalSlice.data);
  const {data, isError, isLoading, refetch, isFetching} = useGetChatsQuery({});
  const [chats, setChats] = useState<any>([]);

  const [Search, setSearch] = useState('');
  const Tab_Height = useBottomTabBarHeight();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch();
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    setChats(data?.chat);
  }, [data?.chat]);
  useEffect(() => {
    if (!userData?._id) return;

    socketServices.emit('join_chat', userData._id);

    const handleNewChat = (updatedChat: ChatItem) => {
      setChats((prevChats: any) => {
        const existingChatIndex = prevChats.findIndex(
          (c: any) => c._id === updatedChat._id,
        );

        if (existingChatIndex >= 0) {
          // Update existing chat
          const newChats = [...prevChats];
          newChats[existingChatIndex] = {
            ...newChats[existingChatIndex],
            latestMessage: updatedChat.latestMessage,
            sendTime: updatedChat.sendTime,
          };
          // Move updated chat to top
          const [updatedItem] = newChats.splice(existingChatIndex, 1);
          return [updatedItem, ...newChats];
        }

        // Add new chat if not exists
        return [updatedChat, ...prevChats];
      });
    };

    socketServices.on('new_chat', handleNewChat);

    return () => {
      socketServices.removeListener('new_chat');
      socketServices.emit('leave_chat', userData._id);
    };
  }, [userData?._id]);



  const startMessage = (item: any) => {
    let data = {
      chatID: item?._id,
      userName: item?.users[0].firstName,

      profileImage:
        userData.role === 'user'
          ? item?.users[0]?.trainerProfile?.profileImage
          : item?.users[0]?.traineeProfile?.profileImage,
      userId: item.users[0]._id,
    };

    navigation.navigate(ScreenNames.MESSAGE, {
      data: JSON.stringify(data),
    });
  };
  const ListHeaderComponent = useCallback(
    () => (
      <View
        style={{
          borderBottomWidth: 1,
          paddingVertical: heightPercentageToDP(2),
          borderColor: '#d7d7d7',
        }}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={chats}
          renderItem={({item, index}) => {
      

            return (
              <Pressable
                onPress={() => {
                  startMessage(item);
                }}>
                <Customimage
                  source={{
                    uri:
                      userData.role === 'user'
                        ? item?.users[0]?.trainerProfile?.profileImage
                        : item?.users[0]?.traineeProfile?.profileImage,
                  }}
                  style={styles.storyImage}
                  resizeMode={'cover'}
                />
              </Pressable>
            );
          }}
        />
      </View>
    ),
    [chats],
  );
  const renderItem = useCallback<ListRenderItem<ChatItem>>(
    ({item, index}) => {

      const date = moment(item.sendTime).format('h:mm A');
      return (
        <Pressable
          onPress={() => {
            startMessage(item);
          }}
          style={styles.chat}>
          <Customimage
            disabled
            source={{
              uri:
                userData.role === 'user'
                  ? item?.users[0]?.trainerProfile?.profileImage
                  : item?.users[0].traineeProfile?.profileImage,
            }}
            style={styles.profileImage}
            resizeMode={'cover'}
          />

          <View style={styles.subChat}>
            <View style={{flex: 1}}>
              <TextNormal>
                {userData.role === 'user'
                  ? item?.users[0]?.firstName
                  : item?.users[0]?.firstName}
              </TextNormal>
              <TextSmaller numberOfLines={1}>{item?.latestMessage}</TextSmaller>
            </View>
            <TextSmaller style={{fontSize: RFValue(10)}}>{date}</TextSmaller>
          </View>
        </Pressable>
      );
    },
    [data?.chat],
  );

 
  const filteredChats = useMemo(() => {
    return (
      chats?.filter((chat: any) =>
        chat?.users[0]?.firstName.toLowerCase().includes(Search.toLowerCase()),
      ) || []
    );
  }, [chats, Search]);
  return (
    <CustomWrapper edge={['top']} containerStyle={{}}>
      <Header title={'Chat'} navigation={navigation} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: Tab_Height}}
        bounces={false}
        showsVerticalScrollIndicator={false}>
        <CustomSearchInput
          placeholder="Search"
          value={Search}
          onChangeText={text => {
            setSearch(text);
          }}
        />

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isLoading && isFetching}
              onRefresh={refetch}
              tintColor={'#c4c4c4'}
            />
          }
          ListEmptyComponent={() => {
            if (isLoading) {
              return null;
            }
            return (
              <TextNormal
                textStyle={{
                  alignSelf: 'center',
                  marginTop: heightPercentageToDP(2),
                }}>
                No Data Found
              </TextNormal>
            );
          }}
          refreshing
          data={filteredChats}
          extraData={filteredChats}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            !filteredChats?.length ? null : ListHeaderComponent
          }
          style={{marginBottom: heightPercentageToDP(1)}}
          renderItem={renderItem}
          keyExtractor={(item, index) => `chat-${index}`}
        />
      </ScrollView>
    </CustomWrapper>
  );
};

export default Chat;

const styles = StyleSheet.create({
  chat: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: heightPercentageToDP(2),
  },
  profileImage: {
    width: widthPercentageToDP(15),
    height: widthPercentageToDP(15),
    borderRadius: widthPercentageToDP(15),
  },
  subChat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginLeft: widthPercentageToDP(4),
  },
  storyImage: {
    width: widthPercentageToDP(18),
    height: widthPercentageToDP(18),
    borderRadius: widthPercentageToDP(18),
    marginRight: widthPercentageToDP(2),
  },
});
