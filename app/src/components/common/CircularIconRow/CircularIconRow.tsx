import React from 'react';
import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import { Types } from 'types/Types';

import { ViewCol } from 'components/layouts/FlexLayout/FlexViews';
import { ColorType, FontSizeType } from 'providers/ThemeProvider';
import useTheme from 'hooks/useTheme';
import { ViewRow } from '../../layouts/FlexLayout/FlexViews';

import fnStyles from './CircularIconRowStyle';
import { CircularIconStatus } from '../CircularIconStatus/CircularIconStatus';

type Props = {
  iconType: Types['iconTypes'];
  iconName: string;
  iconBackgroundColorName?: ColorType;
  iconSizeName?: FontSizeType;
  iconColorName?: ColorType;
  statusIconType?: Types['iconTypes'];
  statusIconName?: string;
  statusIconColorName?: ColorType;
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  image?: ImageSourcePropType;
};

export const CircularIconRow = (props: Props) => {
  const { theme } = useTheme();
  const styles = fnStyles(theme);
  const {
    iconType,
    iconName,
    iconBackgroundColorName,
    iconSizeName = 'fs50',
    iconColorName,
    statusIconType,
    statusIconName,
    statusIconColorName,
    children,
    style,
    image,
  } = props;

  return (
    <ViewRow style={[styles.container, style]}>
      <CircularIconStatus
        backgroundColorName={iconBackgroundColorName}
        iconType={iconType}
        iconName={iconName}
        iconSizeName={iconSizeName}
        iconColorName={iconColorName}
        padding={0}
        statusIconType={statusIconType}
        statusIconName={statusIconName}
        statusIconColorName={statusIconColorName}
        style={[styles.icon]}
        image={image}
      />
      <ViewCol style={[styles.label]}>{children}</ViewCol>
    </ViewRow>
  );
};
