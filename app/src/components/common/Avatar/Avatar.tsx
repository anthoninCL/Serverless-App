/* eslint-disable react/no-unused-prop-types */
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import useTheme from "hooks/useTheme";
import {
  ColorType,
  FontSizeType,
  SizingsType,
  Theme,
} from "providers/ThemeProvider";
import fnStyles from "./AvatarStyle";
import { Icon } from "../Icon/Icon";
import { Types } from "../../../types/Types";
import AnonymeMan from "assets/man.png";
import * as ImagePicker from "expo-image-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

const iconPositionTheme = (
  iconSizeName: FontSizeType,
  sizeName: SizingsType,
  iconPosition: Types["iconPosition"],
  theme: Theme
) =>
  StyleSheet.create({
    icon: {
      width: theme.fontSizes[iconSizeName] + theme.normalize(8),
      height: theme.fontSizes[iconSizeName] + theme.normalize(8),
      borderRadius: (theme.fontSizes[iconSizeName] + theme.normalize(8)) / 2,
      left:
        iconPosition === "topRight" || iconPosition === "bottomRight"
          ? theme.sizings[sizeName] - theme.sizings[sizeName] * 0.3
          : 0,
      top:
        iconPosition === "bottomRight" || iconPosition === "bottomLeft"
          ? theme.sizings[sizeName] - theme.sizings[sizeName] * 0.3
          : 0,
    },
  });

type Props = {
  image?: ImageSourcePropType;
  sizeName?: SizingsType;
  style?: StyleProp<ViewStyle>;
  iconType?: Types["iconTypes"];
  iconName?: string | undefined;
  iconSizeName?: FontSizeType | undefined;
  iconColorName?: ColorType;
  iconPosition?: Types["iconPosition"];
  isImageUploader?: boolean;
  /* value?: number;
  color?: string; */
};

// TODO change the View avatar to an image
export const Avatar = (props: Props) => {
  const { theme } = useTheme();

  const {
    image = AnonymeMan,
    sizeName = "sz95",
    style,
    iconType,
    iconName,
    iconSizeName = "large",
    iconColorName = "dark",
    iconPosition = "bottomLeft",
    /* value,
     color, */
  } = props;
  const styles = fnStyles(theme);

  const iconTheme = iconPositionTheme(
    iconSizeName,
    sizeName,
    iconPosition,
    theme
  );

  const [uploadedImage, setUploadedImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setUploadedImage(result.uri);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        if (props.isImageUploader) {
          pickImage();
        }
      }}
    >
      <View style={[styles.box, style]}>
        <View
          style={[
            styles.avatar,
            {
              width: theme.sizings[sizeName],
              height: theme.sizings[sizeName],
              borderRadius: theme.sizings[sizeName] / 5,
            },
          ]}
        >
          {image !== undefined && (
            <ImageBackground
              source={image}
              resizeMode="contain"
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          )}
          {uploadedImage !== undefined && (
            <ImageBackground
              source={uploadedImage}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
          )}
        </View>
        {typeof iconName === "string" && (
          <View style={[styles.icon, iconTheme.icon]}>
            <Icon
              type={iconType}
              name={iconName}
              sizeName={iconSizeName}
              colorName={iconColorName}
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};
