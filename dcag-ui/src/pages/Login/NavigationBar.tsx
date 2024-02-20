import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, KIND, SHAPE, SIZE } from 'baseui/button';
import { ArrowLeft, ArrowRight } from 'baseui/icon';
import { LabelMedium } from 'baseui/typography';

type Props = {
  onClickNext: () => void;
  onClickPrevious: () => void;
  isNextDisabled: boolean;
};

const NavigationBar = ({ onClickNext, onClickPrevious, isNextDisabled }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="navigation-bar">
      <Button shape={SHAPE.circle} kind={KIND.secondary} onClick={onClickPrevious}>
        <ArrowLeft size={36} />
      </Button>
      <Button
        shape={SHAPE.pill}
        kind={KIND.primary}
        onClick={onClickNext}
        disabled={isNextDisabled}
        size={SIZE.mini}
        overrides={{
          BaseButton: {
            style: ({ $theme }) => ({
              paddingLeft: $theme.sizing.scale600
            })
          }
        }}>
        <LabelMedium color={isNextDisabled ? 'black' : 'white'}>
          {t(`dcag.home.verifyotp.nextBtn.label`)}
        </LabelMedium>
        <ArrowRight size={36} />
      </Button>
    </div>
  );
};

export default NavigationBar;
