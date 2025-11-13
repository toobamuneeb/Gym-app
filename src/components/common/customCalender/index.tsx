// import React, {useRef, useEffect} from 'react';
// import {
//   View,
//   FlatList,
//   StyleSheet,
//   ListRenderItem,
// } from 'react-native';
// import {Font} from '../../../utils/ImagePath';
// import {TextNormal} from '../customText';
// import {
//   heightPercentageToDP,
//   widthPercentageToDP,
// } from 'react-native-responsive-screen';
// import Header from '../Header';
// interface Props {
//   onPressNotification?: () => void;
//   onPressProfile?: () => void;
// }
// type DateItem = Date;

// const HorizontalDatePicker = ({onPressNotification, onPressProfile}: Props) => {
//   const flatListRef = useRef<FlatList<DateItem>>(null);
//   const currentDate = new Date();
//   const createDate = (year: number, month: number, day: number): Date => {
//     return new Date(year, month - 1, day);
//   };

//   const appointmentDates: Date[] = [
//     createDate(2025, 3, 5),
//     createDate(2025, 3, 12),
//     createDate(2025, 3, 19),
//     createDate(2025, 3, 14),
//     createDate(2025, 12, 25),
//     createDate(2025, 1, 1),
//   ];

//   const getDatesInMonth = (year: number, month: number): Date[] => {
//     const dates: Date[] = [];
//     const startDate = createDate(year, month, 1);

//     while (startDate.getMonth() === month - 1) {
//       dates.push(new Date(startDate));
//       startDate.setDate(startDate.getDate() + 1);
//     }
//     return dates;
//   };

//   const datesInMonth: Date[] = getDatesInMonth(
//     currentDate.getFullYear(),
//     currentDate.getMonth() + 1,
//   );

//   const currentDateIndex: number = datesInMonth.findIndex(
//     date => date.toDateString() === currentDate.toDateString(),
//   );

//   useEffect(() => {
//     if (flatListRef.current && currentDateIndex !== -1) {
//       flatListRef.current.scrollToIndex({
//         index: currentDateIndex,
//         animated: true,
//       });
//     }
//   }, [currentDateIndex]);

//   const hasAppointment = (date: Date) => {
//     return appointmentDates.some(
//       appt => appt.toDateString() === date.toDateString(),
//     );
//   };

//   // Render date item
//   const renderDateItem: ListRenderItem<DateItem> = ({item}) => {
//     const isToday = item.toDateString() === currentDate.toDateString();
//     const dateNumber = item.getDate();

//     return (
//       <View style={[styles.dateItem]}>
//         <TextNormal textStyle={isToday ? styles.todayText : styles.dateText}>
//           {dateNumber}
//         </TextNormal>
//         {hasAppointment(item) && <View style={styles.appointmentDot} />}
//         {isToday && (
//           <View style={{...styles.appointmentDot, backgroundColor: 'red'}} />
//         )}
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Header
//         onPressNotification={onPressNotification}
//         onPressProfile={onPressProfile}
//         HomeScreen
//         title={`${currentDate.toLocaleString('en-US', {weekday: 'long'})}`}
//       />

//       <FlatList
//         ref={flatListRef}
//         horizontal
//         data={datesInMonth}
//         renderItem={renderDateItem}
//         keyExtractor={(item, index) => index.toString()}
//         showsHorizontalScrollIndicator={false}
//         initialScrollIndex={currentDateIndex}
//         getItemLayout={(_, index) => ({
//           length: widthPercentageToDP(10),
//           offset: widthPercentageToDP(13) * index,
//           index,
//         })}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: heightPercentageToDP(2),
//   },
//   dateItem: {
//     width: widthPercentageToDP(10),
//     marginHorizontal: 10,
//     alignItems: 'center',
//     paddingVertical: 8,
//     borderRadius: 8,
//   },

//   dateText: {
//     color: '#555555',
//   },
//   todayText: {
//     color: '#000',
//     fontFamily: Font.bold,
//   },
//   appointmentDot: {
//     position: 'absolute',
//     bottom: widthPercentageToDP(0.2),
//     width: widthPercentageToDP(1.5),
//     height: widthPercentageToDP(1.5),
//     borderRadius: widthPercentageToDP(10),
//     backgroundColor: '#555555',
//   },
// });

// export default HorizontalDatePicker;

import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ListRenderItem,
  TouchableOpacity,
} from 'react-native';
import {Font} from '../../../utils/ImagePath';
import {TextNormal} from '../customText';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Header from '../Header';
import {COLORS} from '../../../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';

interface Props {
  onPressNotification?: () => void;
  onPressProfile?: () => void;
  compactMode?: boolean;
  onDateChange?: (date: string) => void; // Add this callback prop
  header?: boolean;
}
type DateItem = Date;

const HorizontalDatePicker = ({
  onPressNotification,
  onPressProfile,
  compactMode = false, // Default to false (original behavior)
  header,
  onDateChange,
}: Props) => {
  const flatListRef = useRef<FlatList<DateItem>>(null);
  const currentDate = new Date();
  const [displayDate, setDisplayDate] = useState(new Date()); // For compact mode navigation

  const createDate = (year: number, month: number, day: number): Date => {
    return new Date(year, month - 1, day);
  };

  const appointmentDates: Date[] = [
    createDate(2025, 3, 5),
    createDate(2025, 3, 12),
    createDate(2025, 3, 19),
    createDate(2025, 3, 14),
    createDate(2025, 12, 25),
    createDate(2025, 1, 1),
  ];

  const getDatesInMonth = (year: number, month: number): Date[] => {
    const dates: Date[] = [];
    const startDate = createDate(year, month, 1);

    while (startDate.getMonth() === month - 1) {
      dates.push(new Date(startDate));
      startDate.setDate(startDate.getDate() + 1);
    }
    return dates;
  };

  const datesInMonth: Date[] = getDatesInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
  );

  const currentDateIndex: number = datesInMonth.findIndex(
    date => date.toDateString() === currentDate.toDateString(),
  );

  useEffect(() => {
    if (flatListRef.current && currentDateIndex !== -1 && !compactMode) {
      flatListRef.current.scrollToIndex({
        index: currentDateIndex,
        animated: true,
      });
    }
  }, [currentDateIndex, compactMode]);

  const hasAppointment = (date: Date) => {
    return appointmentDates.some(
      appt => appt.toDateString() === date.toDateString(),
    );
  };

  // Navigation functions for compact mode
  // const goToPreviousDay = () => {
  //   const newDate = new Date(displayDate);
  //   newDate.setDate(newDate.getDate() - 1);
  //   setDisplayDate(newDate);
  //   onDateChange?.(newDate);
  // };

  // const goToNextDay = () => {
  //   const newDate = new Date(displayDate);
  //   newDate.setDate(newDate.getDate() + 1);
  //   setDisplayDate(newDate);
  //   onDateChange?.(newDate);
  // };

  // Render date item (unchanged from original)
  const renderDateItem: ListRenderItem<DateItem> = ({item}) => {
    const isToday = item.toDateString() === currentDate.toDateString();
    const dateNumber = item.getDate();

    return (
      <View style={[styles.dateItem]}>
        <TextNormal textStyle={isToday ? styles.todayText : styles.dateText}>
          {dateNumber}
        </TextNormal>
        {hasAppointment(item) && <View style={styles.appointmentDot} />}
        {isToday && (
          <View style={{...styles.appointmentDot, backgroundColor: 'red'}} />
        )}
      </View>
    );
  };
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const [currentDayIndex, setCurrentDayIndex] = useState(0); // Starts at Monday

  const goToPreviousDay = () => {
    setCurrentDayIndex(prevIndex => (prevIndex - 1 + 7) % 7);
  };

  const goToNextDay = () => {
    setCurrentDayIndex(prevIndex => (prevIndex + 1) % 7);
  };

  useEffect(() => {
    onDateChange?.(days[currentDayIndex]);
  }, [days[currentDayIndex]]);
  return (
    <View style={[styles.container, compactMode && {paddingVertical: 0}]}>
      {header && (
        <Header
          onPressNotification={onPressNotification}
          onPressProfile={onPressProfile}
          HomeScreen
          title={`${currentDate.toLocaleString('en-US', {weekday: 'long'})}`}
        />
      )}

      {compactMode ? (
        <View style={styles.compactContainer}>
          <TouchableOpacity onPress={goToPreviousDay} style={styles.navButton}>
            <TextNormal textStyle={styles.navButtonText}>{'<'}</TextNormal>
          </TouchableOpacity>

          <View style={styles.centerDate}>
            <TextNormal textStyle={styles.compactDateText}>
              {/* {displayDate.toLocaleString('en-US', {weekday: 'long'})} */}
              {days[currentDayIndex]}
            </TextNormal>
          </View>

          <TouchableOpacity onPress={goToNextDay} style={styles.navButton}>
            <TextNormal textStyle={styles.navButtonText}>{'>'}</TextNormal>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          horizontal
          data={datesInMonth}
          renderItem={renderDateItem}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={currentDateIndex}
          getItemLayout={(_, index) => ({
            length: wp(10),
            offset: wp(13) * index,
            index,
          })}
        />
      )}
    </View>
  );
};

// Original styles kept exactly the same
const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(2),
  },
  dateItem: {
    width: wp(10),
    marginHorizontal: 10,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
  },
  dateText: {
    color: '#555555',
  },
  todayText: {
    color: '#000',
    fontFamily: Font.bold,
  },
  appointmentDot: {
    position: 'absolute',
    bottom: wp(0.2),
    width: wp(1.5),
    height: wp(1.5),
    borderRadius: wp(10),
    backgroundColor: '#555555',
  },
  // New styles for compact mode (added at the bottom)
  compactContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginVertical: hp(1),
  },
  navButton: {
    padding: wp(3),
    borderRadius: wp(5),
  },
  navButtonText: {
    fontSize: wp(5),
    // fontWeight: 'bold',
    color: '#000',
  },
  centerDate: {
    alignItems: 'center',
  },
  compactDateText: {
    fontSize: RFValue(16),
    color: COLORS.textGray,
    fontFamily: Font.semiBold,
  },
  compactDayText: {
    fontSize: wp(6),
    fontWeight: 'bold',
    color: '#000',
  },
});

export default HorizontalDatePicker;
