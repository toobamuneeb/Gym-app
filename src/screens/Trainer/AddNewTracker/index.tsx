import { Alert, FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import CustomHeader from './Components/CustomHeader';
import RenderItem from './Components/RenderItem';
import { useForm, useFieldArray } from 'react-hook-form';
import CustomButton from '../../../components/common/customButton';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import useAddNewTrackers from './Hooks/useAddNewTrackers';

const AddNewTracker = () => {
  const route = useRoute<RouteProp<any, 'Add New Tracker'>>();
  const userData = useSelector((state: RootState) => state?.generalSlice.data);

  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      trainee_id: route.params?.userId,
      tracker_date: new Date().toString(),
      trackers: [
        {
          question: '',
          is_radio_button: false,
          is_text_field: false,
          category: '',
        },
      ],
    },
  });
  const { onSubmit, isLoading } = useAddNewTrackers(reset);
  const { fields, append } = useFieldArray({
    control,
    name: 'trackers',
  });

  const addNewTracker = () => {
    append({
      question: '',
      is_radio_button: false,
      is_text_field: false,
      category: '',
    });
  };

  return (
    <CustomWrapper edge={['top', 'bottom']}>
      <View style={styles.container}>
        <CustomHeader
          isLoading={isLoading}
          onChange={(date: Date) => {
            setValue('tracker_date', date.toString());
          }}
          onPress={handleSubmit(onSubmit)}
        />

        <FlatList
          data={fields}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          keyExtractor={item => item?.id?.toString()}
          ListFooterComponent={
            <View style={styles.footer}>
              <CustomButton text="Add New Tracker" onPress={addNewTracker} />
            </View>
          }
          renderItem={({ index }) => (
            <RenderItem control={control} index={index} setValue={setValue} />
          )}
        />
      </View>
    </CustomWrapper>
  );
};

export default AddNewTracker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {},
  btnWrapper: {
    paddingVertical: 20,
    paddingBottom: 400,
  },
  footer: {
    paddingVertical: 20,
  },
});
