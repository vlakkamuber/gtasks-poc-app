import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ANALYTICS_PAGE, COUNTRY_OPTIONS, LOADER_MESSAGE } from '../../constants/constant';
import { IonContent, IonSelect, IonSelectOption, useIonLoading } from '@ionic/react';
import { useUserAuth } from '../../context/UserAuthContext';
import { useHistory } from 'react-router';
import apiService from '../apiService';
import NavigationBar from './NavigationBar';
import { Toast, KIND } from 'baseui/toast';
import { HeadingSmall, ParagraphXSmall } from 'baseui/typography';
import useAnalytics from '../../hooks/useAnanlytics';

type Props = {
  setSendOtpResponse: Dispatch<SetStateAction<string>>;
  setIsOtpSent: Dispatch<SetStateAction<boolean>>;
  setIsUserExist: Dispatch<SetStateAction<boolean>>;
};

const LoginWithNumberPage = ({ setSendOtpResponse, setIsOtpSent, setIsUserExist }: Props) => {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_OPTIONS[0]);
  const [phone, setPhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [present, dismiss] = useIonLoading();
  const { setUpRecaptha } = useUserAuth();
  const history = useHistory();
  const [error, setError] = useState('');
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.login });

  const sendOtp = async (phone: string) => {
    try {
      logEvent({ actions: 'otp_requested', properties: phone });
      present(LOADER_MESSAGE);
      const response = await setUpRecaptha('+91' + phone);
      logEvent({ actions: 'otp_request_success', properties: phone });
      dismiss();
      setSendOtpResponse(response);
      setIsOtpSent(true);
      localStorage.setItem('phone', phone);
    } catch (err) {
      logEvent({
        actions: 'otp_request_failed',
        properties: `phone:${phone},error:${err.message}`
      });
      setError(err.message);
      dismiss();
    }
  };

  const validatePhoneAndSendOtp = async () => {
    setIsValidPhone(true);
    let phoneRegex = /^[6789]\d{9}$/;
    setError('');
    if (!phoneRegex.test(phone)) {
      setIsValidPhone(false);
      return setError('Please enter a valid phone number!');
    }
    try {
      present(LOADER_MESSAGE);
      logEvent({ actions: 'phone_number_entered', properties: phone });
      const res = await apiService.verifyPhoneNumber('+91' + phone);
      dismiss();
      if (res.id) {
        logEvent({ actions: 'phone_number_exist', properties: `phone:${phone},status: success` });
        setIsNextDisabled(true);
        setIsUserExist(true);
        sendOtp(phone);
      } else {
        logEvent({ actions: 'phone_number_exist', properties: `phone:${phone},status: failed` });
        setIsNextDisabled(true);
        // setIsUserExist(false);
        // sendOtp(phone);
        setError('This phone number does not have access. Please contact administrator');
      }
    } catch (err) {
      setError(err.message);
      dismiss();
    }
  };

  const goBack = () => {
    logEvent({ actions: 'click_go_back', properties: 'number_page' });
    history.push('/home');
  };

  return (
    <IonContent className="p-16">
      <HeadingSmall>{t(`dcag.home.otp.mobilenumber.label`)}</HeadingSmall>
      <div className="phone-select-container">
        <IonSelect
          placeholder={selectedCountry.flag}
          disabled={true}
          className="country-select-box"
          value={selectedCountry.flag}
          style={{ height: '5vh', minHeight: 'unset', paddingeft: '9px' }}>
          {COUNTRY_OPTIONS.map(function (country) {
            return (
              <IonSelectOption key={country.value} value={country.value}>
                {country.flag}
              </IonSelectOption>
            );
          })}
        </IonSelect>
        <input
          type="text"
          value={phone}
          className="phone-input"
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      {isValidPhone ? null : <p style={{ color: 'red' }}>Invalid phone number.</p>}
      {error && <Toast kind={KIND.negative}>{error}</Toast>}
      <ParagraphXSmall color="contentTertiary">
        {t(`dcag.home.otp.mobilenumber.helptext`)}
      </ParagraphXSmall>
      <div id="recaptcha-container"></div>
      <NavigationBar
        onClickPrevious={goBack}
        onClickNext={validatePhoneAndSendOtp}
        isNextDisabled={isNextDisabled || phone.length !== 10}
      />
    </IonContent>
  );
};

export default LoginWithNumberPage;
