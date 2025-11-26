import { StyleSheet, View, FlatList } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import { TextBigger, TextBiggest } from '../../../components/common/customText';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import RenderItem from './components/RenderItem';
import { useLazyGetTrackersTrainersQuery } from '../../../redux/Api/trackers.api';

const ExercisePlan = () => {
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
        <TextBiggest center bold children="Assign Trainer’s Exercise" />
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
            <TextBigger children={'Don`t have any Exercise'} />
          </View>
        }
      />
    </CustomWrapper>
  );
};

export default ExercisePlan;

const styles = StyleSheet.create({
  listEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp(70),
  },
});
