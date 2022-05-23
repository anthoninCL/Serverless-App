import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { Types } from 'types/Types';
import useTheme from 'hooks/useTheme';
import { ColorType, FontSizeType, SizingsType } from 'providers/ThemeProvider';
import fnStyles from './CircularButtonStyle';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import { JText } from '../Text/Text';
import { I18nKey } from '../../../../i18n';

type Props = {
  label?: string;
  labelKey?: I18nKey;
  backgroundColorName: ColorType;
  sizeName: SizingsType;
  onPress?: () => void;
  iconType: Types['iconTypes'];
  iconName: string;
  iconSizeName?: FontSizeType;
  iconColorName?: ColorType;
  secondaryIconName?: string;
  secondaryIconType?: Types['iconTypes'];
  secondaryIconColorName?: ColorType;
  style?: StyleProp<ViewStyle>;
};

export const CircularButton = ({
  label,
  labelKey,
  backgroundColorName,
  sizeName,
  onPress = () => {},
  iconType,
  iconName,
  iconSizeName,
  iconColorName = 'dark',
  secondaryIconName,
  secondaryIconType,
  secondaryIconColorName,
  style,
}: Props) => {
  const { theme } = useTheme();
  const styles = fnStyles(theme);
  return (
    <View style={[styles.container, style]}>
      <Button
        style={[
          styles.button,
          {
            width: theme.sizings[sizeName],
            height: theme.sizings[sizeName],
            borderRadius: theme.sizings[sizeName] / 2,
            backgroundColor: theme.colors[backgroundColorName],
          },
        ]}
        onPress={onPress}
      >
        <Icon
          type={iconType}
          name={iconName}
          sizeName={iconSizeName}
          colorName={iconColorName}
        />
        {secondaryIconName && secondaryIconType && secondaryIconColorName && (
          <Icon
            type={secondaryIconType}
            name={secondaryIconName}
            customSize={theme.sizings[sizeName] / 3}
            colorName={secondaryIconColorName}
            style={{
              position: 'absolute',
              top: -theme.sizings[sizeName] / 10,
              right: -theme.sizings[sizeName] / 10,
            }}
          />
        )}
      </Button>
      {(label || labelKey) && (
        <JText
          label={label}
          labelKey={labelKey}
          isTitleText
          sizeName="fs18"
          style={styles.title}
          colorName={iconColorName}
        />
      )}
    </View>
  );
};
