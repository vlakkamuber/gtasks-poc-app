import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  browserLocalPersistence,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../firebase";

export type AuthContext = Record<string, any>;

const userAuthContext = createContext<AuthContext>({});

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function setUpRecaptha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {});
    recaptchaVerifier.render();
    return auth.setPersistence(browserLocalPersistence).then(() => signInWithPhoneNumber(auth, number, recaptchaVerifier));
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      if(currentuser){
        localStorage.setItem("accessToken",currentuser.accessToken)
      }
      setUser(currentuser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        loading,
        logIn,
        signUp,
        logOut,
        onAuthStateChanged,
        googleSignIn,
        setUpRecaptha,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth(): AuthContext {
  return useContext(userAuthContext);
}
