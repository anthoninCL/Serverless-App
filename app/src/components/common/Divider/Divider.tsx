import useTheme from 'hooks/useTheme';
import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import fnStyles from './DividerStyle';

type Props = {
  color?: string;
  vertical?: boolean;
  transparent?: boolean;
  section?: boolean;
  style?: StyleProp<ViewStyle>;
};

export const Divider = ({
  color = null,
  vertical = false,
  transparent = false,
  section = false,
  style,
}: Props) => {
  const { theme } = useTheme();
  const styles = fnStyles(theme);

  color = color ?? theme.colors.greyLight;

  return (
    <View
      style={[
        vertical ? styles.dividerVertical : styles.dividerHorizontal,
        {
          borderBottomColor: !vertical && !transparent ? color : 'transparent',
          borderRightColor: vertical && !transparent ? color : 'transparent',
          flex: section && !vertical ? 1 : undefined,
          width: !section && !vertical ? '100%' : 'auto',
          maxWidth: section ? theme.sizings.sz50 : undefined,
          marginHorizontal: !vertical
            ? undefined
            : transparent
            ? theme.normalize(4)
            : theme.normalize(8),
        },
        style,
      ]}
    />
  );
};
