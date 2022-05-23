// TODO this is for the UI custom types
//
// If you just want an enum type like the iconTypes, put it in the Types type
// If you want to create a complex type, create another type in this file
//
// NB: if you want to create a data type like User or Travel, this must be written in the data folder

import { ColorType } from 'providers/ThemeProvider';
import React from 'react';
import { I18nKey } from '../../i18n';

type Types = {
  iconTypes:
    | 'MaterialCommunity'
    | 'AntDesign'
    | 'Entypo'
    | 'EvilIcons'
    | 'Feather'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Fontisto'
    | 'Material'
    | 'MaterialIcons'
    | 'IonIcons';
  fontWeights:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900';
  keyboardTypes:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad';
  iconPosition: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  rowParts: 'left' | 'middle' | 'right';
  textType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'legend';
  classicButton: 'classic' | 'danger';
};

type Step = {
  id: number;
  iconName: string;
  name?: string;
  label?: string;
  labelKey: I18nKey;
  fields?: React.ReactNode;
};

type NotificationModel = {
  iconName: string;
  iconColor: ColorType;
  backgroundColor: ColorType;
  messageHeadKey: I18nKey;
  messageHeadValues?: object;
  messageActionKey?: I18nKey;
  onPress?: () => void;
};

export type { Types, Step, NotificationModel };
