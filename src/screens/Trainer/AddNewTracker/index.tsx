import { FlatList, StyleSheet, View } from 'react-native';
import React from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import CustomHeader from './Components/CustomHeader';
import RenderItem from './Components/RenderItem';
import { useForm, useFieldArray } from 'react-hook-form';
import CustomButton from '../../../components/common/customButton';

const AddNewTracker = () => {
  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      date: new Date().toString(),
      trackers: [
        { id: Date.now(), exercise: '', isRadio: false, isTextField: false },
      ],
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
      isRadio: false,
      isTextField: false,
    });
  };

  return (
    <CustomWrapper edge={['top', 'bottom']}>
      <View style={styles.container}>
        <CustomHeader />

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
