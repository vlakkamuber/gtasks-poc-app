import React, { useState,useRef } from "react";
import {
  IonContent,
  IonPage,
  IonIcon,
  IonSelect,
  IonSelectOption,
  useIonLoading
} from "@ionic/react";
import { arrowBack, arrowForward } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { Button, KIND, SHAPE } from "baseui/button";
import {Block} from 'baseui/block';
import { ArrowLeft, ArrowRight } from "baseui/icon";
import { useUserAuth } from "../context/UserAuthContext";
import { useTranslation } from 'react-i18next';
import {mapTeluguDigitsToNumeric} from "../utils/mapTeluguDigitsToNumeric.js";
import apiService from './apiService'

const Login = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { t } = useTranslation();
  const [isValidPhone,setIsValidPhone] = useState(true)
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [present, dismiss] = useIonLoading();
  const { setUpRecaptha } = useUserAuth();
  const history = useHistory();
  const countryOptions = [
    { value: "us", label: "United States", flag: "🇺🇸" },
    { value: "ca", label: "Canada", flag: "🇨🇦" },
    { value: "in", label: "India", flag: "🇮🇳", phoneCode: "+91" },
    // Add more countries as needed
  ];
  const [selectedCountry, setSelectedCountry] = useState({
    value: "in",
    label: "India",
    flag: "🇮🇳",
    phoneCode: "+91",
  });

  const handleInputChange = (e, index) => {
    if (e.target.value.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = e.target.value;
    setOtp(updatedOtp);
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      const otpnumeric = mapTeluguDigitsToNumeric(otp.join(""));
      await result.confirm(otpnumeric);
      history.push("/login-success");
    } catch (err) {
      setError(err.message);
    }
  };

  const sendOtp = async (phone: string) => {
    try {
      const response = await setUpRecaptha("+91"+phone);
      setResult(response);
      setFlag(true);
      localStorage.setItem("phone", phone);
      // history.push("/otp");
    } catch (err) {
      setError(err.message);
    }
  };

  const validatePhoneAndSendOtp = async (e) => {
    setIsValidPhone(true)
    let phoneRegex = /^[6789]\d{9}$/;
    e.preventDefault();
    setError("");
    if (!phoneRegex.test(phone)){
      setIsValidPhone(false)
      return setError("Please enter a valid phone number!");
    }
    try{
      present({
        message: 'Loading...',
      });
    const res = await apiService.verifyPhoneNumber(`+91${phone}`);
    if(res.id){
      await sendOtp(phone)
    }else {
      setError('User not found!');
    }
  }catch(err){
    setError(err.message);
  }finally{
    dismiss();
  }
  }

  return (
    <IonPage style={{ padding: "15px" }}>
      {flag===false && <IonContent>
        <label style={{ fontWeight: "600", fontSize: "1.4rem" }}>
        {t(`dcag.home.otp.mobilenumber.label`)}
        </label>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          <IonSelect
            placeholder={selectedCountry.flag}
            className="country-select-box"
            value={selectedCountry.flag}
            style={{ height: "5vh", minHeight: "unset", paddingeft: "9px" }}
          >
            {countryOptions.map(function (country) {
              return (
                <IonSelectOption value={country.value}>
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
        {error &&  <p style={{ color: 'red' }}>{error}</p> }
        <p style={{ padding: "10px" }}>
          <small>
          {t(`dcag.home.otp.mobilenumber.helptext`)}
          </small>
        </p>
        <div id="recaptcha-container"></div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            position: "absolute",
            bottom: 0,
          }}
        >
          {/* <IonButton
            color="secondary"
            routerLink="/home"
            expand="block"
            className="prev-next-button"
          >
            <IonIcon slot="start" icon={arrowBack} />
          </IonButton>

          <IonButton
            color="secondary"
            onClick={() => sendOtp()}
            expand="block"
            className="prev-next-button"
          >
            Next <IonIcon slot="end" icon={arrowForward} />
          </IonButton> */}
          <Button
            shape={SHAPE.pill}
            kind={KIND.secondary}
            onClick={() => history.push("/home")}
          >
            <ArrowLeft />
          </Button>
          <Button
            shape={SHAPE.pill}
            kind={KIND.secondary}
            onClick={(e) => validatePhoneAndSendOtp(e)}
            disabled={phone.length === 0}
          >
            {t(`dcag.home.verifyotp.nextBtn.label`)} <ArrowRight />
          </Button>
        </div>
      </IonContent>}
      {flag===true &&<IonContent>
        <p>{t(`dcag.home.verifyotp.label`)}:</p>
        <p>{localStorage.getItem("phone")}</p>
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
        {/* <IonButton color="secondary" style={{marginTop:'20px'}} className="capitalize">
            Resend
          </IonButton> */}
          <Block marginBottom="scale300" />
           <Button kind={KIND.secondary} shape={SHAPE.pill}>{t(`dcag.home.verifyotp.resend.label`)}</Button>
        {/* Add a button to submit the OTP and handle the verification logic */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            position: "absolute",
            bottom: 0,
          }}
        >
          {/* <IonButton color="secondary" routerLink="/login" >
            <IonIcon slot="start" icon={arrowBack} />
          </IonButton>

          <IonButton color="primary" routerLink="/login-success">
            Next <IonIcon slot="end" icon={arrowForward} />
          </IonButton> */}
           <Button shape={SHAPE.pill} kind={KIND.secondary} onClick={() => history.push("/login")}><ArrowLeft/></Button>
          <Button shape={SHAPE.pill} kind={otp.every((digit) => digit !== "") ? KIND.primary : KIND.secondary} onClick={(e) => verifyOtp(e)} disabled={otp.every((digit) => digit !== "") ? false : true}>{t(`dcag.home.verifyotp.nextBtn.label`)} <ArrowRight/></Button>
        </div>
      </IonContent>}

    </IonPage>
  );
};

export default Login;
