import { ViewCol } from 'components/layouts/FlexLayout/FlexViews';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Icon } from 'components/common/Icon/Icon';
import useTheme from 'hooks/useTheme';
import { ColorType, FontSizeType } from 'providers/ThemeProvider';
import fnStyles from './ArrowRightStyle';

type Props = {
  onPress?: () => void;
  inCard?: boolean;
  colorName?: ColorType;
  sizeName?: FontSizeType;
};

export const ArrowRight = ({
  onPress = undefined,
  inCard = false,
  colorName = 'greyMedium',
  sizeName = 'largest',
}: Props) => {
  const { theme } = useTheme();
  const styles = fnStyles(theme);

  return (
    <ViewCol
      style={[
        styles.arrow,
        { paddingRight: inCard ? theme.sizings.mediumLarge : 0 },
      ]}
    >
      {onPress ? (
        <TouchableOpacity onPress={onPress}>
          <Icon
            name="angle-right"
            type="FontAwesome5"
            colorName={colorName}
            sizeName={sizeName}
          />
        </TouchableOpacity>
      ) : (
        <Icon
          name="angle-right"
          type="FontAwesome5"
          colorName={colorName}
          sizeName={sizeName}
        />
      )}
    </ViewCol>
  );
};
