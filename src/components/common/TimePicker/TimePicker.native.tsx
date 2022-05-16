import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { Types } from 'types/Types';
import { ColorType, FontSizeType } from 'providers/ThemeProvider';
import useTheme from 'hooks/useTheme';
import fnStyles from './TimePickerStyle';
import { Icon } from '../Icon/Icon';
import { JText } from '../Text/Text';
import { I18nKey } from '../../../../i18n';
// import useTranslation from 'common/contexts/translations';

type Props = {
  value: any;
  onChange: (date: any) => void;
  title?: string;
  titleKey?: I18nKey;
  subtitle?: string;
  subtitleKey?: I18nKey;
  leftIconType?: Types['iconTypes'];
  leftIconName?: string;
  leftIconSizeName?: FontSizeType;
  leftIconColorName?: ColorType;
  inline?: boolean;
};

const TimePickerNative = ({
  value,
  onChange,
  title,
  titleKey,
  subtitle,
  subtitleKey,
  leftIconType,
  leftIconName,
  leftIconSizeName,
  leftIconColorName,
  inline,
}: Props) => {
  const { theme } = useTheme();
  const styles = fnStyles(theme);
  // const { lang } = useTranslation();
  const [visible, setVisible] = useState(false);

  let val = null;

  if (!value) val = new Date();
  else if (value && typeof value === 'string') val = dayjs(value).toDate();
  else val = value;

  const setDate = (event: any, date: any) => {
    // IMPORTANT NOTE: setVisible must be first to avoid double render
    // https://github.com/react-native-community/datetimepicker/issues/54
    setVisible(false);
    onChange(date);
  };

  return (
    <View style={{ width: '100%' }}>
      <View style={styles.header}>
        {leftIconType && (
          <Icon
            type={leftIconType}
            name={leftIconName ?? ''}
            sizeName={leftIconSizeName}
            colorName={leftIconColorName}
            style={styles.icon}
          />
        )}
        <View style={styles.headerText}>
          {(title || titleKey) && (
            <JText isBold label={title} labelKey={titleKey} />
          )}
          {(subtitle || subtitleKey) && (
            <JText isItalic label={subtitle} labelKey={subtitleKey} />
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}
      >
        <View
          style={{
            backgroundColor: theme.colors.greyLight,
            padding: theme.sizings.ten,
            borderRadius: theme.sizings.ten,
          }}
        >
          <Text>{dayjs(val).format('HH:mm')}</Text>
        </View>
      </TouchableOpacity>
      {visible && (
        <View
          style={[
            styles.container,
            { flexDirection: inline ? 'row' : 'column' },
            { alignItems: inline ? 'center' : 'flex-start' },
          ]}
        >
          <DateTimePicker
            value={val}
            onChange={setDate}
            is24Hour
            display="clock"
            mode="time"
            // locale={lang}
          />
        </View>
      )}
    </View>
  );
};

export default TimePickerNative;
