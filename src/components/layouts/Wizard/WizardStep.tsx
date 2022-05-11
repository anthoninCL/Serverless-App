import { Card } from 'components/common/Card/Card';
import { CircularIcon } from 'components/common/CircularIcon/CircularIcon';
import { Divider } from 'components/common/Divider/Divider';
import { JText } from 'components/common/Text/Text';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { Types } from 'types/Types';
import { I18nKey } from '../../../../i18n';
import { ViewCol, ViewRow } from '../FlexLayout/FlexViews';

type Props = {
  iconName: string;
  iconType?: Types['iconTypes'];
  label?: string;
  labelKey?: I18nKey;
  children?: React.ReactNode;
};

const WizardStep = ({
  iconName,
  iconType = 'FontAwesome5',
  labelKey,
  label,
  children,
}: Props) => {
  const { theme } = useTheme();
  return (
    <Card style={{ marginBottom: theme.sizings.mediumLarge }}>
      <ViewRow
        style={{
          width: '100%',
          minHeight: theme.sizings.sz50,
          alignItems: 'center',
          flex: 0,
        }}
      >
        <ViewCol size={1}>
          <CircularIcon
            iconType={iconType}
            iconName={iconName}
            iconColorName="blueHigh"
            backgroundColorName="blueLight"
            iconSizeName="larger"
          />
        </ViewCol>
        <ViewCol size={5}>
          <JText
            isTitleText
            labelKey={labelKey}
            label={label}
            sizeName="larger"
            style={{ marginBottom: 0 }}
          />
        </ViewCol>
      </ViewRow>
      <Divider />

      {children}
    </Card>
  );
};

export default WizardStep;
