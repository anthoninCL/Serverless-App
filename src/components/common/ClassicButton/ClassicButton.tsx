import useTheme from 'hooks/useTheme';
import React from 'react';
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native';
import { Types } from 'types/Types';
import { I18nKey } from '../../../../i18n';
import { Icon } from '../Icon/Icon';
import { JText } from '../Text/Text';
import fnStyles from './ClassicButtonStyle';

type Props = {
  label?: string;
  labelKey?: I18nKey;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  type?: Types['classicButton'];
  enabled?: boolean;
};

export const ClassicButton = (props: Props) => {
  const { theme } = useTheme();
  const styles = fnStyles(theme);

  const {
    label,
    labelKey,
    onPress = () => {},
    style,
    type,
    enabled = true,
  } = props;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: type === 'danger' ? theme.colors.statusDangerHigh : theme.colors.blue,
        },
        style,
        { opacity: enabled ? 1 : 0.4 }
      ]}
      onPress={onPress}
    >
      {/*{type !== undefined && (
        <Icon
          style={{
            marginRight: label || labelKey ? theme.sizings.smallMedium : 0,
          }}
          type="FontAwesome"
          name={
            isGradient
              ? 'angle-right'
              : type === 'decline'
              ? 'times'
              : 'comment'
          }
          colorName={
            isGradient
              ? 'light'
              : type === 'decline'
              ? 'statusDangerHigh'
              : textColorName
          }
          sizeName={label || labelKey ? 'medium' : 'large'}
        />
      )}*/}

      {(label || labelKey) && (
        <JText
          label={label}
          labelKey={labelKey}
          isBold
          isButtonText
          colorName={'light'}
          sizeName="large"
          style={[styles.label, { opacity: enabled ? 1 : 0.75 }]}
        />
      )}
    </TouchableOpacity>
  );
};
