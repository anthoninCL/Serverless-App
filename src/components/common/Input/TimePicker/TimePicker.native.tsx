import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import { Types } from 'types/Types';
import { ColorType, FontSizeType } from 'providers/ThemeProvider';
import useTheme from 'hooks/useTheme';
import { Icon } from 'components/common/Icon/Icon';
import { JText } from 'components/common/Text/Text';
import { Overlay } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';
import { GradientButton } from 'components/common/GradientButton/GradientButton';
import moment from 'moment';
import fnStyles from './TimePickerStyle';
import { I18nKey } from '../../../../../i18n';

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
  const date = value ? dayjs(value) : dayjs();
  const [hour, setHour] = useState<number>(date.hour());
  const [minute, setMinute] = useState<number>(date.minute());
  const { theme } = useTheme();
  const styles = fnStyles(theme);
  // const { lang } = useTranslation();
  const [visible, setVisible] = useState(false);

  // Returns the <Picker.Item> values for the years...
  const renderMinutePickerItems = () => {
    const minutes = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= 59; i++) {
      minutes.push(
        <Picker.Item
          label={i < 10 ? `0${i}` : i.toString()}
          value={i}
          key={i}
        />,
      );
    }
    return minutes;
  };

  // Returns the <Picker.Item> values for the years...
  const renderHourPickerItems = () => {
    const hours = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i <= 23; i++) {
      hours.push(
        <Picker.Item
          label={i < 10 ? `0${i}` : i.toString()}
          value={i}
          key={i}
        />,
      );
    }
    return hours;
  };

  // Occurs when year value changes...
  const onHourChange = (newHour: number) => {
    setHour(newHour);
  };

  // Occurs when year value changes...
  const onMinuteChange = (newMinute: number) => {
    setMinute(newMinute);
  };

  const handleChange = () => {
    const result = date.set('hour', hour).set('minute', minute).toDate();
    onChange(moment(result));
    setVisible(false);
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
          <Text>{dayjs(date).format('HH:mm')}</Text>
        </View>
      </TouchableOpacity>
      <Overlay
        isVisible={visible}
        overlayStyle={{
          width: Dimensions.get('window').width - theme.sizings.mediumLarge * 2,
          // flex: 1,
          paddingVertical: theme.sizings.mediumLarge,
          marginTop: theme.sizings.large,
          marginBottom: theme.sizings.large,
          flexDirection: 'column',
          borderRadius: theme.radius.medium,
        }}
        onBackdropPress={() => setVisible(false)}
      >
        <View style={styles.containerPicker}>
          <Picker
            style={styles.hourPicker}
            selectedValue={hour}
            onValueChange={onHourChange}
          >
            {renderHourPickerItems()}
          </Picker>

          <Picker
            style={styles.minutePicker}
            selectedValue={minute}
            onValueChange={onMinuteChange}
          >
            {renderMinutePickerItems()}
          </Picker>
        </View>
        <GradientButton
          onPress={handleChange}
          labelKey="common.validate"
          leftIconName="check"
          leftIconType="FontAwesome5"
        />
      </Overlay>
    </View>
  );
};

export default TimePickerNative;
