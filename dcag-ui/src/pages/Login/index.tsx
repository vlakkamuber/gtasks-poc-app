import React, { useState } from 'react';
import { IonPage } from '@ionic/react';
import LoginWithNumberPage from './LoginWithNumberPage';
import OtpVerificationPage from './OtpVerificationPage';

const Login = () => {
  const [sendOtpResponse, setSendOtpResponse] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  return (
    <IonPage className="p-16">
      {isOtpSent ? (
        <OtpVerificationPage sendOtpResponse={sendOtpResponse} />
      ) : (
        <LoginWithNumberPage setSendOtpResponse={setSendOtpResponse} setIsOtpSent={setIsOtpSent} />
      )}
    </IonPage>
  );
};

export default Login;
