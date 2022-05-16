import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIconsIcon from 'react-native-vector-icons/EvilIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Types } from 'types/Types';
import { StyleProp, ViewStyle } from 'react-native';
import { ColorType, FontSizeType } from 'providers/ThemeProvider';
import useTheme from 'hooks/useTheme';

type Props = {
  type?: Types['iconTypes'];
  name: string;
  customSize?: number;
  sizeName?: FontSizeType;
  colorName?: ColorType;
  style?: StyleProp<ViewStyle>;
};

export const Icon = (props: Props) => {
  const { theme } = useTheme();
  const {
    type,
    name,
    customSize,
    sizeName = 'large',
    colorName = 'dark',
    style,
  } = props;
  switch (type) {
    case 'MaterialCommunity':
      return (
        <MaterialCommunityIcon
          name={name}
          size={customSize || theme.fontSizes[sizeName]}
          color={theme.colors[colorName]}
          style={style}
        />
      );
    case 'AntDesign':
      return (
        <AntDesignIcon
          name={name}
          size={customSize || theme.fontSizes[sizeName]}
          color={theme.colors[colorName]}
          style={style}
        />
      );
    case 'Entypo':
      return (
        <EntypoIcon
          name={name}
          size={customSize || theme.fontSizes[sizeName]}
          color={theme.colors[colorName]}
          style={style}
        />
      );
    case 'EvilIcons':
      return (
        <EvilIconsIcon
          name={name}
          size={customSize || theme.fontSizes[sizeName]}
          color={theme.colors[colorName]}
          style={style}
        />
      );
    case 'Feather':
      return (
        <FeatherIcon
          name={name}
          size={customSize || theme.fontSizes[sizeName]}
          color={theme.colors[colorName]}
          style={style}
        />
      );
    case 'FontAwesome':
      return (
        <FontAwesomeIcon
          name={name}
          size={customSize || theme.fontSizes[sizeName]}
          color={theme.colors[colorName]}
          style={style}
        />
      );
    case 'FontAwesome5':
      return (
        <FontAwesome5Icon
          name={name}
          size={customSize || theme.fontSizes[sizeName]}
          color={theme.colors[colorName]}
          style={style}
        />
      );
    /* case 'FontAwesome5Pro':
      return (
        <FontAwesome5Pro
          name={name}
          size={customSize || theme.fontSizes[sizeName]}
          color={theme.colors[colorName]}
          style={style}
        />
      ); */
    case 'Fontisto':
      return (
        <FontistoIcon
          name={name}
          size={customSize || theme.fontSizes[sizeName]}
          color={theme.colors[colorName]}
          style={style}
        />
      );
    case 'Material':
    case 'MaterialIcons':
      return (
        <MaterialIcon
          name={name}
          size={customSize || theme.fontSizes[sizeName]}
          color={theme.colors[colorName]}
          style={style}
        />
      );
    default:
      return (
        <IoniconsIcon
          name={name}
          size={customSize || theme.fontSizes[sizeName]}
          color={theme.colors[colorName]}
          style={style}
        />
      );
  }
};
