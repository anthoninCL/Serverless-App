import React from 'react';
import 'rc-time-picker/assets/index.css';
import { Types } from 'types/Types';
import { ColorType } from 'providers/ThemeProvider';
import { I18nKey } from '../../../../../i18n';
import TimePickerNative from './TimePicker.native';
import TimePickerWeb from './TimePicker.web';

type Props = {
  value?: any;
  onChange?: () => void;
  titleKey?: I18nKey;
  leftIconType?: Types['iconTypes'];
  leftIconName?: string;
  leftIconColorName?: ColorType;
};

const TimePicker = ({
  value,
  onChange = () => {},
  titleKey,
  leftIconType,
  leftIconName,
  leftIconColorName,
}: Props) => {
  return true ? (
    <TimePickerNative
      titleKey={titleKey}
      leftIconColorName={leftIconColorName}
      leftIconType={leftIconType}
      leftIconName={leftIconName}
      onChange={onChange}
      value={value}
    />
  ) : (
    <TimePickerWeb
      titleKey={titleKey}
      leftIconColorName={leftIconColorName}
      leftIconType={leftIconType}
      leftIconName={leftIconName}
      onChange={onChange}
      value={value}
    />
  );
};

export default TimePicker;
