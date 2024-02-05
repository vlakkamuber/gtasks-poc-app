import React, { useEffect, useState } from 'react';
import { IonPage } from '@ionic/react';
import LoginWithNumberPage from './LoginWithNumberPage';
import OtpVerificationPage from './OtpVerificationPage';
import useAnalytics from '../../hooks/useAnanlytics';
import { ANALYTICS_PAGE } from '../../constants/constant';

const Login = () => {
  const [sendOtpResponse, setSendOtpResponse] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isUserExist, setIsUserExist] = useState(false);
  const logEvent = useAnalytics({ page: ANALYTICS_PAGE.login });
  useEffect(() => {
    logEvent({ actions: '' });
  }, []);

  return (
    <IonPage className="p-16">
      {isOtpSent ? (
        <OtpVerificationPage sendOtpResponse={sendOtpResponse} isUserExist={isUserExist} />
      ) : (
        <LoginWithNumberPage
          setSendOtpResponse={setSendOtpResponse}
          setIsOtpSent={setIsOtpSent}
          setIsUserExist={setIsUserExist}
        />
      )}
    </IonPage>
  );
};

export default Login;
