import React from 'react';
import { View } from 'react-native';
import { FormInput } from '../FormInput/FormInput';
import { GradientButton } from '../GradientButton/GradientButton';

type Props = {
  type: string;
  children?: React.ReactNode;
  onChange: (value: any) => void;
  value?: any;
};

const Input = ({
  type = 'textarea',
  children,
  onChange,
  ...otherProps
}: Props) => {
  // const className: string = otherProps.className ? otherProps.className : '';

  /* TODO : use for default -> see HRPlanner
  const handleInputChange = useCallback(
    e => {
      onChange(e.target.value);
    },
    [onChange],
  );
   */

  /* TODO : Use for checkbox
  const handleCheckboxChange = useCallback(
    e => {
      onChange(e.target.checked);
    },
    [onChange],
  );
   */

  Object.assign(otherProps, { onChange });

  switch (type) {
    case 'submit':
      return (
        <GradientButton
          {...(otherProps as React.ComponentProps<typeof GradientButton>)}
        />
      );

    // TODO : Mettre le type d'input de Date
    case 'date':
      return <View />;

    // TODO : Mettre le datetime picker
    case 'datetime':
      return <View />;

    /* TODO : TimePicker
    case 'time':
      return <TimePicker {...otherProps} />;
    */

    // TODO : V2 -> document uploader
    case 'file':
      return <View />;

    // TODO : Checkbox Input
    /* case 'checkbox':
      return (
        <div className="checkbox-input">
          <input
            id={otherProps.name}
            type="checkbox"
            data-cy={otherProps.name}
            {...otherProps}
            onChange={handleCheckboxChange}
          />
          <label htmlFor={otherProps.name}>{otherProps.label}</label>
        </div>
      );
     */

    case 'custom':
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return React.cloneElement(children, {
        ...otherProps,
      });

    case 'textarea':
      return (
        <FormInput
          {...(otherProps as React.ComponentProps<typeof FormInput>)}
        />
      );

    default:
      return (
        <FormInput
          {...(otherProps as React.ComponentProps<typeof FormInput>)}
        />
      );
  }
};

export default Input;
