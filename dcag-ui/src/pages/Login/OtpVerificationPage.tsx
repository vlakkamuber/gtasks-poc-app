import { IonContent, useIonLoading } from '@ionic/react';
import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { mapTeluguDigitsToNumeric } from '../../utils';
import { ANALYTICS_PAGE, LOADER_MESSAGE } from '../../constants/constant';
import { Block } from 'baseui/block';
import { Button, KIND, SHAPE } from 'baseui/button';
import NavigationBar from './NavigationBar';
import { Toast, KIND as TOAST_KIND } from 'baseui/toast';
import apiService from '../../BE-services/apiService';
import useAnalytics from '../../hooks/useAnanlytics';
import { useUserAuth } from '../../context/UserAuthContext';

type Props = {
  sendOtpResponse: any;
  isUserExist: any;
  setSendOtpResponse: any;
  setIsOtpSent: any;
};

const OtpVerificationPage = ({
  sendOtpResponse,
  isUserExist,
  setSendOtpResponse,
  setIsOtpSent
}: Props) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const { t } = useTranslation();
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.login });
  const { setUpRecaptha } = useUserAuth();
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

  const handleKeyDown: (event: any, index: number) => void = (event, index) => {
    const KeyID = event.keyCode;
    switch (KeyID) {
      case 8:
      case 46:
        if (index > 0) {
          inputRefs[index - 1].current.focus();
        }
        // eslint-disable-next-line no-case-declarations
        const updatedOtp = [...otp];
        updatedOtp[index] = '';
        setOtp(updatedOtp);
        break;
      default:
        break;
    }
  };

  const createUserInDB = async (uid, phoneNumber) => {
    await apiService.createUserInDB(uid, phoneNumber);
    dismiss();
    history.push('/dashboard/home');
  };

  const verifyOtp = () => {
    async function verify() {
      setError('');
      if (otp === '' || otp === null) return;
      try {
        const otpnumeric = mapTeluguDigitsToNumeric(otp.join(''));
        present(LOADER_MESSAGE);
        logEvent({ actions: 'otp_entered' });
        let result = await sendOtpResponse.confirm(otpnumeric);
        logEvent({ actions: 'login_success' });
        dismiss();
        history.push('/dashboard/home');
        // if (!isUserExist) {
        //   createUserInDB(result.user.uid, result.user.phoneNumber);
        // } else {
        //   dismiss();
        //   history.push('/dashboard/home');
        // }
      } catch (err) {
        logEvent({ actions: 'login_failed', properties: err.message });
        dismiss();
        if (err.code === 'auth/code-expired' || err.code === 'auth/invalid-verification-code') {
          setError('Invalid verification code');
        } else {
          setError(err.message);
        }
      }
    }
    verify();
  };

  const goBack = () => {
    logEvent({ actions: 'click_go_back', properties: 'otp_page' });
    history.push('/login');
  };

  const resendOtp = async () => {
    let phone = localStorage.getItem('phone');
    try {
      logEvent({ actions: 'otp_requested', properties: phone });
      const response = await setUpRecaptha('+91' + phone);
      logEvent({ actions: 'otp_request_success', properties: phone });
      setSendOtpResponse(response);
      setIsOtpSent(true);
    } catch (err) {
      logEvent({
        actions: 'otp_request_failed',
        properties: `phone:${phone},error:${err.message}`
      });
      setError(err.message);
    }
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
            inputMode="numeric"
            value={value}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onChange={(e) => handleInputChange(e, index)}
            maxLength={1}
          />
        ))}
      </div>
      <Block marginBottom="scale300" />
      <div id="recaptcha-container"></div>
      <Button kind={KIND.secondary} shape={SHAPE.pill} onClick={resendOtp}>
        {t(`dcag.home.verifyotp.resend.label`)}
      </Button>
      {error && <Toast kind={TOAST_KIND.negative}>{error}</Toast>}
      <NavigationBar
        onClickPrevious={goBack}
        onClickNext={verifyOtp}
        isNextDisabled={otp.every((digit) => digit === '')}
      />
    </IonContent>
  );
};

export default OtpVerificationPage;
