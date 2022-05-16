import React from 'react';
import TP from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import dayjs from 'dayjs';
import { Types } from 'types/Types';
import { View } from 'react-native';
import useTheme from 'hooks/useTheme';
import { ColorType, FontSizeType } from 'providers/ThemeProvider';
import { I18nKey } from '../../../../i18n';
import { Icon } from '../Icon/Icon';
import { JText } from '../Text/Text';
import fnStyles from './TimePickerStyle';

type Props = {
  value?: any;
  onChange?: () => void;
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

const TimePickerWeb = ({
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

  let val = null;

  if (!value) val = null;
  else if (value && typeof value === 'string') val = dayjs(value);
  else val = value;

  return (
    <View
      style={[
        styles.container,
        { flexDirection: inline ? 'row' : 'column' },
        { alignItems: inline ? 'center' : 'flex-start' },
      ]}
    >
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
      <TP value={val} onChange={onChange} showSecond={false} minuteStep={15} />
    </View>
  );
};

export default TimePickerWeb;
