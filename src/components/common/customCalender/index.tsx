import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import { TextBig, TextBigger, TextNormal } from '../customText';
import { Font } from '../../../utils/ImagePath';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../Header';
import { COLORS } from '../../../utils/theme';
import { RFValue } from 'react-native-responsive-fontsize';

type DateItem = Date;

interface Props {
  compactMode?: boolean;
  onPressNotification?: () => void;
  onPressProfile?: () => void;
  onDateChange?: (date: Date) => void;
  header?: boolean;
  startingDate?: Date;
  endingDate?: Date;
}

const HorizontalDatePicker = ({
  compactMode = false,
  onPressNotification,
  onPressProfile,
  onDateChange,
  header = true,
  startingDate,
  endingDate,
}: Props) => {
  const flatListRef = useRef<FlatList<DateItem>>(null);

  const today = startingDate ? new Date(startingDate) : new Date();
  let lastDate = endingDate ? new Date(endingDate) : new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  useEffect(() => {
    if (startingDate) {
      onDateChange?.(selectedDate);
      ``;
    }
  }, [startingDate]);
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const getDatesForMonth = (y: number, m: number): Date[] => {
    const dates: Date[] = [];
    const date = new Date(y, m, 1);

    while (date.getMonth() === m) {
      dates.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const datesInMonth = getDatesForMonth(year, month);

  const currentIndex = datesInMonth.findIndex(
    d => d.toDateString() === selectedDate.toDateString(),
  );

  // Appointment sample
  const appointments = [
    new Date(2025, 2, 5),
    new Date(2025, 2, 12),
    new Date(2025, 2, 19),
    new Date(2025, 2, 25),
  ];

  const hasAppointment = (date: Date) =>
    appointments.some(a => a.toDateString() === date.toDateString());

  useEffect(() => {
    if (flatListRef.current && !compactMode && currentIndex >= 0) {
      flatListRef.current.scrollToIndex({
        index: currentIndex,
        animated: true,
      });
    }
  }, [month, year]);

  const goToNextMonth = () => {
    setMonth(prev => {
      const m = prev + 1;
      if (m > 11) {
        setYear(y => y + 1);
        return 0;
      }
      return m;
    });
  };

  const goToPrevMonth = () => {
    setMonth(prev => {
      const m = prev - 1;
      if (m < 0) {
        setYear(y => y - 1);
        return 11;
      }
      return m;
    });
  };

  const changeDay = (offset: number) => {
    if (offset == -1 && today >= selectedDate) {
      return;
    }

    if (offset == 1 && lastDate <= selectedDate) {
      return;
    }

    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + offset);

      setMonth(newDate.getMonth());
      setYear(newDate.getFullYear());

      onDateChange?.(newDate);
      return newDate;
    });
  };

  const renderItem: ListRenderItem<DateItem> = ({ item }) => {
    const isSelected = item.toDateString() === selectedDate.toDateString();

    return (
      <TouchableOpacity
        style={styles.dateItem}
        onPress={() => {
          setSelectedDate(item);
          onDateChange?.(item);
        }}
      >
        <TextNormal textStyle={isSelected ? styles.todayText : styles.dateText}>
          {item.getDate()}
        </TextNormal>

        {hasAppointment(item) && <View style={styles.dot} />}

        {isSelected && (
          <View style={[styles.dot, { backgroundColor: 'red' }]} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, compactMode && { paddingVertical: 0 }]}>
      {!header && (
        <Header
          onPressNotification={onPressNotification}
          onPressProfile={onPressProfile}
          title={`${selectedDate.toLocaleString('en-US', { weekday: 'long' })}`}
        />
      )}

      {!compactMode && (
        <View style={styles.monthRow}>
          <TouchableOpacity onPress={goToPrevMonth}>
            <TextNormal style={styles.monthNav}>{'<'}</TextNormal>
          </TouchableOpacity>

          <TextNormal style={styles.monthTitle}>
            {selectedDate.toLocaleString('en-US', { month: 'long' })} {year}
          </TextNormal>

          <TouchableOpacity onPress={goToNextMonth}>
            <TextNormal style={styles.monthNav}>{'>'}</TextNormal>
          </TouchableOpacity>
        </View>
      )}

      {compactMode ? (
        <View style={styles.compactContainer}>
          <TouchableOpacity onPress={() => changeDay(-1)}>
            <TextNormal style={styles.monthNav}>{'<'}</TextNormal>
          </TouchableOpacity>

          <View style={styles.centerDate}>
            <TextBigger bold>
              {selectedDate.toLocaleString('en-US', { weekday: 'long' })}
            </TextBigger>
            <TextNormal style={styles.compactDateText}>
              {selectedDate.getDate()}{' '}
              {selectedDate.toLocaleString('en-US', { month: 'short' })}
            </TextNormal>
          </View>

          <TouchableOpacity onPress={() => changeDay(1)}>
            <TextNormal style={styles.monthNav}>{'>'}</TextNormal>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          horizontal
          data={datesInMonth}
          renderItem={renderItem}
          keyExtractor={(_, i) => i.toString()}
          showsHorizontalScrollIndicator={false}
          getItemLayout={(_, i) => ({
            length: wp(10),
            offset: wp(12) * i,
            index: i,
          })}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(2),
  },
  monthRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    alignItems: 'center',
    marginBottom: hp(1),
  },
  monthTitle: {
    fontSize: RFValue(16),
    fontFamily: Font.bold,
    color: COLORS.textGray,
  },
  monthNav: {
    fontSize: wp(6),
    color: COLORS.textBlack,
  },
  dateItem: {
    width: wp(10),
    alignItems: 'center',
    paddingVertical: 8,
  },
  dateText: {
    color: '#555',
  },
  todayText: {
    color: '#000',
    fontFamily: Font.bold,
  },
  dot: {
    width: wp(1.5),
    height: wp(1.5),
    borderRadius: wp(10),
    backgroundColor: '#555',
    marginTop: 2,
  },
  compactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    alignItems: 'center',
    marginTop: hp(1),
  },
  centerDate: { alignItems: 'center' },
  compactDayText: {
    fontSize: RFValue(18),
    fontFamily: Font.semiBold,
    color: COLORS.textBlack,
  },
  compactDateText: {
    fontSize: RFValue(14),
    color: COLORS.textGray,
    alignSelf: 'center',
  },
});

export default HorizontalDatePicker;
