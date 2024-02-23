import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ANALYTICS_PAGE, COUNTRY_OPTIONS, LOADER_MESSAGE } from '../../constants/constant';
import { IonContent, IonSelect, IonSelectOption, useIonLoading } from '@ionic/react';
import { useUserAuth } from '../../context/UserAuthContext';
import { useHistory } from 'react-router';
import apiService from '../../BE-services/apiService';
import NavigationBar from './NavigationBar';
import { Toast, KIND } from 'baseui/toast';
import { HeadingSmall, ParagraphXSmall } from 'baseui/typography';
import useAnalytics from '../../hooks/useAnanlytics';
import { useCategory } from '../../context/TaskCategoryContext';
import AlertInfoCard from '../../components/AlertInfoCard';

type Props = {
  setSendOtpResponse: Dispatch<SetStateAction<string>>;
  setIsOtpSent: Dispatch<SetStateAction<boolean>>;
  setIsUserExist: Dispatch<SetStateAction<boolean>>;
};

const LoginWithNumberPage = ({ setSendOtpResponse, setIsOtpSent, setIsUserExist }: Props) => {
  const { t } = useTranslation();
  const { location, setLocation } = useCategory();
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_OPTIONS[0]);
  const [phone, setPhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [present, dismiss] = useIonLoading();
  const { setUpRecaptha } = useUserAuth();
  const history = useHistory();
  const [error, setError] = useState('');
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isAccountDisabled, setIsAccountDisabled] = useState(false);
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.login });

  const sendOtp = async (phone: string) => {
    try {
      logEvent({ actions: 'otp_requested', properties: phone });
      present(LOADER_MESSAGE);
      const response = await setUpRecaptha(selectedCountry.phoneCode + phone);
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

  const handleCountryChange = (e) => {
    const selectedValue = e.target.value;
    const selectedCountry = COUNTRY_OPTIONS.find(country => country.value === selectedValue);
    setSelectedCountry(selectedCountry);
    localStorage.setItem("countryCode",selectedCountry?.phoneCode)
  };

  const validatePhoneAndSendOtp = async () => {
    setIsValidPhone(true);
    const phoneRegex = /^(\+1|91)?[6789]\d{9}$/;
    setError('');
    if (!phoneRegex.test(phone)) {
      setIsValidPhone(false);
      return setError('Please enter a valid phone number!');
    }
    try {
      present(LOADER_MESSAGE);
      logEvent({ actions: 'phone_number_entered', properties: phone });
      const res = await apiService.verifyPhoneNumber(selectedCountry.phoneCode + phone);
      dismiss();
      if (res.id) {
        if (res.status === 'DISABLED') {
          setIsAccountDisabled(true);
        } else {
          logEvent({ actions: 'phone_number_exist', properties: `phone:${phone},status: success` });
          setIsNextDisabled(true);
          setIsUserExist(true);
          if (res.cityName) {
            localStorage.setItem('location', res.cityName);
            setLocation(res.cityName);
          } else {
            localStorage.setItem('location', 'OTHER');
            setLocation('OTHER');
          }
          sendOtp(phone);
        }
      } else {
        logEvent({ actions: 'phone_number_exist', properties: `phone:${phone},status: failed` });
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
      {isAccountDisabled ? (
        <>
          <AlertInfoCard message="Thanks for being a part of our test phase for the app. We've finished the test now. Hope you enjoyed using it! We'll let you know when we are ready to start again." />
        </>
      ) : (
        <>
          <HeadingSmall>{t(`dcag.home.otp.mobilenumber.label`)}</HeadingSmall>
          <div className="phone-select-container">
            <IonSelect
              placeholder={selectedCountry.flag}
              disabled={false}
              className="country-select-box"
              value={selectedCountry.flag}
              onIonChange={handleCountryChange}
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
        </>
      )}
    </IonContent>
  );
};

export default LoginWithNumberPage;
