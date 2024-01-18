import react, { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { COUNTRY_OPTIONS, LOADER_MESSAGE } from '../../constants/contant';
import { IonContent, IonSelect, IonSelectOption, useIonLoading } from '@ionic/react';
import { useUserAuth } from '../../context/UserAuthContext';
import { useHistory } from 'react-router';
import apiService from '../apiService';
import NavigationBar from './NavigationBar';
import { Toast, KIND } from 'baseui/toast';

type Props = {
  setSendOtpResponse: Dispatch<SetStateAction<string>>;
  setIsOtpSent: Dispatch<SetStateAction<boolean>>;
};

const LoginWithNumberPage = ({ setSendOtpResponse, setIsOtpSent }: Props) => {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_OPTIONS[0]);
  const [phone, setPhone] = useState('');
  const [isValidPhone, setIsValidPhone] = useState(true);
  const [present, dismiss] = useIonLoading();
  const { setUpRecaptha } = useUserAuth();
  const history = useHistory();
  const [error, setError] = useState('');
  const [isNextDisabled, setIsNextDisabled] = useState(false);

  const sendOtp = async (phone: string) => {
    try {
      present(LOADER_MESSAGE);
      const response = await setUpRecaptha('+91' + phone);
      dismiss();
      setSendOtpResponse(response);
      setIsOtpSent(true);
      localStorage.setItem('phone', phone);
    } catch (err) {
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
      const res = await apiService.verifyPhoneNumber('+91' + phone);
      dismiss();
      if (res.id) {
        setIsNextDisabled(true);
        sendOtp(phone);
      } else {
        setError('This phone number does not have access. Please contact administrator');
      }
    } catch (err) {
      setError(err.message);
      dismiss();
    }
  };

  return (
    <IonContent>
      <label>{t(`dcag.home.otp.mobilenumber.label`)}</label>
      <div className="phone-select-container">
        <IonSelect
          placeholder={selectedCountry.flag}
          className="country-select-box"
          value={selectedCountry.flag}
          style={{ height: '5vh', minHeight: 'unset', paddingeft: '9px' }}>
          {COUNTRY_OPTIONS.map(function (country) {
            return <IonSelectOption value={country.value}>{country.flag}</IonSelectOption>;
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

      <p style={{ padding: '10px' }}>
        <small>{t(`dcag.home.otp.mobilenumber.helptext`)}</small>
      </p>
      <div id="recaptcha-container"></div>
      <NavigationBar
        onClickPrevious={() => history.push('/home')}
        onClickNext={validatePhoneAndSendOtp}
        isNextDisabled={isNextDisabled || phone.length !== 10}
      />
    </IonContent>
  );
};

export default LoginWithNumberPage;
