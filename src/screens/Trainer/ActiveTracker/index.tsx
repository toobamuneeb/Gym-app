import {
  ActivityIndicator,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback } from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { TextBiggest, TextSmall } from '../../../components/common/customText';
import CustomDatePicker from '../../../components/common/CustomDatePicker';
import { useForm } from 'react-hook-form';
import RenderItem from './Components/RenderItem';
import useActiveTrackers from './Hooks/useActiveTrackers';
import { RouteProp, useRoute } from '@react-navigation/native';
import moment from 'moment';
import { COLORS } from '../../../utils/theme';
import { CustomIcon } from '../../../components/common/customIcons';
import CustomHeader from './Components/CustomHeader';

const ActiveTracker = () => {
  const route = useRoute<RouteProp<any, 'ActiveTracker'>>();
  const { trainee_id } = route?.params || {};

  console.log(trainee_id);
  const {
    data: i,
    handleApprovedTracker,
    loading,
    onChange,
    isFetching,
  } = useActiveTrackers(trainee_id);

  const section = i?.map?.((item: any) => ({
    title: new Date(item?.tracker_date),
    data: item?.questions,
  }));
  const renderItem = useCallback(
    ({ item, index }: any) => {
      return (
        <RenderItem
          item={item}
          index={index}
          handleApprovedTracker={handleApprovedTracker}
        />
      );
    },
    [handleApprovedTracker],
  );

  return (
    <CustomWrapper edge={['top', 'bottom']}>
      <CustomHeader onChange={onChange} />
      <SectionList
        sections={section || []}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.listEmptyContainer}>
            {isFetching ? (
              <ActivityIndicator size={'large'} color={COLORS.Green} />
            ) : (
              <TextBiggest children={'No Active Trackers'} />
            )}
          </View>
        }
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ alignItems: 'center', paddingVertical: wp(2) }}>
            <TextSmall bold>{moment(title).format('YYYY/MM/DD')}</TextSmall>
          </View>
        )}
        stickySectionHeadersEnabled={false}
      />
    </CustomWrapper>
  );
};

export default ActiveTracker;

const styles = StyleSheet.create({
  listEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: heightPercentageToDP(60),
  },
});
