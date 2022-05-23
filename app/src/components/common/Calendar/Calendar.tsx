import useTheme from 'hooks/useTheme';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, View } from 'react-native';
import CalendarPicker, {
  CustomDatesStylesFunc,
  CustomDayHeaderStylesFunc,
} from 'react-native-calendar-picker';
import fnStyles from './CalendarStyle';

/* const weekdaysStyles: DayOfWeekStyle = {
  0: {
    color: theme.colors.dark,
  },
  1: {
    color: theme.colors.dark,
  },
  2: {
    color: theme.colors.dark,
  },
  3: {
    color: theme.colors.dark,
  },
  4: {
    color: theme.colors.dark,
  },
  5: {
    color: theme.colors.dark,
  },
  6: {
    color: theme.colors.dark,
  },
}; */

const Calendar = () => {
  const { theme } = useTheme();
  const styles = fnStyles(theme);
  const { t } = useTranslation();

  const customDayHeaderStylesCallback: CustomDayHeaderStylesFunc = ({
    dayOfWeek,
  }) => {
    switch (
      dayOfWeek // can also evaluate month, year
    ) {
      default:
        // Thursday
        return {
          textStyle: {
            color: theme.colors.dark,
            fontSize: theme.fontSizes.medium,
            fontWeight: 'bold',
          },
        };
    }
  };

  const customDatesStylesCallback: CustomDatesStylesFunc = date => {
    return {
      style: {},
      textStyle: {},
    };
  };

  return (
    <View style={styles.container}>
      <CalendarPicker
        width={Dimensions.get('window').width - theme.sizings.mediumLarge * 4}
        weekdays={t('calendar.weekdays').split(',')}
        months={t('calendar.months').split(',')}
        previousTitle={t('calendar.previous')}
        nextTitle={t('calendar.next')}
        dayLabelsWrapper={styles.daysLabelWrapper}
        headerWrapperStyle={styles.headerWrapperStyle}
        monthTitleStyle={{
          color: theme.colors.light,
          fontSize: theme.fontSizes.larger,
        }}
        yearTitleStyle={{
          color: theme.colors.light,
          fontSize: theme.fontSizes.larger,
        }}
        nextTitleStyle={{ color: theme.colors.light }}
        previousTitleStyle={{ color: theme.colors.light }}
        customDayHeaderStyles={customDayHeaderStylesCallback}
        customDatesStyles={customDatesStylesCallback}
        startFromMonday
      />
    </View>
  );
};

export default Calendar;
