import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import CustomHeader from './Components/CustomHeader';
import RenderItem from './Components/RenderItem';
import { useForm, useFieldArray } from 'react-hook-form';
import CustomButton from '../../../components/common/customButton';

const AddNewTracker = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      date: new Date().toString(),
      trackers: [{ id: Date.now(), exercise: '', radio: false, text: false }],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'trackers',
  });

  const addNewTracker = () => {
    append({
      id: Date.now(),
      exercise: '',
      radio: false,
      text: false,
    });
  };

  const onSubmit = (data: any) => {
    console.log('FINAL OUTPUT:', data);
  };
  console.log(fields);
  return (
    <CustomWrapper edge={['top']}>
      <View style={{ height: 100 }}>
        <CustomHeader />
      </View>

      <View style={{ height: 300 }}>
        <FlatList
          data={fields}
          keyExtractor={item => item.id.toString()}
          renderItem={({ index }) => (
            <RenderItem control={control} index={index} />
          )}
        />
      </View>

      <CustomButton text="Add New Tracker" onPress={addNewTracker} />
      <CustomButton text="Submit" onPress={handleSubmit(onSubmit)} />
    </CustomWrapper>
  );
};

export default AddNewTracker;

const styles = StyleSheet.create({});
