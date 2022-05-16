import React from 'react';
import { View } from 'react-native';
import { ImagePickerProps, ImageUploader } from '../ImagePicker/ImagePicker';
import { TextInput, TextInputProps } from './TextInput/TextInput';
import TimePicker from './TimePicker/TimePicker';
import {
  CardCheckField,
  CardCheckFieldProps,
} from './CardCheckField/CardCheckField';
import Calendar from './Calendar/Calendar';
import DatePicker from './DatePicker/DatePicker';

export type InputProps = ImagePickerProps &
  TextInputProps &
  CardCheckFieldProps & {
    type?: string;
    children?: React.ReactElement;
    onChange?: (value: any) => void;
    value?: any;
  };

const Input = ({
  type = 'text',
  children = <View />,
  onChange = () => {},
  ...otherProps
}: InputProps) => {
  Object.assign(otherProps, { onChange });

  switch (type) {
    /*
    // TODO : Mettre le type d'input de Date
    case 'date':
      return <View />;

    // TODO : V2 -> document uploader
    case 'file':
      return <View />;
      */

    case 'text':
      return (
        <TextInput
          {...(otherProps as React.ComponentProps<typeof TextInput>)}
        />
      );

    case 'image':
      return (
        <ImageUploader
          {...(otherProps as React.ComponentProps<typeof ImageUploader>)}
        />
      );

    case 'calendar':
      return <Calendar {...otherProps} />;

    case 'card-check':
      return (
        <CardCheckField
          {...(otherProps as React.ComponentProps<typeof CardCheckField>)}
        />
      );

    case 'date':
      return <DatePicker {...otherProps} />;

    case 'time':
      return <TimePicker {...otherProps} />;

    case 'custom':
      if (children) {
        return React.cloneElement(children, {
          ...otherProps,
        });
      }
      return null;

    default:
      return (
        <TextInput
          {...(otherProps as React.ComponentProps<typeof TextInput>)}
        />
      );
  }
};

export default Input;
