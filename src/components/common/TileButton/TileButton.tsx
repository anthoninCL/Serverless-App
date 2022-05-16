import React from 'react';
import { TouchableOpacity, View, ViewStyle, StyleProp } from 'react-native';
import { Types } from 'types/Types';
import { useTranslation } from 'react-i18next';
import useTheme from 'hooks/useTheme';
import { ColorType, FontSizeType } from 'providers/ThemeProvider';
import fnStyles from './TileButtonStyle';
import { Icon } from '../Icon/Icon';
import { I18nKey } from '../../../../i18n';
import { JText } from '../Text/Text';

type Props = {
  label?: string;
  labelKey?: I18nKey;
  onPress?: () => void;
  tileColorName?: ColorType;
  leftIconType?: Types['iconTypes'];
  leftIconName?: string;
  leftIconSizeName?: FontSizeType;
  leftIconColorName?: ColorType;
  rightIconType?: Types['iconTypes'];
  rightIconName?: string;
  rightIconSizeName?: FontSizeType;
  rightIconColorName?: ColorType;
  style?: StyleProp<ViewStyle>;
};

export const TileButton = (props: Props) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = fnStyles(theme);

  const {
    label,
    labelKey,
    onPress = () => {},
    tileColorName = 'dark',
    leftIconType,
    leftIconName,
    leftIconSizeName = 'larger',
    leftIconColorName = 'light',
    rightIconType,
    rightIconName,
    rightIconSizeName = 'larger',
    rightIconColorName = 'light',
    style,
  } = props;

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      {leftIconName && (
        <View
          style={[
            styles.tile,
            styles.left,
            { backgroundColor: theme.colors[tileColorName] },
          ]}
        >
          <Icon
            type={leftIconType}
            name={leftIconName}
            sizeName={leftIconSizeName}
            colorName={leftIconColorName}
          />
        </View>
      )}
      <View style={styles.textContent}>
        <JText sizeName="large" isBold label={label} labelKey={labelKey} />
      </View>
      {rightIconName && (
        <View
          style={[
            styles.tile,
            styles.right,
            { backgroundColor: theme.colors[tileColorName] },
          ]}
        >
          <Icon
            type={rightIconType}
            name={rightIconName}
            sizeName={rightIconSizeName}
            colorName={rightIconColorName}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};
