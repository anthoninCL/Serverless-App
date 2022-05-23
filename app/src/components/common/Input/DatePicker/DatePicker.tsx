/* eslint-disable react/no-array-index-key */
/* eslint-disable no-plusplus */
import React, { useCallback, useState } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import dayjs from 'dayjs';
import useTheme from 'hooks/useTheme';
import { GradientButton } from 'components/common/GradientButton/GradientButton';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { JText } from 'components/common/Text/Text';
import { Overlay } from 'react-native-elements';

type Props = {
  value?: Date;
  onChange: (val: Date) => void;
  startingYear: number;
  yearsBack: number;
};

const DatePicker = ({
  value,
  onChange = () => {},
  startingYear = new Date().getFullYear() - 18,
  yearsBack = 100,
}: Props) => {
  const date = dayjs(value);
  const [day, setDay] = useState<number>(date.date());
  const [month, setMonth] = useState<number>(date.month());
  const [year, setYear] = useState<number>(date.year());

  // modal
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleOpenModal = useCallback(() => {
    setShowModal(true);
  }, []);

  // style
  const { theme } = useTheme();

  let styles: any;

  if (Platform.OS === 'web') {
    styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: theme.sizings.large,
      },
      monthPicker: {
        flex: 5,
        padding: theme.normalize(7),
        borderColor: 'transparent',
        backgroundColor: 'rgb(235, 235, 235)',
        borderRadius: theme.sizings.smallMedium,
        margin: theme.sizings.small,
        fontSize: theme.fontSizes.large,
        height: theme.sizings.high,
      },
      dayPicker: {
        flex: 4,
        padding: theme.normalize(7),
        borderColor: 'transparent',
        backgroundColor: 'rgb(235, 235, 235)',
        borderRadius: theme.sizings.smallMedium,
        margin: theme.sizings.small,
        fontSize: theme.fontSizes.large,
        height: theme.sizings.high,
      },
      yearPicker: {
        flex: 5,
        padding: theme.normalize(7),
        borderColor: 'transparent',
        backgroundColor: 'rgb(235, 235, 235)',
        borderRadius: theme.sizings.smallMedium,
        margin: theme.sizings.small,
        fontSize: theme.fontSizes.large,
        height: theme.sizings.high,
      },
    });
  } else {
    styles = StyleSheet.create({
      container: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: theme.sizings.large,
      },
      monthPicker: {
        flex: 6,
        padding: 1,
        borderColor: 'transparent',
        backgroundColor: 'rgb(235, 235, 235)',
        borderRadius: theme.sizings.smallMedium,
        marginRight: 3,
        fontSize: theme.fontSizes.large,
      },
      dayPicker: {
        flex: 5,
        padding: 1,
        borderColor: 'transparent',
        backgroundColor: 'rgb(235, 235, 235)',
        borderRadius: theme.sizings.smallMedium,
        marginRight: 3,
        fontSize: theme.fontSizes.large,
      },
      yearPicker: {
        flex: 6,
        padding: 1,
        borderColor: 'transparent',
        backgroundColor: 'rgb(235, 235, 235)',
        borderRadius: theme.sizings.smallMedium,
        fontSize: theme.fontSizes.large,
      },
    });
  }

  // Loops through the months and gets the long name string...
  const getMonthNames = () => {
    const monthNames = [];
    for (let i = 0; i < 12; i++) {
      const dateMonth = new Date(2000, i, 15);
      monthNames.push(dayjs(dateMonth).format('MMM'));
    }
    return monthNames;
  };

  // Returns the number of days in the given month...
  const getNumDaysInMonth = (_year: number, _month: number) => {
    // February is the only month that can change, so if there's no year, assume it has the maximum (29) days...
    return _year === 0 && _month === 1
      ? 29
      : new Date(_year, _month, 0).getDate();
  };

  // Returns the <Picker.Item> values for the years...
  const renderYearPickerItems = () => {
    // If year was 0, change it to current...
    const currentYear = new Date().getFullYear();
    let centerYear = startingYear;
    if (centerYear === 0) {
      centerYear = currentYear;
    }

    // Set starting and ending years...
    const startYear = centerYear - yearsBack;
    const endYear = currentYear;

    const years = [];
    for (let i = startYear; i <= endYear; i++) {
      years.push(<Picker.Item label={i.toString()} value={i} key={i} />);
    }
    return years;
  };

  // Returns the <Picker.Item> values for the months...
  const renderMonthPickerItems = () => {
    const months = getMonthNames();
    return months.map((_month, index) => {
      return <Picker.Item label={_month} value={index + 1} key={index} />;
    });
  };

  // Returns the <Picker.Item> values for the days (based on current month/year)...
  const renderDayPickerItems = () => {
    // February is the only day that can change, so if there's no year, assume it has the maximum (29) days...
    const numDays = getNumDaysInMonth(year, month);

    const days = [];
    for (let i = 1; i <= numDays; i++) {
      days.push(<Picker.Item label={i.toString()} value={i} key={i} />);
    }
    return days;
  };

  // Occurs when year value changes...
  const onYearChange = (newYear: number) => {
    // Check if days are valid...
    const maxDays = getNumDaysInMonth(newYear, month);
    const newDay = day > maxDays ? maxDays : day;

    setYear(newYear);
    setDay(newDay);
    onChange(dayjs(`${newYear}-${month}-${newDay} 12:00:00`).toDate());
  };

  // Occurs when month value changes...
  const onMonthChange = (newMonth: number) => {
    // Check if days are valid...
    const maxDays = getNumDaysInMonth(year, newMonth);
    const newDay = day > maxDays ? maxDays : day;

    setMonth(newMonth);
    setDay(newDay);
    onChange(dayjs(`${year}-${newMonth}-${newDay} 12:00:00`).toDate());
  };

  // Occurs when day value changes...
  const onDayChange = (newDay: number) => {
    setDay(newDay);
    onChange(dayjs(`${year}-${month}-${newDay} 12:00:00`).toDate());
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleOpenModal}
        style={{
          paddingLeft: theme.sizings.medium,
          paddingRight: theme.sizings.medium,
          flex: 1,
          backgroundColor: theme.colors.greyLight,
          borderRadius: theme.sizings.smallMedium,
          minHeight: theme.normalize(40),
          justifyContent: 'center',
        }}
      >
        <JText label={date.format('DD / MM / YYYY')} />
      </TouchableOpacity>

      <Overlay
        isVisible={showModal}
        overlayStyle={{
          width: Dimensions.get('window').width - theme.sizings.mediumLarge * 2,
          // flex: 1,
          paddingVertical: theme.sizings.mediumLarge,
          marginTop: theme.sizings.large,
          marginBottom: theme.sizings.large,
          flexDirection: 'column',
          borderRadius: theme.radius.medium,
        }}
        onBackdropPress={() => setShowModal(false)}
      >
        <View style={styles.container}>
          <Picker
            style={styles.dayPicker}
            selectedValue={day}
            onValueChange={onDayChange}
          >
            {renderDayPickerItems()}
          </Picker>

          <Picker
            style={styles.monthPicker}
            selectedValue={month}
            onValueChange={onMonthChange}
          >
            {renderMonthPickerItems()}
          </Picker>

          <Picker
            style={styles.yearPicker}
            selectedValue={year}
            onValueChange={onYearChange}
          >
            {renderYearPickerItems()}
          </Picker>
        </View>
        <GradientButton
          onPress={() => setShowModal(false)}
          labelKey="common.validate"
          leftIconName="check"
          leftIconType="FontAwesome5"
        />
      </Overlay>
    </>
  );
};

export default DatePicker;
