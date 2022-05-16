import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  TouchableOpacity,
  Text,
  TextStyle,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { I18nKey } from '../../../../i18n';

type Props = {
  label?: string;
  labelKey?: I18nKey;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
};

export const Button = (props: Props) => {
  const { t } = useTranslation();

  const label = props.labelKey ? t(props.labelKey) : props.label;

  return (
    <TouchableOpacity style={props.style} onPress={props.onPress}>
      {props.children ? (
        props.children
      ) : (
        <Text style={props.textStyle}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};
