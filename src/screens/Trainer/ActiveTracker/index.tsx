import { SectionList, StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { TextBiggest, TextSmall } from '../../../components/common/customText';
import CustomDatePicker from '../../../components/common/CustomDatePicker';
import { useForm } from 'react-hook-form';
import RenderItem from './Components/RenderItem';

let data = [
  {
    date: '10/25/2025',
    tracker: [
      {
        question: 'Did you meet your protein goal today?',
        isRadioBtn: true,
        isTextField: true,
      },
      {
        question: 'Did you meet your protein goal today?',
        isRadioBtn: false,
        isTextField: true,
      },
    ],
  },
  {
    date: '10/25/2025',
    tracker: [
      {
        question: 'Did you meet your protein goal today?',
        isRadioBtn: true,
        isTextField: true,
      },
    ],
  },
];
const sections = data.map(item => ({
  title: item.date,
  data: item.tracker,
}));
const ActiveTracker = () => {
  const onChange = () => {};

  const renderItem = useCallback(({ item, index }: any) => {
    return <RenderItem item={item} index={index} />;
  }, []);

  return (
    <CustomWrapper edge={['top', 'bottom']}>
      <View style={styles.headerContain}>
        <TextBiggest bold children={'Active Tracker'} />
        <CustomDatePicker onChange={onChange} />
      </View>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ alignItems: 'center', paddingVertical: wp(2) }}>
            <TextSmall bold>{title}</TextSmall>
          </View>
        )}
        stickySectionHeadersEnabled={false}
      />
    </CustomWrapper>
  );
};

export default ActiveTracker;

const styles = StyleSheet.create({
  headerContain: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: wp(4),
    alignSelf: 'center',
  },
});
