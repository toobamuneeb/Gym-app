import {
  ImageBase,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import {
  TextBigger,
  TextBiggest,
  TextSmall,
} from '../../../components/common/customText';
import {
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { ImagPath } from '../../../utils/ImagePath';
import Header from '../../../components/common/Header';
import CustomImage from '../../../components/common/customImage';
import { CustomIcon } from '../../../components/common/customIcons';
import RenderItem from './components/RenderItem';
import { useLazyGetTrackersTrainersQuery } from '../../../redux/Api/trackers.api';
import { COLORS } from '../../../utils/theme';

const Trackers = () => {
  const [triggers, { data, isFetching, isLoading }] =
    useLazyGetTrackersTrainersQuery();
  useEffect(() => {
    triggers({});
  }, []);

  const renderItem = useCallback(({ item }: any) => {
    return <RenderItem item={item} />;
  }, []);

  return (
    <CustomWrapper>
      <View style={{ paddingVertical: wp(5) }}>
        <TextBiggest center bold children="Assign Trainer’s Trackers" />
      </View>

      <FlatList
        ItemSeparatorComponent={() => (
          <View style={{ height: 1, backgroundColor: '#ccc' }}></View>
        )}
        data={data?.data || []}
        renderItem={renderItem}
        onRefresh={() => triggers({})}
        refreshing={isLoading}
        ListEmptyComponent={
          <View style={styles.listEmptyContainer}>
            <TextBigger children={'No Pending Trackers'} />
          </View>
        }
      />
    </CustomWrapper>
  );
};

export default Trackers;

const styles = StyleSheet.create({
  listEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp(70),
  },
});
