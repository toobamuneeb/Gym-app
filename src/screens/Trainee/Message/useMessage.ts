import {useCallback, useEffect, useState} from 'react';
import {
  useLazyGetMessagesQuery,
  useSendMessageMutation,
} from '../../../redux/Api/message.api';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import socketServices from '../../../utils/socketservice';

const useMessagesHook = (data: any) => {
  const [fetchMessage] = useLazyGetMessagesQuery();
  const [sendMessages] = useSendMessageMutation();
  const userData = useSelector((state: RootState) => state.generalSlice.data);
  const [messages, setMessages] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState({
    isLoadMore: false,
    isRefresh: false,
  });

  useEffect(() => {
    refetchClients();
  }, [data?.chatID]);
  useEffect(() => {
    socketServices.emit('join_room', data?.chatID);
    socketServices.on('send_message', incomingData => {
      setMessages((prev: IMessage[]) => {
        const alreadyExists = prev.some(msg => msg._id === incomingData._id);

        if (!alreadyExists) {
          return GiftedChat.append(prev, [incomingData]);
        }
        return prev;
      });
    });

    return () => {
      socketServices.removeListener('send_message');
      socketServices.emit('leave_room', data?.chatID);
    };
  }, [data?.chatID]);
  const fetch = async (isRefresh: boolean, pageNumber: number) => {
    if (isLoading.isRefresh || isLoading.isLoadMore || (!isRefresh && !hasMore))
      return;

    setIsLoading({
      isRefresh: isRefresh,
      isLoadMore: !isRefresh,
    });

    try {
      const res = await fetchMessage({
        chatID: data?.chatID,
        page: pageNumber,
      }).unwrap();

      const morePagesAvailable = res.page < res.totalPages;
      setHasMore(morePagesAvailable);

      if (isRefresh) {
        setMessages(res.data || []);
        setPage(1);
      } else {
        setMessages(prev => GiftedChat.prepend(prev, res.data));
        // setMessages(prev => [...res.data, ...prev]);
        setPage(pageNumber);
      }
    } catch (err) {
     
      setError(true);
    } finally {
      setIsLoading({isLoadMore: false, isRefresh: false});
    }
  };

  const onSend = useCallback(
    async (messages: IMessage[] = []) => {
      const tempId = Date.now().toString();

      const tempMessage = {
        text: messages[0]?.text,
        chatID: data?.chatID,
        createdAt: messages[0]?.createdAt,
        user: {
          firstName: userData.firstName,
          _id: userData?._id,
          profileImage:
            userData?.traineeProfile?.profileImage ||
            userData?.trainerProfile?.profileImage,
        },
        _id: tempId,
        isTemp: true,
      };

      setMessages(prev => GiftedChat.append(prev, [tempMessage]));

      let payload = {
        text: messages[0]?.text,
        chatID: data?.chatID,
      };

      try {
        const res = await sendMessages(payload);
   

        setMessages(prev => {
          return prev.map(msg =>
            msg._id === tempId
              ? {
                  ...res.data.messageData,
                  user: {
                    firstName: userData.firstName,
                    _id: userData?._id,
                    profileImage:
                      userData?.traineeProfile?.profileImage ||
                      userData?.trainerProfile?.profileImage,
                  },
                }
              : msg,
          );
        });

        socketServices.emit('send_message', {
          ...res.data.messageData,
          userId: data?.userId,
          chatUpdate: res.data.roomData,
          user: {
            firstName: userData.firstName,
            _id: userData?._id,
            profileImage:
              userData?.traineeProfile?.profileImage ||
              userData?.trainerProfile?.profileImage,
          },
        });
      } catch (error) {
        
     
      }
    },
    [sendMessages, data?.chatID, userData],
  );

  const refetchClients = () => {
    fetch(true, 1);
  };

  const loadMoreClients = () => {
    if (!error && hasMore) {
      fetch(false, page + 1);
    }
  };

  return {
    messages,
    loadMoreClients,
    isLoading,
    error,
    hasMore,
    onSend,
    refetchClients,
  };
};

export default useMessagesHook;
