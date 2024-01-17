import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, KIND, SHAPE } from 'baseui/button';
import { ArrowLeft, ArrowRight } from 'baseui/icon';

type Props = {
  onClickNext: () => void;
  onClickPrevious: () => void;
  isNextDisabled: boolean;
};

const NavigationBar = ({ onClickNext, onClickPrevious, isNextDisabled }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="navigation-bar">
      <Button shape={SHAPE.pill} kind={KIND.secondary} onClick={onClickPrevious}>
        <ArrowLeft />
      </Button>
      <Button
        shape={SHAPE.pill}
        kind={KIND.secondary}
        onClick={onClickNext}
        disabled={isNextDisabled}>
        {t(`dcag.home.verifyotp.nextBtn.label`)} <ArrowRight />
      </Button>
    </div>
  );
};

export default NavigationBar;
