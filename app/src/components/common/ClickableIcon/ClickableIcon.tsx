import useTheme from 'hooks/useTheme';
import { ColorType, FontSizeType } from 'providers/ThemeProvider';
import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Types } from 'types/Types';
import { Icon } from '../Icon/Icon';
import fnStyles from './ClickableIconStyle';

type Props = {
  type: Types['iconTypes'];
  name: string;
  onPress: () => void;
  sizeName?: FontSizeType;
  colorName?: ColorType;
  style?: StyleProp<ViewStyle>;
};

export const ClickableIcon = (props: Props) => {
  const { theme } = useTheme();
  const styles = fnStyles(theme);

  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={props.onPress}
    >
      <Icon
        type={props.type}
        name={props.name}
        sizeName={props.sizeName}
        colorName={props.colorName}
      />
    </TouchableOpacity>
  );
};
