import { CircularButton } from 'components/common/CircularButton/CircularButton';
import { Divider } from 'components/common/Divider/Divider';
import { GradientButton } from 'components/common/GradientButton/GradientButton';
import { JText } from 'components/common/Text/Text';
import useTheme from 'hooks/useTheme';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Step } from 'types/Types';
import { ViewCol, ViewRow } from '../FlexLayout/FlexViews';

type Props = {
  steps?: Step[];
  currentStep?: number;
  changeStep?: (text: number) => void;
  onSubmit?: () => void;
  children?: React.ReactNode;
  submitError?: string;
};

const Wizard = ({
  steps = [],
  currentStep = 0,
  changeStep = () => {},
  onSubmit = () => {},
  children,
  submitError,
}: Props) => {
  const { theme } = useTheme();
  return (
    <View style={{ marginTop: theme.sizings.mediumLarge, flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {steps.map((step, index) => {
          const key = `step-${index}`;
          return (
            <View
              key={key}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              <View>
                <CircularButton
                  backgroundColorName={
                    currentStep === step.id ? 'dark' : 'light'
                  }
                  iconColorName={
                    currentStep === step.id
                      ? 'light'
                      : currentStep < step.id
                      ? 'greyMedium'
                      : 'dark'
                  }
                  onPress={() => changeStep(step.id)}
                  iconName={step.iconName}
                  iconType="FontAwesome5"
                  sizeName="sz50"
                  style={{ alignSelf: 'center' }}
                  key={`circularbutton_${step.id}`}
                />
                <JText
                  centered
                  label={step.label}
                  labelKey={step.labelKey}
                  style={{ marginTop: theme.sizings.medium }}
                  isBold={currentStep === step.id}
                />
              </View>
              {index < steps.length - 1 && (
                <View
                  style={{
                    width: theme.sizings.large,
                    paddingTop: theme.sizings.medium,
                    marginLeft: theme.sizings.mediumLarge,
                    marginRight: theme.sizings.mediumLarge,
                  }}
                >
                  <Divider />
                </View>
              )}
            </View>
          );
        })}
      </View>

      <ScrollView
        style={{
          flex: 1,
          marginTop: theme.sizings.mediumLarge,
        }}
      >
        {children}

        <View style={{ alignItems: 'center' }}>
          {submitError && (
            <JText colorName="statusDangerHigh" label={submitError} />
          )}
        </View>
        <View style={{ marginBottom: theme.sizings.small }}>
          {currentStep < steps.length ? (
            <GradientButton
              labelKey="common.continue"
              onPress={() => changeStep(currentStep + 1)}
            />
          ) : (
            <GradientButton labelKey="common.validate" onPress={onSubmit} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Wizard;
