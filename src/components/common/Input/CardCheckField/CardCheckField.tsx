import useTheme from 'hooks/useTheme';
import { ColorType } from 'providers/ThemeProvider';
import React from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Types } from 'types/Types';
import { I18nKey } from '../../../../../i18n';
import { CheckBox } from '../CheckBox/CheckBox';
import { Icon } from '../../Icon/Icon';
import { JText } from '../../Text/Text';
import fnStyles from './CardCheckFieldStyle';

export type CardCheckFieldProps = {
  style?: StyleProp<ViewStyle>;
  value?: any;
  onChange?: (value: any) => void;
  rightIconType?: Types['iconTypes'];
  rightIconName?: string;
  rightIconColorName?: ColorType;
  labelKey?: I18nKey;
};

export const CardCheckField = (props: CardCheckFieldProps) => {
  const { theme } = useTheme();
  const styles = fnStyles(theme);
  const {
    style,
    value,
    onChange,
    rightIconType = 'FontAwesome5',
    rightIconName,
    rightIconColorName = 'greenMedium',
    labelKey,
  } = props;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={() => (onChange ? onChange(!value) : {})}
    >
      <View style={styles.left}>
        <CheckBox
          value={value}
          onPress={onChange}
          backgroundColor={theme.colors.dark}
          sizeName="large"
        />

        <JText
          labelKey={labelKey}
          isBold
          style={{ marginHorizontal: theme.sizings.mediumLarge }}
        />
      </View>

      {rightIconName && (
        <Icon
          name={rightIconName}
          colorName={rightIconColorName}
          sizeName="larger"
          type={rightIconType}
        />
      )}
    </TouchableOpacity>
  );
};
