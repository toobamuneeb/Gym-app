import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback } from 'react';

import CustomWrapper from '../../../../components/Wrappers/CustomWrapper';
import ClientComp from '../../../../components/clientComp';
import { ScreenNames } from '../../../../navigations/ScreenName';
import { useLazyGetAllClientsQuery } from '../../../../redux/Api/client.api';
import useClients from './useClients';
import { TextNormal } from '../../../../components/common/customText';
import { Font } from '../../../../utils/ImagePath';
import { COLORS } from '../../../../utils/theme';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const MyClients = ({ navigation }: any) => {
  const {
    clientData,
    isLoading,
    loadMoreClients,
    error,
    hasMorePages,
    refetchClients,
    clientisLoading,
    clientisFetching,
    initialLoading,
  } = useClients();
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => (
      <ClientComp
        loading={initialLoading}
        item={item}
        index={index}
        onPress={() => {
          navigation.navigate(ScreenNames.CLIENT_DETAIL, { data: item });
        }}
      />
    ),
    [isLoading.isRefresh, clientisLoading, initialLoading],
  );
  const Tab_Height = useBottomTabBarHeight();
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ListEmptyComponent={() => {
          if (initialLoading || isLoading.isRefresh || error) {
            return null;
          }
          return (
            <TextNormal textStyle={{ alignSelf: 'center', marginTop: hp(2) }}>
              No Data Found
            </TextNormal>
          );
        }}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: Tab_Height }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading.isRefresh && !clientisFetching}
            onRefresh={refetchClients}
            tintColor={'#c4c4c4'}
          />
        }
        bounces={false}
        data={initialLoading ? [...Array(6)] : clientData}
        renderItem={renderItem}
        onEndReached={loadMoreClients}
        keyExtractor={(item, index) => item?._id || index.toString()}
        ListFooterComponent={
          isLoading.isLoadMore ? (
            <ActivityIndicator color={COLORS.btnBlack} size={hp(3)} />
          ) : !isLoading.isLoadMore &&
            !isLoading.isRefresh &&
            !hasMorePages &&
            clientData.length ? (
            <TextNormal
              style={{
                color: '#000',
                textAlign: 'center',
                fontFamily: Font.medium,
              }}
            >
              You have reached the end !
            </TextNormal>
          ) : error && !isLoading.isLoadMore && !isLoading.isRefresh ? (
            <TextNormal
              style={{ color: 'red', alignSelf: 'center', marginTop: hp(2) }}
            >
              {'Error fetching data'}
            </TextNormal>
          ) : null
        }
      />
    </View>
  );
};

export default MyClients;

const styles = StyleSheet.create({});
