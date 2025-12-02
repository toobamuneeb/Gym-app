import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import CustomHeader from '../../../components/common/customHeader';
import Header from '../../../components/common/Header';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS } from '../../../utils/theme';
import {
  TextBig,
  TextBigger,
  TextNormal,
} from '../../../components/common/customText';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Customimage from '../../../components/common/customImage';
import { ImagPath } from '../../../utils/ImagePath';
import Banner from './components/Banner';
import CustomDatePicker from '../../../components/common/CustomDatePicker';
import RenderItem from './components/RenderItem';
import { useFieldArray, useForm } from 'react-hook-form';
import CustomButton from '../../../components/common/customButton';
import useTrackersList from './Hooks/useTrackersList';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';
const list = [
  {
    _id: '1',
    question: 'How do you feel today?',
    is_radio_button: true,
    is_text_field: true,
  },
  {
    _id: '2',
    question: 'How do you feel today?',
    is_radio_button: true,
    is_text_field: false,
  },
  {
    _id: '3',
    question: 'How do you feel today?',
    is_radio_button: false,
    is_text_field: true,
  },
  {
    _id: '4',
    question: 'How do you feel today?',
    is_radio_button: false,
    is_text_field: true,
  },
];
const TrackersList = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<any, 'TrackersList'>>();

  const { data: item } = route.params || {};
  let trainerId = item?._id;

  const {
    data,
    onChange,
    onChangeDate,
    handleGetTrackers,
    isLoading,
    isFetching,
    loading,
  } = useTrackersList(trainerId);
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      trackers: [
        {
          id: '',
          answer_radio_button: null,
          answer_text_field: '',
        },
      ],
    },
  });

  useEffect(() => {
    if (data?.questions?.length) {
      reset({
        trackers: data.questions.map((q: any) => ({
          question_id: q._id,
          answer_radio_button: null,
          answer_text_field: '',
        })),
      });
    }
  }, [data]);

  const renderItem = useCallback(({ item, index }: any) => {
    return <RenderItem control={control} item={item} index={index} />;
  }, []);
  console.log({ isLoading, item });
  return (
    <CustomWrapper edge={['top', 'bottom']}>
      <Header title={'Trackers'} navigation={navigation} />
      <Banner data={item} />
      <FlatList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.dateContain}>
            <TextNormal children={'Select Date'} />
            <CustomDatePicker onChange={onChangeDate} />
          </View>
        }
        ListEmptyComponent={
          <View style={styles.listEmptyContainer}>
            {isFetching ? (
              <ActivityIndicator size={'large'} color={COLORS.Green} />
            ) : (
              <TextBigger children={'No Pending Trackers'} />
            )}
          </View>
        }
        ListFooterComponent={
          data?.questions?.length && (
            <CustomButton
              isLoading={loading}
              onPress={handleSubmit(onChange)}
              textStyle={{ color: COLORS.lightGreen }}
              text="Submit Tracker"
              containerStyle={styles.btnStyle}
            />
          )
        }
        data={data?.questions || []}
        renderItem={renderItem}
      />
    </CustomWrapper>
  );
};

export default TrackersList;

const styles = StyleSheet.create({
  dateContain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
    alignSelf: 'center',
    paddingVertical: wp(4),
  },
  btnStyle: {
    marginBottom: wp(28),
    marginTop: wp(5),
    backgroundColor: COLORS.textBlack,
    borderWidth: 1,
    borderColor: COLORS.Green,
  },
  listEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: wp(50),
  },
});
