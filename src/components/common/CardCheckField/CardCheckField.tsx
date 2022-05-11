import useTheme from 'hooks/useTheme';
import { ColorType } from 'providers/ThemeProvider';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Types } from 'types/Types';
import { I18nKey } from '../../../../i18n';
import { CheckBox } from '../CheckBox/CheckBox';
import { Icon } from '../Icon/Icon';
import { JText } from '../Text/Text';
import fnStyles from './CardCheckFieldStyle';

type Props = {
  style?: StyleProp<ViewStyle>;
  value?: any;
  onChange: () => void;
  rightIconType?: Types['iconTypes'];
  rightIconName?: string;
  rightIconColorName?: ColorType;
  labelKey: I18nKey;
};

export const CardCheckField = (props: Props) => {
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
    <View style={[styles.container, style]}>
      <View style={styles.left}>
        <CheckBox
          value={value}
          onPress={onChange}
          backgroundColor={theme.colors.greyLight}
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
    </View>
  );
};
