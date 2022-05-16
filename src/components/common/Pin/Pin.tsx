import React from 'react';
import { Types } from 'types/Types';
import { ColorType, FontSizeType } from 'providers/ThemeProvider';
import useTheme from 'hooks/useTheme';
import { StyleProp, ViewStyle } from 'react-native';
import { IconicText } from '../IconicText/IconicText';
import { Card } from '../Card/Card';
import fnStyles from './PinStyle';
import { I18nKey } from '../../../../i18n';

type Props = {
  label?: string;
  labelKey?: I18nKey;
  valuesKey?: object;
  textColorName?: ColorType;
  isBold?: boolean;
  fontSizeName?: FontSizeType;
  iconType?: Types['iconTypes'];
  iconName?: string;
  iconSizeName?: FontSizeType;
  iconColorName?: ColorType;
  isBadge?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Pin = ({
  label,
  labelKey,
  valuesKey,
  textColorName,
  isBold = false,
  fontSizeName,
  iconType,
  iconName,
  iconSizeName,
  iconColorName,
  isBadge = false,
  style,
}: Props) => {
  const { theme } = useTheme();
  const styles = fnStyles(theme);

  return (
    <Card style={[isBadge ? styles.badge : styles.card, style]}>
      <IconicText
        label={label}
        labelKey={labelKey}
        valuesKey={valuesKey}
        textColorName={isBadge ? 'light' : textColorName}
        fontSizeName={fontSizeName}
        isBold={isBold || isBadge}
        iconType={iconType}
        iconName={iconName}
        iconSizeName={isBadge ? 'large' : iconSizeName}
        iconColorName={isBadge ? 'light' : iconColorName}
        paddingTop={0}
        spacing={isBadge ? theme.sizings.tiny : theme.sizings.medium}
      />
    </Card>
  );
};
