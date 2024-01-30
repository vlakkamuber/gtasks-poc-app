import { IonContent, useIonLoading } from '@ionic/react';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { mapTeluguDigitsToNumeric } from '../../utils/mapTeluguDigitsToNumeric';
import { LOADER_MESSAGE } from '../../constants/contant';
import { Block } from 'baseui/block';
import { Button, KIND, SHAPE } from 'baseui/button';
import NavigationBar from './NavigationBar';
import { Toast, KIND as TOAST_KIND } from 'baseui/toast';

type Props = {
  sendOtpResponse: any;
};

const OtpVerificationPage = ({ sendOtpResponse }: Props) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const { t } = useTranslation();
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];
  const [present, dismiss] = useIonLoading();
  const history = useHistory();
  const [error, setError] = useState('');

  const handleInputChange = (e, index) => {
    if (e.target.value.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
    }
    const updatedOtp = [...otp];
    updatedOtp[index] = e.target.value;
    setOtp(updatedOtp);
  };

  const verifyOtp = () => {
    async function verify() {
      setError('');
      if (otp === '' || otp === null) return;
      try {
        const otpnumeric = mapTeluguDigitsToNumeric(otp.join(''));
        present(LOADER_MESSAGE);
        await sendOtpResponse.confirm(otpnumeric);
        dismiss();
        history.push('/dashboard/home');
      } catch (err) {
        setError(err.message);
      }
    }
    verify();
  };

  return (
    <IonContent>
      <p>{t(`dcag.home.verifyotp.label`)}:</p>
      <p>{localStorage.getItem('phone')}</p>
      <div className="otp-input">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={inputRefs[index]}
            type="text"
            value={value}
            onChange={(e) => handleInputChange(e, index)}
            maxLength={1}
          />
        ))}
      </div>
      <Block marginBottom="scale300" />
      <Button kind={KIND.secondary} shape={SHAPE.pill}>
        {t(`dcag.home.verifyotp.resend.label`)}
      </Button>
      {error && <Toast kind={TOAST_KIND.negative}>{error}</Toast>}
      <NavigationBar
        onClickPrevious={() => history.push('/login')}
        onClickNext={verifyOtp}
        isNextDisabled={otp.every((digit) => digit === '')}
      />
    </IonContent>
  );
};

export default OtpVerificationPage;
