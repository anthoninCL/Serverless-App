import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Theme } from 'themes/variables';
import { Overlay } from 'react-native-elements';
import { ViewCol, ViewRow } from 'components/layouts/FlexLayout/FlexViews';
import { Types } from 'types/Types';
import useTheme from 'hooks/useTheme';
import { ColorType, FontSizeType } from 'providers/ThemeProvider';
import { Divider } from '../Divider/Divider';
import { I18nKey } from '../../../../i18n';
import { JText } from '../Text/Text';
import { Icon } from '../Icon/Icon';
import { Button } from '../Button/Button';
import fnStyles from './ModalStyle';
import { GradientButton } from '../GradientButton/GradientButton';
import { CircularButton } from '../CircularButton/CircularButton';

type Props = {
  style?: StyleProp<ViewStyle>;
  title?: string;
  titleKey?: I18nKey;
  titleSize?: FontSizeType;
  titleColor?: ColorType;
  iconName?: string;
  iconType?: Types['iconTypes'];
  iconSize?: FontSizeType;
  iconColor?: ColorType;
  renderContent?: React.ReactNode;
  renderFooter?: React.ReactNode;
  isVisible: boolean;
  onBackDropPress: () => void;
};

export const Modal = ({
  style,
  title = '',
  titleKey,
  titleSize = 'larger',
  titleColor = 'dark',
  iconName = 'warning',
  iconType = 'AntDesign',
  iconSize = 'larger',
  iconColor = 'dark',
  renderContent,
  renderFooter,
  isVisible = false,
  onBackDropPress,
}: Props) => {
  const { theme } = useTheme();

  const styles = fnStyles(theme);

  return (
    <Overlay
      isVisible={isVisible}
      onBackdropPress={onBackDropPress}
      overlayStyle={[styles.modal, style]}
    >
      <View>
        <ViewRow
          style={{
            alignItems: 'center',
            marginBottom: theme.sizings.medium,
          }}
        >
          <ViewCol inline size={1} style={{ alignItems: 'center' }}>
            <Icon
              name={iconName}
              type={iconType}
              colorName={iconColor}
              sizeName={iconSize}
            />
            <Divider vertical transparent />
            <JText
              label={title}
              labelKey={titleKey}
              colorName={titleColor}
              sizeName={titleSize}
              isBold
            />
          </ViewCol>
          <ViewCol style={{ width: theme.sizings.high }}>
            <CircularButton
              onPress={onBackDropPress}
              iconName="close"
              iconType="AntDesign"
              iconColorName="dark"
              iconSizeName="medium"
              sizeName="high"
              backgroundColorName="dark"
            />
          </ViewCol>
        </ViewRow>

        {renderContent && <Divider />}
        {/* Modal content */}
        <View
          style={{
            paddingTop: theme.sizings.medium,
            paddingBottom: theme.sizings.medium,
          }}
        >
          {renderContent}
        </View>

        {renderFooter && <Divider />}
        {/* Modal footer */}
        <View style={{ marginTop: theme.sizings.medium }}>{renderFooter}</View>
      </View>
    </Overlay>
  );
};

export default Modal;
