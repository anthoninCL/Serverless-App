import React from 'react';
import { View, StyleProp, ViewStyle, StyleSheet } from 'react-native';

type FlexJustifyContent =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | undefined;

type FlexAlignItems =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline'
  | undefined;

type FlexAlign = 'left' | 'right' | 'top' | 'bottom' | 'center' | undefined;

type RowProps = {
  style?: StyleProp<ViewStyle>;
  size?: number;
  justify?: FlexJustifyContent;
  align?: FlexAlign;
  children: React.ReactNode;
};

export const ViewRow = ({
  style = {},
  children,
  size,
  justify,
  align,
}: RowProps) => {
  const styleToApply = StyleSheet.flatten(style);
  if (justify) {
    styleToApply.justifyContent = justify;
  }
  if (align === 'top') {
    styleToApply.alignItems = 'flex-start';
  } else if (align === 'bottom') {
    styleToApply.alignItems = 'flex-end';
  } else if (align === 'center') {
    styleToApply.alignItems = 'center';
  }
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          width: '100%',
          // flex: size || (styleToApply && styleToApply.height ? undefined : 1),
          flex: size || undefined,
        },
        styleToApply,
      ]}
    >
      {children}
    </View>
  );
};

type Colprops = {
  style?: StyleProp<ViewStyle>;
  size?: number;
  justify?: FlexAlignItems;
  align?: FlexAlign;
  inline?: boolean;
  children: React.ReactNode;
};

export const ViewCol = ({
  style = {},
  children,
  size,
  inline = false,
  justify,
  align,
}: Colprops) => {
  const styleToApply = StyleSheet.flatten(style);
  if (justify) {
    styleToApply.alignItems = justify;
  }
  if (align === 'left') {
    styleToApply.justifyContent = 'flex-start';
  } else if (align === 'right') {
    styleToApply.justifyContent = 'flex-end';
  } else if (align === 'center') {
    styleToApply.justifyContent = 'center';
  }
  return (
    <View
      style={[
        {
          flexDirection: inline ? 'row' : 'column',
          flex: size || (styleToApply && styleToApply.width ? undefined : 1),
          flexBasis: size || styleToApply.width || undefined,
          maxWidth: styleToApply.width || 'auto',
        },
        styleToApply,
      ]}
    >
      {children}
    </View>
  );
};
